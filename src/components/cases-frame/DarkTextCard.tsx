type Props = {
  text: string;
};

export default function DarkTextCard({ text }: Props) {
  return (
    <div className="darktextcard_component aspect-video w-full bg-[#0c0c0c] overflow-hidden flex items-center max-[992px]:aspect-auto max-[992px]:py-10">
      <p className="darktextcard_text text-white text-base leading-normal whitespace-pre-line pl-[6.5%] pr-[20%] max-[992px]:px-6">
        {text}
      </p>
    </div>
  );
}
