'use client'
import { ProgramCardSkeleton } from "./program-card-skeleton";

export function ProgramCardsSkeleton({ count }: { count: number }) {
  return (
    <div className="mb-4 flex flex-col gap-2 overflow-y-scroll pb-3 text-sm sm:grid sm:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <ProgramCardSkeleton key={index} />
      ))}
    </div>
  )
}
