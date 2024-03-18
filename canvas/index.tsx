"use client";
import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import { Text } from "@react-three/drei";
const CanvasModel = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }} // fov = field of view
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full rounded-md h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      {/* <Environment preset="city" background /> */}

      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
