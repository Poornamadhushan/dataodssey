'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface AIDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIDemoModal({ isOpen, onClose }: AIDemoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // ✅ Play video when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        // MUST be set before play
        video.muted = true;
        video.playsInline = true;
        video.currentTime = 0;

        await video.load(); // important for some browsers
        await video.play();
      } catch (err) {
        console.log('Video play failed:', err);
      }
    };

    playVideo();
  }, [isOpen]);

  // ✅ Stop video when closing
  useEffect(() => {
    if (!isOpen) return;

    return () => {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [isOpen]);

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
                autoPlay
                muted
                playsInline
                controls
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
