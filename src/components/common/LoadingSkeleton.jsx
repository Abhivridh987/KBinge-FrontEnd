const LoadingSkeleton = ({ type = 'card' }) => {
  if (type === 'banner') {
    return (
      <div className="w-full h-[70vh] md:h-[85vh] bg-bg-secondary animate-pulse mb-12">
        <div className="flex flex-col justify-center h-full px-4 md:px-12 lg:px-24 max-w-2xl">
          <div className="h-6 w-32 bg-white/10 rounded mb-4"></div>
          <div className="h-16 w-3/4 bg-white/10 rounded mb-6"></div>
          <div className="h-24 w-full bg-white/10 rounded mb-8"></div>
          <div className="flex gap-4">
            <div className="h-12 w-40 bg-white/10 rounded-luxury"></div>
            <div className="h-12 w-40 bg-white/10 rounded-luxury"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="luxury-card w-full h-[300px] md:h-[400px] animate-pulse flex flex-col justify-end p-4">
      <div className="h-6 w-3/4 bg-white/10 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-white/10 rounded mb-4"></div>
      <div className="flex gap-2">
        <div className="h-10 w-full bg-white/10 rounded-full"></div>
        <div className="h-10 w-10 shrink-0 bg-white/10 rounded-full"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
