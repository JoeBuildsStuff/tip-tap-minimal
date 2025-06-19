import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Settings2 } from "lucide-react"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { Button } from "./ui/button"
import { useState } from "react"

interface SettingsProps {
  initialContent: string
  showFixedMenu: boolean
  showBubbleMenu: boolean
  onSettingsChange: (settings: {
    initialContent: string
    showFixedMenu: boolean
    showBubbleMenu: boolean
  }) => void
}

export const Settings = ({ 
  initialContent, 
  showFixedMenu, 
  showBubbleMenu, 
  onSettingsChange 
}: SettingsProps) => {
  const [tempContent, setTempContent] = useState(initialContent)
  const [tempFixedMenu, setTempFixedMenu] = useState(showFixedMenu)
  const [tempBubbleMenu, setTempBubbleMenu] = useState(showBubbleMenu)

  const handleApply = () => {
    onSettingsChange({
      initialContent: tempContent,
      showFixedMenu: tempFixedMenu,
      showBubbleMenu: tempBubbleMenu
    })
  }

  const handleReset = () => {
    const defaultContent = `
  <h1>Welcome to the Tiptap Editor</h1>
  <p>You can install into your project by running:</p>
  <pre>
    <code>
      npm dlx shadcn@latest add https://tip-tap-minimal.vercel.app/r/tiptap-editor.json
    </code>
  </pre>
`
    setTempContent(defaultContent)
    setTempFixedMenu(true)
    setTempBubbleMenu(true)
    onSettingsChange({
      initialContent: defaultContent,
      showFixedMenu: true,
      showBubbleMenu: true
    })
  }

  return (
    <Sheet>
        <SheetTrigger>
          <Button variant="ghost">
            <Settings2 className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
                <SheetTitle>Editor Settings</SheetTitle>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">

            <div className="space-y-4">
                <Label>Menu Options</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="fixed-menu"
                    checked={tempFixedMenu}
                    onCheckedChange={(checked) => setTempFixedMenu(checked as boolean)}
                  />
                  <Label htmlFor="fixed-menu" className="text-sm font-normal">
                    Show fixed toolbar
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="bubble-menu"
                    checked={tempBubbleMenu}
                    onCheckedChange={(checked) => setTempBubbleMenu(checked as boolean)}
                  />
                  <Label htmlFor="bubble-menu" className="text-sm font-normal">
                    Show bubble menu (appears on text selection)
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="initial-content">Initial Content</Label>
                <Textarea 
                  id="initial-content"
                  placeholder="Enter initial HTML content for the editor..."
                  value={tempContent}
                  onChange={(e) => setTempContent(e.target.value)}
                  className="min-h-[120px] font-mono text-sm"
                />
              </div>
              
            </div>
            <SheetFooter>
        <div className="flex space-x-2">
                <Button onClick={handleApply} className="flex-1">
                  Apply Changes
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Reset to Default
                </Button>
              </div>
        </SheetFooter>
        </SheetContent>

    </Sheet>
  )
}