"use client";

import { TextBubble } from "@/components/text-bubble";
import { useLocalStorage } from "usehooks-ts";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Review() {
  const [ideas] = useLocalStorage<string[]>("userIdeas", []);
  const [selectedIdea, setSelectedIdea] = useLocalStorage<string>(
    "selectedIdea",
    ""
  );
  const hasHydrated = useHasHydrated();

  return (
    <div className="flex h-full flex-col items-center justify-between p-10 pb-24">
      <h3 className="scroll-m-20 text-4xl font-bold tracking-tight">{`Objective: Find your favorite idea!`}</h3>
      <TextBubble
        className="max-w-[700px]"
        bot="brainstorm-bot"
        emotion="happy"
        text="Welcome to the Redlight stage! Now, take a look at all your fantastic ideas from the Greenlight phase. Your mission here is to pick the one idea that shines the brightest to you. Ready to select your standout idea?"
      />
      {hasHydrated && (
        <ul className="list-none grid grid-cols-3 gap-4">
          {ideas.map((idea) => (
            <Button
              key={idea}
              variant={selectedIdea === idea ? "default" : "outline"}
              onClick={() => setSelectedIdea(idea)}
            >
              {idea}
            </Button>
          ))}
        </ul>
      )}
      <Link href="/brainstorm/final">
        <Button variant="default" className="mt-10">
          SELECT
        </Button>
      </Link>
    </div>
  );
}
