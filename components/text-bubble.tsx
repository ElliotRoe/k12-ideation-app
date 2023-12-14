"use client";

import { useEffect, useRef, useState } from "react";
import { AiAgent, BaseBot, Emotion } from "./ai-agent";

type Props = {
  text: string;
  animate?: boolean;
  bot?: BaseBot;
  emotion?: Emotion;
  className?: string;
};

export const TextBubble = ({
  text,
  animate,
  bot,
  emotion,
  className,
}: Props) => {
  const [renderedText, setRenderedText] = useState("");
  const [animating, setAnimating] = useState(false);
  let renderedTextIndex = useRef(0);

  const renderText = (clearInterval: () => void) => {
    if (renderedTextIndex.current < text.length) {
      setRenderedText(text.substring(0, renderedTextIndex.current + 1));
      renderedTextIndex.current++;
    } else {
      clearInterval();
    }
  };

  useEffect(() => {
    if (animate) {
      setAnimating(true);
      renderedTextIndex.current = 0;
      setRenderedText("");
      const interval = setInterval(() => {
        renderText(() => {
          clearInterval(interval);
          setAnimating(false);
        });
      }, 25);
      return () => clearInterval(interval);
    } else {
      setRenderedText(text);
    }
  }, [text, animate]);

  return (
    <div
      className={`flex flex-row space-x-10 items-start justify-between w-[800px] h-[200px] ${className}`}
    >
      {bot && emotion && (
        <AiAgent bot={bot} emotion={emotion} width={100} height={100} />
      )}
      <div className="rounded-xl border p-5 relative w-full shadow-md">
        <p className="text-lg">{renderedText}</p>
        <div className="border bg-white w-6 h-6 rotate-45 rounded-bl-lg border-r-0 border-t-0 absolute top-5 -left-[13px]" />
      </div>
    </div>
  );
};
