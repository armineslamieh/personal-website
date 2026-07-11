// app/components/BrainScene.tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { useFBX, OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";

function Brain() {
    const fbx = useFBX("/models/brain.fbx");
    return <primitive object={fbx} scale={0.01} />;
}

export default function BrainScene() {
    return (
        <div style={{ width: "100%", height: "600px" }}>
            <Canvas camera={{ position: [0, 0, 300], fov: 50 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[2, 2, 2]} intensity={1} />
                    <Brain />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                    <Environment preset="sunset" />
                </Suspense>
            </Canvas>
        </div>
    );
}