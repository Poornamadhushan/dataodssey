'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface AIDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIDemoModal({ isOpen, onClose }: AIDemoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // ✅ Play video when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        // Reset video state
        video.currentTime = 0;
        video.muted = true;
        video.playsInline = true;
        
        // Make sure video is loaded
        if (!isVideoReady) {
          await video.load();
          setIsVideoReady(true);
        }

        // Play with user gesture handling
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (err) {
        console.log('Video play failed:', err);
        // Fallback: try playing on user interaction
        const handleUserInteraction = async () => {
          try {
            await video.play();
          } catch (e) {
            console.log('Fallback play failed:', e);
          }
          document.removeEventListener('click', handleUserInteraction);
        };
        document.addEventListener('click', handleUserInteraction);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(playVideo, 100);
    return () => clearTimeout(timer);
  }, [isOpen, isVideoReady]);

  // ✅ Stop video when closing
  useEffect(() => {
    if (!isOpen) {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
      setIsVideoReady(false);
    }
  }, [isOpen]);

  // ✅ Handle video loading errors
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = (e: Event) => {
      console.error('Video error:', e);
    };

    const handleLoadedData = () => {
      setIsVideoReady(true);
    };

    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black border border-cyan-500/30 shadow-[0_0_80px_rgba(0,245,255,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest">
                <Play className="w-4 h-4" />
                AI DEMO INTRO
              </div>

              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video */}
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src="/videos/introVideo.mp4"
                className="w-full h-full object-cover"
                muted
                playsInline
                controls
                preload="metadata"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
