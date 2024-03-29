// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Map from 'react-map-gl';

function Mapbox (): JSX.Element {
  const [showMap, setShowMap] = useState<boolean>(false);

  const handleShowMap = () => {
    setShowMap(false);
    setTimeout(() => {
      setShowMap(true);
    }, 2000);
  };

  useEffect(() => {
    handleShowMap();
  }, []);

  return (

    // <motion.div
    //   className=''
    //   transition={{
    //     duration: 0.1,
    //     delay: 1.0,
    //   }}
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    // >
    <div>
      {showMap
        ? <Map
          initialViewState={{
            latitude: 37.8,
            longitude: -122.4,
            zoom: 14
          }}
          mapStyle='mapbox://styles/heliummixoptimal/cle7vwv5m000a01o2dsuxfhyv'
          mapboxAccessToken='pk.eyJ1IjoiaGVsaXVtbWl4b3B0aW1hbCIsImEiOiJja3hkY2RoeHgxNHh6Mnd0aG5sYTVndHRrIn0.S9yi-kP-tpVj5XtJ3HAn3g'
          style={{ height: 600, width: 400 }}
        // mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          {/* <Popup longitude={-122.4} latitude={37.8}
          // anchor="bottom"
          >
            You are here
          </Popup> */}
        </Map>
        : <div className='w-[400px] h-[600px] bg-transparent'></div>

      }

      {/* <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style={{ width: 400, height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiaGVsaXVtbWl4b3B0aW1hbCIsImEiOiJja3hkY2RoeHgxNHh6Mnd0aG5sYTVndHRrIn0.S9yi-kP-tpVj5XtJ3HAn3g"
      />

    // </motion.div> */}

    </div>
  );
}

export default Mapbox;
