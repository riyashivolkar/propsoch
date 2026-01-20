import L from "leaflet";
import { renderToString } from "react-dom/server";
import { Badge } from "./badge";

/* ----------------------------------
   Orange pin only (zoomed out)
----------------------------------- */
export function getPinOnlyIcon(): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `
      <div style="position: relative; width: 14px; height: 14px;">
        <div
          style="
            position: absolute;
            inset: 0;
            background: #f97316; /* orange-500 */
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          "
        ></div>
        <div
          style="
            position: absolute;
            top: 4px;
            left: 4px;
            width: 6px;
            height: 6px;
            background: white;
            border-radius: 50%;
          "
        ></div>
      </div>
    `,
    iconSize: [14, 14],
    iconAnchor: [7, 14], // tip of the pin
  });
}

export function getPinWithLabelIcon(
  label: string,
  isSelected: boolean,
): L.DivIcon {
  return L.divIcon({
    className: "",
    html: renderToString(
      <div
        className="flex items-center gap-2"
        style={{ transform: "translateY(-50%)" }}
      >
        {/* ORANGE LOCATION PIN */}
        <div
          style={{
            position: "relative",
            width: 14,
            height: 14,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#f97316", // orange-500
              borderRadius: "50% 50% 50% 0",
              transform: "rotate(-45deg)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 4,
              left: 4,
              width: 6,
              height: 6,
              background: "white",
              borderRadius: "50%",
            }}
          />
        </div>

        {/* LABEL */}
        <Badge
          variant="white"
          className={`whitespace-nowrap text-white shadow ${
            isSelected ? "font-semibold" : ""
          }`}
          style={{
            backgroundColor: "#f97316",
          }}
        >
          {label}
        </Badge>
      </div>,
    ),
    iconAnchor: [7, 14], // anchor stays at pin tip
  });
}

/* ----------------------------------
   Decide which icon to use
----------------------------------- */
export function getMarkerIcon({
  label,
  zoom,
  selected,
  labelZoomThreshold = 14,
}: {
  label: string;
  zoom: number;
  selected: boolean;
  labelZoomThreshold?: number;
}): L.DivIcon {
  const showLabel = zoom >= labelZoomThreshold || selected;

  return showLabel ? getPinWithLabelIcon(label, selected) : getPinOnlyIcon();
}
