import React, { useState } from 'react';

import {
  Marker, 
  Popup,
  LayersControl,
  LayerGroup,
} from 'react-leaflet';

import L from 'leaflet';

interface IResultEllements {
  id: number, 
  name: string,
  image: string,
  type: string,
  rating: number,
  latitude: number,
  longitude: number
}

interface ITypeElements {
  id: string,
  name: string,
  icon: string
}

type Props = {
  items: IResultEllements[],
  types: ITypeElements[]
}

export const MarkersControl: React.FC<Props> = ({ items, types }) => {

  const itemsGroupedByType = items.reduce(function (acc, cur) {
      acc[cur.type] = acc[cur.type] || [];
      acc[cur.type].push(cur);
      return acc;
  }, Object.create(null));

  const mapMarkersGroup = (items: IResultEllements[], icon: L.Icon) => {
    return items.map((item: IResultEllements) => 
      <Marker 
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
  )}

  const createIcon = (type: ITypeElements) => {
    return new L.Icon({
      iconUrl: `./images/icons/${type.icon}`,
      iconAnchor: [10, 19],
      popupAnchor: [0, -20],
      iconSize: [26, 19],
    });
  };

  const TypeOverlay = types.map((type: ITypeElements) => 
      <LayersControl.Overlay checked name={type.name} key={type.id}>
        <LayerGroup>
          {mapMarkersGroup(itemsGroupedByType[type.id], createIcon(type))}
        </LayerGroup>
      </LayersControl.Overlay>
    )

  return (
    <LayersControl position="bottomright">
          {TypeOverlay}
    </LayersControl> 
  )
};

MarkersControl.displayName = 'MarkersControl';

export default MarkersControl;