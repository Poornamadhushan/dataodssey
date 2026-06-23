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
  const [retryCount, setRetryCount] = useState(0);

  // The correct path based on your file location
  const VIDEO_PATH = '/videos/introVideo.mp4';

  useEffect(() => {
    if (!isOpen) return;

    const video = videoRef.current;
    if (!video) return;

    const playVideo = async () => {
      try {
        // Reset video
        video.muted = true;
        video.playsInline = true;
        video.currentTime = 0;
        
        console.log('🎬 Attempting to play video from:', VIDEO_PATH);
        console.log('📍 Expected file location: project/public/videos/introVideo.mp4');
        
        // Force reload
        video.load();
        
        // Wait for load
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Try to play
        await video.play();
        console.log('✅ Video playing successfully!');
        setVideoError(false);
      } catch (err) {
        console.error('❌ Video play failed:', err);
        setVideoError(true);
        
        // Retry after a delay
        if (retryCount < 3) {
          console.log(`🔄 Retry ${retryCount + 1}/3...`);
          setRetryCount(prev => prev + 1);
          setTimeout(() => {
            if (video) {
              video.load();
              video.play().catch(console.error);
            }
          }, 1000);
        }
      }
    };

    const timer = setTimeout(playVideo, 200);
    return () => clearTimeout(timer);
  }, [isOpen, retryCount]);

  // Reset retry count when modal closes
  useEffect(() => {
    if (!isOpen) {
      setRetryCount(0);
      setVideoError(false);
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    }
  }, [isOpen]);

  // Debug: Check if file exists
  useEffect(() => {
    if (!isOpen) return;

    // Try to fetch the video file to check if it exists
    fetch(VIDEO_PATH, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          console.log('✅ Video file exists at:', VIDEO_PATH);
        } else {
          console.error('❌ Video file NOT found at:', VIDEO_PATH);
          console.log('Status:', res.status);
          console.log('Please ensure the file is at: project/public/videos/introVideo.mp4');
          console.log('And that it has been committed/pushed to GitHub');
        }
      })
      .catch(err => {
        console.error('❌ Error checking video file:', err);
      });
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
                  <p className="text-red-400 mb-2 text-lg">⚠️ Video file not found</p>
                  <p className="text-sm mb-2">Expected location:</p>
                  <code className="bg-white/10 px-3 py-1 rounded text-cyan-400 text-xs mb-4">
                    dataodssey/project/public/videos/introVideo.mp4
                  </code>
                  <p className="text-xs text-white/40 max-w-md mb-4">
                    The video file might not have been committed/pushed to GitHub yet.
                    Please ask your collaborator to add the file to the repository.
                  </p>
                  <button 
                    onClick={() => {
                      setVideoError(false);
                      setRetryCount(0);
                      const video = videoRef.current;
                      if (video) {
                        video.load();
                        setTimeout(() => video.play().catch(console.error), 100);
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
                  onError={(e) => {
                    console.error('❌ Video loading error:', e);
                    console.log('Failed to load from:', VIDEO_PATH);
                    setVideoError(true);
                  }}
                  onLoadedData={() => {
                    console.log('✅ Video loaded successfully from:', VIDEO_PATH);
                    setVideoError(false);
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
