import { ModeToggle } from "@/components/mode-toggle";
import Tiptap from "@/components/tiptap";
import EditorSettings from "@/components/editor-settings";
import { useState } from "react";

const sampleContent = `
  <h1>Welcome to the Tiptap Editor</h1>
  <p>You can install into your project by running:</p>
  <pre>
    <code>
      npm dlx shadcn@latest add https://tip-tap-minimal.vercel.app/r/tiptap-editor.json
    </code>
  </pre>
`

export default function Home() {
  const [showFixedMenu, setShowFixedMenu] = useState(true)
  const [showBubbleMenu, setShowBubbleMenu] = useState(true)

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-end gap-2 p-4">
        <EditorSettings
          showFixedMenu={showFixedMenu}
          setShowFixedMenu={setShowFixedMenu}
          showBubbleMenu={showBubbleMenu}
          setShowBubbleMenu={setShowBubbleMenu}
        />
        <ModeToggle />
      </div>
      <div className="space-y-4 mx-4 md:mx-auto md:w-2xl">
        <Tiptap
          content={sampleContent}
          showFixedMenu={showFixedMenu}
          showBubbleMenu={showBubbleMenu}
        />
      </div>
    </div>
  );
}

