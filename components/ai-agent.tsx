import Image from "next/image";

export type Emotion =
  | "happy"
  | "thinking"
  | "neutral"
  | "curious"
  | "surprised"
  | "talking";

export type BaseBot = "brainstorm" | "decompose" | "build";

type AiAgentProps = {
  bot: BaseBot;
  emotion: Emotion;
  width?: number;
  height?: number;
  className?: string;
};

export const AiAgent = ({
  bot,
  className,
  emotion,
  width,
  height,
}: AiAgentProps) => {
  return (
    <div
      className={`${className} relative w-[${width}px] h-[${height}px] bg-brainstorm-base rounded-3xl border border-brainstorm-border border-8 brainstorm-shadow`}
    >
      <Image
        src={`/images/face/${emotion}.png`}
        alt="Face"
        width={width}
        height={height}
      />
    </div>
  );
};
