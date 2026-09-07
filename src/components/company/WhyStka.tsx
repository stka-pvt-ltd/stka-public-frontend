import { ArrowRight } from "lucide-react";

export function WhyStka() {
  const items = [
    "Quality First",
    "Reliable Manufacturing",
    "Scientific Approach",
    "Regulatory Focus",
    "Consistent Standards",
    "Long-Term Partnerships",
  ];

  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="eyebrow">Why STKA / 06</p>
          <h2 className="display-title mt-4 text-4xl text-primary sm:text-5xl">A deliberate way forward.</h2>
        </div>
        <div className="grid border-t border-primary/20 sm:grid-cols-2">
          {items.map((item, index) => (
            <div
              key={item}
              className="group flex items-center justify-between border-b border-primary/20 py-5 pr-3 transition-colors hover:bg-background"
            >
              <div className="flex items-center gap-5">
                <span className="font-display text-sm text-pharma">0{index + 1}</span>
                <span className="font-display text-xl text-primary">{item}</span>
              </div>
              <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-pharma" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
