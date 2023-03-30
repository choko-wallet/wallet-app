import React, { useRef } from "react";
import { PerspectiveCamera, RenderTexture, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Cube = () => {
  const textRef = useRef();
  useFrame(
    (state) =>
      (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2)
  );
  return (
    <mesh>
      <boxGeometry />
      <meshStandardMaterial>
        <RenderTexture attach='map'>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <color attach='background' args={["#000000"]} />
          <Text ref={textRef} fontSize={3} color='#fc67fa'>
            Choko
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  );
};

export default Cube;
