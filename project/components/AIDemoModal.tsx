'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface AIDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// This site is deployed to GitHub Pages under a subpath:
// https://poornamadhushan.github.io/dataodssey/
// so every asset path must include that "/dataodssey" prefix in production,
// since GitHub Pages serves the repo from a folder, not the domain root.
// Hardcoded directly (rather than via env var) since the env-var/basePath
// approach was not reliably applying at build time.
const VIDEO_PATH = '/dataodssey/videos/introVideo.mp4';

export default function AIDemoModal({ isOpen, onClose }: AIDemoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  // Play/pause/reset whenever the modal opens or closes.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      setVideoError(false);
      video.currentTime = 0;
      // play() returns a promise that rejects if autoplay is blocked or
      // the source 404s. We only treat real load failures as errors via
      // onError below — this catch just stops an unhandled rejection
      // from showing up in the console for benign autoplay blocks.
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
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
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black border border-cyan-500/30 shadow-[0_0_80px_rgba(0,245,255,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
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

            <div className="relative aspect-video bg-black">
              {videoError ? (
                <div className="flex flex-col items-center justify-center h-full text-white/60 p-4 text-center">
                  <p className="text-red-400 mb-2 text-lg">⚠️ Video failed to load</p>
                  <p className="text-sm mb-2">Expected location:</p>
                  <code className="bg-white/10 px-3 py-1 rounded text-cyan-400 text-xs mb-4">
                    public{VIDEO_PATH}
                  </code>
                  <p className="text-xs text-white/40 max-w-md mb-4">
                    Make sure the file exists at that path in your repo and has
                    been committed/pushed. After deploying, you can also check{' '}
                    <code className="text-cyan-400">yourdomain.com{VIDEO_PATH}</code>{' '}
                    directly in the browser to confirm it loads.
                  </p>
                  <button
                    onClick={() => {
                      setVideoError(false);
                      const video = videoRef.current;
                      if (video) {
                        video.load();
                        video.play().catch(() => {});
                      }
                    }}
                    className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={VIDEO_PATH}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  controls
                  preload="auto"
                  onError={() => setVideoError(true)}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
