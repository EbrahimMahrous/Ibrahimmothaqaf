export function BackgroundFX() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas"
    >
      {/* Full-page blueprint pattern */}
      <div className="absolute inset-0 bg-blueprint" />

      {/* Large green glow at the top */}
      <div className="absolute -top-40 inset-s-1/2 h-144 w-xl -translate-x-1/2 rounded-full bg-primary-tint blur-3xl" />

      {/* Soft orange glow at the bottom */}
      <div className="absolute bottom-[-15%] inset-e-[-10%] h-96 w-[24rem] rounded-full bg-accent-tint blur-3xl" />

      {/* Top/bottom fade to canvas — keeps the hero and footer from sticking */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-canvas to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-canvas to-transparent" />
    </div>
  );
}
