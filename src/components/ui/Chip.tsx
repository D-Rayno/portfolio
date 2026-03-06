export default function Chip({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-semibold rounded-full border border-neutral-200 uppercase tracking-wider">
      {label}
    </span>
  );
}
