"use client";

import dynamic from "next/dynamic";

const DiscoveryMap = dynamic(() => import("./discovery-map.client"), {
  ssr: false,
});

export default DiscoveryMap;
