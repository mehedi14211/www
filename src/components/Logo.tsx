import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
    xl: "h-20",
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`} id="mhf-logo-wrapper">
      <img 
        src="/logo.png" 
        alt="mhf logo" 
        className={`${sizeClasses[size]} w-auto object-contain mhf-logo-img`}
        id="mhf-logo-img"
      />
    </div>
  );
}
