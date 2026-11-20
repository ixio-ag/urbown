import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./icons";

/** Button-Varianten (UB02 8.1). Auch für Links nutzbar: buttonVariants({ … }). */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 border font-semibold whitespace-nowrap no-underline select-none",
    "transition-[background-color,translate,text-decoration-thickness] duration-150 ease-out",
    "active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40 disabled:active:translate-y-0",
    "aria-disabled:cursor-not-allowed aria-disabled:opacity-40",
  ],
  {
    variants: {
      variant: {
        primary: "border-ink bg-ink text-white hover:bg-ink-hover",
        secondary: "border-ink bg-white text-ink hover:bg-muted",
        link: "border-transparent bg-transparent px-1.5 font-medium text-ink underline underline-offset-[3px] hover:decoration-2 active:translate-y-0",
        inverse: "border-transparent bg-transparent px-1.5 font-medium text-white underline underline-offset-[3px] hover:decoration-2 active:translate-y-0",
      },
      size: {
        md: "min-h-11 px-4 text-ui rounded-md",
        sm: "hit min-h-9 px-3 text-sm rounded-md",
        lg: "min-h-12 px-5 text-base rounded-sm",
      },
      /** Landing: Anheben um 1 px bei Hover (entfällt bei reduzierter Bewegung, UB02 3.7). */
      lift: { true: "motion-safe:hover:-translate-y-px", false: "" },
      block: { true: "w-full", false: "" },
    },
    compoundVariants: [
      { variant: ["link", "inverse"], className: "px-1.5" },
    ],
    defaultVariants: { variant: "primary", size: "md", lift: false, block: false },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}

type ButtonProps = ComponentProps<"button"> &
  ButtonVariantProps & {
    icon?: IconName;
    /** Laden: Text bleibt sichtbar (loadingText), Spinner, aria-busy, deaktiviert (UB02 8.1). */
    loading?: boolean;
    loadingText?: ReactNode;
  };

export function Button({
  variant,
  size,
  lift,
  block,
  icon,
  loading = false,
  loadingText,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, lift, block }), className)}
      {...props}
    >
      {loading ? <Spinner /> : icon ? <Icon name={icon} size={18} /> : null}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> &
  ButtonVariantProps & { icon?: IconName; className?: string };

/** Link im Aussehen eines Buttons (z. B. «Demo anfragen»). */
export function ButtonLink({ variant, size, lift, block, icon, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={cn(buttonVariants({ variant, size, lift, block }), className)} {...props}>
      {icon ? <Icon name={icon} size={18} /> : null}
      {children}
    </Link>
  );
}

type IconButtonProps = Omit<ComponentProps<"button">, "children"> & {
  icon: IconName;
  /** Pflicht: zugänglicher Name (UB02 8.1). */
  label: string;
  inverse?: boolean;
};

/** Icon-Button 44 × 44 px mit Pflicht-Beschriftung (aria-label). */
export function IconButton({ icon, label, inverse = false, className, type = "button", ...props }: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-grid size-11 shrink-0 place-items-center rounded-md transition-colors duration-150",
        "disabled:cursor-not-allowed disabled:opacity-40",
        inverse ? "text-white hover:bg-ink-hover" : "bg-white text-ink hover:bg-muted",
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={20} />
    </button>
  );
}
