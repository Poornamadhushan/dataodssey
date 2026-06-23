'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface AIDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// GitHub Pages repo name
const VIDEO_PATH = '/dataodssey/videos/introVideo.mp4';

export default function AIDemoModal({
  isOpen,
  onClose,
}: AIDemoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (isOpen) {
      setVideoError(false);

      video.currentTime = 0;

      const playVideo = async () => {
        try {
          await video.play();
        } catch (err) {
          console.log('Autoplay prevented:', err);
        }
      };

      playVideo();
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
            if (e.target === e.currentTarget) {
              onClose();
            }
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

            {/* Video Area */}
            <div className="relative aspect-video bg-black">
              {videoError ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <p className="text-red-400 text-xl mb-3">
                    ⚠️ Video failed to load
                  </p>

                  <p className="text-white/60 mb-2">
                    Expected URL:
                  </p>

                  <code className="bg-white/10 px-3 py-2 rounded text-cyan-400 text-sm">
                    {VIDEO_PATH}
                  </code>

                  <p className="text-white/40 text-sm mt-4 max-w-md">
                    Verify that the file exists in:
                    <br />
                    public/videos/introVideo.mp4
                  </p>

                  <button
                    onClick={() => {
                      setVideoError(false);

                      if (videoRef.current) {
                        videoRef.current.load();
                      }
                    }}
                    className="mt-5 px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={VIDEO_PATH}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={() =>
                    console.log('Video loaded successfully')
                  }
                  onError={(e) => {
                    console.error('Video load error:', e);
                    setVideoError(true);
                  }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
