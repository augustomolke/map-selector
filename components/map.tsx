import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  Popup,
  Polygon,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import ReactLeafletKml from "react-leaflet-kml";
import * as React from "react";
import { useStore } from "@/lib/store";

import { statesData } from "./assets/data";

const center = [-23.554108115213108, -46.641665563775724];

const defaultStyle = {
  fillColor: "#FD8D3C",
  fillOpacity: 0.5,
  weight: 2,
  opacity: 1,
  dashArray: 3,
  color: "white",
};

const closedStyle = {
  fillColor: "gray",
  fillOpacity: 0.8,
  weight: 2,
  opacity: 1,
  dashArray: 3,
  color: "white",
};

const selectedStyle = {
  dashArray: "",
  fillColor: "#FD8D3C",
  fillOpacity: 0.9,
  weight: 3,
  opacity: 1,
  color: "white",
};

export default function MyMap(props: any) {
  const { position, zoom, serverSession, closed } = props;

  const { selected, setSelected, setCloseBtn } = useStore();

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ width: "100vw", height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {statesData.features.map((state) => {
        const coordinates = state.geometry.coordinates[0].map((item) => [
          item[1],
          item[0],
        ]);

        const isClosed = closed.includes(state.properties.description);

        return (
          <Polygon
            key={state.properties.description}
            pathOptions={
              isClosed
                ? closedStyle
                : serverSession?.user.region == state.properties.description
                ? selectedStyle
                : defaultStyle
            }
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                if (isClosed) return;

                if (selected == null) {
                  const layer = e.target;
                  layer.setStyle(selectedStyle);
                }
              },
              mouseout: (e) => {
                if (isClosed) return;
                if (
                  selected == null &&
                  state.properties.description !== serverSession?.user.region
                ) {
                  const layer = e.target;
                  layer.setStyle(defaultStyle);
                }
              },
              click: (e) => {
                const layer = e.target;
                layer.setStyle(selectedStyle);
                setSelected(isClosed ? "closed" : state.properties.description);
                setCloseBtn(() =>
                  layer.setStyle(isClosed ? closedStyle : defaultStyle)
                );
              },
            }}
          />
        );
      })}
    </MapContainer>
  );
}
