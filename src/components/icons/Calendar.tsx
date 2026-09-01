type CalendarProps = {
  className?: string;
  color?: string;
};

export default function Calendar({
  className,
  color = "#0c0c0c",
}: CalendarProps) {
  return (
    <svg
      width="37"
      height="37"
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12.3372 17.9801C12.3372 15.4597 12.3372 14.1995 13.1202 13.4164C13.9032 12.6334 15.1634 12.6334 17.6839 12.6334H20.3572C22.8776 12.6334 24.1379 12.6334 24.9209 13.4164C25.7039 14.1995 25.7039 15.4597 25.7039 17.9801V19.3168C25.7039 21.8372 25.7039 23.0975 24.9209 23.8805C24.1379 24.6635 22.8776 24.6635 20.3572 24.6635H17.6839C15.1634 24.6635 13.9032 24.6635 13.1202 23.8805C12.3372 23.0975 12.3372 21.8372 12.3372 19.3168V17.9801Z"
        stroke={color}
        strokeWidth="1.3337"
      />
      <path
        d="M15.6779 12.6335V11.631"
        stroke={color}
        strokeWidth="1.3337"
        strokeLinecap="round"
      />
      <path
        d="M22.3621 12.6335V11.631"
        stroke={color}
        strokeWidth="1.3337"
        strokeLinecap="round"
      />
      <path
        d="M12.6706 15.9751H25.369"
        stroke={color}
        strokeWidth="1.3337"
        strokeLinecap="round"
      />
    </svg>
  );
}
