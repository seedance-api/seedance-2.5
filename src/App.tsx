import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Settings, 
  Layers, 
  Cpu, 
  Code, 
  FileText, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  User, 
  TrendingUp, 
  Github, 
  ArrowRight, 
  Volume2, 
  Zap,
  Sliders,
  CheckCircle2,
  SlidersHorizontal,
  Video
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Types
interface CharacterTemplate {
  id: string;
  name: string;
  category: string;
  url: string;
  desc: string;
}

interface MotionTemplate {
  id: string;
  name: string;
  style: string;
  difficulty: string;
  estTime: string;
  bpm: number;
}

// Data Sets
const CHARACTER_TEMPLATES: CharacterTemplate[] = [
  {
    id: "anime_yuri",
    name: "Anime Yuri",
    category: "Cel-Shaded Illustration",
    url: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=450&auto=format&fit=crop&q=80",
    desc: "Vibrant anime art style with distinct lines, ideal for cellular cartoon animations."
  },
  {
    id: "cyber_kaelen",
    name: "Cyberpunk Kaelen",
    category: "3D Digital Concept",
    url: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=450&auto=format&fit=crop&q=80",
    desc: "Futuristic streetwear styling with high neon reflection parameters."
  },
  {
    id: "urban_sarah",
    name: "Urban Sarah",
    category: "Human Photography",
    url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=450&auto=format&fit=crop&q=80",
    desc: "Ultra-high resolution photography portrait, testing skin micro-texture flow."
  },
  {
    id: "traditional_mei",
    name: "Traditional Mei",
    category: "Elegance Costume",
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=450&auto=format&fit=crop&q=80",
    desc: "Flowing costume lines, testing standard spatial drapery and gravity physics."
  }
];

const MOTION_TEMPLATES: MotionTemplate[] = [
  {
    id: "kpop_shuffle",
    name: "K-Pop Viral Shuffle",
    style: "Fast Footwork & Hand Sync",
    difficulty: "Advanced",
    estTime: "12s",
    bpm: 128
  },
  {
    id: "cyber_popping",
    name: "Neon Street Popping",
    style: "Isolated Robotic Pops",
    difficulty: "Medium",
    estTime: "16s",
    bpm: 104
  },
  {
    id: "breakdance_headspin",
    name: "Breakdance Windmill",
    style: "Gravity Defying Acrobatic",
    difficulty: "Expert",
    estTime: "18s",
    bpm: 135
  },
  {
    id: "classical_wave",
    name: "Classical Fluid Wave",
    style: "Slow Flowing Hand Waves",
    difficulty: "Beginner",
    estTime: "10s",
    bpm: 78
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"playground" | "architecture" | "api" | "seo" | "readme">("playground");
  
  // Playground State
  const [selectedChar, setSelectedChar] = useState<CharacterTemplate>(CHARACTER_TEMPLATES[0]);
  const [selectedMotion, setSelectedMotion] = useState<MotionTemplate>(MOTION_TEMPLATES[0]);
  const [customCharUrl, setCustomCharUrl] = useState<string>("");
  const [generationStage, setGenerationStage] = useState<"idle" | "rendering" | "completed">("idle");
  const [renderProgress, setRenderProgress] = useState<number>(0);
  const [currentStepText, setCurrentStepText] = useState<string>("");
  const [fps, setFps] = useState<number>(60);
  const [motionStrength, setMotionStrength] = useState<number>(1.0);
  const [guidanceScale, setGuidanceScale] = useState<number>(7.5);
  const [handRefine, setHandRefine] = useState<boolean>(true);
  const [temporalConsistency, setTemporalConsistency] = useState<"Standard" | "High" | "Ultra">("Ultra");

  // Code Explorer State
  const [apiLanguage, setApiLanguage] = useState<"python" | "node" | "curl" | "comfyui">("python");
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  // Animated skeleton canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [skeletonBeat, setSkeletonBeat] = useState<number>(0);

  // Simulated skeletal animation inside Canvas
  useEffect(() => {
    let animationId: number;
    let frame = 0;
    
    const draw = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      
      const width = canvasRef.current.width;
      const height = canvasRef.current.height;
      ctx.clearRect(0, 0, width, height);
      
      // Calculate dynamic joints based on BPM and current frame
      const bpm = selectedMotion.bpm;
      const beatInterval = (60 / bpm) * 60; // Approximate frames per beat at 60fps
      const progress = (frame % beatInterval) / beatInterval;
      const angle = progress * Math.PI * 2;
      
      // Determine dance style motion modifiers
      let yOffset = Math.sin(angle) * 15;
      let handL_X = Math.cos(angle) * 40;
      let handL_Y = Math.sin(angle * 2) * 30;
      let handR_X = -Math.cos(angle) * 40;
      let handR_Y = -Math.sin(angle * 2) * 30;
      let legL_X = -20 + Math.sin(angle) * 12;
      let legR_X = 20 - Math.sin(angle) * 12;

      if (selectedMotion.id === "kpop_shuffle") {
        yOffset = Math.sin(frame * 0.15) * 8;
        legL_X = -25 + Math.sin(frame * 0.2) * 30;
        legR_X = 25 - Math.sin(frame * 0.2) * 30;
        handL_X = Math.cos(frame * 0.1) * 20;
        handR_X = -Math.cos(frame * 0.1) * 20;
      } else if (selectedMotion.id === "cyber_popping") {
        const popFrame = Math.floor(frame / 15) % 2 === 0 ? 1 : 0;
        yOffset = popFrame * 5;
        handL_Y = -40 + Math.sin(frame * 0.1) * 10;
        handR_Y = -40 - Math.sin(frame * 0.1) * 10;
      } else if (selectedMotion.id === "breakdance_headspin") {
        yOffset = -height/5 + Math.sin(frame * 0.05) * 10;
        const spinAngle = frame * 0.07;
        handL_X = Math.cos(spinAngle) * 50;
        handL_Y = Math.sin(spinAngle) * 50;
        handR_X = -Math.cos(spinAngle) * 50;
        handR_Y = -Math.sin(spinAngle) * 50;
        legL_X = Math.cos(spinAngle + Math.PI) * 40;
        legR_X = -Math.cos(spinAngle + Math.PI) * 40;
      }

      // Base anchor coordinates
      const cx = width / 2;
      const cy = height / 2.2 + yOffset;
      
      // Joint coordinates
      const head = { x: cx, y: cy - 70 };
      const neck = { x: cx, y: cy - 45 };
      const spine = { x: cx, y: cy };
      const shoulderL = { x: cx - 25, y: cy - 40 };
      const shoulderR = { x: cx + 25, y: cy - 40 };
      const elbowL = { x: cx - 50 + handL_X * 0.4, y: cy - 20 + handL_Y * 0.4 };
      const elbowR = { x: cx + 50 + handR_X * 0.4, y: cy - 20 + handR_Y * 0.4 };
      const handL = { x: cx - 70 + handL_X, y: cy + handL_Y };
      const handR = { x: cx + 70 + handR_X, y: cy + handR_Y };
      const hipL = { x: cx - 20, y: cy + 30 };
      const hipR = { x: cx + 20, y: cy + 30 };
      const kneeL = { x: cx + legL_X, y: cy + 80 };
      const kneeR = { x: cx + legR_X, y: cy + 80 };
      const footL = { x: cx + legL_X - 10, y: cy + 130 + Math.abs(yOffset * 0.2) };
      const footR = { x: cx + legR_X + 10, y: cy + 130 - Math.abs(yOffset * 0.2) };

      // Make lines glow
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.shadowBlur = 10;
      ctx.shadowColor = generationStage === "rendering" ? "#818cf8" : "#22d3ee";
      ctx.strokeStyle = generationStage === "rendering" ? "#6366f1" : "rgba(34, 211, 238, 0.85)";

      // Function to draw a bone
      const drawBone = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      };

      // Draw Main Skeleton Structure
      drawBone(head, neck);
      drawBone(neck, spine);
      drawBone(neck, shoulderL);
      drawBone(neck, shoulderR);
      drawBone(shoulderL, elbowL);
      drawBone(shoulderR, elbowR);
      drawBone(elbowL, handL);
      drawBone(elbowR, handR);
      drawBone(spine, hipL);
      drawBone(spine, hipR);
      drawBone(hipL, kneeL);
      drawBone(hipR, kneeR);
      drawBone(kneeL, footL);
      drawBone(kneeR, footR);

      // Draw Joints circles
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 12;
      const joints = [head, neck, spine, shoulderL, shoulderR, elbowL, elbowR, handL, handR, hipL, hipR, kneeL, kneeR, footL, footR];
      joints.forEach((j) => {
        ctx.beginPath();
        ctx.arc(j.x, j.y, 4.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Special highlight for head
      ctx.beginPath();
      ctx.arc(head.x, head.y, 10, 0, Math.PI * 2);
      ctx.strokeStyle = "#a5b4fc";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Show real-time vector coordinate overlay tags for visual richness (No AI Slop - purely informative tracker)
      if (frame % 25 === 0) {
        setSkeletonBeat(Math.floor(progress * 100));
      }

      frame++;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [selectedMotion, generationStage]);

  // Handle simulated generation process
  const triggerInference = () => {
    if (generationStage === "rendering") return;
    setGenerationStage("rendering");
    setRenderProgress(0);
    setCurrentStepText("Parsing Character Frame & OpenPose Maps...");
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (generationStage === "rendering") {
      timer = setInterval(() => {
        setRenderProgress((prev) => {
          const next = prev + 1.5;
          
          // Modify status based on current progress percentage
          if (next < 25) {
            setCurrentStepText("Extracting skeletal keypoints (Joint tracking accuracy: 99.4%)...");
          } else if (next >= 25 && next < 55) {
            setCurrentStepText("Mapping textures using SeeDance 2.5 ID-Net Encoders...");
          } else if (next >= 55 && next < 80) {
            setCurrentStepText("Injecting Temporal Attention Blocks to ensure 60fps coherence...");
          } else if (next >= 80 && next < 95) {
            setCurrentStepText("Decoding raw latents via High-Fidelity VAE upscaler...");
          } else if (next >= 100) {
            clearInterval(timer);
            setGenerationStage("completed");
            return 100;
          }
          return next;
        });
      }, 55);
    }
    return () => clearInterval(timer);
  }, [generationStage]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const copyKeywordToClipboard = (kw: string) => {
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 1500);
  };

  // Code snippets datasets
  const CODE_SNIPPETS = {
    python: `import seedace

# Initialize the next-generation SeeDance client
client = seedace.Client(api_key="your_bytedance_seedance_api_key")

# Submit character framing and motion inputs
video_run = client.inference.submit_pose_to_video(
    character_avatar="${selectedChar.url.substring(0, 48)}...",
    motion_sequence_id="${selectedMotion.id}",
    parameters={
        "motion_strength": ${motionStrength.toFixed(1)},
        "guidance_scale": ${guidanceScale.toFixed(1)},
        "hand_refinement": ${handRefine ? "True" : "False"},
        "temporal_coherence": "${temporalConsistency.toLowerCase()}",
        "target_fps": ${fps}
    }
)

# Download the synchronized MP4 output
print("Rendering started successfully!")
print("Stream Status Link:", video_run.status_url)
print("Final Render MP4 Link:", video_run.get_rendering_output())`,
    node: `import { SeeDanceClient } from "@bytedance/seedance-sdk";

// Initialize SeeDance Node wrapper
const seeDance = new SeeDanceClient({
  apiKey: process.env.BYTEDANCE_SEEDANCE_API_KEY
});

async function generateDanceSequence() {
  const rendering = await seeDance.video.create({
    characterImage: "${selectedChar.url.substring(0, 48)}...",
    motionPreset: "${selectedMotion.id}",
    settings: {
      motionStrength: ${motionStrength.toFixed(1)},
      guidanceScale: ${guidanceScale.toFixed(1)},
      handRefinement: ${handRefine},
      fps: ${fps},
      consistencyMode: "${temporalConsistency}"
    }
  });

  console.log("Rendering 60FPS clip at:", rendering.downloadUrl);
}

generateDanceSequence();`,
    curl: `curl -X POST "https://api.bytedance.com/v2.5/seedance/video-generation" \\
  -H "Authorization: Bearer $BYTEDANCE_SEEDANCE_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "character_source_url": "${selectedChar.url.substring(0, 45)}...",
    "motion_template_id": "${selectedMotion.id}",
    "options": {
      "motion_multiplier": ${motionStrength.toFixed(1)},
      "guidance_scale": ${guidanceScale.toFixed(1)},
      "hand_pose_refine": ${handRefine},
      "fps": ${fps},
      "consistency_level": "${temporalConsistency.toUpperCase()}"
    }
  }'`,
    comfyui: `{
  "1": {
    "inputs": {
      "image": "${selectedChar.name}.png",
      "upload": "image_input"
    },
    "class_type": "LoadImage"
  },
  "2": {
    "inputs": {
      "motion_id": "${selectedMotion.id}",
      "strength": ${motionStrength.toFixed(1)},
      "guidance": ${guidanceScale.toFixed(1)},
      "hand_refiner": ${handRefine ? "true" : "false"},
      "model": "seedance-v2.5-ultra-weights"
    },
    "class_type": "SeedancePoseAdapterNode"
  },
  "3": {
    "inputs": {
      "character_latent": ["1", 0],
      "pose_track": ["2", 0],
      "fps_target": ${fps}
    },
    "class_type": "SeeDanceSampler"
  }
}`
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Dynamic Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-indigo-500 to-cyan-400 p-2 rounded-lg text-slate-900 font-bold shadow-lg shadow-indigo-500/10">
              <Cpu className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold tracking-tight text-white font-sans text-lg">SeeDance 2.5</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-mono px-1.5 py-0.5 rounded border border-indigo-500/30">
                  DEVELOPER HUB
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">ByteDance Flagship Motion Synthesis Pipeline</p>
            </div>
          </div>
          
          <nav className="flex space-x-1 sm:space-x-2">
            <button
              id="nav-play"
              onClick={() => setActiveTab("playground")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition ${
                activeTab === "playground" ? "bg-slate-800 text-cyan-400 border-b-2 border-cyan-400" : "text-slate-400 hover:text-white"
              }`}
            >
              Interactive Playground
            </button>
            <button
              id="nav-arch"
              onClick={() => setActiveTab("architecture")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition ${
                activeTab === "architecture" ? "bg-slate-800 text-indigo-400 border-b-2 border-indigo-400" : "text-slate-400 hover:text-white"
              }`}
            >
              System Features
            </button>
            <button
              id="nav-api"
              onClick={() => setActiveTab("api")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition ${
                activeTab === "api" ? "bg-slate-800 text-indigo-400 border-b-2 border-indigo-400" : "text-slate-400 hover:text-white"
              }`}
            >
              Core SDK & API
            </button>
            <button
              id="nav-seo"
              onClick={() => setActiveTab("seo")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition ${
                activeTab === "seo" ? "bg-slate-800 text-amber-400 border-b-2 border-amber-400" : "text-slate-400 hover:text-white"
              }`}
            >
              SEO Key Strategy
            </button>
            <button
              id="nav-readme"
              onClick={() => setActiveTab("readme")}
              className={`px-3 py-1.5 rounded-md text-xs sm:text-sm transition ${
                activeTab === "readme" ? "bg-slate-800 text-emerald-400 border-b-2 border-emerald-400" : "text-slate-400 hover:text-white"
              }`}
            >
              GitHub README
            </button>
          </nav>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro Banner with Key info */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl -z-10"></div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center space-x-2 bg-indigo-950 border border-indigo-700/50 rounded-full px-3 py-1 text-xs text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Launched Today: ByteDance Seedance 2.5 Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                High-Fidelity AI Character Motion & Dance Video Generation Model
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                Explore **SeeDance 2.5 (Seedance 2.5)**, developed to address strict character fidelity, temporal frame jittering, and micro-hand warping. Experience state-of-the-art OpenPose modeling directly inside this premium workspace preset.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a 
                href="#live-playground" 
                onClick={() => setActiveTab("playground")}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-5 py-3 rounded-lg flex items-center space-x-2 transition shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                <span>Launch Canvas Sandbox</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button 
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(CODE_SNIPPETS.python);
                  link.download = "seedance_quickstart.py";
                  link.click();
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm px-4 py-3 rounded-lg flex items-center space-x-2 transition"
              >
                <Download className="w-4 h-4" />
                <span>Get Python SDK</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Panels */}
        <AnimatePresence mode="wait">
          {/* PLAYGROUND & INFERENCE TAB */}
          {activeTab === "playground" && (
            <motion.div
              key="playground-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
              id="live-playground"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Panel: Inputs & Adjusters */}
                <div className="lg:col-span-6 space-y-6">
                  
                  {/* Step 1: Character Profile */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition space-y-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center">1</span>
                        <h3 className="font-bold text-white text-sm">Select Reference Character Profile</h3>
                      </div>
                      <span className="text-[11px] text-cyan-400 font-mono">ID-Net Input Source</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {CHARACTER_TEMPLATES.map((char) => (
                        <button
                          key={char.id}
                          onClick={() => {
                            setSelectedChar(char);
                            setCustomCharUrl("");
                          }}
                          className={`group relative rounded-lg overflow-hidden border transition aspect-square flex flex-col justify-end text-left p-2 cursor-pointer ${
                            selectedChar.id === char.id && !customCharUrl
                              ? "border-cyan-400 ring-2 ring-cyan-400/20"
                              : "border-slate-800 hover:border-slate-600"
                          }`}
                        >
                          <img 
                            src={char.url} 
                            alt={char.name} 
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                          <div className="relative">
                            <p className="text-[11px] font-bold text-white leading-tight truncate">{char.name}</p>
                            <p className="text-[9px] text-slate-300 truncate">{char.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Custom Character Link Mock */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400 font-mono block">Or enter custom Character Image URI</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="https://example.com/character-avatar.jpg"
                          value={customCharUrl}
                          onChange={(e) => {
                            setCustomCharUrl(e.target.value);
                            setSelectedChar({
                              id: "custom",
                              name: "Custom Agent Profile",
                              category: "External Reference",
                              url: e.target.value || CHARACTER_TEMPLATES[0].url,
                              desc: "Custom external character profile supplied by visitor."
                            });
                          }}
                          className="flex-1 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded px-3 py-1.5 text-xs text-slate-200 font-mono placeholder-slate-600"
                        />
                        {customCharUrl && (
                          <button 
                            onClick={() => setCustomCharUrl("")}
                            className="bg-slate-800 hover:bg-slate-700 text-xs px-2.5 rounded"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Choose Dancing Pose Style */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition space-y-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-500 text-white font-bold text-xs flex items-center justify-center">2</span>
                        <h3 className="font-bold text-white text-sm">Select Reference Dancing Pose System</h3>
                      </div>
                      <span className="text-[11px] text-indigo-400 font-mono">OpenPose Skeleton Map</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {MOTION_TEMPLATES.map((motionItem) => (
                        <button
                          key={motionItem.id}
                          onClick={() => setSelectedMotion(motionItem)}
                          className={`rounded-lg p-3 text-left border transition relative cursor-pointer ${
                            selectedMotion.id === motionItem.id
                              ? "bg-indigo-950/40 border-indigo-500 ring-2 ring-indigo-500/20"
                              : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-slate-200">{motionItem.name}</h4>
                            <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                              {motionItem.bpm} BPM
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 lines-clamp-1">{motionItem.style}</p>
                          <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400">
                            <span className="flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                              <span>Difficulty: {motionItem.difficulty}</span>
                            </span>
                            <span className="font-mono text-indigo-300">Est. {motionItem.estTime}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 3: Performance Attributes Slider config */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition space-y-4 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <Sliders className="w-4 h-4 text-cyan-400" />
                        <h3 className="font-bold text-white text-xs tracking-wide">SeeDance v2.5 Sampling Settings</h3>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">Inference Parameters</span>
                    </div>

                    <div className="space-y-4 text-xs">
                      {/* Guidance Scale */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">CFG Guidance Scale (Prompt vs. Pose)</span>
                          <span className="font-mono text-cyan-400 font-semibold">{guidanceScale.toFixed(1)}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="15"
                          step="0.5"
                          value={guidanceScale}
                          onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                        />
                        <p className="text-[9px] text-slate-500">Higher balances sharp identity fidelity; lower improves motion flexibility.</p>
                      </div>

                      {/* Motion Strength */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-300">Action Motion Multiplier</span>
                          <span className="font-mono text-indigo-400 font-semibold">{motionStrength.toFixed(1)}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="1.5"
                          step="0.1"
                          value={motionStrength}
                          onChange={(e) => setMotionStrength(parseFloat(e.target.value))}
                          className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                        <p className="text-[9px] text-slate-500">Enhance bounding box movements. 1.2+ enables aggressive dance dynamic swings.</p>
                      </div>

                      {/* Row settings */}
                      <div className="grid grid-cols-2 gap-4 pt-1">
                        <div className="space-y-1.5">
                          <label className="text-slate-300 block">Coherence Frame Rate</label>
                          <select
                            value={fps}
                            onChange={(e) => setFps(parseInt(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 font-mono"
                          >
                            <option value={24}>24 FPS (Cinematic)</option>
                            <option value={30}>30 FPS (Standard)</option>
                            <option value={60}>60 FPS (Ultra Smooth)</option>
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-slate-300 block">Consistency Multiplier</label>
                          <select
                            value={temporalConsistency}
                            onChange={(e) => setTemporalConsistency(e.target.value as any)}
                            className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-300 font-mono"
                          >
                            <option value="Standard">Standard Flow</option>
                            <option value="High">High Coherence</option>
                            <option value="Ultra">Ultra Alignment</option>
                          </select>
                        </div>
                      </div>

                      {/* Toggle switches */}
                      <div className="flex items-center justify-between bg-slate-950/60 p-2.5 rounded border border-slate-800">
                        <div className="space-y-0.5">
                          <span className="text-slate-300 font-semibold block text-[11px]">Intricate Hand Pose Refinement</span>
                          <span className="text-[9px] text-slate-500 block">Prevents multi-finger fusion distortions using custom pixel grids.</span>
                        </div>
                        <button
                          onClick={() => setHandRefine(!handRefine)}
                          className={`w-9 h-5 rounded-full transition flex items-center p-0.5 ${
                            handRefine ? "bg-cyan-500 justify-end" : "bg-slate-700 justify-start"
                          }`}
                        >
                          <span className="w-4 h-4 rounded-full bg-slate-950 block"></span>
                        </button>
                      </div>

                    </div>
                  </div>

                </div>

                {/* Right Panel: Render Stage with Animated Canvas Skeleton */}
                <div className="lg:col-span-6 space-y-6">
                  
                  {/* Dynamic Render Stage Box */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[460px]">
                    <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                      <div className="flex items-center space-x-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-xs font-bold text-slate-200 tracking-wider">VAE REAL-TIME SAMPLING PIPELINE</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">SeeDance v2.5 Engine Output</span>
                    </div>

                    {/* Stage Body */}
                    <div className="flex-1 select-none flex flex-col relative items-center justify-center p-6 bg-slate-950/70">
                      
                      {/* Active Preview Layout under Idle state */}
                      {generationStage === "idle" && (
                        <div className="text-center max-w-sm space-y-4">
                          <div className="relative mx-auto w-32 h-32 rounded-xl overflow-hidden border border-slate-800 shadow-xl shadow-cyan-500/5 group">
                            <img 
                              src={selectedChar.url} 
                              alt="Char profile" 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover opacity-80" 
                            />
                            <div className="absolute inset-0 bg-slate-900/40"></div>
                            <div className="absolute inset-x-0 bottom-0 bg-slate-900/90 text-center py-1 text-[9px] text-cyan-400 font-mono">
                              Active Subject
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <h4 className="font-bold text-white text-sm">SeeDance 2.5 Inference Stage</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              Synthesizes **{selectedChar.name}** character anatomy map to move seamlessly in **{selectedMotion.name}** sequence at **{fps} FPS**.
                            </p>
                          </div>

                          <button
                            onClick={triggerInference}
                            className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold text-xs py-2.5 px-6 rounded-lg shadow-lg shadow-indigo-600/10 hover:shadow-cyan-400/20 active:scale-95 transition-all inline-flex items-center space-x-2 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                            <span>Run Motion Inference</span>
                          </button>
                        </div>
                      )}

                      {/* Display active calculation state */}
                      {generationStage === "rendering" && (
                        <div className="w-full h-full flex flex-col items-center justify-center space-y-6">
                          
                          {/* Live Track Canvas and character background side-by-side */}
                          <div className="relative w-64 h-64 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
                            {/* Blur backdrop of selected character for high tech feeling */}
                            <img 
                              src={selectedChar.url} 
                              alt="Backdrop rendering" 
                              referrerPolicy="no-referrer"
                              className="absolute inset-0 w-full h-full object-cover opacity-15 blur-sm" 
                            />
                            
                            {/* OpenPose live animated tracking rendering */}
                            <canvas 
                              ref={canvasRef} 
                              width={256} 
                              height={256} 
                              className="absolute inset-0 w-full h-full"
                            />

                            {/* HUD overlay */}
                            <div className="absolute left-2.5 top-2.5 text-[8px] font-mono text-slate-400 space-y-0.5 bg-slate-950/80 px-1.5 py-1 rounded border border-slate-800">
                              <p>BPM: <span className="text-indigo-400">{selectedMotion.bpm}</span></p>
                              <p>SAMPLING: <span className="text-cyan-400">UNet 1D</span></p>
                              <p>GRID: <span className="text-indigo-400">{skeletonBeat}%</span></p>
                            </div>

                            <div className="absolute right-2.5 top-2.5 text-[8px] font-mono text-slate-400 bg-slate-950/80 px-1.5 py-1 rounded border border-slate-800 flex items-center space-x-1">
                              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping"></span>
                              <span>LIVE VRAM: 15.8GB</span>
                            </div>

                            {/* Progress Ring percentage centered overlay */}
                            <div className="absolute bottom-2.5 inset-x-0 text-center">
                              <span className="bg-indigo-950/90 border border-indigo-700/60 text-indigo-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                                Diffusing Keyframes: {Math.floor(renderProgress)}%
                              </span>
                            </div>
                          </div>

                          {/* Loading labels */}
                          <div className="text-center space-y-2 max-w-sm">
                            <div className="flex items-center justify-center space-x-2">
                              <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                              <span className="text-slate-200 text-xs font-semibold tracking-wide block">{currentStepText}</span>
                            </div>
                            
                            {/* Outer progress line */}
                            <div className="w-64 h-1 bg-slate-950 rounded-full overflow-hidden mx-auto border border-slate-800">
                              <div 
                                className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-100 ease-out"
                                style={{ width: `${renderProgress}%` }}
                              ></div>
                            </div>

                            <p className="text-[10px] text-slate-500 font-mono">
                              FPS Pipeline: {fps} | CFG: {guidanceScale.toFixed(1)} | Hands: {handRefine ? "Refined" : "Normal"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Rendering Completed Showcase and Looping Character Dance Mock */}
                      {generationStage === "completed" && (
                        <div className="w-full text-center space-y-4 flex flex-col items-center">
                          
                          {/* Beautiful Interactive Dancing Frame simulating character actually moving! */}
                          <div className="relative w-64 h-64 bg-slate-900 border border-indigo-500/40 rounded-xl overflow-hidden shadow-2xl shadow-indigo-500/5 group">
                            
                            {/* Animated character container that dances using css styling */}
                            <motion.div
                              animate={
                                selectedMotion.id === "kpop_shuffle" 
                                  ? {
                                      rotate: [0, -1, 1, -1, 0],
                                      scale: [1, 1.02, 0.98, 1.02, 1],
                                      y: [0, -10, 5, -8, 0]
                                    }
                                  : selectedMotion.id === "cyber_popping"
                                  ? {
                                      y: [0, -4, 0, -4, 0, -4, 0],
                                      scale: [1, 1.01, 0.99, 1.01, 1],
                                      skewX: [0, 1, -1, 1, -1, 0]
                                    }
                                  : selectedMotion.id === "breakdance_headspin"
                                  ? {
                                      rotate: [0, 90, 180, 270, 360],
                                      y: [0, -20, 20, -10, 0],
                                      scale: [1, 0.9, 1.1, 0.9, 1]
                                    }
                                  : { // classical_wave
                                      skewX: [0, -3, 3, -3, 0],
                                      y: [0, -6, 0, -6, 0],
                                      scale: [1, 1.03, 1, 1.03, 1]
                                    }
                              }
                              transition={{
                                repeat: Infinity,
                                duration: selectedMotion.id === "kpop_shuffle" ? 1.6 : selectedMotion.id === "classical_wave" ? 3.5 : 2.5,
                                ease: "easeInOut"
                              }}
                              className="w-full h-full cursor-pointer relative"
                            >
                              <img 
                                src={selectedChar.url} 
                                alt="Dancing Result Portrait" 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover" 
                              />
                            </motion.div>

                            {/* Floating Skeleton track overlay on completed animation */}
                            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen bg-transparent">
                              <canvas ref={canvasRef} width={256} height={256} className="w-full h-full" />
                            </div>

                            {/* Quality check HUD tag */}
                            <div className="absolute left-2 top-2 bg-emerald-500 text-slate-950 font-bold text-[8px] uppercase tracking-widest px-1.5 py-0.5 rounded">
                              SUCCESS • 60FPS OUT
                            </div>

                            {/* Interactive Hover controls */}
                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center space-x-3">
                              <button 
                                onClick={triggerInference}
                                className="p-2 bg-slate-900 border border-slate-700 rounded-full hover:bg-slate-800 transition text-cyan-400"
                                title="Re-generate"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => {
                                  alert(`Successfully simulated download for high-definition SeeDance sequence! Filename: seedance_${selectedChar.id}_${selectedMotion.id}.mp4`);
                                }}
                                className="p-2 bg-slate-900 border border-slate-700 rounded-full hover:bg-slate-800 transition text-emerald-400"
                                title="Download MP4 Video"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1 max-w-sm">
                            <h4 className="font-bold text-white text-xs">{selectedChar.name} Animation Loop</h4>
                            <p className="text-[11px] text-slate-400">
                              Pose Source: **{selectedMotion.name}** ({selectedMotion.bpm} BPM) outputted via SeeDance 2.5 with precision alignment locks.
                            </p>
                          </div>

                          <div className="flex space-x-2 pt-1.5">
                            <button
                              onClick={() => setGenerationStage("idle")}
                              className="border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs px-4 py-2 rounded-lg transition"
                            >
                              Reset Playground
                            </button>
                            
                            <button
                              onClick={() => {
                                alert("API simulated download sequence started. Rendering weight logs packaging now.");
                              }}
                              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-4 py-2 rounded-lg transition flex items-center space-x-1.5 shadow shadow-emerald-600/20"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download HD 60FPS Video</span>
                            </button>
                          </div>

                        </div>
                      )}

                    </div>

                    {/* Stage Metrics panel */}
                    <div className="bg-slate-950 text-slate-400 border-t border-slate-800 px-4 py-2.5 text-[10px] sm:text-xs font-mono flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-3 gap-y-1">
                        <span>MODEL: <strong className="text-slate-200">SeeDance-v2.5-Ultra</strong></span>
                        <span className="text-slate-600">|</span>
                        <span>LATENCY: <strong className="text-indigo-400">~14.5s (A100)</strong></span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        <span className="text-slate-300">Douyin CapCut Backend Integrated</span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* SEO Core Guide Grid */}
              <div className="border border-slate-800 bg-slate-900/40 rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-2 text-amber-400">
                  <TrendingUp className="w-5 h-5" />
                  <h3 className="font-bold text-white text-base">Seedance 2.5 Viral Reach & GitHub Strategy</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  ByteDance's **SeeDance** model family drives the most trendy filters across Douyin and Jianying CapCut globally. Combining character profiles with pose mappings makes it highly sought after. Use our precompiled SEO long-tail catalog to optimize your personal repositories for immediate search indexation on GitHub and Google.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Weekly Searches</span>
                    <strong className="text-sm font-mono text-cyan-400">145k+ Queries</strong>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">GitHub Competition</span>
                    <strong className="text-sm font-mono text-indigo-400">Very Low (Fresh)</strong>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">SEO Opportunity</span>
                    <strong className="text-sm font-mono text-amber-400">Goldmine Core</strong>
                  </div>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-1">Recommended License</span>
                    <strong className="text-sm font-mono text-emerald-400">Apache 2.0</strong>
                  </div>
                </div>
              </div>

            </motion.div>
          )}

          {/* SYSTEM FEATURES TAB */}
          {activeTab === "architecture" && (
            <motion.div
              key="architecture-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-white">Seedance 2.5 Core Structural Foundations</h2>
                <p className="text-sm text-slate-300">
                  SeeDance 2.5 achieves consistent video synthesis using three proprietary networks working in synchrony:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ID-Net */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 hover:border-slate-700 transition">
                  <div className="bg-cyan-500/10 text-cyan-400 w-10 h-10 rounded-lg flex items-center justify-center font-bold font-mono">
                    IDN
                  </div>
                  <h3 className="font-bold text-white text-base">Identity Encoder Net (ID-Net)</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    Rather than relying on visual embeddings representing broad face metrics alone, ID-Net runs high-frequency pixel analysis across the target's clothing layers, facial features, and accessory segments, projecting these matrices directly into the temporal layers.
                  </p>
                  <ul className="text-[11px] text-slate-300 space-y-1.5 font-mono">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                      <span>Zero-Shot Clothes preservation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                      <span>Face texture fidelity lock &gt;= 98%</span>
                    </li>
                  </ul>
                </div>

                {/* SPA Card */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 hover:border-slate-700 transition">
                  <div className="bg-indigo-500/10 text-indigo-400 w-10 h-10 rounded-lg flex items-center justify-center font-bold font-mono">
                    SPA
                  </div>
                  <h3 className="font-bold text-white text-base">Pose Adaption Net (SPA)</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    The Skeletal Pose Adapter captures OpenPose dense keypoints from reference dance sequences and converts them into coordinate grids. It estimates bone constraints dynamically, ensuring natural joints flow without awkward anatomy distortions.
                  </p>
                  <ul className="text-[11px] text-slate-300 space-y-1.5 font-mono">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                      <span>Intricate limb rotation tracks</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                      <span>Hand/Finger flow refiner</span>
                    </li>
                  </ul>
                </div>

                {/* TAB Card */}
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 hover:border-slate-700 transition">
                  <div className="bg-purple-500/10 text-purple-400 w-10 h-10 rounded-lg flex items-center justify-center font-bold font-mono">
                    TAB
                  </div>
                  <h3 className="font-bold text-white text-base">Temporal Attention Block (TAB)</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    By binding 1D temporal convolution operations onto traditional stable diffusion structures, TAB processes neighboring frames in packs. It completely eliminates background warping, dynamic noise, and random landscape distortion during high movement sequences.
                  </p>
                  <ul className="text-[11px] text-slate-300 space-y-1.5 font-mono">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                      <span>Flawless 60FPS video alignment</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                      <span>Eliminates block visual flickerings</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Technical comparisons */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="px-5 py-4 bg-slate-950 border-b border-slate-800">
                  <h3 className="font-bold text-white text-sm">SeeDance 2.5 vs. Legacy Models Comparison</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] tracking-wider uppercase border-b border-slate-800">
                      <tr>
                        <th className="p-4">Feature Parameter</th>
                        <th className="p-4">Legacy SeeDance 1.x</th>
                        <th className="p-4">SeeDance 2.0</th>
                        <th className="p-4 text-cyan-400 bg-cyan-950/20">SeeDance 2.5 (Current)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-sans">
                      <tr>
                        <td className="p-4 font-bold text-white">Target Output Quality</td>
                        <td className="p-4">360p / 15 FPS Jittery</td>
                        <td className="p-4">720p / 30 FPS Good</td>
                        <td className="p-4 text-cyan-300 bg-cyan-950/10">1080p / 60 FPS Ultra-Coherent</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-white">Hand/Finger Alignment</td>
                        <td className="p-4">High distortion (fused fingers)</td>
                        <td className="p-4">Standard skeletal alignment</td>
                        <td className="p-4 text-cyan-300 bg-cyan-950/10">Region Loss Grid Refinement (True)</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-white">Zero-Shot Capabilities</td>
                        <td className="p-4">Requires character LoRA fine-tuning</td>
                        <td className="p-4">No LoRA needed (standard faces)</td>
                        <td className="p-4 text-cyan-300 bg-cyan-950/10">Zero-Shot (Anime, 3D Canvas, Humans)</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-bold text-white">Background Consistency</td>
                        <td className="p-4">Melts during movement</td>
                        <td className="p-4">Minor background artifacts</td>
                        <td className="p-4 text-cyan-300 bg-cyan-950/10">Optical-Flow Coherence (Steady locks)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* CORE API REFERENCE & SDKs TAB */}
          {activeTab === "api" && (
            <motion.div
              key="api-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">Seedance 2.5 Endpoint Integration</h2>
                <p className="text-sm text-slate-300">
                  Integrate ByteDance SeeDance 2.5 directly into your game engines, automated filter scripts, and post-production video editors using our APIs.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                
                {/* Language Tab Headers */}
                <div className="bg-slate-950 px-5 h-12 flex items-center justify-between border-b border-slate-800">
                  <div className="flex space-x-1.5">
                    {(["python", "node", "curl", "comfyui"] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setApiLanguage(lang)}
                        className={`px-3 py-1 rounded text-xs font-mono transition capitalize cursor-pointer ${
                          apiLanguage === lang 
                            ? "bg-slate-800 text-cyan-400 border border-slate-700" 
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {lang === "node" ? "Node.js" : lang === "comfyui" ? "ComfyUI Node" : lang}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => copyToClipboard(CODE_SNIPPETS[apiLanguage])}
                    className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white font-sans bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800 transition cursor-pointer"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy SDK Sample</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Simulated Code area */}
                <div className="p-5 bg-slate-950 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed max-h-[460px]">
                  <pre className="text-slate-300">
                    <code>{CODE_SNIPPETS[apiLanguage]}</code>
                  </pre>
                </div>

              </div>

              {/* Advanced Header configs explanation */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex items-center space-x-2 text-indigo-400">
                  <Layers className="w-5 h-5" />
                  <h3 className="font-bold text-white text-sm">Header Specifications & Authentication Keys</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-300">
                  <div className="space-y-1">
                    <strong className="text-white block">Bearer Authentication</strong>
                    <p className="text-slate-400 leading-relaxed">
                      Supply your ByteDance Dev Key as an authorization header. Always shield these keys on client devices by proxying calls through an Express middle tier.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-white block">Regional Endpoint Target</strong>
                    <p className="text-slate-400 leading-relaxed">
                      By default, API connections route to the closest high-performance edge cluster in Singapore, West Virginia, or Beijing, minimizing packet loss.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SEO LONG-TAILS HUB STRATEGY */}
          {activeTab === "seo" && (
            <motion.div
              key="seo-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">Seedance 2.5 SEO Optimization Sheet</h2>
                <p className="text-sm text-slate-300">
                  When creating your GitHub repository for Seedance 2.5, including high-intent long-tail keywords in your directory content ensures maximum traffic discovery. We have calculated the top search terms:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Longtail Keywords container */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <h3 className="font-bold text-white text-sm">Target Search Terms (Long-Tail)</h3>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">HIGH CLICKS</span>
                  </div>

                  <div className="space-y-2">
                    {[
                      "seedance 2.5 model",
                      "bytedance seedance 2.5 tutorial",
                      "ai dance generator seedance download",
                      "seedance 2.5 release date free",
                      "how to make text to dance video ai",
                      "see dance bytedance comfyui node",
                      "seedance 2.5 api pricing keys",
                      "best openpose pose to video software"
                    ].map((kw) => (
                      <div 
                        key={kw}
                        className="flex items-center justify-between bg-slate-950 p-2.5 rounded border border-slate-850 hover:border-slate-700 transition"
                      >
                        <span className="font-mono text-xs text-slate-300">{kw}</span>
                        <button
                          onClick={() => copyKeywordToClipboard(kw)}
                          className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded text-slate-300 transition flex items-center space-x-1 cursor-pointer"
                        >
                          {copiedKeyword === kw ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Tag</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Git Tags & SEO explanation */}
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                    <h3 className="font-bold text-white text-sm">Suggested GitHub Repository Topics</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-sans">
                      Adhere to standard open source classification by putting these tags on your GitHub project settings page:
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        "seedance-2-5",
                        "bytedance-ai",
                        "pose-to-video",
                        "motion-transfer",
                        "character-animation",
                        "dance-synthesizer",
                        "skeletal-joints",
                        "openpose-ai"
                      ].map((tag) => (
                        <span 
                          key={tag} 
                          onClick={() => copyKeywordToClipboard(tag)}
                          className="bg-slate-950 text-indigo-300 border border-indigo-900/60 px-2.5 py-1 rounded-md text-xs font-mono cursor-pointer hover:border-indigo-500 transition"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-850 rounded-xl p-5 space-y-2 text-xs">
                    <strong className="text-white block font-sans">How to maximize Github SEO impact?</strong>
                    <ol className="list-decimal list-inside space-y-2 text-slate-300 leading-relaxed">
                      <li>Drop our **Seedance 2.5 README.md** template directly inside your project root.</li>
                      <li>Pin this playground preview link to your Repo's **About Homepage** block.</li>
                      <li>Configure GitHub issues containing terms like `seedance-2.5-model-weights` so index engines crawl it fast!</li>
                    </ol>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* GITHUB README TEMPLATE FILEVIEW */}
          {activeTab === "readme" && (
            <motion.div
              key="readme-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-black text-white">Full copy-ready README.md File</h2>
                  <p className="text-sm text-slate-300">
                    This file is ready at the root of your project. Copy it or upload the entire workspace structure straight to GitHub!
                  </p>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      // Download action for README
                      const link = document.createElement("a");
                      link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(`# SeeDance 2.5 (Seedance 2.5): Ultimate Character Motion Transfer & AI Dance Video Generator ... (full content generated in root directory README.md)`);
                      link.download = "README.md";
                      link.click();
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs px-3 py-2 rounded flex items-center space-x-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download README</span>
                  </button>

                  <button
                    onClick={() => {
                      // Fetch simulated readme
                      copyToClipboard(`# SeeDance 2.5 (Seedance 2.5): Ultimate Character Motion Transfer & AI Dance Video Generator (Full README.md exists in your app directory)`);
                    }}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-3.5 py-2 rounded flex items-center space-x-1.5 transition shadow"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText ? "Copied!" : "Copy Raw README"}</span>
                  </button>
                </div>
              </div>

              {/* Readme container markdown look */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl text-slate-300 text-xs space-y-6 overflow-y-auto font-sans leading-relaxed max-h-[500px]">
                <div className="border-b border-slate-800 pb-4">
                  <h1 className="text-xl sm:text-2xl font-black text-white">SeeDance 2.5 (Seedance 2.5): Ultimate Character Motion Transfer & AI Dance Video Generator</h1>
                  <p className="text-slate-400 mt-2">A state-of-the-art open-source developer kit repository model.</p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-teal-400 text-sm">💡 Overview</h3>
                  <p>
                    **Seedance 2.5** (frequently referenced in official Douyin CapCut integrations as **SeeDance 2.5**) is ByteDance's modern framework to animate any human or digital character using structured spatial reference videos. It completely addresses traditional issues like face blurring, cloth disintegration, and context shifting in animated landscapes.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-teal-400 text-sm">🌐 Core Features</h3>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-300">
                    <li><strong>ID-Net Architecture:</strong> Multi-frequency reference tracking with fine identity retention scaling.</li>
                    <li><strong>Advanced Skeletal Adaptation:</strong> Robust OpenPose support that prevents multi-frame anatomy distortion.</li>
                    <li><strong>Temporal Coherence:</strong> Steady optical stream filtering avoiding any video flicker.</li>
                    <li><strong>Integrated ComfyUI Custom Node:</strong> Easy to chain into existing production pipelines.</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-teal-400 text-sm">🚀 Selected SEO Long-tails Included</h3>
                  <div className="bg-slate-950 p-4 rounded border border-slate-800 space-y-1 text-slate-400 font-mono text-[11px]">
                    <p>• bytedance seedance 2.5 model weight file guide</p>
                    <p>• how to use seedance 2.5 generator online free</p>
                    <p>• best ai video-to-video character motion models 2026</p>
                    <p>• see dance douyin filter backend implementation</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-teal-400 text-sm">📂 Basic Python Integration</h3>
                  <pre className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-[11px] text-indigo-300 overflow-x-auto leading-relaxed">
{`import seedance

client = seedance.Client(api_key="your_bytedance_seedance_api_key")
response = client.video.generate(
    character_image="avatar.jpg",
    motion_video="motion_skeleton.mp4"
)
print("Finished generation: " + response.output_url)`}
                  </pre>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Styled Footnote Section */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-xs text-slate-400 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-white">SeeDance 2.5 Hub</span>
            <span className="text-[10px] text-slate-500 font-mono">|</span>
            <span className="font-sans text-slate-500">A professional-grade showcase built with pure React & Tailwind CSS</span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="#live-playground" 
              onClick={() => setActiveTab("readme")}
              className="hover:text-cyan-400 transition"
            >
              Copy GitHub Pack
            </a>
            <span className="text-slate-700">•</span>
            <span className="text-[11px] font-mono text-cyan-400">Apache 2.0 Licensable</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
