'use client'

export function ProgramCardSkeleton () {
  return(
    <div className="flex cursor-pointer flex-row gap-1 rounded-md p-2 text-left hover:bg-gray-200 transition-colors duration-300 border border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-800 items-center max-w-[270px] sm:max-w-sm">
  <div className="shrink-0 size-8 bg-gray-300 rounded-full"></div>
  <div className="flex flex-col text-xs grow space-y-1">
    <span className="bg-gray-300 h-4 w-24 rounded"></span>
    <span className="bg-gray-300 h-4 w-40 rounded"></span>
  </div>
  <div className="ml-auto bg-gray-300 hover:bg-gray-400 p-1 rounded-full transition-colors duration-300 flex items-center justify-center size-8">
    <div className="text-sm text-transparent">+</div>
  </div>
</div>
  )


}








