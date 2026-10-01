"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface PremiumButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold";
  showArrow?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export default function PremiumButton({
  href,
  children,
  variant = "primary",
  showArrow = true,
  className = "",
  onClick,
}: PremiumButtonProps) {
  const getStyles = () => {
    switch (variant) {
      case "gold":
        return "bg-[#C99732] hover:bg-[#E2B64A] text-[#0B1B33] font-bold shadow-md hover:shadow-xl";
      case "secondary":
        return "bg-white hover:bg-slate-50 text-[#0B1B33] border border-[#0B1B33]/20 hover:border-[#C99732] shadow-sm";
      case "primary":
      default:
        return "bg-[#0B1B33] hover:bg-[#102A4A] text-white font-bold shadow-md hover:shadow-xl";
    }
  };

  return (
    <a
      href={href}
      onClick={onClick}
      className={`group inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${getStyles()} ${className}`}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 text-inherit transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  );
}
