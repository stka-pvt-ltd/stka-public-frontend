import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import laboratoryImage from "@/assets/stka-laboratory.jpg";

export function QualitySection() {
  return (
    <section className="relative overflow-hidden bg-[#E8ECE9] py-24 text-[#29352F] sm:py-32">
      <div className="absolute inset-0 soft-grid opacity-10" />
      <div className="container-wide relative grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="eyebrow text-[#5F9472]">Quality &amp; Compliance / 04</p>
          <h2 className="display-title mt-5 max-w-xl text-4xl text-[#29352F] sm:text-5xl">
            Quality Is at the Core of Everything We Do
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#5a6b62]">
            Our public quality story is structured around assurance, control, consistent manufacturing standards,
            regulatory focus, product safety, and continuous improvement.
          </p>
          <div className="mt-8 grid max-w-xl grid-cols-2 border-l border-[#C8DACD]">
            {["Quality Assurance", "Quality Control", "Regulatory Compliance", "Continuous Improvement"].map(
              (item) => (
                <div
                  key={item}
                  className="border-b border-r border-[#C8DACD] px-4 py-4 text-sm text-[#29352F]"
                >
                  {item}
                </div>
              )
            )}
          </div>
          <Link
            to="/quality"
            className="mt-8 inline-flex items-center gap-3 bg-[#5F9472] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#4e7d5f]"
          >
            Explore Quality <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="relative">
          {/* Asymmetric left-shifted sharp image frame on mobile */}
          <div className="w-[92%] ml-0 mr-auto border border-[#C8DACD] bg-[#F5F7F5] p-2 sm:w-full sm:p-3">
            <div className="image-frame aspect-[1.2/1] overflow-hidden border border-[#C8DACD]/60">
              <img
                src={laboratoryImage}
                alt="Pharmaceutical laboratory instruments and quality-control environment"
                loading="lazy"
                className="image-zoom h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#29352F]/05" />
            </div>
          </div>
          {/* Asymmetric right-shifted sharp editorial badge */}
          <div className="relative mt-4 ml-auto w-[82%] border border-[#DDE5DF] bg-white p-4 sm:absolute sm:-bottom-7 sm:-left-6 sm:mt-0 sm:w-auto sm:p-5">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.17em] text-[#5F9472]">
              Certification library
            </p>
            <p className="mt-1.5 max-w-[14rem] font-display text-lg text-[#29352F] sm:text-xl">Records will appear when connected.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
