"use client";
import Filters, { MobileFilters } from "@/components/filters";
import PropertyCard from "@/components/property-card";
import { PropertyListing } from "@/data/property-listing";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PAGE_SIZE = 12;

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export function Page() {
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = PropertyListing.projects.filter((project) => {
    const q = search.toLowerCase();

    return (
      project.name.toLowerCase().includes(q) ||
      project.micromarket.toLowerCase().includes(q) ||
      project.city.toLowerCase().includes(q)
    );
  });

  // const router = useRouter();

  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <main className="mx-auto  bg-white px-3 py-6 text-black sm:px-4 sm:py-8">
      {/* Breadcrumb */}
      {/* <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
        <span className="cursor-pointer hover:text-orange-500">Home</span>
        <span>/</span>
        <span className="font-medium text-slate-900">Property List</span>
      </nav> */}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* FILTERS */}
        <Filters
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
        />
        {/* LISTINGS */}
        <section className="lg:col-span-3">
          {/* Top bar */}
          <div className="mb-6 flex items-center justify-between gap-4 py-4">
            {/* Left: results text */}
            <span className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {startIndex + 1}–
                {Math.min(startIndex + PAGE_SIZE, totalProjects)}
              </span>{" "}
              of {totalProjects}
            </span>

            {/* Right: Filters button (mobile only) */}
            <button
              onClick={() => setFiltersOpen(true)}
              className="lg:hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-orange-500"
            >
              Filters
            </button>
          </div>

          <MobileFilters
            open={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {paginatedProjects.map((project) => (
              <PropertyCard key={project.id} project={project} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2">
            {currentPage > 1 && (
              <Link
                href={`?page=${currentPage - 1}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100"
              >
                ‹
              </Link>
            )}

            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <Link
                  key={page}
                  href={`?page=${page}`}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${
                    page === currentPage
                      ? "bg-orange-500 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {page}
                </Link>
              );
            })}

            {currentPage < totalPages && (
              <Link
                href={`?page=${currentPage + 1}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-slate-100"
              >
                ›
              </Link>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Page;
