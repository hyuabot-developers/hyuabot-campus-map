import React from 'react';
import { CampusMap } from './features/map/CampusMap';
import './App.css';
import RoomSearchBar from "./features/search/RoomSearchBar";


function App() {
  return (
    <div className="App" style={{ position: "relative" }}>
      <div style={{
        position: "absolute",
        width: "100%",
        zIndex: 1000,
        top: 0,
        left: 0,
        backgroundColor: "white",
      }}>
        <RoomSearchBar />
      </div>
      <CampusMap />
    </div>
  );
}

export default App;
