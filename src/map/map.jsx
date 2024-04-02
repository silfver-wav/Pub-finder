import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPubs } from "../redux/slices/pubsSlice";
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
import correctEncoding from "../util/correctEncoding";

const beerIcon = new Icon({
  iconUrl: marker,
  iconSize: [27, 27],
});

export default function Map() {
  const layer = useSelector((state) => state.layer.realisticMap);
  const pubs = useSelector((state) => state.pubs.pubs);
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      // dispatch(fetchPubs({ lat: latitude, lng: longitude, radius: 1 }));
      dispatch(fetchPubs({ lat: 59.31406275108505, lng: 18.071794637357076, radius: 0.5 }));
    }
    
    function error() {
      console.log("Unable to retrieve your location");
    }
  }, []);

  
  return (
    <MapContainer center={[59.31508, 18.072309]} zoom={16}>
      {renderTileLayer(layer)}

      <FocusOnLocation />

      <MarkerClusterGroup chunkedLoading animate={true} maxClusterRadius={10}>
        {pubs.map((pub) => (
          <Marker key={pub.id} position={[pub.lat, pub.lng]} icon={beerIcon}>
            <Popup>{correctEncoding(pub.name)}</Popup>
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
