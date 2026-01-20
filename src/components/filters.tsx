"use client";

type FiltersProps = {
  search: string;
  onSearchChange: (value: string) => void;
};
export default function Filters({ search, onSearchChange }: FiltersProps) {
  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <FiltersContent search={search} onSearchChange={onSearchChange} />{" "}
      </div>

      <div className="rounded-xl bg-slate-900 p-6 text-white">
        <h4 className="mb-2 text-lg font-bold">Need Help?</h4>
        <p className="mb-4 text-xs text-slate-300">
          Let our AI match you with the perfect home.
        </p>
        <button className="w-full rounded-lg bg-orange-500 py-2.5 text-sm font-bold">
          Help Me Decide
        </button>
      </div>
    </aside>
  );
}

export function MobileFilters({
  open,
  onClose,
  search,
  onSearchChange,
}: {
  open: boolean;
  onClose: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white p-6
        transform transition-transform duration-300 ease-out
        ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold">Filters</h3>
          <button onClick={onClose} className="text-sm text-slate-500">
            Close
          </button>
        </div>
        <FiltersContent search={search} onSearchChange={onSearchChange} />{" "}
      </div>
    </div>
  );
}

function FiltersContent({ search, onSearchChange }: FiltersProps) {
  return (
    <>
      {/* Rent / Sale Toggle */}
      <div className="mb-6 flex border-b border-slate-100">
        <button className="flex-1 border-b-2 border-orange-500 pb-3 text-sm font-semibold text-orange-500">
          For Sale
        </button>
        <button className="flex-1 pb-3 text-sm font-semibold text-slate-400">
          For Rent{" "}
        </button>
      </div>

      <div className="space-y-6">
        {/* Keyword */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Search by keyword
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="e.g. Oakridge, Rajaji Nagar"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Property Type */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Property Type
          </label>
          <div className="flex flex-wrap gap-2">
            {["Apartment", "House"].map((type) => (
              <span
                key={type}
                className="inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-100 px-2 py-1 text-xs"
              >
                {type}
                <span className="cursor-pointer text-[10px]">✕</span>
              </span>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block text-sm font-semibold">Location</label>
          <input
            type="text"
            defaultValue="Bronx"
            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus:border-orange-500 focus:ring-orange-500"
          />
        </div>

        {/* Price */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold">Price Range</label>
            <span className="text-xs text-slate-500">$0 – $150k</span>
          </div>
          <input type="range" className="w-full accent-orange-500" />
        </div>

        {/* Size */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-semibold">Size (sq ft)</label>
            <span className="text-xs text-slate-500">0 – 1000</span>
          </div>
          <input type="range" className="w-full accent-orange-500" />
        </div>

        {/* Features */}
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Advanced Features
          </label>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {["Balcony", "Gym", "Parking", "Pool", "Garden", "Wi-Fi"].map(
              (item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                  />
                  {item}
                </label>
              ),
            )}
          </div>
        </div>

        {/* Apply */}
        <button className="w-full rounded-lg bg-orange-500 py-3 font-bold text-white">
          Apply Filters
        </button>
      </div>
    </>
  );
}
