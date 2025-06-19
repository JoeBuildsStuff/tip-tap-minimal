'use client'

import { ModeToggle } from "@/components/mode-toggle";
import Tiptap from "@/components/tiptap";
import { Settings } from "@/components/settings";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// GitHub SVG Icon Component
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

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
      <div className="flex justify-end p-4 gap-0">
        <Button variant="ghost" asChild>
          <Link href="https://github.com/JoeBuildsStuff/tip-tap-minimal" target="_blank" rel="noopener noreferrer">
            <GitHubIcon className="size-4" />
          </Link>
        </Button>
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