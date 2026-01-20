import type { Metadata } from "next";
import DiscoveryMap from "@/components/discovery-map";
import { PropertyListing } from "@/data/property-listing";

//TODO : Add meta data for this page
// Page should serve via SSR
// Do not add "use client" declarative

// TODO: Create a List view for these properties.
// Use your own imagination while designing, please don't copy Propsoch's current UI.
// We don't like it either.
// Add pagination
// You can modify the Property Listing however you want. If you feel like creating an API and implementing pagination via that, totally your call.

export const metadata: Metadata = {
  title: "Property Discovery Map | Bengaluru Real Estate",
  description:
    "Explore premium residential properties in Bengaluru using our interactive map. Compare prices, locations, configurations, and possession timelines.",
  keywords: [
    "Bengaluru properties",
    "real estate map",
    "apartments in Bengaluru",
    "property prices Bengaluru",
    "real estate discovery",
  ],
  openGraph: {
    title: "Property Discovery Map | Bengaluru Real Estate",
    description:
      "Discover residential projects in Bengaluru with an interactive map-based experience.",
    type: "website",
  },
};
export default async function Page() {
  await new Promise((r) => setTimeout(r, 1500));
  return (
    <div className="w-screen h-screen">
      <DiscoveryMap allFilteredData={PropertyListing} />
    </div>
  );
}
