import { File } from "lucide-react";
import { metadata } from "@/app/layout";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
    <div className="p-1.5 bg-foreground text-background dark:bg-secondary dark:text-foreground rounded-lg">
      <File className="size-5" />
    </div>
    <span className="hidden sm:block">{metadata?.title as string}</span>
  </div>
  )
}