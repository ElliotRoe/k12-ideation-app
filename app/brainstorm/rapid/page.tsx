"use client";

import { InputBar } from "@/components/input-bar";
import { TextBubble } from "@/components/text-bubble";
import { Button } from "@/components/ui/button";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCountdown, useLocalStorage } from "usehooks-ts";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default function Rapid() {
  const minutes = 2;
  const [intervalValue, setIntervalValue] = useState<number>(1000);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [inputBar, setInputBar] = useState<string>("");
  const [ideas, setIdeas] = useLocalStorage<string[]>("userIdeas", []);
  const hasHydrated = useHasHydrated();
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60 * minutes,
      intervalMs: intervalValue,
    });

  useEffect(() => {
    if (count === 0) {
      gameActive && setGameActive(false);
      setGameOver(true);
    }
  }, [count]);

  const startGame = () => {
    setGameActive(true);
    setIdeas([]);
    startCountdown();
  };

  const addIdea = (idea: string) => {
    setIdeas([...ideas, idea]);
  };

  return (
    <div className="flex h-full flex-col items-center justify-between p-10 pb-24 space-y-10">
      <h3 className="scroll-m-20 text-4xl font-bold tracking-tight">{`Objective: Think of as many ideas as you can in ${minutes} minutes`}</h3>
      <TextBubble
        className="max-w-[700px]"
        bot="brainstorm-bot"
        emotion="happy"
        text="Alright, in the Greenlight stage, there are no limits—let your creativity run wild! Generate as many game ideas as you can without holding back. We're looking for quantity and diversity here. Go ahead, give the green light to all your exciting thoughts!"
      />
      <div className="flex flex-row space-x-5">
        <div className="flex flex-col items-center justify-center space-y-2 border w-[150px] h-[150px] rounded-xl">
          <div className="text-5xl font-bold">
            {hasHydrated && ideas.length}
          </div>
          <div className="text-xl text-center">Ideas</div>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 border w-[150px] h-[150px] rounded-xl">
          <div className="text-5xl font-bold">{formatTime(count)}</div>
          <div className="text-xl text-center">Time Remaining</div>
        </div>
      </div>
      <div className="flex flex-row space-x-5">
        {!gameOver && (
          <Button onClick={startGame} disabled={gameActive}>
            START
          </Button>
        )}
        {gameOver && (
          <Button
            variant={"outline"}
            onClick={() => {
              resetCountdown();
              setGameOver(false);
            }}
          >
            RESET
          </Button>
        )}
        {gameOver && (
          <Link href="/brainstorm/review">
            <Button>VIEW RESULTS</Button>
          </Link>
        )}
      </div>
      <div className="flex flex-row items-center space-x-5 w-full">
        <InputBar
          onChange={(e) => {
            setInputBar(e.target.value);
          }}
          value={inputBar}
          placeHolder="Type your idea..."
        />
        <Button
          onClick={() => {
            addIdea(inputBar);
            setInputBar("");
          }}
        >
          Go!
        </Button>
      </div>
    </div>
  );
}
