'use client'

import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { Placeholder, Gapcursor } from '@tiptap/extensions'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Link } from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table/row'
import { TableCell } from '@tiptap/extension-table/cell'
import { TableHeader } from '@tiptap/extension-table/header'
import { DragHandle } from '@tiptap/extension-drag-handle-react'
import { FileNode } from '@/components/tiptap/file-node'
import { createLowlight, common } from 'lowlight'
import { useEffect, useState } from 'react'
import { TiptapProps } from './types'
import { Image } from '@tiptap/extension-image'
import { CustomImageView } from './custom-image-view'
import { deleteFile } from './supabase-file-manager'

import { TooltipProvider } from '@/components/ui/tooltip'
import {
    Strikethrough,
    Type,
    AlignLeft,
    GripVertical,
} from 'lucide-react'
import { BoldIcon } from '@/components/icons/bold'
import { ItalicIcon } from '@/components/icons/italic'
import { UnderlineIcon } from '@/components/icons/underline'
import { ChevronsLeftRightIcon } from '@/components/icons/chevrons-left-right'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { Skeleton } from '@/components/ui/skeleton'
import { CodeBlock } from '@/components/tiptap/code-block'
import FixedMenu from '@/components/tiptap/fixed-menu'
import BubbleMenuComponent from '@/components/tiptap/bubble-menu'
import { createFileHandlerConfig } from '@/components/tiptap/file-handler'

const lowlight = createLowlight(common)
const CustomCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlock)
  },
})

const Tiptap = ({ 
  content, 
  showFixedMenu = true, 
  showBubbleMenu = true, 
  showDragHandle = true, 
  onChange, 
  onFileDrop,
  fileUploadConfig,
  enableFileNodes = true
}: TiptapProps) => {
  // Track the currently selected node for drag handle functionality
  const [, setSelectedNode] = useState<{ type: { name: string } } | null>(null)

  const editor = useEditor({
    extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Placeholder.configure({
            placeholder:'Write something…',
        }),
        CustomCodeBlock.configure({
            lowlight,
        }),
        Link.configure({
            openOnClick: false,
            autolink: true,
            defaultProtocol: 'https',
            protocols: ['http', 'https'],
        }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableCell,
        TableHeader,
        Gapcursor,
        ...(enableFileNodes ? [
          createFileHandlerConfig({ 
            onFileDrop,
            fileUploadConfig: fileUploadConfig ? {
              supabaseBucket: fileUploadConfig.supabaseBucket,
              pathPrefix: fileUploadConfig.pathPrefix,
              maxFileSize: fileUploadConfig.maxFileSize,
              allowedMimeTypes: fileUploadConfig.allowedMimeTypes
            } : undefined
          })
        ] : []),
        
        Image.extend({
          addNodeView() {
            return ReactNodeViewRenderer(CustomImageView)
          },
        }).configure({
          inline: true,
          allowBase64: false, // Always false - we store file paths, not base64
          HTMLAttributes: {
            class: 'tiptap-image',
          }
        }),
        ...(enableFileNodes ? [
          FileNode
        ] : [])
    ],
    content: content || ``,
    immediatelyRender: false,
    onDelete(params: { type: string; node?: { type: { name: string }; attrs?: { src?: string } }; [key: string]: unknown }) {
      // Handle cleanup of deleted image and file nodes
      const { type, node } = params
      if (type === 'node' && node?.attrs?.src) {
        const src = node.attrs.src
        // Only cleanup Supabase file paths, not external URLs
        if (typeof src === 'string' && !src.startsWith('http') && !src.startsWith('data:')) {
          deleteFile(src).catch((error: unknown) => {
            console.error('Failed to cleanup deleted file:', error)
          })
        }
      }
    },
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML())
      }
    },
    editorProps: {
      handleKeyDown: (_view, event) => {
        // Handle Cmd+K (or Ctrl+K) for link
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
          event.preventDefault()
          // Note: Link functionality is now handled by LinkButton components
          return true
        }
        return false
      },
    }
  })

  useEffect(() => {
    if (editor) {
      const editorContent = editor.getHTML()
      // Compare the content and update only if it's different.
      // This prevents an infinite loop.
      if (content !== editorContent) {
        editor.commands.setContent((content as string) || '', { emitUpdate: false })
      }
    }
  }, [content, editor])

  // Skeleton
  if (!editor) {
    return (
        <div className='relative border border-border rounded-md bg-card'>
            {showFixedMenu && (
                <div className='bg-card rounded-t-md border-b border-border' >
                    <div className='flex flex-row gap-1 p-2'>
                        <div className='flex flex-row gap-0.5 w-fit'>
                            <Button size='sm' variant='secondary' disabled>
                                <Type className='' />
                            </Button>
                        </div>
                        <div className='flex flex-row gap-0.5 w-fit'>
                            <Button size='sm' variant='secondary' disabled>
                                <AlignLeft className='' />
                            </Button>
                        </div>
                        <div className='flex flex-row gap-0.5 w-fit'>
                            <Toggle size='sm' disabled>
                                <BoldIcon className='' />
                            </Toggle>
                            <Toggle size='sm' disabled>
                                <ItalicIcon className='' />
                            </Toggle>
                            <Toggle size='sm' disabled>
                                <Strikethrough className='' />
                            </Toggle>
                            <Toggle size='sm' disabled>
                                <UnderlineIcon className='' />
                            </Toggle>
                            <Toggle size='sm' disabled>
                                <ChevronsLeftRightIcon className='' />
                            </Toggle>
                        </div>
                    </div>
                </div>
            )}
            <div className='py-2 px-3 h-full'>
                <div className='prose prose-base dark:prose-invert max-w-none'>
                    <Skeleton className='h-6 w-1/3 mb-4' />
                    <Skeleton className='h-4 w-full mb-2' />
                    <Skeleton className='h-4 w-3/4 mb-2' />
                </div>
            </div>
        </div>
    )
  }

    // Editor
    return (
        <div className='relative border border-border rounded-md bg-card h-full flex flex-col'>
            <TooltipProvider>

                {/* start fixed menu */}
                {showFixedMenu && (
                    <div className='sticky top-0 z-10 bg-card/80 backdrop-blur-lg rounded-lg'>
                        <FixedMenu editor={editor} />
                    </div>
                )}
                {/* end fixed menu */}

                {/* start bubble menu */}
                {showBubbleMenu && <BubbleMenuComponent editor={editor} />}
                {/* end bubble menu */}

                {/* start drag handle */}
                {showDragHandle && (
                  <DragHandle
                    editor={editor}
                    onNodeChange={({ node }) => {
                      setSelectedNode(node)
                      // You can add custom logic here to highlight the selected node
                      if (node) {
                        // console.log('Selected node:', node.type.name)
                      }
                    }}
                  >
                    <div className="flex items-center justify-center w-4 h-8 mr-1 hover:bg-muted/80 rounded cursor-grab active:cursor-grabbing transition-colors">
                      <GripVertical className="size-4 text-muted-foreground/70" />
                    </div>
                  </DragHandle>
                )}
                {/* end drag handle */}

                {/* start editor */}
                <div className='h-full flex-1 overflow-y-auto py-2 px-6 prose prose-base dark:prose-invert max-w-none'>
                    <EditorContent 
                        editor={editor} 
                        className='[&_a:hover]:cursor-pointer h-full flex-1' 
                    />
                </div>
                {/* end editor */}

            </TooltipProvider>
        </div>
    )
}

export default Tiptap