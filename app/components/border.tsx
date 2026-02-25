export default function Border() {
  return (
    <div className="w-full relative left-1/2 -translate-x-1/2 flex flex-col gap-[2px]">
      <div className="border-t border-(--border) w-full" />
      <div className="border-t border-(--border) w-full" />
    </div>
  );
}
