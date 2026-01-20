"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/helpers";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isMapPage = pathname === "/";
  const ctaHref = isMapPage ? "/listings" : "/";
  const ctaText = isMapPage
    ? "View all properties in list view"
    : "Show listings on interactive map";
  return (
    <>
      {/*  Top Announcement Bar */}
      <div className="w-full sticky top-0 z-50 bg-orange-500 py-2 text-center text-sm font-medium text-white">
        {ctaText}{" "}
        <Link
          href={ctaHref}
          className="underline underline-offset-2 hover:text-orange-100"
        >
          click here
        </Link>
      </div>

      {/*  Main Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="data:image/jpeg;base64,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"
              alt="Propsoch logo"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
            <span className="text-lg font-bold tracking-tight">
              <span className="text-orange-500">Prop</span>
              <span className="text-gray-900">soch</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-orange-500"
            >
              Buy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-orange-500"
            >
              Projects
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-orange-500"
            >
              Insights
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-700 hover:text-orange-500"
            >
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              className={cn(
                "hidden rounded-md border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500",
                "hover:bg-orange-50 md:inline-flex",
              )}
            >
              Talk to Expert
            </button>

            <button
              className={cn(
                "rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white",
                "hover:bg-orange-600",
              )}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
