type ArticleProps = {
  className?: string;
};

// Inherits the text color, so the card and the modal header can tint it.
export default function Article({ className }: ArticleProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M12 16h40"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect x="7" y="25" width="50" height="36" rx="5" fill="currentColor" />
    </svg>
  );
}
