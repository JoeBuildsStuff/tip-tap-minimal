'use client'

import { Editor, useEditorState } from '@tiptap/react'
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus'
import {
    Bold,
    Italic,
    Strikethrough,
    Underline as UnderlineIcon,
    Code,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Type,
    AlignLeft,
    AlignCenter,
    AlignRight,
    ChevronDown,
} from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/tiptap/dropdown-menu-tiptap'
import { Button } from '@/components/ui/button'
import { LinkButton } from '@/components/tiptap/link-button'
import TableButton from './table-button'

interface BubbleMenuProps {
    editor: Editor
}

const BubbleMenuComponent = ({ editor }: BubbleMenuProps) => {
    const editorState = useEditorState({
        editor,
        selector: (state: { editor: Editor }) => ({
            isBold: state.editor.isActive('bold'),
            isItalic: state.editor.isActive('italic'),
            isStrike: state.editor.isActive('strike'),
            isUnderline: state.editor.isActive('underline'),
            isCode: state.editor.isActive('code'),
            isHeading1: state.editor.isActive('heading', { level: 1 }),
            isHeading2: state.editor.isActive('heading', { level: 2 }),
            isHeading3: state.editor.isActive('heading', { level: 3 }),
            isOrderedList: state.editor.isActive('orderedList'),
            isBulletList: state.editor.isActive('bulletList'),
            isCodeBlock: state.editor.isActive('codeBlock'),
            isAlignLeft: state.editor.isActive({ textAlign: 'left' }),
            isAlignCenter: state.editor.isActive({ textAlign: 'center' }),
            isAlignRight: state.editor.isActive({ textAlign: 'right' }),
        }),
    })

    return (
        <TiptapBubbleMenu
            className=""
            options={{
                offset: 6,
                placement: 'top',
            }}
            editor={editor}
            shouldShow={({ editor }: { editor: Editor }) => {
                const { from, to } = editor.state.selection
                return from !== to
            }}
        >
            <div className='flex flex-row gap-0.5 border rounded-md border-border bg-background p-0.5'>
                <Tooltip>
                    <TooltipTrigger>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button size='sm' className='text-xs' variant='ghost'>
                                    {editorState.isHeading1 ? <Heading1 className='h-4 w-4' /> : editorState.isHeading2 ? <Heading2 className='h-4 w-4' /> : editorState.isCodeBlock ? <Code className='h-4 w-4' /> : <Type className='h-4 w-4' />}
                                    <ChevronDown className='h-4 w-4 text-muted-foreground' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent portalled={false} align='start' side='bottom' sideOffset={10} className='text-xs w-[12rem] bg-background'>
                                <DropdownMenuItem onClick={() => editor.chain().setParagraph().focus().run()}>
                                    <Type className='' />
                                    <span className='text-xs'>Text</span>
                                    <DropdownMenuShortcut>⌘ ⌥ 0</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => editor.chain().toggleHeading({ level: 1 }).focus().run()}>
                                    <Heading1 className='' />
                                    <span className='text-xs'>Heading 1</span>
                                    <DropdownMenuShortcut>⌘ ⌥ 1</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => editor.chain().toggleHeading({ level: 2 }).focus().run()}>
                                    <Heading2 className='' />
                                    <span className='text-xs'>Heading 2</span>
                                    <DropdownMenuShortcut>⌘ ⌥ 2</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => editor.chain().toggleHeading({ level: 3 }).focus().run()}>
                                    <Heading3 className='' />
                                    <span className='text-xs'>Heading 3</span>
                                    <DropdownMenuShortcut>⌘ ⌥ 3</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => editor.chain().toggleOrderedList().focus().run()}>
                                    <ListOrdered className='' />
                                    <span className='text-xs'>Ordered list</span>
                                    <DropdownMenuShortcut>⌘ ⇧ 7</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => editor.chain().toggleBulletList().focus().run()}>
                                    <List className='' />
                                    <span className='text-xs'>Bullet list</span>
                                    <DropdownMenuShortcut>⌘ ⇧ 8</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                                    <Code className='' />
                                    <span className='text-xs'>Code block</span>
                                    <DropdownMenuShortcut>⌘ ⌥ C</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Block type</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button size='sm' className='text-xs' variant='ghost' >
                                    {editorState.isAlignLeft && <AlignLeft className='h-4 w-4' />}
                                    {editorState.isAlignCenter && <AlignCenter className='h-4 w-4' />}
                                    {editorState.isAlignRight && <AlignRight className='h-4 w-4' />}
                                    {!editorState.isAlignLeft && !editorState.isAlignCenter && !editorState.isAlignRight && <AlignLeft className='h-4 w-4' />}
                                    <ChevronDown className='h-4 w-4 text-muted-foreground' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent portalled={false} align='start' side='bottom' sideOffset={10} className='text-xs w-[10rem] bg-background'>
                                <DropdownMenuItem onClick={() => editor.chain().setTextAlign('left').focus().run()}>
                                    <AlignLeft className='' />
                                    <span className='text-xs'>Left</span>
                                    <DropdownMenuShortcut>⌘ ⇧ L</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => editor.chain().setTextAlign('center').focus().run()}>
                                    <AlignCenter className='' />
                                    <span className='text-xs'>Center</span>
                                    <DropdownMenuShortcut>⌘ ⇧ E</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => editor.chain().setTextAlign('right').focus().run()}>
                                    <AlignRight className='' />
                                    <span className='text-xs'>Right</span>
                                    <DropdownMenuShortcut>⌘ ⇧ R</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Text alignment</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger>
                        <Toggle
                            onClick={() => editor.chain().toggleBold().focus().run()}
                            pressed={editorState.isBold}
                            size='sm'
                            className='text-xs'
                        >
                            <Bold className='' />
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Bold <span className='ml-2'>⌘B</span></p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <Toggle
                            onClick={() => editor.chain().toggleItalic().focus().run()}
                            pressed={editorState.isItalic}
                            size='sm'
                            className='text-xs'
                        >
                            <Italic className='' />
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Italic <span className='ml-2'>⌘I</span></p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <Toggle
                            onClick={() => editor.chain().toggleStrike().focus().run()}
                            pressed={editorState.isStrike}
                            size='sm'
                            className='text-xs'
                        >
                            <Strikethrough className='' />
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Strikethrough <span className='ml-2'>⌘⇧X</span></p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <Toggle
                            onClick={() => editor.chain().toggleUnderline().focus().run()}
                            pressed={editorState.isUnderline}
                            size='sm'
                            className='text-xs'
                        >
                            <UnderlineIcon className='' />
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Underline <span className='ml-2'>⌘U</span></p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger>
                        <Toggle
                            onClick={() => editor.chain().toggleCode().focus().run()}
                            pressed={editorState.isCode}
                            size='sm'
                            className='text-xs'
                        >
                            <Code className='' />
                        </Toggle>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Inline code <span className='ml-2'>⌘E</span></p>
                    </TooltipContent>
                </Tooltip>
                <LinkButton editor={editor} size='sm' className='text-xs' />
                <TableButton editor={editor} size='sm' className='text-xs' />
            </div>
        </TiptapBubbleMenu>
    )
}

export default BubbleMenuComponent 