import {Skeleton} from "@/components/ui/skeleton";

export default function PageSkeleton() {
  return (
    <div className="container p-8 space-y-4">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-[200px] w-full" />
      <Skeleton className="h-[200px] w-full" />
    </div>
  );
}
