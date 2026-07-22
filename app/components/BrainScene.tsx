"use client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useFBX, OrbitControls } from "@react-three/drei";
import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";

// 🔧 Position map — key = project.slug from the database
const NODE_POSITIONS: Record<string, [number, number, number]> = {
    "iran-archive": [4, 22, -2],
    "restaurant-reservation-system": [8, 19, 2],
    "music-discovery-web-app": [9, 15, -4],
    "personal-website": [3, 13, 4],
    "nss-thermometer-devops": [7, 11, -2],
    "witteveen-bos-portfolio-platform": [5, 17, 5],
};

type Project = {
    id: number;
    slug: string;
    title: string;
    shortDescription: string;
    coverImage: string;
    year: number | null;
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

const MOBILE_PANEL_HEIGHT = 180;
const DESKTOP_PANEL_HEIGHT = 380;

function AtomNode({ project, isActive, isMobile, onClick }: {
    project: NodeProject;
    isActive: boolean;
    isMobile: boolean;
    onClick: (screenX: number, screenY: number) => void;
}) {
    const { camera, size } = useThree();
    const color = project.type === "ENGINEERING" ? "#378ADD" : "#9F7AEA";
    const orbitGroupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);

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

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (orbitGroupRef.current) {
            orbitGroupRef.current.rotation.y = t * 0.3;
            orbitGroupRef.current.rotation.x = t * 0.15;
        }
        if (coreRef.current) {
            const pulse = 1 + Math.sin(t * 2.5) * 0.12;
            coreRef.current.scale.set(pulse, pulse, pulse);
        }
    });

    // Node orb sizing. The wireframe cage grows slightly when active; the inner
    // core stays small so it reads as a glowing nucleus.
    const orbRadius = (isActive ? 1.5 : 1.25) * (isMobile ? 1.15 : 1);


    // Invisible, finger-sized tap target. Much larger than the visible core so
    // taps on mobile land reliably. Kept transparent (not `visible={false}`) so
    // it still receives pointer events.
    const hitRadius = isMobile ? 2.4 : 1.3;

    return (
        <group position={project.position}>
            {/* Soft outer glow */}
            <mesh>
                <sphereGeometry args={[isActive ? 2.8 : 2.0, 16, 16]} />
                <meshBasicMaterial color={color} transparent opacity={0.08} depthWrite={false} />
            </mesh>

            {/* Rotating wireframe orb — matches the brain's wireframe language */}
            <group ref={orbitGroupRef}>
                <mesh>
                    <icosahedronGeometry args={[orbRadius, 1]} />
                    <meshBasicMaterial color={color} wireframe />
                </mesh>
            </group>

            {/* Enlarged invisible hit target — makes nodes easy to tap on mobile */}
            <mesh onClick={handleClick}>
                <sphereGeometry args={[hitRadius, 12, 12]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

            {/* Solid glowing nucleus inside the cage */}
            <mesh ref={coreRef} onClick={handleClick}>
                <sphereGeometry args={[0.55, 20, 20]} />
                <meshStandardMaterial
                    color={isActive ? "#ffffff" : color}
                    emissive={color}
                    emissiveIntensity={isActive ? 3 : 2.2}
                />
            </mesh>
        </group>
    );
}

function Brain({ projects, activeProject, isMobile, onNodeClick, onLoaded }: {
    projects: NodeProject[];
    activeProject: number | null;
    isMobile: boolean;
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
                <AtomNode
                    key={p.id}
                    project={p}
                    isActive={activeProject === p.id}
                    isMobile={isMobile}
                    onClick={(x, y) => onNodeClick(p, x, y)}
                />
            ))}
        </group>
    );
}

function ProjectPanel({ project, screenX, screenY, canvasWidth, isMobile, onOpen, onClose, onPrev, onNext, hasSiblings }: {
    project: NodeProject;
    screenX: number;
    screenY: number;
    canvasWidth: number;
    isMobile: boolean;
    onOpen: () => void;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    hasSiblings: boolean;
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

    const panelWidth = isMobile ? canvasWidth - 96 : 300;
    const panelLeft = isMobile ? 48 : (isEngineering ? canvasWidth - panelWidth - 80 : 80);
    const panelHeight = isMobile ? MOBILE_PANEL_HEIGHT : DESKTOP_PANEL_HEIGHT;

    const panelTop = isMobile
        ? window.innerHeight - panelHeight - 80
        : Math.max(80, Math.min(screenY - 100, window.innerHeight - panelHeight));

    // Arrow buttons vertically centered on the panel
    const arrowTop = panelTop + panelHeight / 2;

    const lineEndX = isMobile ? screenX : (isEngineering ? canvasWidth - panelWidth - 80 : panelWidth + 80);
    const lineEndY = isMobile ? panelTop : screenY;

    return (
        <>
            <div
                onClick={onClose}
                style={{ position: "fixed", inset: 0, zIndex: 15, background: "transparent" }}
            />

            <svg style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                pointerEvents: "none", zIndex: 16,
                opacity: visible ? 1 : 0, transition: "opacity 0.4s ease",
            }}>
                <line x1={screenX} y1={screenY} x2={lineEndX} y2={lineEndY} stroke={color} strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                <circle cx={screenX} cy={screenY} r="4" fill={color} opacity="0.9" />
                <circle cx={lineEndX} cy={lineEndY} r="3" fill={color} opacity="0.7" />
            </svg>

            {/* Previous arrow — vertically centered on panel */}
            {hasSiblings && (
                <button
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    style={{
                        position: "absolute",
                        top: arrowTop,
                        left: panelLeft - 44,
                        transform: "translateY(-50%)",
                        zIndex: 21,
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.6)",
                        border: `1px solid ${color}66`,
                        color: color,
                        fontSize: "18px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(10px)",
                        opacity: visible ? 1 : 0,
                        transition: "opacity 0.4s ease, transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}
                    aria-label="Previous project"
                >
                    ‹
                </button>
            )}

            {/* Next arrow — vertically centered on panel */}
            {hasSiblings && (
                <button
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    style={{
                        position: "absolute",
                        top: arrowTop,
                        left: panelLeft + panelWidth + 8,
                        transform: "translateY(-50%)",
                        zIndex: 21,
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: "rgba(0,0,0,0.6)",
                        border: `1px solid ${color}66`,
                        color: color,
                        fontSize: "18px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backdropFilter: "blur(10px)",
                        opacity: visible ? 1 : 0,
                        transition: "opacity 0.4s ease, transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(-50%) scale(1)"; }}
                    aria-label="Next project"
                >
                    ›
                </button>
            )}

            <div
                onClick={(e) => { e.stopPropagation(); onOpen(); }}
                style={{
                    position: "absolute", top: panelTop, left: panelLeft,
                    width: `${panelWidth}px`,
                    background: gradientBg,
                    border: `1px solid ${color}66`,
                    borderRadius: "16px", overflow: "hidden",
                    fontFamily: "sans-serif", backdropFilter: "blur(16px)",
                    zIndex: 20, cursor: "pointer",
                    boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 60px ${color}22`,
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
            >
                {!isMobile && (project as any).coverImage && (
                    <div style={{
                        width: "100%", aspectRatio: "16/9",
                        background: `url(${(project as any).coverImage}) center/cover, #000`,
                        borderBottom: `1px solid ${color}44`, position: "relative",
                    }}>
                        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)` }} />
                    </div>
                )}

                <div style={{ padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "9px", color, letterSpacing: "0.3em", fontWeight: 600, textTransform: "uppercase" }}>
                            {project.type}
                        </span>
                        {(project as any).year ? (
                            <>
                                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px" }}>·</span>
                                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px" }}>{(project as any).year}</span>
                            </>
                        ) : null}
                    </div>

                    <h3 style={{
                        fontSize: isMobile ? "18px" : "20px", fontWeight: 700, margin: "0 0 6px",
                        lineHeight: 1.2, color: "white", letterSpacing: "-0.01em",
                    }}>
                        {project.title}
                    </h3>

                    <p style={{
                        fontSize: "12px", color: "rgba(255,255,255,0.65)",
                        margin: "0 0 12px", lineHeight: 1.5,
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
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
                                    padding: "2px 8px", borderRadius: "999px",
                                    color: "rgba(255,255,255,0.8)",
                                }}>{t}</span>
                            ))}
                            {project.techStack.length > 4 && (
                                <span style={{ fontSize: "10px", padding: "2px 8px", color: "rgba(255,255,255,0.4)" }}>+{project.techStack.length - 4}</span>
                            )}
                        </div>
                    )}

                    <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        paddingTop: "12px", borderTop: `1px solid ${color}22`,
                    }}>
                        <span style={{
                            fontSize: "11px", color, letterSpacing: "0.2em",
                            fontWeight: 600, textTransform: "uppercase",
                        }}>Open project</span>
                        <span style={{ fontSize: "16px", color }}>→</span>
                    </div>
                </div>
            </div>
        </>
    );
}

// Helper component that lives inside the Canvas to compute screen coords of the active node
function NodeScreenPosTracker({ activeProject, onUpdate }: {
    activeProject: NodeProject | null;
    onUpdate: (pos: { x: number; y: number }) => void;
}) {
    const { camera, size } = useThree();
    const lastPosRef = useRef<{ x: number; y: number } | null>(null);

    useFrame(() => {
        if (!activeProject) return;
        const vec = new THREE.Vector3(...activeProject.position);
        vec.project(camera);
        const x = (vec.x * 0.5 + 0.5) * size.width;
        const y = (-(vec.y * 0.5) + 0.5) * size.height;

        const last = lastPosRef.current;
        if (!last || Math.abs(last.x - x) > 1 || Math.abs(last.y - y) > 1) {
            lastPosRef.current = { x, y };
            onUpdate({ x, y });
        }
    });

    return null;
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

    const siblings = activeInfo
        ? nodeProjects.filter((p) => p.type === activeInfo.project.type)
        : [];

    useEffect(() => {
        const handleResize = () => {
            setCanvasWidth(window.innerWidth);
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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

    const handlePanelClose = () => setActiveInfo(null);

    const handlePrev = () => {
        if (!activeInfo || siblings.length < 2) return;
        const currentIdx = siblings.findIndex((p) => p.id === activeInfo.project.id);
        const prevIdx = (currentIdx - 1 + siblings.length) % siblings.length;
        const prevProject = siblings[prevIdx];
        setActiveInfo({ project: prevProject, screenX: activeInfo.screenX, screenY: activeInfo.screenY });
    };

    const handleNext = () => {
        if (!activeInfo || siblings.length < 2) return;
        const currentIdx = siblings.findIndex((p) => p.id === activeInfo.project.id);
        const nextIdx = (currentIdx + 1) % siblings.length;
        const nextProject = siblings[nextIdx];
        setActiveInfo({ project: nextProject, screenX: activeInfo.screenX, screenY: activeInfo.screenY });
    };

    return (
        <div style={{
            width: "100%", height: "100vh", position: "relative",
            opacity: loaded ? 1 : 0, transition: "opacity 1.2s ease",
        }}>
            <Canvas camera={{ position: [0, 0, isMobile ? 140 : 100], fov: 60 }}>
                <color attach="background" args={["#121212"]} />
                <Suspense fallback={null}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ff4400" />
                    <Brain
                        projects={nodeProjects}
                        activeProject={activeInfo?.project.id ?? null}
                        isMobile={isMobile}
                        onNodeClick={handleNodeClick}
                        onLoaded={() => setTimeout(() => setLoaded(true), 100)}
                    />
                    <NodeScreenPosTracker
                        activeProject={activeInfo?.project ?? null}
                        onUpdate={(pos) => {
                            setActiveInfo((prev) => prev ? { ...prev, screenX: pos.x, screenY: pos.y } : null);
                        }}
                    />
                    <OrbitControls
                        enableZoom={true}
                        zoomSpeed={0.2}
                        autoRotate={activeInfo === null && !isPaused}
                        autoRotateSpeed={0.5}
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
                    onPrev={handlePrev}
                    onNext={handleNext}
                    hasSiblings={siblings.length > 1}
                />
            )}
        </div>
    );
}