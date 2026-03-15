export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="skeleton h-6 w-48 mx-auto mb-6 rounded-full" />
        <div className="skeleton h-12 w-80 mx-auto mb-4" />
        <div className="skeleton h-5 w-96 mx-auto" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 mb-12">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="bg-theme-card border border-theme rounded-xl p-5">
            <div className="skeleton h-8 w-8 rounded mb-3" />
            <div className="skeleton h-3 w-16 mb-2" />
            <div className="skeleton h-7 w-24 mb-2" />
            <div className="skeleton h-2 w-20" />
          </div>
        ))}
      </div>
      <div className="bg-theme-card border border-theme rounded-xl p-6">
        <div className="skeleton h-5 w-64 mb-2" />
        <div className="skeleton h-3 w-48 mb-6" />
        <div className="skeleton h-72 w-full" />
      </div>
    </div>
  );
}
