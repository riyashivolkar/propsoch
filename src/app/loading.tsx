"use client";

export default function Loader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />

        {/* Text */}
        <span className="text-sm font-medium text-orange-500">{label}</span>
      </div>
    </div>
  );
}
