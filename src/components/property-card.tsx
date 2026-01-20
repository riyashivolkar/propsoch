import {
  Heart,
  MapPin,
  Ruler,
  BedDouble,
  Bath,
  ExternalLink,
} from "lucide-react";
import {
  formatPriceRange,
  formatAreaRange,
  deriveBathsFromTypologies,
} from "../utils/helpers";

type PropertyCardProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any;
};

export default function PropertyCard({ project }: PropertyCardProps) {
  const {
    name,
    image,
    alt,
    minPrice,
    maxPrice,
    minSaleableArea,
    maxSaleableArea,
    typologies,
    micromarket,
    city,
    isWishlisted,
  } = project;

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-xl">
      {/* IMAGE */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={image}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* STATUS */}
        <span className="absolute left-4 top-4 rounded-md bg-orange-500 px-3 py-1 text-xs font-bold text-white">
          FOR SALE
        </span>

        {/* WISHLIST */}
        <button className="absolute right-4 top-4 rounded-full bg-white/30 p-2 backdrop-blur hover:bg-white">
          <Heart
            className={`h-4 w-4 ${
              isWishlisted ? "fill-orange-500 text-orange-500" : "text-white"
            }`}
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        {/* TITLE + PRICE */}
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-500">
            {name}
          </h3>
          <span className="whitespace-nowrap text-lg font-bold text-orange-600">
            {formatPriceRange(minPrice, maxPrice)}
          </span>
        </div>

        {/* LOCATION */}
        <p className="mb-5 flex items-center gap-1 text-sm text-slate-500">
          <MapPin className="h-4 w-4" />
          {micromarket}, {city}
        </p>

        {/* FEATURES */}
        <div className="grid grid-cols-3 gap-4 border-t border-slate-100 pt-4 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Ruler className="h-4 w-4 text-slate-400" />
            {formatAreaRange(minSaleableArea, maxSaleableArea)}
          </div>

          <div className="flex items-center gap-2">
            <BedDouble className="h-4 w-4 text-slate-400" />
            {typologies.join(" · ")}
          </div>

          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-slate-400" />
            {deriveBathsFromTypologies(typologies)} Baths
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/40"
              alt="Developer"
              className="h-8 w-8 rounded-full"
            />
            <div>
              <p className="text-xs font-bold text-slate-800">
                {"Verified Developer"}
              </p>
              <p className="text-[10px] text-slate-500">Updated recently</p>
            </div>
          </div>

          <button className="rounded-lg bg-slate-100 p-2 text-slate-600 transition hover:bg-orange-500 hover:text-white">
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
