import React from 'react';
import { 
  Map, 
  LayersControl, 
  LayerGroup, 
  TileLayer, 
  Marker, 
  Popup 
} from 'react-leaflet';
import L from 'leaflet';

import './styles.css';

import iconPNG from './icons/icon.png';
 
interface IMapCanter {
  lat: number,
  lng: number,
  zoom: number,
}

interface IResultEllements {
  id: number, 
  name: string,
  image: string,
  type: string,
  rating: number,
  latitude: number,
  longitude: number
}

type Props = {
  items: IResultEllements[]
}

export const MapContainer: React.FC<Props> = ({ items }) => {

  const icon = new L.Icon({
    iconUrl: iconPNG,
    iconAnchor: [10, 19],
    popupAnchor: [0, -20],
    iconSize: [26, 19],
  });
  
  const mapItems = items.map(item => <Marker 
      key = {item.id}
      position={[item.latitude, item.longitude]} 
      icon={icon}
      >
      <Popup>
        <div className="title">
          <h3>{item.name}</h3>
          <img className="rating" src={`./images/rating/${item.rating}.png`} alt={`рейтинг - ${item.rating}`} />
        </div>
        <div className="img">
          <img src={`./images/${item.image}`} alt={item.name} />
        </div>
      </Popup>
    </Marker>
  ) ; 

  return (
    <Map 
      bounds={[[52.379338, 22.137169],[44.387127,40.220473]]}
      style={{ width: window.innerWidth, height: window.innerHeight}}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Map">
          <LayerGroup>
            <TileLayer
              url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
            />
            <TileLayer
              attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url= 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png'
            />
          </LayerGroup>
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="Satellite">
          <LayerGroup>
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            <TileLayer
              attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url= 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}'
              opacity= {0.4}
              ext= 'png'
            />
            <TileLayer
              attribution= 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url= 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png'
            />
          </LayerGroup>
        </LayersControl.BaseLayer>
      </LayersControl>
      <LayersControl position="bottomright">
        <LayersControl.Overlay checked name="Marker with popup">
          <LayerGroup>
            {mapItems}
          </LayerGroup>
        </LayersControl.Overlay>   
      </LayersControl>
    </Map>
  )
};

MapContainer.displayName = 'MapContainer';