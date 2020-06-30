import React, { useState } from 'react';

import MapContainer from './components/map-container'

import logo from './logo.svg';
import './App.css';


function App() {
  return (
    <div className="App">
      <div id="map">
        <MapContainer 
          lat = { 48.481120 }
          lng = { 30.671416 }
          zoom = { 6 }
        />
      </div>
    </div>
  );
}

export default App;
