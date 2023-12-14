"use client";

import { InputBar } from "@/components/input-bar";
import { TextBubble } from "@/components/text-bubble";
import { Button } from "@/components/ui/button";
import { useHasHydrated } from "@/hooks/use-has-hydrated";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCountdown, useLocalStorage } from "usehooks-ts";

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const botGameIdeas: string[] = [
  "Navigate different time periods to solve crimes and mysteries.",
  "Explore a world where gravity is constantly shifting, adding a unique twist to traditional platformer gameplay.",
  "Embark on a quest to collect and train mythical creatures in a vibrant, open-world environment.",
  "Progress through the game by solving puzzles and battling enemies through musical interactions and rhythm-based challenges.",
  "Run through dynamically changing environments, adapting to new challenges and obstacles that appear in real-time.",
  "Solve puzzles by manipulating objects in two parallel universes that interact with each other.",
  "Build and manage a fleet of steampunk airships, engaging in strategic battles and resource management.",
  "Explore and mine asteroids in space, managing resources and fending off other space miners and threats.",
  "Play as a character with the ability to shape-shift into various forms, each with unique abilities to solve puzzles and combat enemies.",
  "Navigate levels where reality changes based on your observations, inspired by quantum mechanics.",
  "Construct and manage an underwater city, dealing with unique challenges such as pressure, oxygen, and marine life.",
  "Explore a vast and surreal dream world, solving puzzles and facing challenges that defy conventional logic.",
  "Build and customize your own combat robots and compete in futuristic gladiator-style battles.",
  "Run a time-traveling restaurant, serving dishes to customers across different historical eras.",
  "Infiltrate high-security locations, using gadgets and stealth to complete missions without being detected.",
  "Start with a simple organism and guide its evolution through various challenges and environmental changes.",
  "Experience a virtual reality escape room with challenging puzzles and immersive environments.",
  "Grow magical plants with unique properties and use them to solve puzzles and challenges in a fantastical world.",
  "Navigate a city as a superhero, using parkour and superpowers to traverse obstacles and fight crime.",
  "Manage a space-faring trading empire, negotiating with alien civilizations and exploring new markets in the cosmos.",
];

const intoTexto =
  "Alright, in the Greenlight stage, there are no limits—let your creativity run wild! Generate as many game ideas as you can without holding back. We're looking for quantity and diversity here. Go ahead, give the green light to all your exciting thoughts!";

export default function Rapid() {
  const minutes = 2;
  const [intervalValue, setIntervalValue] = useState<number>(1000);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [inputBar, setInputBar] = useState<string>("");
  const [ideas, setIdeas] = useLocalStorage<string[]>("userIdeas", []);
  const [currentBotIdea, setCurrentBotIdea] = useState<string>(botGameIdeas[0]);
  let currentBotIdeaIndex = useRef<number>(1);
  const hasHydrated = useHasHydrated();
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 60 * minutes,
      intervalMs: intervalValue,
    });

  useEffect(() => {
    console.log(count);

    if (count === 0) {
      gameActive && setGameActive(false);
      setGameOver(true);
    }
  }, [count]);

  const sayNextIdea = () => {
    setCurrentBotIdea(botGameIdeas[currentBotIdeaIndex.current]);
    currentBotIdeaIndex.current++ % botGameIdeas.length;
  };

  const startGame = () => {
    setGameActive(true);
    setIdeas([]);
    startCountdown();
  };

  const addIdea = (idea: string) => {
    setIdeas([...ideas, idea]);
  };

  return (
    <div className="flex h-full flex-col items-center justify-between p-10 pb-10 space-y-10">
      <h3 className="scroll-m-20 text-4xl font-bold tracking-tight">{`Objective: Think of as many ideas as you can in ${minutes} minutes`}</h3>
      <TextBubble
        className="max-w-[700px]"
        animate={true}
        bot="brainstorm"
        emotion="happy"
        text={
          gameActive
            ? `Ooooo! I know, what about a game where you ${currentBotIdea}`
            : intoTexto
        }
      />
      <div className="flex flex-row space-x-5 items-center justify-center">
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
        <div className="flex flex-col space-x-5">
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
            setTimeout(() => {
              sayNextIdea();
            }, 1000);
          }}
        >
          Go!
        </Button>
      </div>
    </div>
  );
}
