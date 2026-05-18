import { motion } from 'framer-motion';

const Skeleton = ({ className }) => (
  <div className={`bg-slate-200 animate-pulse rounded ${className}`} />
);

export const MaterialCardSkeleton = () => (
  <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
    <Skeleton className="h-48 w-full rounded-2xl mb-6" />
    <Skeleton className="h-6 w-3/4 mb-4" />
    <Skeleton className="h-4 w-1/2 mb-6" />
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-24 rounded-full" />
      <Skeleton className="h-8 w-8 rounded-full" />
    </div>
  </div>
);

export const LeaderboardRowSkeleton = () => (
  <div className="flex items-center gap-4 p-4 mb-3">
    <Skeleton className="h-6 w-6" />
    <Skeleton className="h-12 w-12 rounded-full" />
    <div className="flex-1">
      <Skeleton className="h-4 w-32 mb-2" />
      <Skeleton className="h-3 w-16" />
    </div>
    <Skeleton className="h-6 w-16" />
  </div>
);

export const StatCardSkeleton = () => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
    <Skeleton className="h-8 w-8 mb-4 border-2 border-slate-100" />
    <Skeleton className="h-4 w-24 mb-2" />
    <Skeleton className="h-8 w-16" />
  </div>
);
