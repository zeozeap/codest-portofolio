"use client";

import { Suspense, useState, useEffect, useCallback, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { Saturn } from "./saturn";
import { Starfield } from "./starfield";

interface IntroSceneProps {
  onComplete: () => void;
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshBasicMaterial color="#00d2ff" wireframe />
    </mesh>
  );
}

export function IntroScene({ onComplete }: IntroSceneProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const transitionAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/ambient-space.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    transitionAudioRef.current = new Audio("/audio/whoosh.mp3");
    transitionAudioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isMuted]);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleTransition = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);

    if (transitionAudioRef.current && !isMuted) {
      transitionAudioRef.current.play().catch(() => {});
    }

    if (audioRef.current) {
      const fadeOut = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.05;
        } else {
          clearInterval(fadeOut);
          if (audioRef.current) {
            audioRef.current.pause();
          }
        }
      }, 50);
    }

    setTimeout(onComplete, 1500);
  }, [isExiting, isMuted, onComplete]);

  useEffect(() => {
    const autoTransition = setTimeout(handleTransition, 3000);
    return () => clearTimeout(autoTransition);
  }, [handleTransition]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900"
        >
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={45} />
            <ambientLight intensity={0.3} color="#ffffff" />
            <Suspense fallback={<LoadingFallback />}>
              <Starfield count={2000} />
              <Saturn />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.2}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Canvas>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-wider"
              style={{
                background:
                  "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 50%, #00d2ff 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 40px rgba(0, 210, 255, 0.5)",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              CODEST
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-white/70 text-sm md:text-base tracking-widest uppercase"
            >
              Premium Digital Solutions
            </motion.p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-6 right-6 p-3 rounded-full glass neon-border transition-all duration-300 hover:scale-110"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeOffIcon className="w-6 h-6 text-white/70" />
            ) : (
              <VolumeUpIcon className="w-6 h-6 text-neon" />
            )}
          </motion.button>

          {showSkip && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleTransition}
              className="absolute bottom-8 right-8 px-6 py-3 text-sm font-medium tracking-wider uppercase glass neon-border rounded-full transition-all duration-300 hover:scale-105 text-white/80 hover:text-white shine-button"
            >
              Enter Site
            </motion.button>
          )}

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900"
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Canvas>
              <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={45} />
              <ambientLight intensity={0.3} color="#ffffff" />
              <Suspense fallback={null}>
                <Starfield count={2000} />
                <Saturn />
              </Suspense>
            </Canvas>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}