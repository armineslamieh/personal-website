"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { useFBX, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";

// 🔧 Position map — key = project.slug from the database
const NODE_POSITIONS: Record<string, [number, number, number]> = {
    "sunday-mornings": [-5, 20, 3],
    "photography": [-2, 20, -10],
    "test-project": [5, 13, -10],
    "api-platform": [6, 20, 1],
    "ml-pipeline": [4, 20, -5],

    "iran-archive": [4, 20, -5],
    "restaurant-reservation-system": [6, 18, 1],
    "music-discovery-web-app": [5, 15, -8],
    "personal-website": [3, 22, -2],
    "nss-thermometer-devops": [7, 19, -4],
    "witteveen-bos-portfolio-platform": [5, 16, 3],
};

type Project = {
    id: number;
    slug: string;
    title: string;
    shortDescription: string;
    techStack: string[];
    type: "ART" | "ENGINEERING";
};

type NodeProject = Project & {
    position: [number, number, number];
};

type ActiveInfo = {
    project: NodeProject;
    screenX: number;
    screenY: number;
} | null;

function Node({ project, isActive, onClick }: {
    project: NodeProject;
    isActive: boolean;
    onClick: (screenX: number, screenY: number) => void;
}) {
    const { camera, size } = useThree();
    const color = project.type === "ENGINEERING" ? "#378ADD" : "#9F7AEA";

    const getScreenPos = useCallback(() => {
        const vec = new THREE.Vector3(...project.position);
        vec.project(camera);
        return {
            x: (vec.x * 0.5 + 0.5) * size.width,
            y: (-(vec.y * 0.5) + 0.5) * size.height,
        };
    }, [camera, size, project.position]);

    const handleClick = (e: any) => {
        e.stopPropagation();
        const pos = getScreenPos();
        onClick(pos.x, pos.y);
    };

    return (
        <group position={project.position}>
            <mesh>
                <sphereGeometry args={[isActive ? 2.2 : 1.4, 16, 16]} />
                <meshStandardMaterial color={color} transparent opacity={0.15} />
            </mesh>
            <mesh onClick={handleClick}>
                <sphereGeometry args={[0.8, 16, 16]} />
                <meshStandardMaterial
                    color={isActive ? "#ffffff" : color}
                    emissive={color}
                    emissiveIntensity={isActive ? 2 : 0.6}
                />
            </mesh>
        </group>
    );
}

function Brain({ projects, activeProject, onNodeClick, onLoaded }: {
    projects: NodeProject[];
    activeProject: number | null;
    onNodeClick: (project: NodeProject, screenX: number, screenY: number) => void;
    onLoaded: () => void;
}) {
    const fbx = useFBX("/models/Head-and-brain.fbx");

    useEffect(() => {
        fbx.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.material = new THREE.MeshStandardMaterial({
                    color: "#ff6600",
                    wireframe: true,
                    transparent: true,
                    opacity: 0.6,
                });
            }
        });
        onLoaded();
    }, [fbx]);

    return (
        <group>
            <primitive object={fbx} scale={0.08} position={[0, -30, 0]} />
            {projects.map((p) => (
                <Node
                    key={p.id}
                    project={p}
                    isActive={activeProject === p.id}
                    onClick={(x, y) => onNodeClick(p, x, y)}
                />
            ))}
        </group>
    );
}

function ProjectPanel({ project, screenX, screenY, canvasWidth, isMobile, onOpen, onClose }: {
    project: NodeProject;
    screenX: number;
    screenY: number;
    canvasWidth: number;
    isMobile: boolean;
    onOpen: () => void;
    onClose: () => void;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(t);
    }, []);

    const isEngineering = project.type === "ENGINEERING";
    const color = isEngineering ? "#378ADD" : "#9F7AEA";
    const gradientBg = isEngineering
        ? "linear-gradient(135deg, rgba(15,76,92,0.95) 0%, rgba(15,31,46,0.95) 100%)"
        : "linear-gradient(135deg, rgba(74,26,92,0.95) 0%, rgba(26,14,42,0.95) 100%)";

    const panelWidth = isMobile ? canvasWidth - 32 : 300;
    const panelLeft = isMobile ? 16 : (isEngineering ? canvasWidth - panelWidth - 32 : 32);

    const mobilePanelHeight = 180;
    const panelTop = isMobile
        ? window.innerHeight - mobilePanelHeight - 80
        : Math.max(80, Math.min(screenY - 100, window.innerHeight - 380));

    const lineEndX = isMobile ? screenX : (isEngineering ? canvasWidth - panelWidth - 32 : panelWidth + 32);
    const lineEndY = isMobile ? panelTop : screenY;

    return (
        <>
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 15,
                    background: "transparent",
                }}
            />

            <svg style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 16,
                opacity: visible ? 1 : 0,
                transition: "opacity 0.4s ease",
            }}>
                <line
                    x1={screenX}
                    y1={screenY}
                    x2={lineEndX}
                    y2={lineEndY}
                    stroke={color}
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    opacity="0.5"
                />
                <circle cx={screenX} cy={screenY} r="4" fill={color} opacity="0.9" />
                <circle cx={lineEndX} cy={lineEndY} r="3" fill={color} opacity="0.7" />
            </svg>

            <div
                onClick={(e) => { e.stopPropagation(); onOpen(); }}
                style={{
                    position: "absolute",
                    top: panelTop,
                    left: panelLeft,
                    width: `${panelWidth}px`,
                    background: gradientBg,
                    border: `1px solid ${color}66`,
                    borderRadius: "16px",
                    overflow: "hidden",
                    fontFamily: "sans-serif",
                    backdropFilter: "blur(16px)",
                    zIndex: 20,
                    cursor: "pointer",
                    boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 60px ${color}22`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
            >
                {!isMobile && (project as any).coverImage && (
                    <div style={{
                        width: "100%",
                        aspectRatio: "16/9",
                        background: `url(${(project as any).coverImage}) center/cover, #000`,
                        borderBottom: `1px solid ${color}44`,
                        position: "relative",
                    }}>
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)`,
                        }} />
                    </div>
                )}

                <div style={{ padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <span style={{
                            fontSize: "9px",
                            color,
                            letterSpacing: "0.3em",
                            fontWeight: 600,
                            textTransform: "uppercase",
                        }}>
                            {project.type}
                        </span>
                        {(project as any).year ? (
                            <>
                                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>·</span>
                                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>
                                    {(project as any).year}
                                </span>
                            </>
                        ) : null}
                    </div>

                    <h3 style={{
                        fontSize: isMobile ? "18px" : "20px",
                        fontWeight: 700,
                        margin: "0 0 6px",
                        lineHeight: 1.2,
                        color: "white",
                        letterSpacing: "-0.01em",
                    }}>
                        {project.title}
                    </h3>

                    <p style={{
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.65)",
                        margin: "0 0 12px",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}>
                        {project.shortDescription}
                    </p>

                    {!isMobile && project.techStack.length > 0 && (
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "14px" }}>
                            {project.techStack.slice(0, 4).map(t => (
                                <span key={t} style={{
                                    fontSize: "10px",
                                    background: `${color}1a`,
                                    border: `1px solid ${color}44`,
                                    padding: "2px 8px",
                                    borderRadius: "999px",
                                    color: "rgba(255,255,255,0.8)",
                                }}>{t}</span>
                            ))}
                            {project.techStack.length > 4 && (
                                <span style={{
                                    fontSize: "10px",
                                    padding: "2px 8px",
                                    color: "rgba(255,255,255,0.4)",
                                }}>+{project.techStack.length - 4}</span>
                            )}
                        </div>
                    )}

                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "12px",
                        borderTop: `1px solid ${color}22`,
                    }}>
                        <span style={{
                            fontSize: "11px",
                            color,
                            letterSpacing: "0.2em",
                            fontWeight: 600,
                            textTransform: "uppercase",
                        }}>
                            Open project
                        </span>
                        <span style={{
                            fontSize: "16px",
                            color,
                        }}>→</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function BrainScene({ projects, isPaused = false }: { projects: Project[]; isPaused?: boolean }) {
    const router = useRouter();
    const [activeInfo, setActiveInfo] = useState<ActiveInfo>(null);
    const [canvasWidth, setCanvasWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const nodeProjects: NodeProject[] = projects
        .filter((p) => NODE_POSITIONS[p.slug])
        .map((p) => ({
            ...p,
            position: NODE_POSITIONS[p.slug],
        }));

    useEffect(() => {
        const handleResize = () => {
            setCanvasWidth(window.innerWidth);
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close panel when scene is paused (user navigated away)
    useEffect(() => {
        if (isPaused) {
            setActiveInfo(null);
        }
    }, [isPaused]);

    const handleNodeClick = useCallback((project: NodeProject, screenX: number, screenY: number) => {
        setActiveInfo({ project, screenX, screenY });
    }, []);

    const handlePanelOpen = () => {
        if (activeInfo) {
            router.push(`/projects/${activeInfo.project.slug}`);
        }
    };

    const handlePanelClose = () => {
        setActiveInfo(null);
    };

    return (
        <div style={{
            width: "100%",
            height: "100vh",
            position: "relative",
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.2s ease",
        }}>
            <Canvas
                camera={{
                    position: [0, 0, isMobile ? 140 : 100],
                    fov: 60,
                }}
                gl={{
                    alpha: false,
                    antialias: true,
                }}
                style={{
                    background: "#0b0505",
                }}
                onCreated={({ gl, scene }) => {
                    gl.setClearColor("#0b0505", 1);
                    scene.background = new THREE.Color("#0b0505");
                }}
            >
                <color attach="background" args={["#0b0505"]} />

                <Suspense fallback={null}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <pointLight
                        position={[-5, -5, -5]}
                        intensity={0.5}
                        color="#ff4400"
                    />

                    <Brain
                        projects={nodeProjects}
                        activeProject={activeInfo?.project.id ?? null}
                        onNodeClick={handleNodeClick}
                        onLoaded={() => setTimeout(() => setLoaded(true), 100)}
                    />

                    <OrbitControls
                        enableZoom={true}
                        zoomSpeed={0.2}
                        autoRotate={activeInfo === null && !isPaused}
                        autoRotateSpeed={1}
                    />
                </Suspense>
            </Canvas>

            {activeInfo && canvasWidth > 0 && (
                <ProjectPanel
                    project={activeInfo.project}
                    screenX={activeInfo.screenX}
                    screenY={activeInfo.screenY}
                    canvasWidth={canvasWidth}
                    isMobile={isMobile}
                    onOpen={handlePanelOpen}
                    onClose={handlePanelClose}
                />
            )}

        </div>
    );
}