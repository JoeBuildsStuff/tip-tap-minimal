import { ModeToggle } from "@/components/mode-toggle";
import Tiptap from "@/components/tiptap";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-end p-4">
        <ModeToggle />
      </div> 
      <div className="space-y-4 mx-4 md:mx-auto md:w-2xl">
        <Tiptap />
      </div>
    </div>
  );
}
