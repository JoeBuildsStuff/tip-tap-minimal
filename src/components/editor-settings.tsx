'use client'

import { Settings } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

interface EditorSettingsProps {
  showFixedMenu: boolean
  setShowFixedMenu: (value: boolean) => void
  showBubbleMenu: boolean
  setShowBubbleMenu: (value: boolean) => void
}

export default function EditorSettings({
  showFixedMenu,
  setShowFixedMenu,
  showBubbleMenu,
  setShowBubbleMenu,
}: EditorSettingsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon'>
          <Settings className='size-4' />
          <span className='sr-only'>Editor settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right'>
        <SheetHeader>
          <SheetTitle>Editor settings</SheetTitle>
          <SheetDescription>Toggle editor menus</SheetDescription>
        </SheetHeader>
        <div className='flex items-center justify-between p-4'>
          <span>Fixed menu</span>
          <Switch checked={showFixedMenu} onCheckedChange={setShowFixedMenu} />
        </div>
        <div className='flex items-center justify-between p-4'>
          <span>Bubble menu</span>
          <Switch checked={showBubbleMenu} onCheckedChange={setShowBubbleMenu} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
