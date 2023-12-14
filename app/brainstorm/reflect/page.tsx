"use client";

import { TextBubble } from "@/components/text-bubble";
import { useLocalStorage } from "usehooks-ts";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const defaultText =
  "Great goal! Before we start brainstorming, let's reflect on your goal. Here's a couple questions to help you see if you set a good goal.";
const goalQuestions = [
  "Is your goal specific?",
  "Is your goal challenging?",
  "Is your goal realistic?",
  "Is your goal measurable?",
  "Is your goal time-bound?",
];

export default function Reflect() {
  const [userGoal, setUserGoal] = useLocalStorage<string>("userGoal", "");
  const [allChecked, setAllChecked] = useState<boolean>(false);
  // array of false values with length of goalQuestions
  const [checked, setChecked] = useState<boolean[]>(
    new Array(goalQuestions.length).fill(false)
  );
  const hasHydrated = useHasHydrated();

  useEffect(() => {
    if (checked.every((check) => check)) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [checked]);

  return (
    <div className="flex h-full flex-col items-center justify-between p-10 pb-10">
      <h3 className="scroll-m-20 text-4xl font-bold tracking-tight mb-10">
        Objective: Set a goal for your project
      </h3>
      <TextBubble
        className="max-w-[700px]"
        bot="brainstorm"
        emotion="happy"
        animate={true}
        text={defaultText}
      />
      <p className="text-2xl font-bold mb-3">
        Your Goal: {hasHydrated && userGoal}
      </p>
      <ul className="list-none grid grid-cols-3 gap-4">
        {goalQuestions.map((question, i) => (
          <div
            className="border border-input bg-background hover:bg-accent hover:text-accent-foreground p-3 rounded-xl cursor-pointer flex flex-row justify-between items-center space-x-2"
            onClick={() => {
              const newChecked = [...checked];
              newChecked[i] = !checked[i];
              setChecked(newChecked);
            }}
            key={question}
          >
            <Checkbox checked={checked[i]} />
            <p className="w-full">{question}</p>
          </div>
        ))}
      </ul>
      <div className="flex flex-row space-x-5">
        <Link href="/brainstorm/goal">
          <Button variant="outline" className="mt-10">
            REVISE GOAL
          </Button>
        </Link>
        <Link href="/brainstorm/rapid">
          <Button variant="default" disabled={!allChecked} className="mt-10">
            CONTINUE
          </Button>
        </Link>
      </div>
    </div>
  );
}
