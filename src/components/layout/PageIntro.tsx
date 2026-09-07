export function PageIntro({
  eyebrow,
  title,
  description,
  dark = false,
  align = "split",
}: {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
  align?: "split" | "left";
}) {
  return (
    <section
      className={`${
        dark ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
      } border-b border-border/70 pt-36 pb-20`}
    >
      <div className="container-wide">
        {align === "left" ? (
          <div className="max-w-3xl">
            <p className={dark ? "eyebrow text-pharma-soft" : "eyebrow"}>{eyebrow}</p>
            <h1 className="display-title mt-5 text-4xl sm:text-5xl lg:text-6xl leading-tight">{title}</h1>
            <p
              className={`mt-6 max-w-2xl text-base sm:text-lg leading-relaxed ${
                dark ? "text-primary-foreground/75" : "text-muted-foreground"
              }`}
            >
              {description}
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className={dark ? "eyebrow text-pharma-soft" : "eyebrow"}>{eyebrow}</p>
              <h1 className="display-title mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
            </div>
            <p
              className={`max-w-md text-base leading-relaxed ${
                dark ? "text-primary-foreground/65" : "text-muted-foreground"
              }`}
            >
              {description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
