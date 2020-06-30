import React, { useState } from 'react';

import { 
  Map, 
  LayersControl, 
  LayerGroup, 
  TileLayer, 
  FeatureGroup, 
  Circle, 
  Marker, 
  Popup 
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
 
interface IMapCanter {
  lat: number,
  lng: number,
  zoom: number,
}

type Props = {
  lat: number,
  lng: number,
  zoom: number,
}


export const MapContainer: React.FC<Props> = ({ lat, lng, zoom }) => {

  const [state, setState] = useState({
    lat,
    lng,
    zoom,
  })

  return (
    <Map 
      //center={[state.lat, state.lng]}

      //zoom={state.zoom} 
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
        <LayersControl.Overlay name="Marker with popup">
          <Marker position={[51.51, -0.06]}>
            <Popup>
              <span>
                A pretty CSS3 popup. <br /> Easily customizable.
              </span>
            </Popup>
          </Marker>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Feature group">
          <FeatureGroup color="purple">
            <Popup>
              <span>Popup in FeatureGroup</span>
            </Popup>
            <Circle center={[51.51, -0.06]} radius={200} />
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>


    </Map>

  )
};