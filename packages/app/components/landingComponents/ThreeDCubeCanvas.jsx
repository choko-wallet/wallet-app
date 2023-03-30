import React, { Suspense, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import ThreeDCube from "./ThreeDCube";

const ThreeDCubeCanvas = () => {
  function Dodecahedron(props) {
    const meshRef = useRef();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    useFrame(() => (meshRef.current.rotation.x += 0.01));
    return (
      <group {...props}>
        <mesh
          ref={meshRef}
          scale={clicked ? 1.5 : 1}
          onClick={() => click(!clicked)}
          onPointerOver={() => hover(true)}
          onPointerOut={() => hover(false)}
        >
          <dodecahedronGeometry args={[0.75]} />
          <meshStandardMaterial color={hovered ? "hotpink" : "#5de4c7"} />
        </mesh>
      </group>
    );
  }

  return (
    <Canvas camera={{ position: [5, 5, 5], fov: 12 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 2, 1]} />
        <directionalLight position={[5, 6, 7]} />
        <Dodecahedron position={[0, 0.7, 0]} scale={0.2} />
        <ThreeDCube />
        <OrbitControls enableZoom={false} autoRotate />
      </Suspense>
    </Canvas>
  );
};

export default ThreeDCubeCanvas;
