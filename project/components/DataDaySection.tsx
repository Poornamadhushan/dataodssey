'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Bot,
  CalendarDays,
  Lightbulb,
  MessageCircle,
  Mic2,
  Network,
  Sparkles,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import SpeakerCard from '@/components/SpeakerCard';
import { withBasePath } from '@/lib/asset-path';

const DATA_DAY_IMAGE = withBasePath('/data-day-2026.png');

const SPEAKERS = [
  {
    name: 'Dr. Charith Silva',
    role: 'Speaker session topic for Data Day 2026.',
    image: withBasePath('/speakers/charith-silva.jpg'),
    alt: 'Portrait of Dr. Charith Silva',
    topic: 'Building AI-Ready Data Pipelines',
    status: 'Speaker',
  },
  {
    name: 'Professor Dakshina Silva',
    role: 'First speaker session topic for Data Day 2026.',
    image: withBasePath('/speakers/dakshina-de-silva.jpg'),
    alt: 'Portrait of Professor Dakshina Silva',
    topic: 'Environmental Economics, Climate Change, and Environmental Justice',
    status: 'Speaker',
  },
];

const HIGHLIGHTS = [
  { title: 'Expert Talks', icon: Mic2 },
  { title: 'AI & Data Science Insights', icon: Bot },
  { title: 'Data-Driven Innovation', icon: Lightbulb },
  { title: 'Networking', icon: Users },
  { title: 'Interactive Discussions', icon: MessageCircle },
  { title: 'Industry Perspectives', icon: Network },
];

export default function DataDaySection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: '-80px' });
  const [eventImageReady, setEventImageReady] = useState(true);

  return (
    <section id="data-day" className="relative overflow-hidden bg-[#050816] py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-0 cyber-grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-1/4 h-24 w-px bg-gradient-to-b from-transparent to-cyan-500/30" />
      <div className="absolute bottom-0 left-1/4 h-24 w-px bg-gradient-to-t from-transparent to-blue-500/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-white/[0.03] px-3 py-1.5 glass">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300/80">
                Data Odyssey 2026
              </span>
            </div>

            <h2
              className="font-bold text-white"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(2rem, 7vw, 4.5rem)',
              }}
            >
              DATA DAY{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                2026
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-lg font-semibold leading-relaxed text-cyan-200 sm:text-xl">
              Humanity × AI: The New Age of Innovation
            </p>

            <div className="mt-5 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-[11px] font-mono uppercase tracking-wider text-cyan-200">
              <CalendarDays className="h-4 w-4 shrink-0" />
              <span>18 AUGUST 2026 · FGS AUDITORIUM · KDU</span>
            </div>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              Data Day 2026 is the inaugural seminar of Data Odyssey 2026 by the
              AI and Data Science Club of General Sir John Kotelawala Defence
              University, bringing participants together to explore Data Science,
              AI, and Machine Learning through knowledge sharing, innovation, and
              real-world problem solving.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.7 }}
            className="group relative"
          >
            <div className="absolute -inset-3 rounded-[1.75rem] bg-cyan-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-80" />
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-cyan-950/20 shadow-[0_0_42px_rgba(0,245,255,0.12)]">
              {eventImageReady ? (
                <Image
                  src={DATA_DAY_IMAGE}
                  alt="Data Day 2026 event photograph"
                  width={900}
                  height={675}
                  onError={() => setEventImageReady(false)}
                  className="aspect-[4/3] w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div
                  role="img"
                  aria-label="Data Day 2026 event visual placeholder"
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#050816]"
                >
                  <div className="absolute inset-0 cyber-grid-bg opacity-30" />
                  <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20" />
                  <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20" />
                  <Sparkles className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-cyan-300/80" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="rounded-xl border border-white/[0.06] bg-[#050816]/70 p-4 backdrop-blur-xl">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-cyan-300/80">
                    Inaugural Seminar
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Data Day 2026 brings human intelligence and artificial
                    intelligence together for a new age of innovation.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {HIGHLIGHTS.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group rounded-2xl border border-cyan-500/15 bg-white/[0.03] p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-cyan-500/10"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                <highlight.icon className="h-5 w-5 text-cyan-300" />
              </div>
              <p className="text-xs font-medium leading-snug text-white/70">
                {highlight.title}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 sm:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <h3
              className="font-bold text-white"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: 'clamp(1.5rem, 5vw, 2.75rem)',
              }}
            >
              Meet the Speakers
            </h3>
            <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:gap-8">
            {SPEAKERS.map((speaker, index) => (
              <SpeakerCard key={speaker.name} {...speaker} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
