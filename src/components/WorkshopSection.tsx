import React, { useState, useEffect, useRef } from 'react';
import { WORKSHOP_TOPICS, WORKSHOP_BENEFITS } from '../data';
import { 
  BookOpen, Award, CheckCircle, Flame, Star, Sparkles, Terminal, 
  User, Mail, ArrowUpRight, Cpu, Layers, HardDrive, ShieldCheck, 
  Activity, Check, RotateCcw, ArrowRight, ArrowDown, HelpCircle, FileText,
  UploadCloud, Image, Palette, Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ThreeDSuccessAnimation from './ThreeDSuccessAnimation';

interface RegistrationData {
  name: string;
  email: string;
  experience: 'beginner' | 'intermediate' | 'pro';
  track: string;
  motivation: string;
  userPhoto?: string;
  avatarOption?: string;
  cardTheme?: string;
  cardFormat?: string;
}

export default function WorkshopSection() {
  const [hoveredTopic, setHoveredTopic] = useState<number | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    experience: 'beginner',
    track: 'AI Automation & Architecture',
    motivation: ''
  });

  // Photo & Avatar Selection States
  const [uploadedPhotoData, setUploadedPhotoData] = useState<string | null>(null);
  const [uploadedPhotoName, setUploadedPhotoName] = useState<string | null>(null);
  const [avatarOption, setAvatarOption] = useState<'cyberscout' | 'techwizard' | 'creative' | 'datamaster'>('cyberscout');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Card Style Customizer States
  const [activeTheme, setActiveTheme] = useState<'amethyst' | 'obsidian' | 'sovereign' | 'cobalt'>('amethyst');
  const [activeFormat, setActiveFormat] = useState<'id-badge' | 'diploma'>('id-badge');

  // Interactive 3D Card Hover Tilt Coordinates
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)' });
  const [glareOpacity, setGlareOpacity] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  
  // Activity / Interaction state for 3D layout reaction
  const [activeFormFocus, setActiveFormFocus] = useState<string | null>(null);

  // Lead registration statuses
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [completedTicket, setCompletedTicket] = useState<{
    studentId: string;
    timestamp: string;
    name: string;
    track: string;
    experience: string;
    userPhoto?: string;
    avatarOption?: string;
    cardTheme?: string;
    cardFormat?: string;
  } | null>(null);

  const [show3DSuccess, setShow3DSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeoutRefs = useRef<number[]>([]);

  // Local storage retention to avoid effort loss
  useEffect(() => {
    const cached = localStorage.getItem('mt_academy_interest');
    if (cached) {
      try {
        const ticket = JSON.parse(cached);
        setCompletedTicket(ticket);
        if (ticket.cardTheme) setActiveTheme(ticket.cardTheme);
        if (ticket.cardFormat) setActiveFormat(ticket.cardFormat);
        if (ticket.userPhoto) {
          setUploadedPhotoData(ticket.userPhoto);
          setUploadedPhotoName("Sync_From_Registry.png");
        }
        if (ticket.avatarOption) {
          setAvatarOption(ticket.avatarOption);
        }
      } catch (err) {
        console.error('Error reading registration ticket cache:', err);
      }
    }
  }, []);

  // Clear simulated runtimes
  const resetRun = () => {
    timeoutRefs.current.forEach(t => clearTimeout(t));
    timeoutRefs.current = [];
    setIsRegistering(false);
    setCurrentStep(-1);
    setSimLogs([]);
  };

  // Trigger registration flow simulation
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    resetRun();
    setIsRegistering(true);
    setCurrentStep(0);
    setSimLogs([`[INITIALISING_ADMISSION] Ingesting parameters for "${formData.name}"`]);

    const delay = 1400;

    // Step 1: Secure Security Layer & TLS
    const t1 = window.setTimeout(() => {
      setCurrentStep(1);
      setSimLogs(prev => [
        ...prev,
        `[SLA_TLS_SECURED] Validating domain auth of "${formData.email}"`,
        ` ▶ Packet verification status: SECURE_MD5_RESOLVED`,
        ` ▶ Mapping custom certificate block...`
      ]);
    }, delay);
    timeoutRefs.current.push(t1);

    // Step 2: Curriculum Lattice Integration
    const t2 = window.setTimeout(() => {
      setCurrentStep(2);
      setSimLogs(prev => [
        ...prev,
        `[ACADEMY_MAPPING] Allocating node paths for track: [ ${formData.track.toUpperCase()} ]`,
        ` ▶ Linking 12 microtopics from syllabus database`,
        ` ▶ Set node experience weights to level: ${formData.experience.toUpperCase()}`
      ]);
    }, delay * 2);
    timeoutRefs.current.push(t2);

    // Step 3: Write database & CRM sync
    const t3 = window.setTimeout(() => {
      setCurrentStep(3);
      setSimLogs(prev => [
        ...prev,
        `[PERSISTENCE_COMMIT] Writing atomic payload to secure cloud registry`,
        ` ▶ Generating unique registration key identifier...`,
        ` ▶ Transmitting webhook ping to Admin priority console`
      ]);
    }, delay * 3);
    timeoutRefs.current.push(t3);

    // Final: Resolve and output executive voucher ticket
    const t4 = window.setTimeout(() => {
      setCurrentStep(4);
      const studentId = `MT-ACAD-${Math.floor(100000 + Math.random() * 900000)}`;
      const timestamp = new Date().toLocaleString();
      
      const ticketInfo = {
        studentId,
        timestamp,
        name: formData.name,
        track: formData.track,
        experience: formData.experience,
        userPhoto: uploadedPhotoData || undefined,
        avatarOption: uploadedPhotoData ? undefined : avatarOption,
        cardTheme: activeTheme,
        cardFormat: activeFormat
      };

      // Set to state and cache to prevent user data loss
      setCompletedTicket(ticketInfo);
      localStorage.setItem('mt_academy_interest', JSON.stringify(ticketInfo));

      // Fire off live notification to Mohammad Tahir's contact number
      fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'academy',
          name: formData.name,
          email: formData.email,
          details: {
            track: formData.track,
            experience: formData.experience,
            motivation: formData.motivation,
            studentId
          }
        })
      }).catch(err => console.error("Failed to transmit academy registration notification:", err));

      setSimLogs(prev => [
        ...prev,
        `[COMPLETED] Student dispatch success!`,
        `🏆 Authorisation Key: ${studentId} // Dynamic system active.`
      ]);
      setIsRegistering(false);
      setShow3DSuccess(true);
    }, delay * 4);
    timeoutRefs.current.push(t4);
  };

  // Re-register reset helper
  const handleResetRegistration = () => {
    localStorage.removeItem('mt_academy_interest');
    setCompletedTicket(null);
    setFormData({
      name: '',
      email: '',
      experience: 'beginner',
      track: 'AI Automation & Architecture',
      motivation: ''
    });
    setUploadedPhotoData(null);
    setUploadedPhotoName(null);
    setAvatarOption('cyberscout');
    setActiveTheme('amethyst');
    setActiveFormat('id-badge');
    resetRun();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processPhotoFile(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processPhotoFile(file);
    }
  };

  const processPhotoFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Security validation failure: and file must be an image.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Performance warning: Photo is too large (must be under 2MB) for secure local sync.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedPhotoData(reader.result as string);
      setUploadedPhotoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  // Export ID Card / Certificate as high-res PNG image using HTML5 Canvas drawing
  const exportCardAsImage = () => {
    if (!completedTicket) return;

    const format = activeFormat;
    const theme = activeTheme;

    // Set dimensions based on format
    const canvasWidth = format === 'id-badge' ? 800 : 1200;
    const canvasHeight = format === 'id-badge' ? 1200 : 800;

    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Theme values mapping
    let primaryColor = '#a855f7';
    if (theme === 'obsidian') {
      primaryColor = '#10b981';
    } else if (theme === 'sovereign') {
      primaryColor = '#eab308';
    } else if (theme === 'cobalt') {
      primaryColor = '#06b6d4';
    }

    const drawContent = () => {
      // 1. Draw solid dark background
      ctx.fillStyle = '#060212';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // 2. Main cosmic backglow
      const gradient = ctx.createRadialGradient(
        canvasWidth / 2, canvasHeight / 2, 50,
        canvasWidth / 2, canvasHeight / 2, Math.max(canvasWidth, canvasHeight) / 1.5
      );
      gradient.addColorStop(0, `${primaryColor}22`);
      gradient.addColorStop(1, '#020006');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // 3. Grid texture overlay
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvasWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
      }
      for (let y = 0; y < canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
      }

      if (format === 'id-badge') {
        // --- DRAW ID BADGE ---
        // Lanyard Slot
        ctx.fillStyle = '#110c22';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(canvasWidth / 2 - 60, 40, 120, 30, 15);
        ctx.fill();
        ctx.stroke();

        // Card outer metal edge
        ctx.strokeStyle = `${primaryColor}aa`;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.roundRect(40, 100, canvasWidth - 80, canvasHeight - 160, 40);
        ctx.stroke();

        // Inner soft frame
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(50, 110, canvasWidth - 100, canvasHeight - 180, 30);
        ctx.stroke();

        // Holographic vertical strip
        const holoGrad = ctx.createLinearGradient(120, 0, 200, 0);
        holoGrad.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
        holoGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.18)');
        holoGrad.addColorStop(1, 'rgba(6, 182, 212, 0.12)');
        ctx.fillStyle = holoGrad;
        ctx.fillRect(100, 110, 80, canvasHeight - 180);

        // Header Title
        ctx.font = 'bold 22px monospace';
        ctx.fillStyle = primaryColor;
        ctx.textAlign = 'center';
        ctx.fillText('MOHAMMAD TAHIR DIGITAL ACADEMY', canvasWidth / 2, 170);

        ctx.font = '16px monospace';
        ctx.fillStyle = '#9ca3af';
        ctx.fillText('ACADEMIC ACCELERATOR // STUDENT PASS', canvasWidth / 2, 200);

        // Line Divider
        ctx.strokeStyle = `${primaryColor}44`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(100, 220);
        ctx.lineTo(canvasWidth - 100, 220);
        ctx.stroke();

        // Action Renderer for photo
        const drawAvatarBox = (imgSource?: HTMLImageElement) => {
          const avatarX = canvasWidth / 2 - 120;
          const avatarY = 260;
          const avatarW = 240;
          const avatarH = 240;

          // Avatar neon border frame
          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.roundRect(avatarX - 5, avatarY - 5, avatarW + 10, avatarH + 10, 20);
          ctx.stroke();

          // Clip region for photo
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(avatarX, avatarY, avatarW, avatarH, 16);
          ctx.clip();

          if (imgSource) {
            ctx.drawImage(imgSource, avatarX, avatarY, avatarW, avatarH);
          } else {
            // Draw default vectors Based on Choice
            ctx.fillStyle = '#0a0520';
            ctx.fillRect(avatarX, avatarY, avatarW, avatarH);

            const opt = completedTicket.avatarOption || 'cyberscout';
            const cx = avatarX + avatarW / 2;
            const cy = avatarY + avatarH / 2;

            if (opt === 'cyberscout') {
              ctx.strokeStyle = '#10b981';
              ctx.lineWidth = 3;
              ctx.beginPath();
              ctx.arc(cx, cy - 10, 45, 0, Math.PI * 2);
              ctx.stroke();
              ctx.fillStyle = '#10b981';
              ctx.fillRect(cx - 35, cy - 20, 70, 15);
              ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
              ctx.beginPath();
              ctx.moveTo(avatarX, cy + 20);
              ctx.lineTo(avatarX + avatarW, cy + 20);
              ctx.stroke();
            } else if (opt === 'techwizard') {
              const wizGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 65);
              wizGrad.addColorStop(0, '#a855f7');
              wizGrad.addColorStop(1, '#0c051a');
              ctx.fillStyle = wizGrad;
              ctx.beginPath();
              ctx.arc(cx, cy, 60, 0, Math.PI * 2);
              ctx.fill();
            } else if (opt === 'creative') {
              const cG = ctx.createLinearGradient(avatarX, avatarY, avatarX + avatarW, avatarY + avatarH);
              cG.addColorStop(0, '#ec4899');
              cG.addColorStop(0.5, '#f43f5e');
              cG.addColorStop(1, '#eab308');
              ctx.fillStyle = cG;
              ctx.beginPath();
              ctx.arc(cx, cy, 55, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.strokeStyle = '#eab308';
              ctx.lineWidth = 2.5;
              ctx.beginPath();
              ctx.arc(cx, cy, 50, 0, Math.PI * 2);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(cx - 30, cy);
              ctx.lineTo(cx + 30, cy);
              ctx.stroke();
            }
          }
          ctx.restore();

          // Standard Details Readout
          ctx.textAlign = 'left';
          ctx.font = 'bold 15px "JetBrains Mono", monospace';
          ctx.fillStyle = '#f3f4f6';

          const textStart = 570;
          ctx.fillText(`MEMBER TOKEN : ${completedTicket.studentId}`, 100, textStart);
          ctx.fillText(`FULL STUDENT : ${completedTicket.name.toUpperCase()}`, 100, textStart + 40);
          ctx.fillText(`CORE COURSE  : ${completedTicket.track.toUpperCase()}`, 100, textStart + 80);
          ctx.fillText(`LEVEL NODES  : ${completedTicket.experience.toUpperCase()} GRADIENT`, 100, textStart + 125);
          ctx.fillText(`SYSTEM STAMP : ${completedTicket.timestamp}`, 100, textStart + 170);

          // Barcode generator drawing
          const barY = 820;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(100, barY, canvasWidth - 200, 50);

          ctx.fillStyle = '#000000';
          let xOffset = 120;
          const idHash = completedTicket.studentId + '_M_T_M';
          for (let i = 0; i < idHash.length; i++) {
            const charCode = idHash.charCodeAt(i);
            const w1 = (charCode % 5) + 1;
            const w2 = ((charCode >> 1) % 4) + 1;
            ctx.fillRect(xOffset, barY, w1 * 2.5, 52);
            xOffset += (w1 + w2) * 3;
          }

          // Barcode ID label
          ctx.textAlign = 'center';
          ctx.font = '12px monospace';
          ctx.fillStyle = '#9ca3af';
          ctx.fillText(`* ${completedTicket.studentId} *`, canvasWidth / 2, barY + 75);

          // Signature Render
          ctx.textAlign = 'center';
          ctx.font = 'italic bold 28px "Georgia", serif';
          ctx.fillStyle = '#f3f4f6';
          ctx.fillText('Mohammad Tahir Mir', canvasWidth / 2 + 150, textStart + 125);
          ctx.font = '10px monospace';
          ctx.fillStyle = primaryColor;
          ctx.fillText('AUTHORIZED ADMISSION REGISTRAR', canvasWidth / 2 + 150, textStart + 148);

          // Digital hologram seal
          ctx.strokeStyle = `${primaryColor}aa`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(canvasWidth / 2 - 180, textStart + 125, 42, 0, Math.PI * 2);
          ctx.stroke();
          ctx.font = '8px monospace';
          ctx.fillStyle = primaryColor;
          ctx.fillText('OFFICIAL SEAL', canvasWidth / 2 - 180, textStart + 120);
          ctx.fillText('VERIFIED 100%', canvasWidth / 2 - 180, textStart + 132);

          // Launch file download anchor
          const url = canvas.toDataURL('image/png');
          const a = document.createElement('a');
          a.href = url;
          a.download = `admission_badge_${completedTicket.studentId}.png`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        };

        if (completedTicket.userPhoto) {
          const img = new window.Image();
          img.onload = () => drawAvatarBox(img);
          img.src = completedTicket.userPhoto;
        } else {
          drawAvatarBox();
        }

      } else {
        // --- DRAW DIPLOMA CERTIFICATE ---
        // Ornate thick borders
        ctx.strokeStyle = primaryColor;
        ctx.lineWidth = 14;
        ctx.beginPath();
        ctx.roundRect(30, 30, canvasWidth - 60, canvasHeight - 60, 20);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(42, 42, canvasWidth - 84, canvasHeight - 84, 15);
        ctx.stroke();

        // Emblem background seal watermark
        ctx.strokeStyle = `${primaryColor}10`;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(canvasWidth / 2, canvasHeight / 2, 160, 0, Math.PI * 2);
        ctx.stroke();

        // Certificate Header Typography
        ctx.textAlign = 'center';
        ctx.font = 'bold 36px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('MOHAMMAD TAHIR DIGITAL ACADEMY', canvasWidth / 2, 120);

        ctx.font = 'bold 15px monospace';
        ctx.fillStyle = primaryColor;
        ctx.fillText('═══════ ★ OFFICALLY ACCREDITED CERTIFICATE OF ADMISSION ★ ═══════', canvasWidth / 2, 165);

        // Center callout
        ctx.font = '300 17px "Inter", sans-serif';
        ctx.fillStyle = '#d1d5db';
        ctx.fillText('This document validates that the credentials of the candidate described below have been verified,', canvasWidth / 2, 235);
        ctx.fillText('and the named candidate is hereby admitted with honors to the Academic Accelerator.', canvasWidth / 2, 265);

        // Student's huge elegant name display
        ctx.font = 'bold 34px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(completedTicket.name.toUpperCase(), canvasWidth / 2, 345);

        // Border underline
        ctx.strokeStyle = `${primaryColor}aa`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2 - 200, 370);
        ctx.lineTo(canvasWidth / 2 + 200, 370);
        ctx.stroke();

        ctx.font = '300 16px "Inter", sans-serif';
        ctx.fillStyle = '#9ca3af';
        ctx.fillText('ADMITTED ACADEMY CANDIDATE', canvasWidth / 2, 395);

        // Track and details
        ctx.font = 'bold 18px monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`CURRICULUM TRACK: ${completedTicket.track.toUpperCase()}`, canvasWidth / 2, 450);
        ctx.font = '15px monospace';
        ctx.fillStyle = '#9ca3af';
        ctx.fillText(`LEVEL NODES: ${completedTicket.experience.toUpperCase()}`, canvasWidth / 2, 485);

        // Verification token serial
        ctx.font = '13px monospace';
        ctx.fillStyle = '#52525b';
        ctx.fillText(`VERIFIABLE REGISTRY SERIAL TOKEN: ${completedTicket.studentId}`, canvasWidth / 2, 540);

        const sigY = 640;

        // Draw Official Gold or Color Stamp Seal
        ctx.strokeStyle = `${primaryColor}be`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.arc(280, sigY, 48, 0, Math.PI * 2);
        ctx.stroke();
        ctx.font = 'bold 8.5px monospace';
        ctx.fillStyle = primaryColor;
        ctx.fillText('M.T. SIGNATURE SEAL', 280, sigY - 10);
        ctx.fillText('MASTER KEY', 280, sigY + 5);
        ctx.fillText('VERIFIEDOK', 280, sigY + 18);

        // Draw Calligraphy registrar signature
        ctx.textAlign = 'center';
        ctx.font = 'italic bold 32px "Georgia", serif';
        ctx.fillStyle = '#f3f4f6';
        ctx.fillText('Mohammad Tahir Mir', canvasWidth - 280, sigY);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(canvasWidth - 400, sigY + 15);
        ctx.lineTo(canvasWidth - 160, sigY + 15);
        ctx.stroke();

        ctx.font = '10px monospace';
        ctx.fillStyle = primaryColor;
        ctx.fillText('FOUNDING DIRECTOR & LEAD ACADEMIST', canvasWidth - 280, sigY + 30);

        // Auth stamp details bottom-left
        ctx.textAlign = 'left';
        ctx.font = '11.5px monospace';
        ctx.fillStyle = '#52525b';
        ctx.fillText(`AUTH DATE: ${completedTicket.timestamp}`, 80, 710);
        ctx.fillText(`PORTAL   : REGISTRY_CLOUD_SSL_NODE_ACTIVE`, 80, 730);

        // Download trigger
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `admission_diploma_${completedTicket.studentId}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    };

    drawContent();
  };

  // Web Browser Canvas render for 3D Isometric Curriculum Node Graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let rotationAngle = 0;

    // Define 6 nodes for the Isometric course loop representing the skill syllabus paths
    const programNodes = [
      { id: 'ai', title: 'AI Automation', subtitle: 'Gemini, Make, Zapier', xOffset: -120, zOffset: -60, color: '#a855f7' },
      { id: 'web', title: 'Fullstack Dev', subtitle: 'React, Node, Express', xOffset: 120, zOffset: -60, color: '#6366f1' },
      { id: 'ux', title: 'UI/UX & Design', subtitle: 'Figma Token Systems', xOffset: 120, zOffset: 60, color: '#3b82f6' },
      { id: 'brand', title: 'Personal Brand', subtitle: 'Authority Content', xOffset: -120, zOffset: 60, color: '#ec4899' },
      { id: 'ctr', title: 'Freelance Hustle', subtitle: 'Upwork, Fiverr Secrets', xOffset: 0, zOffset: -100, color: '#10b981' },
      { id: 'core', title: 'Mastery Base', subtitle: 'SLA Client Accrual', xOffset: 0, zOffset: 100, color: '#f59e0b' }
    ];

    const render = () => {
      if (!ctx || !canvas) return;
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 + 10;

      // Draw mathematical isometric platform floor
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.04)';
      ctx.lineWidth = 1;
      const floorSize = 160;
      for (let i = -5; i <= 5; i++) {
        const d = i * 32;
        // Line along X direction mapped to Iso projection
        ctx.beginPath();
        const startX1 = centerX + ( -floorSize + d) * Math.cos(Math.PI / 6);
        const startY1 = centerY + ( -floorSize - d) * Math.sin(Math.PI / 6);
        const endX1 = centerX + ( floorSize + d) * Math.cos(Math.PI / 6);
        const endY1 = centerY + ( floorSize - d) * Math.sin(Math.PI / 6);
        ctx.moveTo(startX1, startY1);
        ctx.lineTo(endX1, endY1);
        ctx.stroke();

        // Line along Z direction mapped to Iso projection
        ctx.beginPath();
        const startX2 = centerX + (d - floorSize) * Math.cos(-Math.PI / 6);
        const startY2 = centerY + (d + floorSize) * Math.sin(-Math.PI / 6);
        const endX2 = centerX + (d + floorSize) * Math.cos(-Math.PI / 6);
        const endY2 = centerY + (d - floorSize) * Math.sin(-Math.PI / 6);
        ctx.moveTo(startX2, startY2);
        ctx.lineTo(endX2, endY2);
        ctx.stroke();
      }

      // Draw glowing central energy matrix core representational structure
      const centralPulseRadius = 14 + Math.sin(Date.now() * 0.005) * 4;
      ctx.fillStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, centralPulseRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(124, 58, 237, 0.4)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, centralPulseRadius, 0, Math.PI * 2);
      ctx.fill();

      // Core anchor dot
      ctx.fillStyle = '#a855f7';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fill();

      // Continuous rotation velocity based on form interactive inputs
      const slowVelocity = 0.0025;
      const fastVelocity = 0.008;
      const targetVel = activeFormFocus ? fastVelocity : slowVelocity;
      rotationAngle += targetVel;

      // Project nodes in 3D Isometric Coordinates
      const projectedNodes = programNodes.map((node) => {
        // Rotate 3D points on Y-axis
        const cosAngle = Math.cos(rotationAngle);
        const sinAngle = Math.sin(rotationAngle);

        const rotatedX = node.xOffset * cosAngle - node.zOffset * sinAngle;
        const rotatedZ = node.xOffset * sinAngle + node.zOffset * cosAngle;

        // Project onto 2D viewport using isometric scales
        const isoX = centerX + (rotatedX - rotatedZ) * Math.cos(Math.PI / 6);
        const isoY = centerY + (rotatedX + rotatedZ) * Math.sin(Math.PI / 6) - 15; // Raised Y slightly for float

        return {
          ...node,
          x: isoX,
          y: isoY,
          depth: rotatedZ // Used for sorting or scaling if needed
        };
      });

      // Draw linking vectors matching the Academy connections (back to front)
      ctx.lineWidth = 1.5;
      projectedNodes.forEach((nodeA, index) => {
        // Draw linking laser line to the core center
        ctx.strokeStyle = activeFormFocus ? 'rgba(52, 211, 153, 0.12)' : 'rgba(168, 85, 247, 0.08)';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(nodeA.x, nodeA.y);
        ctx.stroke();

        // Connect adjacent nodes
        const nodeB = projectedNodes[(index + 1) % projectedNodes.length];
        ctx.strokeStyle = activeFormFocus ? 'rgba(16, 185, 129, 0.25)' : 'rgba(124, 58, 237, 0.18)';
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);
        ctx.stroke();

        // Animated information packet traveling down adjacent vector lines
        const pulseRatio = (Date.now() * 0.001) % 1.0;
        const pulseX = nodeA.x + (nodeB.x - nodeA.x) * pulseRatio;
        const pulseY = nodeA.y + (nodeB.y - nodeA.y) * pulseRatio;
        ctx.fillStyle = activeFormFocus ? '#10b981' : '#c084fc';
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw premium futuristic interactive pins on projected coordinates
      projectedNodes.forEach((node) => {
        // Pulsing rings for selected tracks
        const isFocusTrack = activeFormFocus && formData.track.toUpperCase().includes(node.id.toUpperCase());
        
        if (isFocusTrack) {
          const rGlow = 18 + Math.abs(Math.sin(Date.now() * 0.01)) * 8;
          ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, rGlow, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Base pin platform
        ctx.fillStyle = 'rgba(10, 5, 24, 0.95)';
        ctx.strokeStyle = isFocusTrack ? '#10b981' : 'rgba(168, 85, 247, 0.4)';
        ctx.lineWidth = isFocusTrack ? 2 : 1;
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Core bright led
        ctx.fillStyle = isFocusTrack ? '#10b981' : node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Node labels
        ctx.font = 'bold 8.5px monospace';
        ctx.fillStyle = isFocusTrack ? '#10b981' : '#f3f4f6';
        ctx.textAlign = 'center';
        ctx.fillText(node.title, node.x, node.y - 18);

        ctx.font = '7px monospace';
        ctx.fillStyle = 'rgba(156, 163, 175, 0.85)';
        ctx.fillText(node.subtitle, node.x, node.y - 30);
      });

      // Live 3D projection info readout text on top-left of canvas plane
      ctx.font = '7.5px monospace';
      ctx.fillStyle = 'rgba(124, 58, 237, 0.6)';
      ctx.textAlign = 'left';
      ctx.fillText(`CAM_PROJ: ISO_PERSPECTIVE_Y`, 15, 20);
      ctx.fillText(`VELOCITY: ${(targetVel * 1000).toFixed(1)}/PPS`, 15, 32);
      ctx.fillText(`MATRIX_NODES: ${programNodes.length} ACTIVE`, 15, 44);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeFormFocus, formData.track]);

  return (
    <section id="workshop" className="relative py-24 sm:py-32 bg-[#03000b] overflow-hidden">
      {/* Background futuristic components */}
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] bg-indigo-950/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[350px] h-[350px] bg-purple-950/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* Hex grid dynamic template overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.01)_1.5px,transparent_1.5px)] bg-[size:100%_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-purple-400 font-bold block mb-3">
            LEARN THE DIGITAL ART & AUTOMATION MASTERY
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
            Skill Training + Admission Registrations
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto font-light leading-relaxed font-sans">
            "I teach practical, elite digital programs to help freelancers, creators, and business minds scale their tech stack and build active streams of revenue."
          </p>
          <div className="mt-4 h-[2px] w-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent mx-auto" />
        </div>

        {/* Master Bento Multi-Panel Grid for Learning Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 3D Isometric Curriculum & Course Highlights (5 columns wide) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* 3D Real-time interactive projection node box */}
            <div className="glass-panel p-5 rounded-3xl relative overflow-hidden flex-1 flex flex-col justify-between group select-none min-h-[300px]">
              {/* Scanlines element for look and feel */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,10,36,0)_98%,rgba(168,85,247,0.02)_2%)] bg-[size:100%_4px] opacity-25 pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-purple-500/10 pb-3">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping mr-1" />
                  <span className="font-mono text-[9px] text-purple-400 uppercase tracking-widest font-black">
                    3D_ACADEMY_CURRICULUM_LATTICE
                  </span>
                </div>
                <span className="font-mono text-[8px] text-gray-500">LIVE RENDER</span>
              </div>

              {/* Real 3D canvas viewport */}
              <div className="relative flex-1 min-h-[220px] my-3">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
              </div>

              {/* Quick tip text */}
              <div className="bg-purple-950/10 border border-purple-500/10 p-3 rounded-xl text-left">
                <p className="text-[10px] text-gray-300 leading-normal font-mono">
                  <span className="text-purple-400 font-bold">&#62; INF_MATRIX:</span> Interact with the form selectors on the right to accelerate lattice simulation or highlight targeted track pathways.
                </p>
              </div>
            </div>

            {/* Microtopics badges pool */}
            <div className="glass-panel p-6 rounded-3xl text-left bg-[#0a0518]/60 relative overflow-hidden">
              <span className="font-mono text-[8.5px] text-gray-500 uppercase tracking-widest block mb-4">
                COURSE SYLLABUS DIRECTORIES
              </span>
              <div className="flex flex-wrap gap-2">
                {WORKSHOP_TOPICS.map((topic, i) => (
                  <span
                    key={i}
                    onMouseEnter={() => setHoveredTopic(i)}
                    onMouseLeave={() => setHoveredTopic(null)}
                    className={`px-3 py-1.5 rounded-lg border font-mono text-[9.5px] transition-all duration-200 select-none cursor-default ${
                      hoveredTopic === i
                        ? 'bg-purple-500/20 border-purple-400 text-white shadow-md'
                        : 'bg-purple-500/5 border-purple-500/10 text-gray-400'
                    }`}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Interactive Admission Form / Ticket Voucher (7 columns wide) */}
          <div className="lg:col-span-7 flex flex-col justify-stretch">
            
            <AnimatePresence mode="wait">
              {!completedTicket ? (
                /* ADMISSION FORM SCREEN */
                <motion.div
                  key="admission_form"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between bg-[#0a0518]/90 border border-purple-500/20 relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full pointer-events-none" />

                  {/* Terminal Header */}
                  <div className="flex items-center justify-between border-b border-purple-500/15 pb-4 mb-6 text-left">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-4 h-4 text-purple-400" />
                      <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest font-bold">
                        Academy Registration Desk
                      </span>
                    </div>
                    <span className="text-[8px] font-mono bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-md uppercase tracking-wider font-extrabold flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                      SECURE_TLS
                    </span>
                  </div>

                  {/* Program Description summary */}
                  <p className="text-gray-300 text-xs text-left leading-relaxed mb-6 font-sans">
                    Submit your details below to express interest in booking private mentorship, custom workshop tracks, or custom masterclasses. On submit, our custom database maps out your tailored roadmap.
                  </p>

                  {/* Direct submission form */}
                  <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
                    
                    {/* Grid Name / Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block mb-1.5">
                          Student Full Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            onFocus={() => {
                              setActiveFormFocus('name');
                            }}
                            onBlur={() => setActiveFormFocus(null)}
                            className="w-full bg-black/45 border border-purple-500/15 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email input */}
                      <div>
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block mb-1.5">
                          Business Email <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="mail@yourdomain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            onFocus={() => {
                              setActiveFormFocus('email');
                            }}
                            onBlur={() => setActiveFormFocus(null)}
                            className="w-full bg-black/45 border border-purple-500/15 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Interactive Level Segmented Select */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block mb-1.5">
                        Current Technical Experience Level
                      </label>
                      <div className="grid grid-cols-3 gap-2 bg-black/50 p-1 rounded-xl border border-purple-500/10 font-mono text-[10px]">
                        {(['beginner', 'intermediate', 'pro'] as const).map((level) => (
                          <button
                            key={level}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, experience: level });
                              setActiveFormFocus(level);
                              setTimeout(() => setActiveFormFocus(null), 800);
                            }}
                            className={`py-2 text-center rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                              formData.experience === level
                                ? 'bg-purple-500/15 border border-purple-500/35 text-white font-black shadow-md'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                          >
                            {level}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Card Format & Theme Controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-purple-500/10 pt-4">
                      {/* Card Format Selector */}
                      <div>
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block mb-1.5">
                          Admission Card Format Style
                        </label>
                        <div className="grid grid-cols-2 gap-2 bg-black/55 p-1 rounded-xl border border-purple-500/10 text-[10px] font-mono">
                          <button
                            type="button"
                            onClick={() => setActiveFormat('id-badge')}
                            className={`py-2 px-1 text-center rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                              activeFormat === 'id-badge'
                                ? 'bg-purple-500/15 border border-purple-500/35 text-white font-bold'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                          >
                            <Layout className="w-3.5 h-3.5 font-bold animate-pulse text-purple-400" />
                            <span>ID Badge</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveFormat('diploma')}
                            className={`py-2 px-1 text-center rounded-lg uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1.5 ${
                              activeFormat === 'diploma'
                                ? 'bg-purple-500/15 border border-purple-500/35 text-white font-bold'
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                          >
                            <Award className="w-3.5 h-3.5 font-bold text-amber-400" />
                            <span>Diploma</span>
                          </button>
                        </div>
                      </div>

                      {/* Card Color Theme Presets */}
                      <div>
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block mb-1.5">
                          Admission Card Theme Tone
                        </label>
                        <div className="grid grid-cols-4 gap-1 bg-black/55 p-1 rounded-xl border border-purple-500/10 h-[38px] items-center">
                          {[
                            { id: 'amethyst', color: 'bg-purple-500', name: 'Amethyst' },
                            { id: 'obsidian', color: 'bg-emerald-500', name: 'Obsidian' },
                            { id: 'sovereign', color: 'bg-yellow-500', name: 'Sovereign' },
                            { id: 'cobalt', color: 'bg-cyan-500', name: 'Cobalt' }
                          ].map((themeItem) => (
                            <button
                              key={themeItem.id}
                              type="button"
                              title={themeItem.name}
                              onClick={() => setActiveTheme(themeItem.id as any)}
                              className={`w-6 h-6 rounded-full mx-auto transition-transform ${themeItem.color} cursor-pointer flex items-center justify-center relative ${
                                activeTheme === themeItem.id
                                  ? 'scale-110 ring-2 ring-white/50 shadow-md'
                                  : 'hover:scale-105 opacity-60 hover:opacity-90'
                              }`}
                            >
                              {activeTheme === themeItem.id && (
                                <span className="absolute inset-0 rounded-full border border-white animate-ping opacity-30" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Photo Upload & Holographic Preset Selector */}
                    <div className="border-t border-purple-500/10 pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider">
                          Identity Verification Node (Photo vs Hologram Preset)
                        </label>
                        {uploadedPhotoData && (
                          <button
                            type="button"
                            onClick={() => {
                              setUploadedPhotoData(null);
                              setUploadedPhotoName(null);
                            }}
                            className="font-mono text-[8px] text-rose-400 hover:text-rose-300 uppercase underline cursor-pointer"
                          >
                            Reset Custom Photo
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Drag and Drop Zone */}
                        <div
                          onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                          }}
                          onDragLeave={() => setIsDragging(false)}
                          onDrop={handleFileDrop}
                          onClick={triggerFileSelect}
                          className={`bg-black/50 border rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all h-[115px] ${
                            isDragging
                              ? 'border-purple-400 bg-purple-500/5 shadow-inner'
                              : uploadedPhotoData
                              ? 'border-emerald-500/40 bg-emerald-500/5'
                              : 'border-purple-500/10 hover:border-purple-500/30'
                          }`}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                          {uploadedPhotoData ? (
                            <div className="flex items-center space-x-3 text-left w-full">
                              <img
                                src={uploadedPhotoData}
                                alt="Student upload preview"
                                className="w-12 h-12 rounded-xl object-cover border border-emerald-400/35 shadow-md flex-shrink-0"
                              />
                              <div className="truncate">
                                <span className="text-[10px] text-emerald-400 font-mono uppercase block font-bold">Photo Integrated</span>
                                <span className="text-[9px] text-gray-400 truncate block mt-0.5 max-w-[120px]">{uploadedPhotoName}</span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <UploadCloud className="w-6 h-6 text-purple-400 mb-1.5 animate-bounce" />
                              <span className="text-[10px] text-gray-200 font-bold">Drag & Drop Photo</span>
                              <span className="text-[7.5px] text-gray-500 mt-0.5">Under 2MB (PNG, JPG, WebP)</span>
                            </>
                          )}
                        </div>

                        {/* Presets Grid */}
                        <div className={`p-2 bg-black/45 border rounded-2xl flex flex-col justify-between h-[115px] transition-opacity ${
                          uploadedPhotoData ? 'opacity-30 pointer-events-none' : 'border-purple-[15%]/10'
                        }`}>
                          <span className="font-mono text-[7.5px] text-gray-400 uppercase tracking-widest pl-1 leading-normal">
                            Or holographic token preset
                          </span>
                          <div className="grid grid-cols-2 gap-1.5 pt-1">
                            {[
                              { id: 'cyberscout', label: '🛡️ SCOUT', color: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/5' },
                              { id: 'techwizard', label: '🔮 WIZARD', color: 'border-purple-500/30 text-purple-300 bg-purple-500/5' },
                              { id: 'creative', label: '🎨 DIGIART', color: 'border-pink-500/30 text-pink-300 bg-pink-500/5' },
                              { id: 'datamaster', label: '📊 STACKS', color: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/5' }
                            ].map((preset) => (
                              <button
                                key={preset.id}
                                type="button"
                                onClick={() => setAvatarOption(preset.id as any)}
                                className={`py-1.5 px-1 text-center rounded-xl border text-[8.5px] font-mono uppercase font-black tracking-tight transition-all cursor-pointer ${
                                  !uploadedPhotoData && avatarOption === preset.id
                                    ? `${preset.color} ring-1 ring-white/20 scale-[1.03] outline-none shadow-md`
                                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-white/5'
                                }`}
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mastery Target Program track selector dropdown */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block mb-1.5">
                        Choose Your Target Mastery Program Track
                      </label>
                      <select
                        value={formData.track}
                        onChange={(e) => {
                          setFormData({ ...formData, track: e.target.value });
                          // Briefly set input focus for visual reaction on 3D loop
                          setActiveFormFocus(e.target.value);
                          setTimeout(() => setActiveFormFocus(null), 1000);
                        }}
                        className="w-full bg-black/45 border border-purple-500/15 focus:border-purple-500/50 rounded-xl px-4 py-3 text-xs text-purple-200 focus:outline-none transition-colors font-sans cursor-pointer"
                      >
                        <option value="AI Automation & Architecture">AI Automation & Enterprise Agent Systems</option>
                        <option value="Fullstack Web Agency">Fullstack Web App Design (React, Node, Express)</option>
                        <option value="UI/UX & Design Systems">UI/UX Figma Architecture & PS Brand Strategy</option>
                        <option value="Freelancing & Upwork Rank">Freelance Agency Growth & Upwork secrets</option>
                      </select>
                    </div>

                    {/* Main Motivation */}
                    <div>
                      <label className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block mb-1.5">
                        Learning Motivations / Custom Goals (Optional)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="What are your goals or expectations?"
                        value={formData.motivation}
                        onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                        onFocus={() => {
                          setActiveFormFocus('motivation');
                        }}
                        onBlur={() => setActiveFormFocus(null)}
                        className="w-full bg-black/45 border border-purple-500/15 focus:border-purple-500/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-colors font-sans resize-none"
                      />
                    </div>

                    {/* $30 USD / Month Program Transparency Alert Box */}
                    <div className="bg-purple-950/20 border border-purple-500/20 rounded-xl p-3.5 mt-2 space-y-1.5 text-left">
                      <div className="flex items-center space-x-2 text-purple-300 font-mono text-[9px] font-black uppercase tracking-wider">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Accelerator Tuition Disclosure</span>
                      </div>
                      <p className="text-gray-300 text-[10.5px] font-sans leading-relaxed">
                        By submitting this enrollment profile for Mohammad Tahir's digital academy accelerators, you acknowledge a premium program tuition fee of <strong className="text-emerald-400 font-extrabold text-[12px]">$30 USD per month</strong>. This ensures daily personalized mentoring, instant Slack code analysis, and guaranteed remote industry coaching sessions.
                      </p>
                      <div className="flex items-center space-x-2.5 pt-1">
                        <input 
                          type="checkbox" 
                          required 
                          id="monthlyCostAgreement"
                          className="w-3.5 h-3.5 accent-purple-500 rounded border-purple-500/20 bg-black/50 cursor-pointer" 
                        />
                        <label htmlFor="monthlyCostAgreement" className="text-[9px] font-mono text-gray-400 cursor-pointer select-none">
                          I acknowledge & accept the $30/month training cost <span className="text-rose-500 font-bold">*</span>
                        </label>
                      </div>
                    </div>

                    {/* Progress details showing interactive simulation status if launching */}
                    {isRegistering && (
                      <div className="bg-black/85 border border-purple-500/25 p-3 rounded-xl font-mono text-[9.5px] mt-4 space-y-1 overflow-hidden max-h-[140px]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-purple-400 uppercase font-black tracking-widest text-[8px] flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping mr-1" />
                            TELEMETRY_PIPELINE_RUNNING
                          </span>
                          <span className="text-gray-500">Node sync: Staging</span>
                        </div>
                        <div className="space-y-1 text-[#f3f4f6] opacity-90 text-left">
                          {simLogs.map((log, i) => (
                            <div key={i} className="truncate select-none">
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action trigger button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isRegistering}
                        className={`w-full py-3.5 rounded-xl font-mono text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center space-x-2 border ${
                          isRegistering
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-purple-400/20 text-white shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:scale-[1.01] active:scale-[0.98]'
                        }`}
                      >
                        {isRegistering ? (
                          <>
                            <RotateCcw className="w-4 h-4 animate-spin text-purple-400" />
                            <span>Tracing System Lattice...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 text-purple-300" />
                            <span>Submit Admission Profile & Trigger 3D Check</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>

                  {/* Footer status label */}
                  <div className="mt-6 pt-5 border-t border-purple-500/10 flex items-center justify-between text-[8px] font-mono uppercase text-gray-500">
                    <span>Direct Admin dispatch</span>
                    <span>100% Secure private consultation</span>
                  </div>

                </motion.div>
              ) : (
                /* ACCREDITED REGISTRATION SLIP TICKET VOUCHER */
                <motion.div
                  key="authorised_ticket"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel rounded-3xl p-6 sm:p-8 flex-1 flex flex-col justify-between bg-[#0a0518]/95 border border-emerald-500/35 relative overflow-hidden text-left"
                >
                  {/* Green ambient visual glow details */}
                  <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.01)_98%,rgba(16,185,129,0.03)_2%)] bg-[size:100%_4px] opacity-25 pointer-events-none" />

                  {/* Ticket frame decoration */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Award className="w-4.5 h-4.5 text-emerald-400" />
                        <span className="font-mono text-[9px] text-[#10b981] uppercase tracking-[0.2em] font-black">
                          ACCREDITED INTERACTIVE VOUCHER
                        </span>
                      </div>
                      <span className="text-[8px] font-mono bg-emerald-500/10 border border-emerald-300/30 text-emerald-300 px-2 py-0.5 rounded uppercase font-extrabold tracking-wider">
                        STATUS: RESOLVED
                      </span>
                    </div>

                    {/* Visual Card / Certificate Live HUD Preview */}
                    <div className="mb-6 p-4 sm:p-5 bg-black/60 rounded-2xl border border-white/5 relative flex flex-col items-center">
                      <span className="font-mono text-[7px] text-gray-500 uppercase tracking-[0.2em] block mb-3.5 text-center">
                        LIVE HUD RENDERING (3D GYRO TILT STABILIZED)
                      </span>

                      {/* Floating Card Canvas */}
                      <div
                        onMouseMove={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const x = e.clientX - rect.left;
                          const y = e.clientY - rect.top;
                          const xc = rect.width / 2;
                          const yc = rect.height / 2;
                          const rotX = (yc - y) / 10;
                          const rotY = (x - xc) / 10;
                          setTiltStyle({
                            transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`
                          });
                          setGlareOpacity(0.4);
                          setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
                        }}
                        onMouseLeave={() => {
                          setTiltStyle({
                            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
                          });
                          setGlareOpacity(0);
                        }}
                        style={tiltStyle}
                        className={`relative transition-all duration-200 ease-out select-none overflow-hidden rounded-2xl border-2 shadow-[0_20px_50px_rgba(0,0,0,0.65)] bg-[#04010a] ${
                          activeTheme === 'amethyst'
                            ? 'border-purple-500/40 shadow-purple-500/10'
                            : activeTheme === 'obsidian'
                            ? 'border-emerald-500/40 shadow-emerald-500/10'
                            : activeTheme === 'sovereign'
                            ? 'border-yellow-500/40 shadow-yellow-500/10'
                            : 'border-cyan-500/40 shadow-cyan-500/10'
                        } ${
                          activeFormat === 'id-badge'
                            ? 'w-[230px] h-[345px] py-6 px-4 flex flex-col justify-between text-center'
                            : 'w-[325px] sm:w-[350px] h-[225px] p-5 flex flex-col justify-between'
                        }`}
                      >
                        {/* Glare effect */}
                        <div
                          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(circle 100px at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 80%)`,
                            opacity: glareOpacity
                          }}
                        />

                        {activeFormat === 'id-badge' ? (
                          <>
                            {/* Lanyard Top slot */}
                            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded bg-black/80 border border-white/10" />

                            {/* Header details */}
                            <div className="pt-2 text-center">
                              <span className={`font-mono text-[7px] block font-black uppercase tracking-widest ${
                                activeTheme === 'amethyst' ? 'text-purple-400' : activeTheme === 'obsidian' ? 'text-emerald-400' : activeTheme === 'sovereign' ? 'text-yellow-400' : 'text-cyan-400'
                              }`}>
                                Mohammad Tahir Academy
                              </span>
                              <span className="font-mono text-[6px] text-gray-400 block tracking-[0.1em] mt-0.5">ACCREDITED PASS</span>
                            </div>

                            {/* Center Avatar frame */}
                            <div className="my-3 flex justify-center">
                              <div className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 p-0.5 ${
                                activeTheme === 'amethyst' ? 'border-purple-500/50' : activeTheme === 'obsidian' ? 'border-emerald-500/50' : activeTheme === 'sovereign' ? 'border-yellow-500/50' : 'border-cyan-500/50'
                              }`}>
                                {completedTicket.userPhoto ? (
                                  <img
                                    src={completedTicket.userPhoto}
                                    alt="Student badge avatar"
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-black flex items-center justify-center rounded-lg">
                                    {completedTicket.avatarOption === 'cyberscout' ? (
                                      <span className="text-xl">🛡️</span>
                                    ) : completedTicket.avatarOption === 'techwizard' ? (
                                      <span className="text-xl">🔮</span>
                                    ) : completedTicket.avatarOption === 'creative' ? (
                                      <span className="text-xl">🎨</span>
                                    ) : (
                                      <span className="text-xl">📊</span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Core meta details */}
                            <div>
                              <span className="font-display font-black text-[12px] text-white block truncate uppercase px-1">
                                {completedTicket.name}
                              </span>
                              <span className="font-mono text-[7px] text-gray-400 block tracking-wider uppercase mt-1">
                                {completedTicket.track.split(' ')[0]} Specialist
                              </span>
                              
                              <div className="flex items-center justify-center space-x-1.5 mt-2 bg-black/60 py-1 px-1.5 rounded-lg border border-white/5 mx-2">
                                <Award className={`w-3 h-3 ${
                                  activeTheme === 'amethyst' ? 'text-purple-400' : activeTheme === 'obsidian' ? 'text-emerald-400' : activeTheme === 'sovereign' ? 'text-yellow-400' : 'text-cyan-400'
                                }`} />
                                <span className={`font-mono text-[6.5px] uppercase tracking-wider font-extrabold ${
                                  activeTheme === 'amethyst' ? 'text-purple-300' : activeTheme === 'obsidian' ? 'text-emerald-300' : activeTheme === 'sovereign' ? 'text-yellow-300' : 'text-cyan-300'
                                }`}>
                                  {completedTicket.experience} level
                                </span>
                              </div>
                            </div>

                            {/* Lanyard pass logo and barcode placeholder */}
                            <div className="border-t border-purple-500/10 pt-2 flex flex-col items-center">
                              {/* Custom barcode effect */}
                              <div className="w-28 h-5 bg-white rounded-xs p-0.5 flex space-x-[1.5px] items-stretch">
                                {[1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 1, 2, 3, 4, 1, 2].map((w, index) => (
                                  <div
                                    key={index}
                                    style={{ flexGrow: w }}
                                    className="bg-black shrink-0"
                                  />
                                ))}
                              </div>
                              <span className="text-[6.1px] font-mono text-gray-500 mt-1 uppercase tracking-wider select-none">
                                SEC_ID // {completedTicket.studentId}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Diploma Certificate style preview */}
                            <div className="border border-white/5 rounded-lg p-3 flex flex-col justify-between h-full bg-black/35 relative">
                              {/* Background watermark icon */}
                              <Award className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-[0.04] ${
                                activeTheme === 'amethyst' ? 'text-purple-500' : activeTheme === 'obsidian' ? 'text-emerald-500' : activeTheme === 'sovereign' ? 'text-yellow-500' : 'text-cyan-500'
                              }`} />

                              {/* Header design */}
                              <div className="text-center border-b border-white/5 pb-1.5">
                                <span className="font-mono text-[7px] text-gray-400 block tracking-widest uppercase">
                                  MOHAMMAD TAHIR DIGITAL ACADEMY
                                </span>
                                <span className={`font-mono text-[5.5px] tracking-[0.15em] uppercase font-black ${
                                  activeTheme === 'amethyst' ? 'text-purple-400' : activeTheme === 'obsidian' ? 'text-emerald-400' : activeTheme === 'sovereign' ? 'text-yellow-400' : 'text-cyan-400'
                                }`}>
                                  ACCREDITED ADMISSIONS ACCELERATOR
                                </span>
                              </div>

                              {/* Center body */}
                              <div className="text-center my-1.5">
                                <p className="text-[5px] text-gray-400 leading-tight">This represents official confirmation of student registration</p>
                                <span className="font-sans font-bold text-xs text-white block mt-1 uppercase tracking-wide">
                                  {completedTicket.name}
                                </span>
                                <div className={`w-20 h-0.5 mx-auto my-1 ${
                                  activeTheme === 'amethyst' ? 'bg-purple-500/50' : activeTheme === 'obsidian' ? 'bg-emerald-500/50' : activeTheme === 'sovereign' ? 'bg-yellow-500/50' : 'bg-cyan-500/50'
                                }`} />
                                <p className="text-[5.5px] text-gray-300 leading-normal truncate px-2">
                                  Track: {completedTicket.track}
                                </p>
                              </div>

                              {/* Stamp, seal, date */}
                              <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-1.5 text-left">
                                <div>
                                  <span className="font-mono text-[4.8px] text-gray-500 block">SERIAL CODE</span>
                                  <span className="font-mono text-[5.5px] text-gray-300 uppercase block font-bold">{completedTicket.studentId}</span>
                                </div>
                                <div className="text-center">
                                  <div className={`w-4 h-4 rounded-full border border-dashed flex items-center justify-center p-0.5 mx-auto ${
                                    activeTheme === 'amethyst' ? 'border-purple-500/60' : activeTheme === 'obsidian' ? 'border-emerald-500/60' : activeTheme === 'sovereign' ? 'border-yellow-500/60' : 'border-cyan-500/60'
                                  }`}>
                                    <span className="text-[4px] font-mono leading-none">M.T.</span>
                                  </div>
                                  <span className="font-mono text-[4px] text-gray-500 block mt-0.5">ACADEMY SEAL</span>
                                </div>
                                <div className="text-right">
                                  <span className="font-mono text-[4.8px] text-gray-500 block">VERIFIED TIME</span>
                                  <span className="font-mono text-[5.5px] text-gray-300 block font-bold">{completedTicket.timestamp.split('T')[0]}</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Core Authorization Board */}
                    <div className="space-y-4">
                      <div>
                        <span className="font-mono text-[7px] text-gray-400 uppercase tracking-widest block font-bold">
                          REGISTRATION IDENTIFICATION TOKEN
                        </span>
                        <span className="text-xl sm:text-2xl text-white font-extrabold font-display uppercase tracking-widest select-all">
                          {completedTicket.studentId}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 border-t border-b border-white/5 py-4">
                        <div>
                          <span className="font-mono text-[7px] text-gray-400 uppercase tracking-widest block font-bold">Student Name</span>
                          <span className="text-xs text-gray-100 font-bold mt-0.5 block">{completedTicket.name}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[7px] text-gray-400 uppercase tracking-widest block font-bold">Target Mastery Program</span>
                          <span className="text-xs text-purple-300 font-bold mt-0.5 block">{completedTicket.track}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[7px] text-gray-400 uppercase tracking-widest block font-bold">Node Weights</span>
                          <span className="text-xs text-amber-300 font-mono mt-0.5 block uppercase tracking-wider">{completedTicket.experience} level</span>
                        </div>
                        <div>
                          <span className="font-mono text-[7px] text-gray-400 uppercase tracking-widest block font-bold">Verified Timestamp</span>
                          <span className="text-[10px] text-gray-400 font-mono mt-0.5 block leading-normal">{completedTicket.timestamp}</span>
                        </div>
                      </div>

                      {/* SLA Success Note */}
                      <div className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-2xl flex items-start space-x-3.5">
                        <CheckCircle className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <h5 className="font-display font-medium text-xs text-white uppercase tracking-wide">Admission Record Active!</h5>
                          <p className="text-gray-300 text-[10px] sm:text-[11px] leading-relaxed mt-1 font-light font-sans">
                            Your admissions telemetry score has been compiled and saved locally. Your chosen track was successfully registered under the <strong className="text-emerald-400 font-bold">$30 USD per month</strong> training plan.
                          </p>
                        </div>
                      </div>

                      {/* Immediate Connect Board */}
                      <div className="bg-purple-950/20 border border-purple-500/20 p-4 rounded-2xl text-left space-y-3">
                        <h5 className="font-display font-black text-[10px] text-purple-300 uppercase tracking-widest flex items-center space-x-1.5">
                          <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                          <span>CONNECT IMMEDIATELY FOR KICKOFF</span>
                        </h5>
                        <p className="text-gray-300 text-[10.5px] leading-relaxed font-sans font-light">
                          Your telemetry profile has automatically dispatched a notification to Mohammad Tahir. To accelerate setup and coordinate the $30/mo invoicing plan, you can immediately initiate a contact request:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[9px] uppercase font-bold">
                          <a 
                            href="https://wa.me/916005820321?text=Hi%20Tahir,%20I%20have%20just%20registered%20for%20your%20Mastery%20Program!"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-emerald-500 hover:bg-emerald-400 text-black font-black py-2.5 px-3 rounded-lg text-center transition-colors shadow-sm flex items-center justify-center space-x-1"
                          >
                            <span>💬 WhatsApp message</span>
                          </a>
                          <a 
                            href="tel:+916005820321"
                            className="bg-purple-500 hover:bg-purple-400 text-white font-black py-2.5 px-3 rounded-lg text-center transition-colors shadow-sm flex items-center justify-center space-x-1"
                          >
                            <span>📞 Call Direct Line</span>
                          </a>
                          <a 
                            href="mailto:mohammadtahirmir123@gmail.com?subject=Mentorship Workshop Admission Query"
                            className="sm:col-span-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-purple-500/10 hover:border-purple-500/35 py-2.5 px-3 rounded-lg text-center transition-all flex items-center justify-center space-x-1"
                          >
                            <span>✉️ Dispatch Direct Email</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions to Export or clear */}
                  <div className="relative z-10 mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={handleResetRegistration}
                      className="w-full sm:w-auto px-4 py-2 font-mono text-[8.5px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center space-x-1.5 border border-white/10 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Submit New Profile</span>
                    </button>

                    <button
                      onClick={exportCardAsImage}
                      className="w-full sm:w-auto px-4.5 py-2 font-mono text-[9px] font-black uppercase tracking-widest bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-300 rounded-lg transition-colors flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>Export Admission Record</span>
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Outer Benefits checklist grid (stuck at bottom natively in bento layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          {WORKSHOP_BENEFITS.slice(0, 3).map((benefit, i) => (
            <div
              key={i}
              className="glass-panel p-5.5 rounded-2xl border border-purple-500/10 hover:border-purple-500/25 transition-all duration-300 bg-[#0a0518]/30 flex items-start space-x-4"
            >
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/15 text-purple-300 shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="font-display font-medium text-xs uppercase tracking-wider text-white">
                  {benefit.title}
                </h4>
                <p className="text-gray-400 text-[11px] mt-1.5 font-light leading-normal font-sans">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 3D Cinematic Holographic Admission Success Animation Overlay */}
      <AnimatePresence>
        {show3DSuccess && completedTicket && (
          <ThreeDSuccessAnimation
            completedTicket={completedTicket}
            onClose={() => setShow3DSuccess(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
