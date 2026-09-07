import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="bg-[#29352F] py-24 text-[#F5F7F5] sm:py-32">
      <div className="container-wide grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="eyebrow text-[#C8DACD]">Partnerships / 07</p>
          <h2 className="display-title mt-5 max-w-2xl text-5xl text-[#F5F7F5] sm:text-6xl">
            Let's Build Better Healthcare Together
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[#F5F7F5]/65">
            Connect with STKA for product enquiries, partnerships, and business opportunities.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-[#5F9472] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-[#4e7d5f]"
          >
            Send an Enquiry <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 border border-[#F5F7F5]/25 px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-[#F5F7F5] hover:border-[#C8DACD] hover:text-[#C8DACD]"
          >
            Contact Us <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
