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

  // Auto-play when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // autoplay might be blocked if not muted
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-black border border-cyan-500/30 shadow-[0_0_80px_rgba(0,245,255,0.15)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest">
                <Play className="w-4 h-4" />
                AI DEMO INTRO
              </div>

              <button
                onClick={onClose}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video */}
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src="/vidoe/introvideo.mp4"
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
