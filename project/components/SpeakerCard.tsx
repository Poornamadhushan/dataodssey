'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

type SpeakerCardProps = {
  name: string;
  role: string;
  image: string;
  alt: string;
  topic: string;
  status: string;
  index: number;
};

export default function SpeakerCard({
  name,
  role,
  image,
  alt,
  topic,
  status,
  index,
}: SpeakerCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className="group relative mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#07111f]/80 transition-all duration-500 hover:border-cyan-400/40 hover:shadow-[0_0_34px_rgba(0,245,255,0.14)]"
    >
      <div className="relative aspect-[16/12] overflow-hidden bg-[#07111f]">
        <Image
          src={image}
          alt={alt}
          fill
          className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
          style={{ objectPosition: 'center center' }}
          sizes="(min-width: 1024px) 500px, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      </div>

      <div className="relative px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
        <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-cyan-300/80">
          {status}
        </span>

        <h4
          className="mt-3 text-lg font-bold text-white sm:text-xl"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          {name}
        </h4>

        <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
          <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-300/70">
            Session Topic
          </p>
          <p className="mt-2 text-sm font-medium leading-relaxed text-white/80">
            {topic}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
