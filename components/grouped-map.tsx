import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  Popup,
  Polygon,
  FeatureGroup,
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

  const groupStatesByName = statesData.features.reduce((acc, curr) => {
    const identifier = curr.properties.name[0];

    if (acc[identifier]) {
      return { ...acc, [identifier]: [...acc[identifier], curr] };
    }

    return { ...acc, [identifier]: [curr] };
  }, {});

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
      {Object.entries(groupStatesByName).map((group) => {
        const groupName = group[0];
        const features = group[1];
        const isClosed = closed.includes(groupName);

        return (
          <FeatureGroup
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
                  groupName !== serverSession?.user.region[0]
                ) {
                  const layer = e.target;
                  layer.setStyle(defaultStyle);
                }
              },
              click: (e) => {
                const layer = e.target;
                layer.setStyle(selectedStyle);
                setSelected(isClosed ? "closed" : groupName);
                setCloseBtn(() =>
                  layer.setStyle(isClosed ? closedStyle : defaultStyle)
                );
              },
            }}
          >
            {features.map((state) => {
              const identifier = groupName;
              const coordinates = state.geometry.coordinates[0].map((item) => [
                item[1],
                item[0],
              ]);

              return (
                <Polygon
                  key={identifier}
                  pathOptions={
                    isClosed
                      ? closedStyle
                      : serverSession?.user.region[0] == identifier
                      ? selectedStyle
                      : defaultStyle
                  }
                  positions={coordinates}
                />
              );
            })}
          </FeatureGroup>
        );
      })}
    </MapContainer>
  );
}
