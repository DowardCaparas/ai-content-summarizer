const SideNavSkeleton = () => {
  return (
    <div className="space-y-2 animate-pulse">
        <p className="text-gray-600">No summaries yet.</p>
      <div className="w-20 h-6 bg-gray-300 rounded-lg"></div>
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="flex justify-between items-center gap-1 mt-4">
          <div className="p-4 rounded-md w-full bg-gray-300 h-6"></div>
          <div className="w-6 h-6 p-4 bg-gray-300 rounded-md"></div>
        </div>
      ))}
    </div>
  )
}

export default SideNavSkeleton