import {type ReactNode} from "react";
import {type LucideIcon} from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
  action?: ReactNode;
}

export default function EmptyState({icon: Icon, title, description, action}: EmptyStateProps) {
  return (
    <div className="col-span-full flex w-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-24 text-center">
      <Icon className="mb-4 h-10 w-10 text-slate-400" />
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      <div className="max-w-sm text-sm text-slate-500">{description}</div>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
