import React, { useState } from 'react'

import Map from 'react-map-gl';
// import ReactMapGL, { Marker, Popup } from "react-map-gl";



function Mapbox() {



  return (
    <div>

      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style={{ width: 400, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiaGVsaXVtbWl4b3B0aW1hbCIsImEiOiJja3hkY2RoeHgxNHh6Mnd0aG5sYTVndHRrIn0.S9yi-kP-tpVj5XtJ3HAn3g"
      />

    </div>
  )
}

export default Mapbox