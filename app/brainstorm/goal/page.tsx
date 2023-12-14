"use client";

import { InputBar } from "@/components/input-bar";
import { TextBubble } from "@/components/text-bubble";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function Goal() {
  const goals = [
    "I'm going to dream up awesome game moves that no one has ever thought of!",
    "I want to explore a game world that's totally new to me and full of surprises.",
    "I'll invent a game idea inspired by the things I love to do in my free time.",
    "I'm setting out to create a game that I'd find super fun to play myself.",
    "I aim to design a game that makes people smile and enjoy themselves.",
    "I'm going to create a game that feels like a magical adventure!",
  ];

  const [_, setUserGoal] = useLocalStorage<string>("userGoal", "");
  const [goal, setGoal] = useState<string>("");

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
        text="Exciting times! Let's kick off by setting a clear goal for your project. Think of something specific and challenging you want to achieve. Remember, a well-defined goal boosts motivation and performance. What will you aim for today?"
      />
      <p className="text-2xl font-bold mb-3">Here are some example ideas:</p>
      <div>
        <ul className="list-none grid grid-cols-3 gap-4">
          {goals.map((goal) => (
            <div
              className="border border-input bg-background hover:bg-accent hover:text-accent-foreground p-3 rounded-xl cursor-pointer"
              onClick={() => setGoal(goal)}
              key={goal}
            >
              <p className="w-full">{goal}</p>
            </div>
          ))}
        </ul>
      </div>
      <div className="flex flex-row items-center space-x-5 w-full">
        <InputBar
          onChange={(e) => {
            setGoal(e.target.value);
          }}
          value={goal}
          placeHolder="Type your goal..."
        />
        <Link href="/brainstorm/reflect" onClick={() => setUserGoal(goal)}>
          <Button>Set</Button>
        </Link>
      </div>
    </div>
  );
}
