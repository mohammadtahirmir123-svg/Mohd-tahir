import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, Terminal, Cpu, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface ThreeDSuccessAnimationProps {
  completedTicket: {
    studentId: string;
    timestamp: string;
    name: string;
    track: string;
    experience: string;
    cardTheme?: string;
  };
  onClose: () => void;
}

export default function ThreeDSuccessAnimation({ completedTicket, onClose }: ThreeDSuccessAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showNotification, setShowNotification] = useState(true);

  // Quick list of simulated system decrypt stages during initial loading phase
  const [decryptStage, setDecryptStage] = useState(0);
  useEffect(() => {
    const timer1 = setTimeout(() => setDecryptStage(1), 600);
    const timer2 = setTimeout(() => setDecryptStage(2), 1200);
    const timer3 = setTimeout(() => setDecryptStage(3), 1800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 400;
    const height = containerRef.current.clientHeight || 400;

    // SCENE, CAMERA, & RENDERER SETUP
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const scene = new THREE.Scene();
    
    // Add atmospheric background fog
    scene.fog = new THREE.FogExp2(0x0a0518, 0.12);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // GEOMETRIC COMPONENTS FOR THREE.JS HOLOGRAM SEAL

    // Group for entire rotating core
    const hologramGroup = new THREE.Group();
    scene.add(hologramGroup);

    // 1. The Core Geometric Octahedron (The "Accreditation Seed Node")
    // Nested geometry for high technical density
    const coreGeometry = new THREE.OctahedronGeometry(1.0, 0);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Amber Gold
      emissive: 0x78350f,
      metalness: 0.95,
      roughness: 0.15,
      flatShading: true,
      transparent: true,
      opacity: 0.9
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    hologramGroup.add(coreMesh);

    // 2. Translucent wireframe matrix around core
    const outerWireGeometry = new THREE.IcosahedronGeometry(1.4, 1);
    const outerWireMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6, // Purple
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const outerWireMesh = new THREE.Mesh(outerWireGeometry, outerWireMaterial);
    hologramGroup.add(outerWireMesh);

    // 3. Dual Ring Orbitals (Opposing rotations)
    const ringGeo1 = new THREE.RingGeometry(1.9, 1.95, 64);
    const ringGeo2 = new THREE.RingGeometry(2.1, 2.13, 64);
    
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7
    });
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7, // Light purple
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });

    const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    orbitRing1.rotation.x = Math.PI / 2.5;
    scene.add(orbitRing1);

    const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    orbitRing2.rotation.x = -Math.PI / 3;
    scene.add(orbitRing2);

    // 4. Particle Field Swarm (Swirling data nodes)
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speedOffsets = new Float32Array(particleCount);
    const radiusArray = new Float32Array(particleCount);
    const posAngles = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.6 + Math.random() * 1.8;
      const angle = Math.random() * Math.PI * 2;
      const yHeight = (Math.random() - 0.5) * 1.5;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = yHeight;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      speedOffsets[i] = 0.5 + Math.random() * 1.5;
      radiusArray[i] = radius;
      posAngles[i] = angle;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8, // Sky Blue
      size: 0.045,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    
    const particleSwarm = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSwarm);

    // LIGHTING SYSTEM
    const ambientLight = new THREE.AmbientLight(0x0e0728, 5.0);
    scene.add(ambientLight);

    const purplePointLight = new THREE.PointLight(0xa855f7, 25.0, 15);
    purplePointLight.position.set(3, 4, 3);
    scene.add(purplePointLight);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 25.0, 15);
    cyanPointLight.position.set(-3, -2, 2);
    scene.add(cyanPointLight);

    const centerSparkleLight = new THREE.PointLight(0xffffff, 15.0, 5);
    centerSparkleLight.position.set(0, 0, 0);
    scene.add(centerSparkleLight);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;
      
      const elapsedTime = clock.getElapsedTime();

      // Rotate central components
      hologramGroup.rotation.y = elapsedTime * 0.4;
      coreMesh.rotation.x = elapsedTime * 0.2;
      coreMesh.rotation.y = -elapsedTime * 0.3;
      outerWireMesh.rotation.y = -elapsedTime * 0.15;
      outerWireMesh.rotation.x = elapsedTime * 0.1;

      // Spin orbital rings in opposite polarities
      orbitRing1.rotation.z = elapsedTime * 0.35;
      orbitRing2.rotation.z = -elapsedTime * 0.25;

      // Pulse lighting with a digital, breathing frequency
      purplePointLight.intensity = 15.0 + Math.sin(elapsedTime * 4) * 8.0;
      cyanPointLight.intensity = 15.0 + Math.cos(elapsedTime * 3.5) * 8.0;
      centerSparkleLight.intensity = 10.0 + Math.sin(elapsedTime * 10) * 5.0;

      // Swirl orbital particles
      const positionsAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        // Move angles forward
        posAngles[i] += 0.005 * speedOffsets[i];
        
        // Dynamic breathing radius
        const dynRadius = radiusArray[i] + Math.sin(elapsedTime * 1.5 + speedOffsets[i]) * 0.12;
        
        const x = Math.cos(posAngles[i]) * dynRadius;
        const z = Math.sin(posAngles[i]) * dynRadius;
        
        positionsAttr.setX(i, x);
        positionsAttr.setZ(i, z);
      }
      positionsAttr.needsUpdate = true;

      // Rotate camera viewport slightly on mouse move or loop
      camera.position.x = Math.sin(elapsedTime * 0.4) * 0.4;
      camera.position.y = Math.cos(elapsedTime * 0.3) * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE EVENT OBSERVER
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(containerRef.current);

    // CLEANUP ON UNMOUNT
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      // Dispose assets to prevent WebGL context leakage
      coreGeometry.dispose();
      coreMaterial.dispose();
      outerWireGeometry.dispose();
      outerWireMaterial.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-[#05020c]/95 backdrop-blur-xl overflow-y-auto"
      id="3d-seal-success-container"
    >
      {/* Laser HUD Grid lines decoration */}
      <div className="absolute inset-0 bg-[#07050f] bg-[radial-gradient(#1e1145_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />
      
      {/* Top glowing radial flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 relative z-10 py-6">
        
        {/* Left Interactive 3D Canvas Column */}
        <div 
          ref={containerRef}
          className="w-full max-w-[350px] aspect-square lg:w-[420px] lg:h-[420px] flex items-center justify-center relative bg-purple-950/10 border border-purple-500/10 rounded-full shadow-[0_0_50px_rgba(168,85,247,0.06)]"
          id="3d-canvas-column"
        >
          {/* Futuristic corner tick marks */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-cyan-400/45" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-cyan-400/45" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-cyan-400/45" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-cyan-400/45" />

          {/* Hologram Light Projector Base (SVG Accent) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-cyan-950/20 border border-cyan-500/40 rounded-full font-mono text-[7px] text-cyan-400 tracking-[0.25em] uppercase font-bold animate-pulse">
            // HOLO_SEAL_EMITTER
          </div>

          {/* WebGL Canvas */}
          <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" id="webgl-canvas" />

          {/* Orbit hint label */}
          <span className="absolute top-6 left-1/2 -translate-x-1/2 font-mono text-[7px] text-gray-500 tracking-wider block uppercase">
            ◄ Realtime 3D rendering enabled ►
          </span>
        </div>

        {/* Right Verification Details & Decrypt Tracker Column */}
        <div className="flex-1 max-w-[440px] text-left" id="text-details-column">
          
          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-5 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-start gap-3"
              >
                <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-sans">Admission Success Notification</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed">
                    Form details verified and synchronized. SMS dispatch sent to Mohd Tahir is complete.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full mb-3 text-[9px] font-mono font-bold uppercase tracking-wider text-purple-300">
            <Award className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Verifiable Academic Honor Badge Issued</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-3.5xl text-white uppercase tracking-tight leading-tight">
            SECURE ADMISSION KEY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-300">GENERATED</span>
          </h2>

          <p className="text-gray-400 text-xs mt-2.5 font-light leading-relaxed">
            Congratulations! Your private registration candidate profile has been authenticated. You have been issued a unique seat token alongside a cryptographic digital seal.
          </p>

          {/* Cryptographic Node Verification HUD metadata box */}
          <div className="mt-5 p-4 bg-black/65 border border-white/5 rounded-2xl relative overflow-hidden" id="hud-metadata-box">
            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full pointer-events-none" />
            
            <div className="space-y-3 font-mono text-[10px]">
              
              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-500">REGISTRY OWNER</span>
                <span className="text-white font-bold">{completedTicket.name.toUpperCase()}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-500">ACADEMY COURSE</span>
                <span className="text-cyan-400 font-bold truncate max-w-[180px] text-right">{completedTicket.track}</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-500">MEMBER LEVEL</span>
                <span className="text-amber-400 uppercase font-black">{completedTicket.experience} level</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                <span className="text-gray-500">VERIFICATION STAMP</span>
                <span className="text-purple-400 font-black">{completedTicket.studentId}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">STATUS SECURITY LEVEL</span>
                <div className="flex items-center space-x-1 text-emerald-400 font-extrabold text-[9px]">
                  <ShieldCheck className="w-3.5 h-3.5 fill-emerald-500/20" />
                  <span>SECURED_VERIFIED_SSL</span>
                </div>
              </div>
            </div>
          </div>

          {/* Decrypting Status Terminal simulation lines */}
          <div className="mt-4 p-3 bg-indigo-950/10 border border-indigo-500/15 rounded-xl flex items-center space-x-2.5">
            <Cpu className="w-4 h-4 text-purple-400 animate-pulse" />
            <span className="font-mono text-[9px] text-gray-400 tracking-wide uppercase">
              {decryptStage === 0 && '🧬 Initializing high-speed secure registry handshake...'}
              {decryptStage === 1 && '⚡ Constructing polygon mesh boundaries & light paths...'}
              {decryptStage === 2 && '🔑 Binding digital sign-off key MT-ACAD...'}
              {decryptStage >= 3 && '✅ Holographic badge finalized. Ready to access.'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold font-mono text-[10px] tracking-wider uppercase shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
              id="reveal-credentials-button"
            >
              <span>Reveal Digital License Badge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
