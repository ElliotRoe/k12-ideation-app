import { AiAgent } from "@/components/ai-agent";
import { TextBubble } from "@/components/text-bubble";
import Link from "next/link";

export default function Brainstorm() {
  return (
    <div className="flex h-full flex-col items-center justify-between p-10 pb-24">
      <TextBubble
        className="max-w-[700px]"
        bot="brainstorm-bot"
        emotion="happy"
        text="Hi, I'm Stormy! Here to help you think of some awesome ideas. To start, let's narrow down the type of project you want to create!"
      />
      <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
        Choose your project type
      </h2>
      <div className="flex flex-row space-x-5">
        <div className="flex flex-col items-center justify-center w-[200px] h-[200px] text-[100px] border rounded-xl bg-muted">
          🎨
        </div>
        <Link href="/brainstorm/goal">
          <div className="flex flex-col items-center justify-center w-[200px] h-[200px] text-[100px] border rounded-xl hover:bg-muted">
            🎮
          </div>
        </Link>
        <div className="flex flex-col items-center justify-center w-[200px] h-[200px] text-[100px] border rounded-xl bg-muted">
          🧭
        </div>
      </div>
    </div>
  );
}
