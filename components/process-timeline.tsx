"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type State = "brainstorm" | "decompose" | "build";

type Props = {
  className?: string;
};

export const ProcessTimeline = ({ className }: Props) => {
  const defaultState: State = "brainstorm";
  const [activeStage, setActiveStage] = useState<State>(defaultState);
  return (
    <Tabs
      defaultValue={defaultState}
      value={activeStage}
      className={`w-[400px] pointer-events-none ${className}`}
    >
      <TabsList className="w-full">
        <TabsTrigger value="brainstorm">
          <span className="text-4xl">🧠</span>
        </TabsTrigger>
        <TabsTrigger value="decompose">
          <span className="text-4xl">⚡️</span>
        </TabsTrigger>
        <TabsTrigger value="build">
          <span className="text-4xl">🔨</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
