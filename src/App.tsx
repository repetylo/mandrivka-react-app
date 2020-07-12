import React from 'react';

import MapContainer from './components/map-container'

import './App.css';

import items from './mocks/places.json'
import types from './mocks/types.json'

function App() {
  return (
    <div className="App">
      <div id="map">
        <MapContainer 
          items={items}
          types={types}
        />
      </div>
    </div>
  );
}

export default App;