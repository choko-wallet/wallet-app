import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import stars from "../../utils/stars.json";

const Stars = (props) => {
  const ref = useRef();

  const starsArray = Float32Array.from(Object.values(stars));

  // console.log(starsArray);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={starsArray}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const ThreeDStarBg = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-0'>
      <Canvas
        camera={{ position: [0, 0, 1] }}
        // className='bg-red-300'
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default ThreeDStarBg;
