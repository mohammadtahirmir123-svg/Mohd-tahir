import React, { useEffect, useRef, useState } from 'react';

interface InteractiveCanvasProps {
  mode?: 'hero' | 'ambient';
  backgroundTheme?: 'cyberpunk' | 'minimalist' | 'matrix';
}

export default function InteractiveCanvas({ mode = 'hero', backgroundTheme = 'cyberpunk' }: InteractiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ targetX: 0, targetY: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Dynamic sizing helper
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracker bound to stable mutable ref
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      mouseRef.current.targetX = currentX - width / 2;
      mouseRef.current.targetY = currentY - height / 2;
    };

    if (mode === 'hero') {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // 3D Point projection structure for an Icosahedron (12 vertices, 30 edges)
    // Golden ratio for vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1],
    ];

    // Normalize vertices to fit screen
    const scaleFactor = Math.min(width, height) * 0.18;
    const vertices = rawVertices.map(([x, y, z]) => {
      const length = Math.sqrt(x * x + y * y + z * z);
      return {
        x: (x / length) * scaleFactor,
        y: (y / length) * scaleFactor,
        z: (z / length) * scaleFactor,
      };
    });

    // Generate connections between nodes that are close to each other (edges of icosahedron)
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i].x - vertices[j].x;
        const dy = vertices[i].y - vertices[j].y;
        const dz = vertices[i].z - vertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        // Distance between vertices in our normalized set is roughly uniform
        if (dist < scaleFactor * 1.2) {
          edges.push([i, j]);
        }
      }
    }

    // Secondary ring layer for complex futuristic energy look
    const outerRingNodes: { x: number; y: number; z: number }[] = [];
    const ringNodesCount = 20;
    for (let i = 0; i < ringNodesCount; i++) {
      const theta = (i / ringNodesCount) * Math.PI * 2;
      outerRingNodes.push({
        x: Math.cos(theta) * scaleFactor * 1.5,
        y: 0,
        z: Math.sin(theta) * scaleFactor * 1.5,
      });
    }

    // Drifting star field stars
    const starCount = mode === 'hero' ? 60 : 120;
    const stars: { x: number; y: number; z: number; size: number; speed: number; angle: number }[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: (Math.random() - 0.5) * 500,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.2 + 0.05,
        angle: Math.random() * Math.PI * 2,
      });
    }

    let angleX = 0.003;
    let angleY = 0.005;
    let angleZ = 0.002;

    let curMouseX = 0;
    let curMouseY = 0;

    // Render loop
    const render = () => {
      if (!ctx || !canvas) return;
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Deep dark clear with a slight radial shadow
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse tracking
      curMouseX += (mouseRef.current.targetX - curMouseX) * 0.05;
      curMouseY += (mouseRef.current.targetY - curMouseY) * 0.05;

      // Base dynamic rotational offset based on mouse location
      const dynamicAngleX = angleX + curMouseY * 0.00005;
      const dynamicAngleY = angleY + curMouseX * 0.00005;

      // Update basic rotators
      angleX += 0.002;
      angleY += 0.003;
      angleZ += 0.001;

      const cosX = Math.cos(dynamicAngleX);
      const sinX = Math.sin(dynamicAngleX);
      const cosY = Math.cos(dynamicAngleY);
      const sinY = Math.sin(dynamicAngleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // 1. Draw Background Stars & Grid Constellations
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.03)';
      ctx.lineWidth = 1;
      
      if (mode === 'ambient') {
        // Draw elegant backdrop horizontal lines
        const space = 60;
        for (let i = 0; i < height; i += space) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(width, i);
          ctx.stroke();
        }
      }

      // Project and draw star particles
      stars.forEach((star) => {
        // Shift stars along their angle path
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // Wrap stars
        if (Math.abs(star.x) > width) star.x = -star.x;
        if (Math.abs(star.y) > height) star.y = -star.y;

        // Mouse gravity pull
        let px = star.x + width / 2;
        let py = star.y + height / 2;

        const mX = curMouseX + width / 2;
        const mY = curMouseY + height / 2;
        const distToMouse = Math.hypot(mX - px, mY - py);
        if (distToMouse < 220) {
          const force = (220 - distToMouse) * 0.02;
          px += ((mX - px) / distToMouse) * force;
          py += ((mY - py) / distToMouse) * force;
        }

        // Draw individual star nodes
        ctx.fillStyle = `rgba(168, 85, 247, ${0.15 + (1 - (Math.abs(star.z) / 500)) * 0.35})`;
        ctx.beginPath();
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Hero Floating 3D Geometric Object (if in hero mode)
      if (mode === 'hero') {
        const center = { x: width * 0.5, y: height * 0.5 + Math.sin(Date.now() * 0.001) * 15 };

        // Rotate primary vertices
        const rotatedVertices = vertices.map((v) => {
          // X-rotation
          let y1 = v.y * cosX - v.z * sinX;
          let z1 = v.y * sinX + v.z * cosX;

          // Y-rotation
          let x2 = v.x * cosY + z1 * sinY;
          let z2 = -v.x * sinY + z1 * cosY;

          // Z-rotation
          let x3 = x2 * cosZ - y1 * sinZ;
          let y3 = x2 * sinZ + y1 * cosZ;

          // 3D Perspective Projection simple formula (z distance ~ 400)
          const fov = 350;
          const projScale = fov / (fov + z2);

          // Interactive mouse distortion
          const finalX = center.x + x3 * projScale + curMouseX * 0.15;
          const finalY = center.y + y3 * projScale + curMouseY * 0.15;

          return { x: finalX, y: finalY, z: z2, scale: projScale };
        });

        // Rotate second layer (Orbiting Ring Nodes)
        const cosRingY = Math.cos(angleY * -0.7);
        const sinRingY = Math.sin(angleY * -0.7);
        const cosRingZ = Math.cos(angleZ * 0.5);
        const sinRingZ = Math.sin(angleZ * 0.5);

        const rotatedRingNodes = outerRingNodes.map((v) => {
          // Orbiting rotation
          let x1 = v.x * cosRingY + v.z * sinRingY;
          let z1 = -v.x * sinRingY + v.z * cosRingY;

          let x2 = x1 * cosRingZ - v.y * sinRingZ;
          let y2 = x1 * sinRingZ + v.y * cosRingZ;

          const fov = 350;
          const projScale = fov / (fov + z1);
          const finalX = center.x + x2 * projScale + curMouseX * 0.22;
          const finalY = center.y + y2 * projScale + curMouseY * 0.22;

          return { x: finalX, y: finalY, z: z1, scale: projScale };
        });

        // Draw ring connecting lines (Glowing Outer Energy Ring)
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        for (let i = 0; i < rotatedRingNodes.length; i++) {
          const nodeA = rotatedRingNodes[i];
          const nodeB = rotatedRingNodes[(i + 1) % rotatedRingNodes.length];
          const alphaA = Math.max(0.05, (1 - nodeA.z / (scaleFactor * 1.5)) * 0.4);

          const gradient = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
          gradient.addColorStop(0, `rgba(139, 92, 246, ${alphaA})`);
          gradient.addColorStop(1, `rgba(236, 72, 153, ${alphaA * 0.5})`);
          ctx.strokeStyle = gradient;

          ctx.beginPath();
          ctx.moveTo(nodeA.x, nodeA.y);
          ctx.lineTo(nodeB.x, nodeB.y);
          ctx.stroke();

          // Draw orbital node core
          ctx.fillStyle = `rgba(192, 132, 252, ${alphaA * 1.5})`;
          ctx.beginPath();
          ctx.arc(nodeA.x, nodeA.y, 2.5 * nodeA.scale, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw primary icosahedron edges
        edges.forEach(([i, j]) => {
          const ptA = rotatedVertices[i];
          const ptB = rotatedVertices[j];

          // Edge visibility based on depth (z coordinates projection)
          const avgZ = (ptA.z + ptB.z) / 2;
          const alpha = Math.max(0.1, (1 - avgZ / scaleFactor) * 0.5);

          // Cinematic neon purple to pink lighting gradient
          const grad = ctx.createLinearGradient(ptA.x, ptA.y, ptB.x, ptB.y);
          grad.addColorStop(0, `rgba(168, 85, 247, ${alpha * 1.2})`);
          grad.addColorStop(0.5, `rgba(99, 102, 241, ${alpha * 0.8})`);
          grad.addColorStop(1, `rgba(236, 72, 153, ${alpha * 0.5})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(0.8, alpha * 2.2);

          ctx.beginPath();
          ctx.moveTo(ptA.x, ptA.y);
          ctx.lineTo(ptB.x, ptB.y);
          ctx.stroke();
        });

        // Draw primary core nodes (Vertices) with soft glowing circular shadows
        rotatedVertices.forEach((pt) => {
          const nodeAlpha = Math.max(0.15, (1 - pt.z / scaleFactor) * 0.85);

          // Radial glow outer halo
          const radGrad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 14 * pt.scale);
          radGrad.addColorStop(0, `rgba(168, 85, 247, ${nodeAlpha * 0.45})`);
          radGrad.addColorStop(0.3, `rgba(124, 58, 237, ${nodeAlpha * 0.15})`);
          radGrad.addColorStop(1, 'rgba(124, 58, 237, 0)');

          ctx.fillStyle = radGrad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 14 * pt.scale, 0, Math.PI * 2);
          ctx.fill();

          // Core dot
          ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha})`;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 3.5 * pt.scale, 0, Math.PI * 2);
          ctx.fill();
        });

        // Beautiful central plasma glow core
        const coreGradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, scaleFactor * 0.6);
        coreGradient.addColorStop(0, 'rgba(124, 58, 237, 0.15)');
        coreGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.05)');
        coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(center.x, center.y, scaleFactor * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mode === 'hero') {
        window.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      id={`interactive-canvas-${mode}`}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 block"
    />
  );
}
