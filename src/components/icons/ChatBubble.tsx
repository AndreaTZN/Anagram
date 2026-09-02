type ChatBubbleProps = {
  className?: string;
  color?: string;
  ref?: React.Ref<SVGSVGElement>;
};

export default function ChatBubble({
  className,
  color = "#7c7c7c",
  ref,
}: ChatBubbleProps) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3.25 2.5h7.5c.97 0 1.75.78 1.75 1.75v4c0 .97-.78 1.75-1.75 1.75H6.2l-2.7 2V10h-.25A1.75 1.75 0 0 1 1.5 8.25v-4c0-.97.78-1.75 1.75-1.75Z"
        stroke={color}
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
