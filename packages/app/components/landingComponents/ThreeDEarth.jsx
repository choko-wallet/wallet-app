// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";

import ThreeDLoader from "./ThreeDLoader.jsx";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} position-y={0} rotation-y={0} scale={2.5} />
  );
};

// interface Props {
//   zoom: boolean;
// }

const ThreeDEarth = ({ zoom }) => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      dpr={[1, 2]}
      frameloop='demand'
      gl={{ preserveDrawingBuffer: true }}
      shadows
    >
      <Suspense fallback={<ThreeDLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={zoom}
          maxPolarAngle={Math.PI / 2}
          maxDistance={50}
          // maxZoom={50}
          // minZoom={10}
          minDistance={7}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ThreeDEarth;
