import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import marker from "../../content/beer (1).png";
import marker2 from "../../content/position (1).png";
import here from "../../content/time.png";

const beerIcon = new Icon({
  iconUrl: marker,
  iconSize: [27, 27],
});

export default function Map() {
  const layer = useSelector((state) => state.layer.realisticMap);
  const pubs = useSelector((state) => state.pubs.pubs);

  return (
    <MapContainer center={[59.31508, 18.072309]} zoom={16}>
      {renderTileLayer(layer)}

      <FocusOnLocation />

      <MarkerClusterGroup chunkedLoading animate={true} maxClusterRadius={10}>
        {pubs.map((pub) => (
          <Marker position={pub.geocode} icon={beerIcon}>
            <Popup>{pub.name}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

function renderTileLayer(realisticMap) {
  if (realisticMap) {
    return (
      <TileLayer
        attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
      />
    );
  } else {
    return (
      <TileLayer
        attribution=""
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />
    );
  }
}

function FocusOnLocation() {
  const geocode = useSelector((state) => state.pub.geocode);
  const map = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (geocode.length !== 0) {
      map.flyTo(geocode, 18);
      setPosition(geocode);
    }
  }, [geocode, map]);

  // TODO: make it so you can remove marker
  return position === null ? null : (
    <Marker position={position} icon={hereIcon} />
  );
}

const hereIcon = new Icon({
  iconUrl: here,
  iconSize: [55, 55],
});

const myIcon = new Icon({
  iconUrl: marker2,
  iconSize: [55, 55],
});

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={myIcon}>
      <name>You are here</name>
    </Marker>
  );
}
