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
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // ✅ Play video when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const video = videoRef.current;
    if (!video) return;

    // Reset error state when modal opens
    setVideoError(false);
    setIsPlaying(false);

    const playVideo = async () => {
      try {
        // Reset video
        video.currentTime = 0;
        video.muted = true;
        video.playsInline = true;
        
        // Reload the video to ensure fresh state
        video.load();
        
        // Wait a bit for load to start
        await new Promise(resolve => setTimeout(resolve, 100));
        
        console.log('Attempting to play video from:', video.src);
        
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log('✅ Video playing successfully!');
          setIsPlaying(true);
          setVideoError(false);
        }
      } catch (err) {
        console.error('❌ Video play failed:', err);
        setVideoError(true);
        
        // Try one more time with a different approach
        try {
          console.log('Retrying video play...');
          video.muted = true;
          await video.play();
          setIsPlaying(true);
          setVideoError(false);
          console.log('✅ Video playing on retry!');
        } catch (retryErr) {
          console.error('❌ Retry failed:', retryErr);
        }
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(() => {
        playVideo();
      });
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen]);

  // ✅ Stop video when closing
  useEffect(() => {
    return () => {
      if (!isOpen) {
        const video = videoRef.current;
        if (video) {
          video.pause();
          video.currentTime = 0;
          setIsPlaying(false);
        }
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
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black border border-cyan-500/30 shadow-[0_0_80px_rgba(0,245,255,0.15)]"
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
                  <p className="text-sm">Please ensure the file exists at: <span className="text-cyan-400">public/videos/introVideo.mp4</span></p>
                  <button 
                    onClick={() => {
                      const video = videoRef.current;
                      if (video) {
                        video.load();
                        video.play().catch(console.error);
                      }
                    }}
                    className="mt-4 px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition"
                  >
                    Retry Playing
                  </button>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src="/videos/introVideo.mp4"
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  controls
                  preload="auto"
                  onError={(e) => {
                    console.error('❌ Video loading error:', e);
                    console.log('Video src:', videoRef.current?.src);
                    setVideoError(true);
                  }}
                  onLoadedData={() => {
                    console.log('✅ Video data loaded!');
                    setVideoError(false);
                  }}
                  onCanPlay={() => {
                    console.log('✅ Video can play!');
                    if (!isPlaying && videoRef.current) {
                      videoRef.current.play().catch(console.error);
                    }
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
