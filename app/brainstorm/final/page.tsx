"use client";

import { TextBubble } from "@/components/text-bubble";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import Image from "next/image";
import { useLocalStorage } from "usehooks-ts";

export default function Final() {
  const [selectedIdea] = useLocalStorage<string>("selectedIdea", "");
  const hasHydrated = useHasHydrated();

  return (
    <div className="flex h-full flex-col items-center justify-between p-10 pb-10">
      <h3 className="scroll-m-20 text-4xl font-bold tracking-tight">
        End of prototype demo
      </h3>
      <TextBubble
        className="max-w-[700px]"
        bot="brainstorm"
        emotion="happy"
        animate={true}
        text="Amazing Job! I love your idea! The next step is to break down your idea into smaller pieces. This will help you to plan out your project and make it easier to get started. Let's get to it!"
      />
      <div className="flex flex-row items-center justify-center w-full relative mb-20">
        <div className="border p-5 rounded-full bg-background z-10 absolute drop-shadow-sm animate-bounce">
          <p className="text-3xl font-bold">{hasHydrated && selectedIdea}</p>
        </div>
        <Image
          src="/images/radial-effect.png"
          width={300}
          height={300}
          alt="arrow"
          className="absolute animate-spin-slow opacity-30 z-0"
        />
      </div>
    </div>
  );
}
