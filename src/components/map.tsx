import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Corrige o ícone do marcador no Leaflet para ambientes de produção
const customIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41], // Tamanho do ícone
  iconAnchor: [12, 41], // Ponto de ancoragem
  popupAnchor: [1, -34], // Onde aparece o popup
  shadowSize: [41, 41],
});

const Map = ({ onPositionChange, positionDefault }: { onPositionChange: (position: string) => void; positionDefault: string }) => {
  const [position, setPosition] = useState<[number, number]>(positionDefault.split(",").map(Number) as [number, number]);

  // Função para lidar com eventos de clique no mapa
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        onPositionChange(`${lat},${lng}`);
      },
    });
    return null;
  };

  return (
    <MapContainer center={position} zoom={13} style={{ aspectRatio: "1/1", width: "100%", maxHeight: "400px" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      <MapClickHandler />
      <Marker position={position} icon={customIcon}>
        <Popup>{`Latitude: ${position[0]}, Longitude: ${position[1]}`}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
