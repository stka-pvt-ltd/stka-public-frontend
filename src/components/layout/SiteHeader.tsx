import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navItems } from "./nav-items";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3 sm:px-6">
      {/* Floating navbar pill */}
      <div
        className={`w-full max-w-6xl rounded-xl border border-[#DDE5DF] bg-white/95 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "shadow-[0_4px_24px_rgba(41,53,47,0.10)]" : "shadow-[0_2px_12px_rgba(41,53,47,0.06)]"
        }`}
      >
        <div className="flex h-[3.8rem] items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary navigation">
            <Link
              to="/"
              activeProps={{ className: "text-[#29352F]" }}
              className="text-[0.67rem] font-semibold uppercase tracking-[0.16em] text-[#5a6b62] transition-colors hover:text-[#29352F]"
            >
              Home
            </Link>
            {navItems.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                activeProps={{ className: "text-[#29352F]" }}
                className="text-[0.67rem] font-semibold uppercase tracking-[0.16em] text-[#5a6b62] transition-colors hover:text-[#29352F]"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden items-center gap-2 rounded-lg bg-[#5F9472] px-4 py-2.5 text-[0.67rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#4e7d5f] sm:inline-flex"
            >
              Send an Enquiry <ArrowRight className="size-3.5" />
            </Link>
            <button
              type="button"
              className="grid size-9 place-items-center rounded-lg border border-[#DDE5DF] text-[#29352F] hover:bg-[#F5F7F5] lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close navigation" : "Open navigation"}
              aria-expanded={open}
            >
              {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu — stays inside the floating pill */}
        {open && (
          <nav
            className="border-t border-[#E8ECE9] px-4 py-4 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="grid gap-1">
              {[["Home", "/"], ...navItems].map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  className="rounded-lg border-b border-[#E8ECE9] py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#5a6b62] last:border-b-0 hover:text-[#29352F]"
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-3 inline-flex items-center justify-between rounded-lg bg-[#5F9472] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white"
              >
                Send an Enquiry <ArrowRight className="size-4" />
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
