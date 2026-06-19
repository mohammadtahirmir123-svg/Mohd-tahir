import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

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
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Soft elastic trailing animation
  useEffect(() => {
    if (!isVisible) return;
    let animationFrameId: number;

    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Ease speed
        const speed = 0.15;
        return {
          x: prev.x + dx * speed,
          y: prev.y + dy * speed,
        };
      });
      animationFrameId = requestAnimationFrame(updateTrail);
    };

    updateTrail();

    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        id="cursor-dot"
        className="fixed top-0 left-0 w-2 h-2 bg-purple-400 rounded-full pointer-events-none z-50 transition-transform duration-75 mix-blend-screen"
        style={{
          transform: `translate3d(${position.x - 4}px, ${position.y - 4}px, 0) scale(${isHovered ? 1.5 : 1})`,
        }}
      />
      {/* Elastic Aura Outer Loop */}
      <div
        id="cursor-aura"
        className="fixed top-0 left-0 rounded-full pointer-events-none z-50 mix-blend-screen transition-all duration-300 ease-out border border-purple-500/30"
        style={{
          width: isHovered ? '60px' : '30px',
          height: isHovered ? '60px' : '30px',
          backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.02)',
          boxShadow: isHovered ? '0 0 20px rgba(168, 85, 247, 0.5)' : '0 0 4px rgba(168, 85, 247, 0.1)',
          transform: `translate3d(${trail.x - (isHovered ? 30 : 15)}px, ${trail.y - (isHovered ? 30 : 15)}px, 0)`,
        }}
      />
    </>
  );
}
