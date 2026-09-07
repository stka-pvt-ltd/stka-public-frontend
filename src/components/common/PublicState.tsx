import { Link } from "@tanstack/react-router";
import { RefreshCw, type LucideIcon } from "lucide-react";

export interface PublicStateAction {
  label: string;
  onClick?: () => void;
  to?: string;
  icon?: LucideIcon;
}

export interface PublicStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: PublicStateAction;
  secondaryAction?: PublicStateAction;
  compact?: boolean;
  className?: string;
  dark?: boolean;
}

export function PublicEmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  compact = false,
  className = "",
  dark = false,
}: PublicStateProps) {
  return (
    <div
      className={`rounded-none border ${
        dark
          ? "bg-primary/95 text-primary-foreground border-primary-foreground/20"
          : "bg-card text-card-foreground border-border/70"
      } ${compact ? "p-6 sm:p-8" : "p-8 sm:p-12"} text-center max-w-xl mx-auto my-4 shadow-sm transition-all ${className}`}
    >
      {Icon && (
        <div
          className={`mx-auto mb-4 grid size-11 place-items-center border ${
            dark
              ? "border-primary-foreground/20 bg-primary-foreground/10 text-pharma-soft"
              : "border-pharma/30 bg-pharma-soft/30 text-pharma"
          }`}
        >
          <Icon className="size-5" />
        </div>
      )}
      <h3 className={`font-display text-xl sm:text-2xl tracking-tight ${dark ? "text-primary-foreground" : "text-primary"}`}>
        {title}
      </h3>
      <p className={`mt-2 text-xs sm:text-sm leading-relaxed max-w-md mx-auto ${dark ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
        {description}
      </p>

      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {action && (
            action.to ? (
              <Link
                to={action.to}
                className={`inline-flex items-center gap-2 border ${
                  dark
                    ? "bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90"
                    : "bg-card text-primary border-input hover:bg-accent"
                } px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors`}
              >
                {action.icon && <action.icon className="size-3.5" />}
                {action.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={action.onClick}
                className={`inline-flex items-center gap-2 border ${
                  dark
                    ? "bg-primary-foreground text-primary border-primary-foreground hover:bg-primary-foreground/90"
                    : "bg-card text-primary border-input hover:bg-accent"
                } px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors`}
              >
                {action.icon && <action.icon className="size-3.5" />}
                {action.label}
              </button>
            )
          )}

          {secondaryAction && (
            secondaryAction.to ? (
              <Link
                to={secondaryAction.to}
                className={`inline-flex items-center gap-2 border border-border bg-transparent px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                  dark ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {secondaryAction.icon && <secondaryAction.icon className="size-3.5" />}
                {secondaryAction.label}
              </Link>
            ) : (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className={`inline-flex items-center gap-2 border border-border bg-transparent px-4 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${
                  dark ? "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10" : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {secondaryAction.icon && <secondaryAction.icon className="size-3.5" />}
                {secondaryAction.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

export function PublicErrorState({
  title = "Information temporarily unavailable",
  description = "We're unable to display this information right now. Please check back shortly.",
  onRetry,
  compact = false,
  className = "",
  dark = false,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  compact?: boolean;
  className?: string;
  dark?: boolean;
}) {
  return (
    <PublicEmptyState
      title={title}
      description={description}
      dark={dark}
      compact={compact}
      className={className}
      action={
        onRetry
          ? {
              label: "Try Again",
              onClick: onRetry,
              icon: RefreshCw,
            }
          : undefined
      }
    />
  );
}
