import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { ButtonOpenGithubRepo } from "./button-open-github-repo";
import { ButtonCopyNpxInstallCmd } from "./button-copy-npx-install-cmd";
import { ButtonOpenInV0 } from "./button-open-in-v0";

export default function MainHeader() {

  const installURL = "https://shadcn-supabase-table.vercel.app/r/data-table-contacts.json"
  const v0URL = "https://tip-tap-minimal.vercel.app/r/tiptap-editor.json"
  const githubURL = "https://github.com/JoeBuildsStuff/tip-tap-minimal"

  return (
    <header className="sticky top-0 z-50 flex h-12 items-center justify-between border-b border-border bg-background/95 px-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Logo />
      <div className="flex items-center gap-2">
        <ButtonCopyNpxInstallCmd url={installURL} />  
        <ButtonOpenInV0 url={v0URL} />  
        <ButtonOpenGithubRepo url={githubURL} />
        <ModeToggle />
      </div>
    </header>
  )
}