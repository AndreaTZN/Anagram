type Props = {
  text: string;
  title?: string;
};

export default function DarkTextCard({ text, title }: Props) {
  return (
    <div className="darktextcard_component aspect-video w-full bg-[#0c0c0c] overflow-hidden flex items-center max-[992px]:aspect-auto max-[992px]:py-10">
      <div className="flex flex-col gap-8 pl-[6.5%] pr-[20%] max-[992px]:px-6">
        {title && (
          <p className="darktextcard_title text-white text-[2rem] max-[992px]:text-[1.5rem] leading-[1.35]">
            {title}
          </p>
        )}
        <p className="darktextcard_text text-white text-xl max-[992px]:text-base leading-normal whitespace-pre-line">
          {text}
        </p>
      </div>
    </div>
  );
}
