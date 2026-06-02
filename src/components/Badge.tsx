type BadgePosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const positionClasses: Record<BadgePosition, string> = {
  "top-left": "top-5 left-5",
  "top-right": "top-5 right-5",
  "bottom-left": "bottom-5 left-5",
  "bottom-right": "bottom-5 right-5",
};

interface BadgeProps {
  label: string;
  position?: BadgePosition;
}

export default function Badge({ label, position = "top-left" }: BadgeProps) {
  return (
    <div
      className={`absolute ${positionClasses[position]} flex items-center justify-center px-4 py-3 rounded-full backdrop-blur-2xl bg-[rgba(12,12,12,0.2)]`}
    >
      <span className="text-white leading-[0.8] whitespace-nowrap text-sm">
        {label}
      </span>
    </div>
  );
}
