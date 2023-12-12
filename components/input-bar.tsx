import { Input } from "./ui/input";

type Props = {
  onSubmit?: (text: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeHolder?: string;
};

export const InputBar = ({ onSubmit, onChange, value, placeHolder }: Props) => {
  return (
    <div className="flex items-center justify-center w-full h-16">
      <Input
        className="w-full"
        onChange={onChange}
        value={value}
        placeholder={placeHolder ?? "Type your message..."}
      />
    </div>
  );
};
