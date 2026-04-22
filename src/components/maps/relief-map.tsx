"use client";

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

import type { MapDataset } from "@/features/maps/map-types";
import { clientEnv } from "@/lib/config/env";

type ReliefMapProps = {
  dataset: MapDataset;
};

const mapStyles: google.maps.MapTypeStyle[] = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }]
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }]
  }
];

function getMapCenter(dataset: MapDataset) {
  const firstNeed = dataset.needs[0];

  if (firstNeed) {
    return firstNeed.location;
  }

  const firstVolunteer = dataset.volunteers[0];

  if (firstVolunteer) {
    return firstVolunteer.location;
  }

  return { lat: 28.6139, lng: 77.209 };
}

export function ReliefMap({ dataset }: ReliefMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function initMap() {
      if (!mapRef.current) {
        return;
      }

      try {
        setMapError(null);

        const loader = new Loader({
          apiKey: clientEnv.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "",
          version: "weekly"
        });

        const googleMaps = await loader.load();

        if (!active || !mapRef.current) {
          return;
        }

        const map = new googleMaps.maps.Map(mapRef.current, {
          center: getMapCenter(dataset),
          zoom: 11,
          styles: mapStyles,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        });

        const bounds = new googleMaps.maps.LatLngBounds();

        dataset.needs.forEach((need) => {
          const marker = new googleMaps.maps.Marker({
            map,
            position: need.location,
            title: need.title,
            icon: {
              path: googleMaps.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor:
                need.priority === "critical"
                  ? "#dc2626"
                  : need.priority === "high"
                    ? "#f97316"
                    : need.priority === "medium"
                      ? "#f59e0b"
                      : "#0f766e",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2
            }
          });

          const infoWindow = new googleMaps.maps.InfoWindow({
            content: `
              <div style="max-width: 240px; padding: 4px 2px;">
                <h3 style="margin: 0 0 8px; font-size: 16px;">${need.title}</h3>
                <p style="margin: 0 0 8px; font-size: 13px;">${need.category} | ${need.priority.toUpperCase()}</p>
                <p style="margin: 0; font-size: 13px;">${need.address}</p>
              </div>
            `
          });

          marker.addListener("click", () => infoWindow.open({ map, anchor: marker }));
          bounds.extend(need.location);
        });

        dataset.volunteers.forEach((volunteer) => {
          const marker = new googleMaps.maps.Marker({
            map,
            position: volunteer.location,
            title: volunteer.fullName,
            icon: {
              path: googleMaps.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 6,
              fillColor:
                volunteer.status === "available" ? "#0d9488" : "#64748b",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 1.5
            }
          });

          const infoWindow = new googleMaps.maps.InfoWindow({
            content: `
              <div style="max-width: 240px; padding: 4px 2px;">
                <h3 style="margin: 0 0 8px; font-size: 16px;">${volunteer.fullName}</h3>
                <p style="margin: 0 0 8px; font-size: 13px;">${volunteer.status.toUpperCase()} | ${volunteer.maxTravelDistanceKm} km radius</p>
                <p style="margin: 0; font-size: 13px;">${volunteer.address}</p>
              </div>
            `
          });

          marker.addListener("click", () => infoWindow.open({ map, anchor: marker }));
          bounds.extend(volunteer.location);
        });

        dataset.recommendations.forEach((recommendation) => {
          recommendation.matches.slice(0, 1).forEach((match) => {
            const route = new googleMaps.maps.Polyline({
              path: [recommendation.need.location, match.volunteer.location],
              geodesic: true,
              strokeColor: match.score >= 70 ? "#14b8a6" : "#f59e0b",
              strokeOpacity: 0.7,
              strokeWeight: 3
            });

            route.setMap(map);
          });
        });

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds, 60);
        }
      } catch (error) {
        if (!active) {
          return;
        }

        setMapError(
          error instanceof Error
            ? error.message
            : "Unable to load Google Maps."
        );
      }
    }

    void initMap();

    return () => {
      active = false;
    };
  }, [dataset]);

  if (!clientEnv.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-5 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
        Add `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` to enable live map rendering.
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-5 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
        {mapError}
      </div>
    );
  }

  return (
    <div className="map-container h-[480px] w-full">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}
