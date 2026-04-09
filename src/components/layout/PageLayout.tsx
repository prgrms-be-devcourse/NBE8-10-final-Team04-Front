import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function PageLayout({ children, className, title, description }: PageLayoutProps) {
  return (
    <div className={cn("flex min-h-screen w-full flex-col bg-white", className)}>
      {/* 타이틀 및 설명 영역 복구 */}
      {(title || description) && (
        <div className="mx-auto w-full max-w-[1280px] px-4 pt-10 pb-6 md:px-6">
          {title && <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{title}</h1>}
          {description && <p className="mt-2 text-sm text-slate-500 md:text-base">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

interface PageInnerProps {
  children: ReactNode;
  className?: string;
}

export function PageInner({ children, className }: PageInnerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-4 md:px-6", className)}>
      {children}
    </div>
  );
}