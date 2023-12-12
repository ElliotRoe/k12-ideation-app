"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import { type } from "os";
import { wordList } from "@/lib/word-list";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const words = wordList; // Add more words as needed
  // First 5 words of word list
  const [currentWords, setCurrentWords] = useState<string[]>(words.slice(0, 5));
  const [wordTransformShift, setWordTransformShift] = useState<number>(0);
  const shiftAnimSpeed = 300;
  const shiftFrequency = 3000;

  useEffect(() => {
    const intervalId = setInterval(async () => {
      setWordTransformShift(1);
      await new Promise((f) => setTimeout(f, shiftAnimSpeed + 100));
      setWordTransformShift(0);
      let newWord = words[Math.floor(Math.random() * words.length)];
      while (currentWords.includes(newWord)) {
        newWord = words[Math.floor(Math.random() * words.length)];
      }
      setCurrentWords((prevWords) => {
        const newWords = [...prevWords];
        newWords.push(newWord);
        newWords.shift();
        return newWords;
      });
    }, shiftFrequency); // changes every 5 seconds

    return () => clearInterval(intervalId); // cleanup on unmount
  }, [currentWords]);

  return (
    <div className="flex h-full flex-col items-center justify-between p-24">
      <div className="flex flex-row items-center justify-centers space-x-3">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {`Let's build something`}
        </h1>
        <div className="w-[350px] feathered">
          <div
            className="transform transition-transform"
            style={{
              transform: `translateY(${
                (-1 / currentWords.length) * wordTransformShift * 100
              }%)`,
              transition: `transform ${
                wordTransformShift === 1 ? shiftAnimSpeed : 0
              }ms ease-in-out`,
            }}
          >
            {currentWords.map((word, index) => (
              <h1
                key={index}
                className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
              >
                {word}
              </h1>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Link href="/brainstorm">
          <Button className="w-[350px] h-[100px] text-2xl rounded-xl font-bold tracking-tight lg:text-5xl">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
