"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import * as THREE from "three";

function AstronautModel({ onLoaded }: { onLoaded: () => void }) {
    const { scene } = useGLTF("/models/astronaut.glb");

    useEffect(() => {
        scene.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.material = new THREE.MeshStandardMaterial({
                    color: "#ff6600",
                    wireframe: true,
                    transparent: true,
                    opacity: 0.7,
                    emissive: new THREE.Color("#ff3300"),
                    emissiveIntensity: 0.3,
                });
            }
        });

        const box = new THREE.Box3().setFromObject(scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        console.log("size:", size, "center:", center);

        onLoaded();
    }, [scene]);

    return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
}

export default function Astronaut() {
    const [loaded, setLoaded] = useState(false);

    return (
        <div style={{
            width: "100%",
            height: "100%",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease",
        }}>
            <Canvas camera={{ position: [0, 0, 3], fov: 60 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={2} />
                    <directionalLight position={[5, 5, 5]} intensity={2} />
                    <AstronautModel onLoaded={() => setTimeout(() => setLoaded(true), 0)} />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={1}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}