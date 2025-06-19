'use client'

import { ModeToggle } from "@/components/mode-toggle";
import Tiptap from "@/components/tiptap";
import { Settings } from "@/components/settings";
import { useState } from "react";

const defaultContent = `
<h1>Web-Based Rich Text Editor</h1>
<h2>Installation</h2>
<p>You can easily add this editor to your own project using the shadcn registry:</p>
<pre data-language="bash"><code>npx shadcn@latest add https://tip-tap-minimal.vercel.app/r/tiptap-editor.json</code></pre>
<p>Feel free to use this editor in your own projects! You can customize it to your liking, and contributions via pull requests are always welcome.</p>

<h2>Built With</h2>
<ul>
  <li><strong>Tiptap</strong> - Headless editor framework for web artisans</li>
  <li><strong>Lowlight</strong> - Virtual syntax highlighting for code blocks</li>
  <li><strong>Next.js</strong> - React framework for production</li>
  <li><strong>shadcn/ui</strong> - Beautifully designed components</li>
  <li><strong>Lucide React</strong> - Beautiful & consistent icon toolkit</li>
  <li><strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
  <li><strong>Radix UI</strong> - Low-level UI primitives</li>
</ul>

<h2>Features</h2>
<ul>
  <li>Rich text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strikethrough</s></li>
  <li>Multiple heading levels and text alignment</li>
  <li>Code blocks with syntax highlighting</li>
  <li>Ordered lists (1, 2, 3, etc.) and unordered lists (bullet points)</li>
  <li>Inline code snippets like <code>const editor = useEditor()</code></li>
  <li>Dark/light theme support</li>
  <li>Floating bubble menu on text selection</li>
  <li>Copy content functionality</li>
</ul>
`

export default function Home() {
  const [editorSettings, setEditorSettings] = useState({
    initialContent: defaultContent,
    showFixedMenu: true,
    showBubbleMenu: true,
  })

  const handleSettingsChange = (newSettings: {
    initialContent: string
    showFixedMenu: boolean
    showBubbleMenu: boolean
  }) => {
    setEditorSettings(newSettings)
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-end p-4 gap-2">
        <Settings 
          initialContent={editorSettings.initialContent}
          showFixedMenu={editorSettings.showFixedMenu}
          showBubbleMenu={editorSettings.showBubbleMenu}
          onSettingsChange={handleSettingsChange}
        />
        <ModeToggle />
      </div> 
      <div className="space-y-4 mx-4 md:mx-auto md:w-2xl">
        <Tiptap 
          content={editorSettings.initialContent} 
          showFixedMenu={editorSettings.showFixedMenu}
          showBubbleMenu={editorSettings.showBubbleMenu}
        />
      </div>
    </div>
  );
}

