import Image from "next/image";

export type Emotion =
  | "happy"
  | "thinking"
  | "neutral"
  | "curious"
  | "surprised"
  | "talking";

export type BaseBot = "brainstorm-bot" | "decompose-bot" | "build-bot";

type AiAgentProps = {
  bot: BaseBot;
  emotion: Emotion;
  width?: number;
  height?: number;
};

export const AiAgent = ({ bot, emotion, width, height }: AiAgentProps) => {
  return (
    <div className={`relative w-[${width}px] h-[${height}px]`}>
      <div className="absolute">
        <Image
          src={`/images/ai-agent/${bot}.png`}
          alt="AI Agent"
          width={width}
          height={height}
        />
      </div>
      <div className="absolute">
        <Image
          src={`/images/face/${emotion}.png`}
          alt="Face"
          width={width}
          height={height}
        />
      </div>
    </div>
  );
};
