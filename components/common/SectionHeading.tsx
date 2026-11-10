interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={[
        "max-w-2xl",
        isCenter ? "mx-auto text-center" : "",
        className,
      ].join(" ")}
    >
      {eyebrow && <p className="eyebrow-pill mb-4">{eyebrow}</p>}
      <h2 className="heading-section text-text">{title}</h2>
      {subtitle && <p className="body-lead mt-4">{subtitle}</p>}
    </div>
  );
}
