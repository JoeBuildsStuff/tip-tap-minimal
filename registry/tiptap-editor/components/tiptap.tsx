'use client'

import { useEditor, EditorContent, ReactNodeViewRenderer, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Underline } from '@tiptap/extension-underline'
import { TextAlign } from '@tiptap/extension-text-align'
import { Placeholder } from '@tiptap/extensions'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { Link } from '@tiptap/extension-link'
import { createLowlight, common } from 'lowlight'
import { useEffect, useState } from 'react'

import { TooltipProvider } from '@/components/ui/tooltip'
import {
    Bold,
    Italic,
    Strikethrough,
    Underline as UnderlineIcon,
    Code,
    Type,
    AlignLeft,
    X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { Skeleton } from '@/components/ui/skeleton'
import { CodeBlock } from '@/components/tiptap/code-block'
import FixedMenu from '@/components/tiptap/fixed-menu'
import BubbleMenuComponent from '@/components/tiptap/bubble-menu'


const lowlight = createLowlight(common)

const CustomCodeBlock = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlock)
  },
})



interface TiptapProps {
    content?: string
    showFixedMenu?: boolean
    showBubbleMenu?: boolean
    onChange?: (content: string) => void
}

const Tiptap = ({ content, showFixedMenu = true, showBubbleMenu = true, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        Placeholder.configure({
            placeholder: 'Write something…',
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
    ],
    content: content || ``,
    immediatelyRender: false,
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
      }
    }
  })

  useEffect(() => {
    if (editor) {
      const editorContent = editor.getHTML()
      // Compare the content and update only if it's different.
      // This prevents an infinite loop.
      if (content !== editorContent) {
        editor.commands.setContent(content || '', { emitUpdate: false })
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
                                <Bold className='' />
                            </Toggle>
                            <Toggle size='sm' disabled>
                                <Italic className='' />
                            </Toggle>
                            <Toggle size='sm' disabled>
                                <Strikethrough className='' />
                            </Toggle>
                            <Toggle size='sm' disabled>
                                <UnderlineIcon className='' />
                            </Toggle>
                            <Toggle size='sm' disabled>
                                <Code className='' />
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
        <div className='relative border border-border rounded-md bg-card'>
            <TooltipProvider>

                {/* start fixed menu */}
                {showFixedMenu && <FixedMenu editor={editor} />}
                {/* end fixed menu */}

                {/* start bubble menu */}
                {showBubbleMenu && <BubbleMenuComponent editor={editor} />}
                {/* end bubble menu */}

                {/* start editor */}
                <div className='py-2 px-3 prose prose-base dark:prose-invert max-w-none'>
                    <EditorContent 
                        editor={editor} 
                        className='[&_a:hover]:cursor-pointer' 
                    />
                </div>
                {/* end editor */}

            </TooltipProvider>
        </div>
    )
}

export default Tiptap