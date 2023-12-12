import { AiAgent, BaseBot, Emotion } from "./ai-agent";

type Props = {
  text: string;
  bot?: BaseBot;
  emotion?: Emotion;
  className?: string;
};

export const TextBubble = ({ text, bot, emotion, className }: Props) => {
  return (
    <div
      className={`flex flex-row space-x-10 items-start justify-between ${className}`}
    >
      {bot && emotion && (
        <AiAgent bot={bot} emotion={emotion} width={200} height={200} />
      )}
      <div className="rounded-xl border p-5">
        <p className="text-lg">{text}</p>
      </div>
    </div>
  );
};
