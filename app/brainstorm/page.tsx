"use client";

import { AiAgent } from "@/components/ai-agent";
import { TextBubble } from "@/components/text-bubble";
import Link from "next/link";
import { useState } from "react";

type ProjectType = "video-game" | "art-project" | "cyoa";

export default function Brainstorm() {
  const [currentHover, setCurrentHover] = useState<
    ProjectType | "waiting" | ""
  >("");

  const textOptions: Record<ProjectType | "waiting", string> = {
    "video-game": "Pick this if you want to make an awesome video game!",
    "art-project":
      "Pick this if you want to make a cool art project with code!",
    cyoa: "Pick this if you want to forge your own amazing project!",
    waiting: "No matter what you choose, I'm sure you'll make something great!",
  };

  const defaultText =
    "Hi, I'm Stormy! Here to help you think of some awesome ideas. To start, let's narrow down the type of project you want to create!";

  return (
    <div className="flex h-full flex-col items-center justify-between p-10 pb-10">
      <TextBubble
        className="max-w-[700px]"
        bot="brainstorm"
        animate={true}
        emotion="happy"
        text={currentHover != "" ? textOptions[currentHover] : defaultText}
      />
      <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
        Choose your project type
      </h2>
      <div className="flex flex-row space-x-5">
        <div
          onMouseEnter={() => setCurrentHover("art-project")}
          onMouseLeave={() => setCurrentHover("waiting")}
          className="flex flex-col items-center justify-center w-[200px] h-[200px] text-[100px] border rounded-xl bg-muted"
        >
          🎨
        </div>
        <Link href="/brainstorm/goal">
          <div
            onMouseEnter={() => setCurrentHover("video-game")}
            onMouseLeave={() => setCurrentHover("waiting")}
            className="flex flex-col items-center justify-center w-[200px] h-[200px] text-[100px] border rounded-xl hover:bg-muted"
          >
            🎮
          </div>
        </Link>
        <div
          onMouseEnter={() => setCurrentHover("cyoa")}
          onMouseLeave={() => setCurrentHover("waiting")}
          className="flex flex-col items-center justify-center w-[200px] h-[200px] text-[100px] border rounded-xl bg-muted"
        >
          🧭
        </div>
      </div>
    </div>
  );
}
