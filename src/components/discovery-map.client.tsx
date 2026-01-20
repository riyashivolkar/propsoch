"use client";

// TODO:  When zooming out, property nodes overlap and become cluttered.
// Improve visual spacing for a better UI/UX.

import "leaflet/dist/leaflet.css";

// TODO : This import gives "window is not defined" error in the terminal. Fix it.
import "leaflet-defaulticon-compatibility";

// TODO : Clicking a marker should ideally open the popup with the selected property details. Currently not implemented. Implement it.

import { JSX, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { PropscoreRating } from "@/assets/PropsochRating";
import {
  cn,
  concatenateTypologies,
  formatDate,
  formatPrice,
  para,
} from "@/utils/helpers";
import { BudgetIcon } from "@/assets/budget-icon";
import { HouseIcon } from "@/assets/house-icon";
import { LocationIcon } from "@/assets/location-icon";
import { CalendarIcon } from "@/assets/utility";
import L from "leaflet";
import { LocationType, projectListing } from "@/types/types";
import { Badge } from "../assets/badge";
import { renderToString } from "react-dom/server";
import { getMarkerIcon } from "@/assets/landmark-icon";
import { ZoomTracker } from "@/assets/zoom-tracker";

//import dynamic from "next/dynamic";

interface Location {
  lat: number;
  lon: number;
  name: string;
}

export const renderIcon = (
  icon: JSX.Element,
  ariaLabel: string,
  transform = "translate(-8px, -4px)",
) =>
  `<div style="transform: ${transform}" aria-label="${ariaLabel}" role="button">${renderToString(
    icon,
  )}</div>`;

function getOtherLocationIcon(
  label: string,
  isSelected: boolean,
  icon = true,
): L.DivIcon {
  return L.divIcon({
    html: renderIcon(
      <Badge variant={"white"} className="w-max whitespace-nowrap">
        {label}
      </Badge>,
      label,
      isSelected ? "translate(-10px, -20px)" : "translate(-15px, -20px)",
    ),
  });
}

function MapClickHandler({ onClick }: { onClick: () => void }) {
  useMapEvents({
    click: () => onClick(),
  });
  return null;
}

function MapController({
  selectedLocation,
}: Readonly<{
  selectedLocation: Location | null;
}>) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.panTo([selectedLocation.lat, selectedLocation.lon], {
        animate: true,
        duration: 1.5,
      });
    }
  }, [selectedLocation, map]);

  return null;
}

export default function DiscoveryMap({
  allFilteredData,
}: Readonly<{ allFilteredData: any }>) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const sectionRef = useRef(null);
  const [selectedProperty, setSelectedProperty] =
    useState<projectListing | null>(null);
  const [zoom, setZoom] = useState<number>(12);

  useEffect(() => {
    if (selectedLocation) {
      const found = allFilteredData.projects.find(
        (prop: projectListing) => prop.name == selectedLocation.name,
      );
      setSelectedProperty(found);
      const el = document.querySelector(
        `[data-marker-id="${selectedLocation.name}"]`,
      ) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [selectedLocation]);

  return (
    <section
      ref={sectionRef}
      style={{ fontFamily: "Arial, sans-serif" }}
      className="flex aspect-auto h-full flex-col gap-4 overflow-hidden"
      aria-label={`Project discovery via map`}
    >
      {/* Map Container */}
      <div className="relative size-full overflow-hidden">
        <MapContainer
          center={[12.97, 77.59]}
          zoom={12}
          scrollWheelZoom={true}
          dragging={true}
          touchZoom={true}
          className="border-lightborder z-10 size-full  border object-cover"
          aria-label="Map view"
        >
          <ZoomTracker onZoomChange={setZoom} />
          <LayersControl position="bottomleft">
            {/* Street View */}
            <LayersControl.BaseLayer checked name="Street View">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>

            {/* Satellite View (Esri) */}
            <LayersControl.BaseLayer name="Satellite View">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
          </LayersControl>
          <MapClickHandler onClick={() => setSelectedLocation(null)} />
          <MapController selectedLocation={selectedLocation} />

          {/* Project Location Marker */}

          {allFilteredData && allFilteredData.projects.length > 0
            ? allFilteredData.projects.map((project: projectListing) => (
                <Marker
                  key={project.id}
                  position={[project.latitude, project.longitude]}
                  icon={getMarkerIcon({
                    label: project.name,
                    zoom,
                    selected: selectedProperty?.id === project.id,
                  })}
                  eventHandlers={{
                    click: () => {
                      setSelectedLocation({
                        lat: project.latitude,
                        lon: project.longitude,
                        name: project.name,
                      });
                      setSelectedProperty(project);
                    },
                  }}
                />
              ))
            : null}
          {selectedLocation && selectedProperty && (
            <Popup
              position={[selectedLocation.lat, selectedLocation.lon]}
              autoClose={false}
              closeOnClick={false}
              offset={[0, -18]}
              minWidth={280}
              maxWidth={360}
              className=" p-0"
            >
              <div className="overflow-hidden  rounded-xl ">
                {/* IMAGE */}
                <div className="relative">
                  <Image
                    src={selectedProperty.image}
                    alt={selectedProperty.alt}
                    width={400}
                    height={240}
                    className={cn(
                      "h-40 w-full object-cover sm:h-44",
                      selectedProperty.projectStatus === "soldOut" &&
                        "grayscale",
                    )}
                  />

                  {/* STATUS BADGE */}
                  <span className="absolute left-3 top-3 rounded-md bg-orange-500 px-2 py-1 text-xs font-semibold text-white">
                    {selectedProperty.projectStatus === "soldOut"
                      ? "Sold Out"
                      : "For Sale"}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col gap-3 p-4">
                  {/* TITLE + SCORE */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                      {selectedProperty.name}
                    </h3>
                    <PropscoreRating
                      rating={selectedProperty.propscore}
                      width={90}
                      height={22}
                    />
                  </div>

                  {/* LOCATION */}
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <LocationIcon width={16} height={16} />
                    <span className="truncate">
                      {selectedProperty.micromarket}, {selectedProperty.city}
                    </span>
                  </div>

                  {/* PRICE + POSSESSION */}
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-700">
                    <div className="flex items-center gap-2 font-medium">
                      <BudgetIcon width={16} height={16} />
                      <span>
                        {formatPrice(selectedProperty.minPrice, false)} –{" "}
                        {formatPrice(selectedProperty.maxPrice, false)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <CalendarIcon width={16} height={16} />
                      <span>{formatDate(selectedProperty.possessionDate)}</span>
                    </div>
                  </div>

                  {/* TYPOLOGY + AREA */}
                  <div className="flex items-center justify-between gap-3 text-xs text-slate-700">
                    <div className="flex items-center gap-2 truncate">
                      <HouseIcon width={16} height={16} />
                      <span className="truncate">
                        {concatenateTypologies(selectedProperty.typologies)}
                      </span>
                    </div>

                    <span className="whitespace-nowrap">
                      {selectedProperty.minSaleableArea} –{" "}
                      {selectedProperty.maxSaleableArea} sqft
                    </span>
                  </div>

                  {/* CTA */}
                  <button className="mt-2 rounded-lg bg-orange-500 py-2 text-center text-xs font-semibold text-white transition hover:bg-orange-600">
                    View Project Details
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </MapContainer>
      </div>
    </section>
  );
}
