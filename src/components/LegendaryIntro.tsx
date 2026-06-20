import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  Play, 
  Volume2, 
  VolumeX, 
  SkipForward, 
  RefreshCw, 
  ShieldAlert, 
  Network
} from 'lucide-react';

interface LegendaryIntroProps {
  onComplete: () => void;
}

export default function LegendaryIntro({ onComplete }: LegendaryIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  
  const [currentPhase, setCurrentPhase] = useState<'init' | 'space' | 'blackhole' | 'wormhole' | 'impact' | 'shards' | 'assembly'>('init');
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [skipHovered, setSkipHovered] = useState(false);

  // Safe ref logs to render in the custom HUD viewport
  const addLog = (text: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setTelemetryLogs(prev => [...prev.slice(-8), `[${time}] ${text}`]);
  };

  // Speaks an attractive, louder, high-pitch synthetic voice welcoming the user
  const speakWelcomeLegacy = () => {
    if (!audioEnabled) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance("Initializing portfolio system... Access granted. Welcome to the digital universe of Mohd Tahir. Software Engineer. Full-Stack Developer. A I Enthusiast. Architect of intelligent solutions. Transforming ideas into scalable experiences. Explore the future. Experience innovation.");
        
        // Deep authoritative male settings
        utterance.pitch = 0.85; // Low pitch for deep masculine tone
        utterance.rate = 0.92;  // Slightly slower, calm and powerful pace
        utterance.volume = 1.0; // Max volume input
        
        const voices = window.speechSynthesis.getVoices();
        
        // Select deep male voice
        const maleVoice = voices.find(v => {
          const name = v.name.toLowerCase();
          return (name.includes("male") || name.includes("david") || name.includes("daniel") || name.includes("premium") || name.includes("google us english")) && v.lang.startsWith("en");
        }) || voices.find(v => {
          const name = v.name.toLowerCase();
          return name.includes("natural") || name.includes("premium") || name.includes("google") || name.includes("microsoft");
        }) || voices.find(v => {
          return v.lang.startsWith("en-US");
        });

        if (maleVoice) {
          utterance.voice = maleVoice;
        }

        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.warn("Welcome speech synthesis failed", e);
    }
  };

  const playCinematicSpeech = async () => {
    if (!audioEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: "Initializing portfolio system... Access granted. Welcome to the digital universe of Mohd Tahir. Software Engineer. Full-Stack Developer. A I Enthusiast. Architect of intelligent solutions. Transforming ideas into scalable experiences. Explore the future. Experience innovation." 
        })
      });

      if (!res.ok) {
        speakWelcomeLegacy();
        return;
      }

      const arrayBuffer = await res.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      
      // === CINEMATIC AI VOICE DSP CHAIN ===
      
      // 1. Warm sub-bass/baritone shelf boost (Rich Bass Tone)
      const bassBoost = ctx.createBiquadFilter();
      bassBoost.type = 'lowshelf';
      bassBoost.frequency.setValueAtTime(140, ctx.currentTime);
      bassBoost.gain.setValueAtTime(7.5, ctx.currentTime); // Cinematic depth
      
      // 2. High-cut filter for smooth, sophisticated presence
      const highCut = ctx.createBiquadFilter();
      highCut.type = 'peaking';
      highCut.frequency.setValueAtTime(3200, ctx.currentTime);
      highCut.gain.setValueAtTime(-2.5, ctx.currentTime); 
      
      // 3. Robotic/Cybernetic resonator (Comb feedback effect)
      const delayNode = ctx.createDelay(0.1);
      delayNode.delayTime.setValueAtTime(0.016, ctx.currentTime); // 16ms short delay for cyber flange resonance
      
      const delayGain = ctx.createGain();
      delayGain.gain.setValueAtTime(0.35, ctx.currentTime); // Resonance blend
      
      const delayFeedback = ctx.createGain();
      delayFeedback.gain.setValueAtTime(0.24, ctx.currentTime); // feedback amount
      
      // Create feedback loop
      delayNode.connect(delayFeedback);
      delayFeedback.connect(delayNode);
      
      // 4. Stereo enhancement / Spatial depth splitting
      const dryGain = ctx.createGain();
      dryGain.gain.setValueAtTime(0.85, ctx.currentTime);
      
      // Connect source to filters
      source.connect(bassBoost);
      bassBoost.connect(highCut);
      
      // Split filters output into Dry & Wet (robotic spatial) paths
      highCut.connect(dryGain);
      highCut.connect(delayNode);
      delayNode.connect(delayGain);
      
      // Apply stereo panning for extreme holographic width!
      const panDry = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      const panWet = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      
      if (panDry && panWet) {
        panDry.pan.setValueAtTime(-0.18, ctx.currentTime); // Pan dry slightly left
        panWet.pan.setValueAtTime(0.18, ctx.currentTime);   // Pan spatial wet slightly right
        
        dryGain.connect(panDry);
        panDry.connect(ctx.destination);
        
        delayGain.connect(panWet);
        panWet.connect(ctx.destination);
      } else {
        dryGain.connect(ctx.destination);
        delayGain.connect(ctx.destination);
      }
      
      // Delay speech slightly to allow intro graphics to synchronize perfectly
      source.start(ctx.currentTime + 1.2);

    } catch (e) {
      console.warn("Cinematic voice failed, fallback to native:", e);
      speakWelcomeLegacy();
    }
  };

  // Sound generator matching futuristic neural transitions
  const playSound = (type: 'warp' | 'impact' | 'shards' | 'beeps' | 'ambient' | 'rise') => {
    if (!audioEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      if (type === 'beeps') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800 + Math.random() * 400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.16);
      } else if (type === 'warp') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(40, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 1.8);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.9);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 2.0);
      } else if (type === 'impact') {
        // Epic 808/sub-bass blast for cinematic scale
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const distortion = ctx.createWaveShaper();
        const makeDistortionCurve = (amount: number) => {
          const k = typeof amount === 'number' ? amount : 50,
            n_samples = 44100,
            curve = new Float32Array(n_samples),
            deg = Math.PI / 180;
          let x;
          for (let i = 0; i < n_samples; ++i) {
            x = i * 2 / n_samples - 1;
            curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
          }
          return curve;
        };
        distortion.curve = makeDistortionCurve(400);
        distortion.oversample = '4x';
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, ctx.currentTime); // Hard low punch
        osc.frequency.exponentialRampToValueAtTime(1, ctx.currentTime + 1.8);
        
        gain.gain.setValueAtTime(0.8, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
        
        osc.connect(distortion);
        distortion.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 2.2);
        
        // Add metallic whoosh
        const noiseParams = ctx.createOscillator();
        const noiseGain = ctx.createGain();
        noiseParams.type = 'square';
        noiseParams.frequency.setValueAtTime(1200, ctx.currentTime);
        noiseParams.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 1.0);
        noiseGain.gain.setValueAtTime(0.1, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
        noiseParams.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseParams.start();
        noiseParams.stop(ctx.currentTime + 1.1);
      } else if (type === 'shards') {
        // Futuristic glass/metal synthesizer shimmer
        for (let i = 0; i < 6; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(3000 + i * 450 + Math.random() * 500, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(800 + i * 50, ctx.currentTime + 0.8 + i * 0.1);
          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9 + i * 0.15);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.2);
        }
        // Digital data stream/particles (jittery noise)
        const bufferSize = ctx.sampleRate * 1.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * (i % 20 < 2 ? 1 : 0); // sparse jitter
        }
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 5000;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.3, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noiseSource.start();
      } else if (type === 'ambient') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(60, ctx.currentTime);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 10);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 10);
      } else if (type === 'rise') {
        // Epic cinematic shepard tone-like rise leading to final hook
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 4.0);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 3.8);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 4.2);
        
        // Tremolo effect for the rise
        const tremolo = ctx.createGain();
        const lfo = ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(10, ctx.currentTime); // 10Hz flutter
        lfo.frequency.linearRampToValueAtTime(30, ctx.currentTime + 4.0); // speeds up
        lfo.connect(tremolo.gain);
        lfo.start();
        lfo.stop(ctx.currentTime + 4.2);
        
        osc.disconnect();
        osc.connect(tremolo);
        tremolo.connect(gain);
      }
    } catch (e) {
      console.warn("Audio Context init blocked or not allowed.", e);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- SETUP SCENE, CAMERA, RENDERER ---
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03000b, 0.015);

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- MOUSE TRACKING ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 3, 300);
    pointLight1.position.set(0, 0, 50);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 2, 200);
    pointLight2.position.set(-50, 20, 30);
    scene.add(pointLight2);

    // --- OBJECT GENERATION FUNCTIONS ---

    // 1. BILLIONS OF STARS & DIGITAL CONSTELLATIONS
    const starCount = 3500;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starRandomSizes = new Float32Array(starCount);

    const colorsPalette = [
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0xec4899), // Pink
      new THREE.Color(0x3b82f6), // Indigo/Blue
      new THREE.Color(0xffffff)  // Pure White
    ];

    for (let i = 0; i < starCount; i++) {
      // Swirling galactic position formula
      const radius = 20 + Math.random() * 150;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 240;
      
      starPositions[i * 3] = Math.cos(angle) * radius;
      starPositions[i * 3 + 1] = Math.sin(angle) * radius;
      starPositions[i * 3 + 2] = z;

      const clr = colorsPalette[Math.floor(Math.random() * colorsPalette.length)];
      starColors[i * 3] = clr.r;
      starColors[i * 3 + 1] = clr.g;
      starColors[i * 3 + 2] = clr.b;

      starRandomSizes[i] = 1.0 + Math.random() * 2.5;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    // Custom shader material for glowing space nodes
    const starMaterial = new THREE.PointsMaterial({
      size: 0.85,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const starSystem = new THREE.Points(starGeometry, starMaterial);
    scene.add(starSystem);

    // Digital Constellation Lines
    const constLineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });
    const constellationGeo = new THREE.BufferGeometry();
    const constellationPos: number[] = [];
    const connectedPairs = 100;
    for (let j = 0; j < connectedPairs; j++) {
      const idx1 = Math.floor(Math.random() * starCount);
      const idx2 = Math.floor(Math.random() * starCount);
      const p1 = new THREE.Vector3(starPositions[idx1*3], starPositions[idx1*3+1], starPositions[idx1*3+2]);
      const p2 = new THREE.Vector3(starPositions[idx2*3], starPositions[idx2*3+1], starPositions[idx2*3+2]);
      if (p1.distanceTo(p2) < 30) {
        constellationPos.push(p1.x, p1.y, p1.z);
        constellationPos.push(p2.x, p2.y, p2.z);
      }
    }
    constellationGeo.setAttribute('position', new THREE.Float32BufferAttribute(constellationPos, 3));
    const constellations = new THREE.LineSegments(constellationGeo, constLineMaterial);
    scene.add(constellations);

    // 2. CODE BLACK HOLE
    const ringCount = 20;
    const blackHoleGroup = new THREE.Group();
    scene.add(blackHoleGroup);

    const streamMaterials: THREE.MeshBasicMaterial[] = [];
    const codingCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>;=+-*/_$#@%^&*".split("");

    const generateTextTexture = (chars: string, colorHex: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(0,0,0,0)';
        ctx.fillRect(0, 0, 512, 64);
        ctx.font = 'bold 24px monospace';
        ctx.fillStyle = colorHex;
        for (let i = 0; i < 24; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, i * 21 + 8, 42);
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.repeat.set(2, 1);
      return tex;
    };

    for (let i = 0; i < ringCount; i++) {
      const rad = 2.0 + i * 2.2;
      const bhRingGeo = new THREE.RingGeometry(rad, rad + 1.2, 48);
      const texture = generateTextTexture(codingCharacters.join(''), '#a855f7');
      const bhRingMat = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending
      });
      streamMaterials.push(bhRingMat);

      const ringMesh = new THREE.Mesh(bhRingGeo, bhRingMat);
      ringMesh.position.z = -10;
      blackHoleGroup.add(ringMesh);
    }
    blackHoleGroup.scale.set(0.01, 0.01, 0.01);

    // 3. CODE HYPERSPEED WORMHOLE TUNNEL
    const tunnelGeo = new THREE.CylinderGeometry(15, 10, 300, 32, 20, true);
    // Custom vertex position warping
    const pos = tunnelGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const theta = (y / 300) * Math.PI * 4;
      const x = pos.getX(i);
      const z = pos.getZ(i);
      // Twist the positions to create a wavy spiral vortex look
      pos.setX(i, x + Math.sin(theta) * 3);
      pos.setZ(i, z + Math.cos(theta) * 3);
    }
    tunnelGeo.computeVertexNormals();

    const tunnelTexture = generateTextTexture("011000100110100101101110011000010111001001111001 MATRIX ACTIVE AUTOMATION EXEC_SYSTEM", "#ec4899");
    tunnelTexture.wrapT = THREE.RepeatWrapping;
    tunnelTexture.repeat.set(5, 15);

    const tunnelMat = new THREE.MeshBasicMaterial({
      map: tunnelTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      wireframe: false
    });
    const wormholeTunnel = new THREE.Mesh(tunnelGeo, tunnelMat);
    wormholeTunnel.rotation.x = Math.PI / 2;
    wormholeTunnel.position.set(0, 0, -100);
    scene.add(wormholeTunnel);

    // 4. FUTURISTIC CYBER-CITY ACCENT GRID
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);
    cityGroup.position.set(0, -15, -40);
    cityGroup.scale.set(0.01, 0.01, 0.01);

    const cityBlocks = 40;
    const cityBuildings: THREE.Mesh[] = [];
    const buildingMat = new THREE.MeshPhongMaterial({
      color: 0x07011d,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0
    });

    for (let i = 0; i < cityBlocks; i++) {
      const bHeight = 10 + Math.random() * 85;
      const bGeo = new THREE.BoxGeometry(4 + Math.random() * 8, bHeight, 4 + Math.random() * 8);
      const bMesh = new THREE.Mesh(bGeo, buildingMat);
      
      // grid placement
      const row = Math.floor(i / 6) - 3;
      const col = (i % 6) - 3;
      bMesh.position.set(col * 35 + (Math.random() - 0.5) * 6, bHeight / 2 - 10, row * 35 + (Math.random() - 0.5) * 6);
      cityGroup.add(bMesh);
      cityBuildings.push(bMesh);
    }

    // 5. FLOATING SHARDS
    const shardCount = 28;
    const shardGroup = new THREE.Group();
    scene.add(shardGroup);

    const renderShardsCodeTexture = (codeString: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0a031a';
        ctx.fillRect(0, 0, 256, 256);
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, 256, 256);
        ctx.fillStyle = '#ec4899';
        ctx.font = '8px monospace';
        ctx.fillText('CODE_Telemetry.log', 10, 15);
        ctx.fillStyle = '#10b981';
        ctx.fillRect(10, 20, 236, 1);
        ctx.fillStyle = '#d1d5db';
        ctx.font = 'italic 7px monospace';
        const lines = codeString.split('\n');
        for (let idx = 0; idx < lines.length; idx++) {
          ctx.fillText(lines[idx], 10, 32 + idx * 11);
        }
      }
      const tex = new THREE.CanvasTexture(canvas);
      return tex;
    };

    const algorithmsList = [
      "import { GoogleGenAI } from '@google/genai';\nconst ai = new GoogleGenAI();\nawait ai.models.generateContent({\n  model: 'gemini-3.5-flash'\n});",
      "const brain = (nlp: Corpus) => {\n  const res = [];\n  for (let node of nlp.neuroGrid) {\n    res.push(node.weight * 0.95);\n  }\n  return res;\n};",
      "export function solveAutomation() {\n  const secureKey = authHeader();\n  const connStr = systemPort3000();\n  triggerAgentState(connStr);\n}",
      "type Telemetry = {\n  sysLive: boolean;\n  neuralNet: string;\n  status: 'ONLINE' | 'STANDBY';\n  roiMaxPercentage: number;\n};"
    ];

    const shards: {
      mesh: THREE.Mesh;
      origPos: THREE.Vector3;
      randomRot: THREE.Vector3;
      speed: number;
    }[] = [];

    for (let i = 0; i < shardCount; i++) {
      // Geometric geometric plane geometry shape
      const width = 6 + Math.random() * 10;
      const height = 4 + Math.random() * 8;
      const sGeo = new THREE.PlaneGeometry(width, height);
      // Shimmering materials
      const tex = renderShardsCodeTexture(algorithmsList[Math.floor(Math.random() * algorithmsList.length)]);
      const sMat = new THREE.MeshPhongMaterial({
        map: tex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
        emissive: 0x8b5cf6,
        emissiveIntensity: 0.1,
        shininess: 100,
        specular: 0xffffff
      });

      const sMesh = new THREE.Mesh(sGeo, sMat);
      const angle = (i / shardCount) * Math.PI * 2;
      const radius = 35 + Math.random() * 45;
      const sX = Math.cos(angle) * radius;
      const sY = Math.sin(angle) * radius;
      const sZ = -20 + (Math.random() - 0.5) * 60;
      sMesh.position.set(sX, sY, sZ);
      
      const rot = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      );
      sMesh.rotation.set(rot.x, rot.y, rot.z);

      shardGroup.add(sMesh);
      shards.push({
        mesh: sMesh,
        origPos: new THREE.Vector3(sX, sY, sZ),
        randomRot: rot,
        speed: 0.2 + Math.random() * 0.8
      });
    }

    // --- TIMELINE SEQUENCAL ANIMATIONS USING GSAP ---
    addLog("⚡ SYSTEM BOOTSTRAPPING EXECUTED.");
    addLog("🌌 CALIBRATING STELLAR NEST COGNITIVE STREAM...");
    setCurrentPhase('space');
    playSound('ambient');
    playSound('beeps');
    playCinematicSpeech();

    const masterTl = gsap.timeline({
      onComplete: () => {
        // Automatically cascade transition inside parent
        addLog("✅ ALL SEQUENCES FINISHED SUCCESSFULLY.");
        setTimeout(() => {
          onComplete();
        }, 1500); // Give the rise a bit more room before snapping to next screen
      }
    });

    // STEP 1: Constellations & Space Reveal (Hyper-Accelerated)
    masterTl.to(starMaterial, { opacity: 0.95, size: 1.4, duration: 0.25, ease: "power3.out" });
    
    masterTl.add(() => {
      addLog("🕳️ CODE BLACK HOLE COMPILATION TARGET_NODE INITIALIZED");
      setCurrentPhase('blackhole');
      playSound('beeps');
    }, "+=0.03");

    // STEP 2: Grow & spin Code Black Hole (Hyper-Accelerated)
    masterTl.to(blackHoleGroup.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.3, ease: "back.out(2.0)" }, "-=0.05");
    streamMaterials.forEach((mat) => {
      masterTl.to(mat, { opacity: 0.85, duration: 0.25, ease: "power1.inOut" }, "<");
    });

    masterTl.add(() => {
      addLog("🌀 ENVIROMENT COLLAPSE IMMINENT. HYPERSPEED WORMHOLE THRUSTER ON");
      setCurrentPhase('wormhole');
      playSound('warp');
    }, "+=0.03");

    // STEP 3: Travel through Code Wormhole (Hyper-Accelerated)
    masterTl.to(camera.position, { z: -80, duration: 0.35, ease: "power4.in" }, "-=0.02");
    masterTl.to(tunnelMat, { opacity: 0.92, duration: 0.2, ease: "power1.out" }, "<");
    // Speed warp values
    masterTl.to(starSystem.scale, { z: 4.5, duration: 0.25, ease: "power3.in" }, "<");

    masterTl.add(() => {
      addLog("🏙️ SLAM IMPACT DETECTED [0.0.0.0:3000]. CYBER CITY DEPLOYS SHOCKWAVE");
      setCurrentPhase('impact');
      playSound('impact');
    }, "+=0.03");

    // STEP 4: Slam Cyber City Background with massive grid impact (Hyper-Accelerated)
    masterTl.to(camera.position, { z: 42, duration: 0.35, ease: "elastic.out(1.1, 0.45)" }, "-=0.02");
    masterTl.to(cityGroup.scale, { x: 1.8, y: 1.8, z: 1.8, duration: 0.35, ease: "circ.out" }, "<");
    masterTl.to(buildingMat, { opacity: 0.75, duration: 0.25 }, "<");
    masterTl.to(tunnelMat, { opacity: 0, duration: 0.15 }, "<");

    masterTl.add(() => {
      addLog("💥 SHARD ASSEMBLY STAGE: Geometric Code matrices fractured.");
      setCurrentPhase('shards');
      playSound('shards');
    }, "+=0.03");

    // STEP 5: Explode to floating shards (Hyper-Accelerated)
    shards.forEach((s) => {
      masterTl.to(s.mesh.material, { opacity: 0.9, duration: 0.15 }, "<");
      // Splay shards outwards from center impact
      masterTl.to(s.mesh.position, {
        x: s.origPos.x * 1.6,
        y: s.origPos.y * 1.6,
        z: s.origPos.z + 55,
        duration: 0.35,
        ease: "power3.out"
      }, "<");
    });

    masterTl.add(() => {
      addLog("🎓 HOLOGRAPHIC BLUEPRINT RE-SYNCHRONIZING PORTFOLIO NAME...");
      setCurrentPhase('assembly');
      playSound('rise');
    }, "+=0.03");

    // STEP 6: Shards align into 3D holographic structure (Hyper-Accelerated)
    shards.forEach((s, idx) => {
      const radiusOfAssem = 15;
      const angle = (idx / shards.length) * Math.PI * 2;
      
      masterTl.to(s.mesh.position, {
        x: Math.cos(angle) * radiusOfAssem,
        y: Math.sin(angle) * (radiusOfAssem - 5) + 3,
        z: -10,
        duration: 0.45,
        ease: "power4.inOut"
      }, "<");
      
      masterTl.to(s.mesh.rotation, {
        x: 0,
        y: 0,
        z: angle + Math.PI / 2,
        duration: 0.4,
        ease: "power3.inOut"
      }, "<");
    });

    // Reveal final Holographic Name Banner (Hyper-Accelerated)
    const nameTextEl = document.getElementById('shimmer-name-banner');
    if (nameTextEl) {
      masterTl.to(nameTextEl, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "back.out(1.5)"
      }, "-=0.35");
    }

    // --- RENDER/TICK LOOP ---
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Mouse smoothing interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Mouse reactive cinematic perspective tilts
      camera.position.x += (mouse.x * 10 - camera.position.x) * 0.05;
      camera.position.y += (mouse.y * 10 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, -20);

      // Stars floating spin
      starSystem.rotation.y = time * 0.02;
      starSystem.rotation.x = time * 0.005;

      // Code Black Hole stream swirls
      blackHoleGroup.rotation.z = -time * 0.28;
      streamMaterials.forEach((mat, idx) => {
        if (mat.map) {
          mat.map.offset.x = time * (0.05 + idx * 0.008);
          mat.map.offset.y = Math.sin(time + idx) * 0.005;
        }
      });

      // Wormhole tunnel warp animation
      wormholeTunnel.rotation.y = time * 0.15;
      if (tunnelMat.map) {
        tunnelMat.map.offset.y = -time * 1.8;
      }

      // Shard active 3D spins
      shards.forEach((s) => {
        // Slow float orbital movement
        if (currentPhase === 'shards') {
          s.mesh.rotation.x += s.randomRot.x * 0.01 * s.speed;
          s.mesh.rotation.y += s.randomRot.y * 0.01 * s.speed;
        } else if (currentPhase === 'assembly') {
          // Slow steady structural breathing loop
          s.mesh.position.y += Math.sin(time * 1.5 + s.origPos.x) * 0.007;
        }
      });

      // City buildings lights fluctuation
      pointLight1.intensity = 2.5 + Math.sin(time * 3) * 0.8;
      pointLight2.intensity = 1.8 + Math.cos(time * 2) * 0.5;

      renderer.render(scene, camera);
    };

    // Begin render frame loop
    animate();

    // Handle viewport resize safely
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      masterTl.kill();
      
      // Dispose WebGL context assets
      scene.remove(starSystem);
      starGeometry.dispose();
      starMaterial.dispose();
      
      constellationGeo.dispose();
      constLineMaterial.dispose();

      tunnelGeo.dispose();
      tunnelMat.dispose();
      if (tunnelTexture) tunnelTexture.dispose();

      shards.forEach((s) => {
        shardGroup.remove(s.mesh);
        s.mesh.geometry.dispose();
        if (Array.isArray(s.mesh.material)) {
          s.mesh.material.forEach((m) => m.dispose());
        } else {
          s.mesh.material.dispose();
        }
      });

      cityBuildings.forEach((b) => {
        cityGroup.remove(b);
        b.geometry.dispose();
      });
      buildingMat.dispose();

      renderer.dispose();
    };
  }, [audioEnabled]);

  return (
    <div 
      ref={containerRef}
      id="legendary-intro-overlay"
      className="fixed inset-0 z-[1000] w-full h-full bg-transparent select-none overflow-hidden font-sans flex flex-col justify-between"
    >
      <canvas 
        ref={canvasRef} 
        id="intro-webgl-canvas"
        className="absolute inset-0 w-full h-full block z-0" 
      />

      {/* Cyber Grid Scanning Line Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(168,85,247,0.035)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10" />

      {/* Futuristic Header HUD */}
      <div className="relative z-20 p-4 sm:p-6 flex justify-between items-start pointer-events-none">
        
        {/* Left Telemetry Cluster - Removed */}
        <div className="flex items-center space-x-3 text-left opacity-0 pointer-events-none">
          <div className="p-2 sm:p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/35 backdrop-blur-md flex items-center justify-center animate-spin [animation-duration:12s]">
            <Cpu className="w-4 h-4 text-purple-400" />
          </div>
          <div className="font-mono">
            <h3 className="text-[9px] sm:text-[11px] font-black tracking-widest text-[#a855f7] uppercase">PORTFOLIO CALIBRATION INTRO</h3>
            <p className="text-[7.5px] text-gray-500 tracking-wider">SECURE ACCESS STATE: ACTIVE</p>
          </div>
        </div>

        {/* Action controls button - click is pointer-events-auto */}
        <div className="flex items-center space-x-2.5 pointer-events-auto">
          <button
            onClick={onComplete}
            onMouseEnter={() => setSkipHovered(true)}
            onMouseLeave={() => setSkipHovered(false)}
            className="p-2 px-3 sm:px-4 bg-[#0a031d]/90 hover:bg-[#120935]/95 border-2 border-purple-500/40 hover:border-purple-300 rounded-lg text-[9.5px] font-black text-white tracking-widest uppercase cursor-pointer select-none transition-all duration-300 flex items-center space-x-1.5 shadow-[0_4px_22px_rgba(168,85,247,0.3)] hover:scale-[1.04]"
          >
            <span>BYPASS PROTOCOL</span>
            <SkipForward className={`w-3.5 h-3.5 text-purple-200 transition-transform ${skipHovered ? 'translate-x-1' : ''}`} />
          </button>
        </div>
      </div>

      {/* Middle Holographic Output: Title emerging into 3D assemblance */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 p-4">
        
        {/* Shimmer text container */}
        <div 
          id="shimmer-name-banner"
          className="opacity-0 scale-75 blur-md select-none text-center max-w-2xl flex flex-col items-center justify-center"
        >
          {/* Futuristic ambient backing glowing laser lines */}
          <div className="h-0.5 w-[200px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent animate-pulse mb-3" />

          {/* Glowing Header */}
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight text-white leading-none relative">
            <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 opacity-60 animate-pulse" />
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-purple-200">
              MOHD TAHIR
            </span>
          </h1>

          {/* Subheading tag and cyber badges */}
          <div className="flex items-center space-x-2.5 mt-4">
            <span className="font-mono text-[7px] sm:text-[9.5px] font-black text-pink-300 uppercase tracking-widest bg-pink-500/10 border border-pink-500/25 px-2.5 py-1 rounded">
              COGNITIVE SYSTEM ARCHITECT
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-[7px] sm:text-[9.5px] font-black text-[#a855f7] uppercase tracking-widest bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded">
              AI PORTFOLIO READY
            </span>
          </div>

          <div className="h-0.5 w-[200px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent animate-pulse mt-5" />

          <button 
            onClick={onComplete}
            className="pointer-events-auto mt-7 px-6 py-2.5 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-650 hover:from-purple-550 hover:to-indigo-550 text-white rounded-full text-[10px] font-black tracking-widest uppercase transition-all duration-300 shadow-[0_5px_22px_rgba(236,72,153,0.4)] hover:scale-[1.05] active:scale-[0.96] flex items-center space-x-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current text-white animate-pulse" />
            <span>ENTER CORE TERMINAL</span>
          </button>
        </div>

        {/* Dynamic Holographic Telemetry Rings rotating around the center name */}
        {currentPhase === 'assembly' && (
          <div className="absolute w-[280px] h-[280px] sm:w-[480px] sm:h-[480px] rounded-full border border-purple-500/15 border-dashed animate-spin [animation-duration:30s] pointer-events-none" />
        )}
      </div>

      {/* Bottom status log consoles */}
      <div className="relative z-20 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-end border-t border-purple-500/5 bg-transparent backdrop-blur-sm pointer-events-none">
        
        {/* Real-time Telemetry Terminal Logs */}
        <div className="w-full sm:max-w-xs text-left text-[7.5px] sm:text-[8.5px] font-mono text-gray-500 space-y-0.5">
          {telemetryLogs.map((log, index) => (
            <div key={index} className={`leading-snug transition-all duration-300 ${
              index === telemetryLogs.length - 1 ? 'text-amber-400 font-bold' : ''
            }`}>
              {log}
            </div>
          ))}
          {telemetryLogs.length === 0 && (
            <div className="animate-pulse text-purple-400">CONNECTING COGNITIVE FLOW SENSORS...</div>
          )}
        </div>

        {/* Center state badge of intro */}
        <div className="v-full flex justify-end space-x-4 mt-3 sm:mt-0">
          <div className="flex flex-col text-right">
            <span className="font-mono text-[6.5px] sm:text-[7.5px] text-gray-600 uppercase tracking-widest">COGNITIVE LEVEL</span>
            <span className="font-mono text-[9px] sm:text-[10px] text-purple-400 uppercase font-black tracking-widest">
              {currentPhase === 'init' && "SYNAPSES STANDBY"}
              {currentPhase === 'space' && "DEEP SPACE MONITOR"}
              {currentPhase === 'blackhole' && "MATRIX BLACKHOLE GENERATION"}
              {currentPhase === 'wormhole' && "WORMHOLE BURST ACCELERATION"}
              {currentPhase === 'impact' && "CYBER CITY IMPACT COLLISION"}
              {currentPhase === 'shards' && "SHATTERED SHOCKWAVE DEPLOY"}
              {currentPhase === 'assembly' && "BLUEPRINT RE-ASSEMBLING"}
            </span>
          </div>

          <div className="h-6 w-[2px] bg-purple-500/20" />

          {/* Secure system stats badge */}
          <div className="flex flex-col text-right">
            <span className="font-mono text-[6.5px] sm:text-[7.5px] text-gray-600 uppercase tracking-widest hidden xs:inline">FPS STATUS</span>
            <span className="font-mono text-[9px] sm:text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest">
              60.0_STABLE ⚡
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
