import ArrowWebGL, {
  type ArrowWebGLHandle,
} from "@/components/icons/ArrowWebGL";

interface BadgeProps {
  label: string;
  id?: string;
  arrow?: boolean;
  arrowRef?: React.Ref<ArrowWebGLHandle>;
}

export default function Badge({ label, id, arrow, arrowRef }: BadgeProps) {
  return (
    <div
      id={id}
      className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#0c0c0c]/20 backdrop-blur-[2.5rem] transition-colors duration-500 group-hover:bg-[#FFFFFF]/10"
    >
      <span className="text-sm leading-none text-white whitespace-nowrap">
        {label}
      </span>
      {arrow && (
        <ArrowWebGL ref={arrowRef} light className="block size-3.5 shrink-0" />
      )}
    </div>
  );
}
