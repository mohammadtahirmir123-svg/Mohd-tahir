import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  
  const position = useRef({ x: 0, y: 0 });
  const trail = useRef({ x: 0, y: 0 });
  
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const dot = dotRef.current;
    const aura = auraRef.current;

    let animationFrameId: number;

    let isTracking = false;

    const moveMouse = (e: MouseEvent) => {
      position.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) {
         setIsVisible(true);
      }
      if (dot) {
        dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0) scale(${isHovered ? 1.5 : 1})`;
      }
      if (!isTracking) {
        isTracking = true;
        updateTrail();
      }
    };

    const updateTrail = () => {
      if (!isTracking) return;
      const dx = position.current.x - trail.current.x;
      const dy = position.current.y - trail.current.y;
      
      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
        trail.current.x = position.current.x;
        trail.current.y = position.current.y;
        isTracking = false;
      } else {
        const speed = 0.15;
        trail.current.x += dx * speed;
        trail.current.y += dy * speed;
      }
      
      if (aura) {
        aura.style.transform = `translate3d(${trail.current.x - (isHovered ? 30 : 15)}px, ${trail.current.y - (isHovered ? 30 : 15)}px, 0)`;
      }
      
      if (isTracking) {
        animationFrameId = requestAnimationFrame(updateTrail);
      }
    };

    updateTrail();

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveMouse);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    // Dynamic scale expansion on buttons/interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-target')
      ) {
        setIsHovered(true);
        if (dot) dot.style.transform = `translate3d(${position.current.x - 4}px, ${position.current.y - 4}px, 0) scale(1.5)`;
        if (!isTracking) {
          isTracking = true;
          updateTrail();
        }
      } else {
        setIsHovered(false);
        if (dot) dot.style.transform = `translate3d(${position.current.x - 4}px, ${position.current.y - 4}px, 0) scale(1)`;
        if (!isTracking) {
          isTracking = true;
          updateTrail();
        }
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, isHovered]);

  return (
    <div className={!isVisible ? 'opacity-0' : 'opacity-100'}>
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        id="cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 bg-purple-400 rounded-full pointer-events-none z-50 transition-transform duration-75"
      />
      {/* Elastic Aura Outer Loop */}
      <div
        ref={auraRef}
        id="cursor-aura"
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 transition-all duration-300 ease-out border border-purple-500/30"
        style={{
          width: isHovered ? '60px' : '30px',
          height: isHovered ? '60px' : '30px',
          backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.02)',
          boxShadow: isHovered ? '0 0 20px rgba(168, 85, 247, 0.5)' : '0 0 4px rgba(168, 85, 247, 0.1)',
        }}
      />
    </div>
  );
}
