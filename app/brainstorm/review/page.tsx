"use client";

import { TextBubble } from "@/components/text-bubble";
import { useLocalStorage } from "usehooks-ts";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

export default function Review() {
  const [ideas] = useLocalStorage<string[]>("userIdeas", []);
  const [selectedIdea, setSelectedIdea] = useLocalStorage<string>(
    "selectedIdea",
    ""
  );
  const hasHydrated = useHasHydrated();

  return (
    <div className="flex h-full flex-col items-center justify-between p-10 pb-10">
      <h3 className="scroll-m-20 text-4xl font-bold tracking-tight">{`Objective: Find your favorite idea!`}</h3>
      <TextBubble
        className="max-w-[700px]"
        bot="brainstorm"
        animate={true}
        emotion="happy"
        text="Welcome to the Redlight stage! Now, take a look at all your fantastic ideas from the Greenlight phase. Your mission here is to pick the one idea that shines the brightest to you. Ready to select your standout idea?"
      />
      {hasHydrated && (
        <div className="list-none grid grid-cols-3 gap-4 w-full">
          {ideas.map((idea, i) => (
            <div
              className="w-full flex flex-col justify-between border border-input bg-background hover:bg-accent hover:text-accent-foreground p-3 rounded-xl cursor-pointer"
              key={idea}
              onClick={() => {
                if (selectedIdea === idea) {
                  setSelectedIdea("");
                } else {
                  setSelectedIdea(idea);
                }
              }}
            >
              <div className="flex flex-row items-center">
                <Checkbox checked={idea === selectedIdea} />
                <h4 className="text-xl font-bold ml-2">{`Idea ${i + 1}`}</h4>
              </div>
              <p className="break-all w-full">{idea}</p>
            </div>
          ))}
        </div>
      )}
      <Link href="/brainstorm/final">
        <Button variant="default" className="mt-10">
          SELECT
        </Button>
      </Link>
    </div>
  );
}
