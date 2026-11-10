import React from 'react';
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { PageRoute } from '../../types';
import { asset } from '../../utils/assets';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-[#03121E] dark:bg-[#03121E] bg-slate-900 border-t border-[#29475A]/60 text-[#F4F8FC] overflow-hidden pt-16 pb-12">
      {/* Restrained Dandelion motif SVG in the background inspired by LinkedIn cover */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-20 dark:opacity-20 opacity-10 overflow-hidden w-96 h-96">
        <svg viewBox="0 0 400 400" className="w-full h-full text-[#56C7D8] fill-none stroke-current">
          {/* Main dandelion stalk */}
          <path d="M 320 400 Q 300 280 260 200" strokeWidth="2.5" />
          <path d="M 320 400 Q 340 320 330 260" strokeWidth="1.5" />
          {/* Stem foliage leaves */}
          <path d="M 305 350 L 260 360 L 295 340 L 250 345 L 290 320" strokeWidth="1.5" />
          {/* Dandelion seed head center */}
          <circle cx="260" cy="200" r="14" fill="currentColor" fillOpacity="0.2" strokeWidth="2" />
          {/* Radiating seed rays */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const x2 = 260 + Math.cos(angle) * 55;
            const y2 = 200 + Math.sin(angle) * 55;
            return (
              <g key={i}>
                <line x1="260" y1="200" x2={x2} y2={y2} strokeWidth="1" strokeOpacity="0.6" />
                <circle cx={x2} cy={y2} r="2" fill="currentColor" />
              </g>
            );
          })}
          {/* Floating seeds drifting across the wind to the left */}
          <g className="animate-pulse">
            <path d="M 210 160 Q 200 150 190 145" strokeWidth="1" />
            <circle cx="190" cy="145" r="1.8" fill="currentColor" />
            <path d="M 160 120 Q 145 110 130 115" strokeWidth="1" />
            <circle cx="130" cy="115" r="1.5" fill="currentColor" />
            <path d="M 110 90 Q 90 75 70 85" strokeWidth="0.8" />
            <circle cx="70" cy="85" r="1.2" fill="currentColor" />
            <path d="M 140 180 Q 115 170 95 185" strokeWidth="0.8" />
            <circle cx="95" cy="185" r="1.4" fill="currentColor" />
            <path d="M 230 100 Q 210 80 180 85" strokeWidth="1" />
            <circle cx="180" cy="85" r="1.6" fill="currentColor" />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#29475A]/60">
          {/* Column 1: Identity & Motto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={asset('images/logo.png')}
                alt="Neguse Solomon Logo"
                className="w-10 h-10 rounded border border-[#29475A]"
              />
              <div>
                <h3 className="text-base font-bold text-[#F4F8FC] tracking-tight">
                  Neguse Solomon Mekonnen
                </h3>
                <p className="text-xs font-mono text-[#56C7D8]">
                  Computational Civil Engineer &middot; Researcher
                </p>
              </div>
            </div>

            <p className="text-xs text-[#A8BAC9] leading-relaxed max-w-md">
              Working at the confluence of structural mechanics, Bayesian reliability updating,
              and scientific computing. Committed to evidence-based assessment of aging infrastructure.
            </p>

            {/* LinkedIn cover quote tribute */}
            <div className="pt-2">
              <div className="text-xs font-editorial italic text-[#D6B675] tracking-wide">
                &ldquo;Nobody&apos;s ever too old to set another goal, or to dream another dream.&rdquo;
              </div>
              <div className="text-[11px] font-mono text-[#A8BAC9]/80 mt-0.5">
                — C.S. Lewis &middot; <span className="text-[#56C7D8] font-sans font-semibold">Always Dream!</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-wider text-[#56C7D8] font-mono font-semibold">
              Index
            </div>
            <ul className="space-y-2 text-xs text-[#A8BAC9]">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#F4F8FC] transition-colors"
                >
                  Home &middot; Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('research')}
                  className="hover:text-[#F4F8FC] transition-colors"
                >
                  Research Case Studies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lab')}
                  className="hover:text-[#F4F8FC] transition-colors"
                >
                  Computational Lab (Live Demos)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('publications')}
                  className="hover:text-[#F4F8FC] transition-colors"
                >
                  Publications &amp; Preprints
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#F4F8FC] transition-colors"
                >
                  Software Repositories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journey')}
                  className="hover:text-[#F4F8FC] transition-colors"
                >
                  Academic Timeline &amp; Honors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cv')}
                  className="hover:text-[#F4F8FC] transition-colors"
                >
                  Curriculum Vitae (PDF)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Profiles & Verified Registry */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-wider text-[#56C7D8] font-mono font-semibold">
              Scholarly &amp; Engineering Profiles
            </div>
            <div className="space-y-2 text-xs">
              <a
                href="https://orcid.org/0009-0009-8145-4007"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#A8BAC9] hover:text-[#56C7D8] transition-colors font-mono"
              >
                <span className="w-4 text-center font-bold text-[#A6CE39]">iD</span>
                <span>ORCID: 0009-0009-8145-4007</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>

              <a
                href="https://scholar.google.com/citations?user=3zitT4AAAAAJ"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#A8BAC9] hover:text-[#56C7D8] transition-colors"
              >
                <span>Google Scholar</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>

              <a
                href="https://www.researchgate.net/profile/Neguse-Solomon-Mekonnen"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#A8BAC9] hover:text-[#56C7D8] transition-colors"
              >
                <span>ResearchGate Profile</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>

              <a
                href="https://github.com/nguseyxc92"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#A8BAC9] hover:text-[#56C7D8] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub &middot; @nguseyxc92</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>

              <a
                href="https://linkedin.com/in/negusesolomon"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#A8BAC9] hover:text-[#56C7D8] transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn &middot; /in/negusesolomon</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>

              <a
                href="https://tebib-labs.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-[#A8BAC9] hover:text-[#56C7D8] transition-colors"
              >
                <span>Tebib Labs (Applied R&amp;D Venture)</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar: Copyright & Status */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8BAC9]/80 font-mono">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Neguse Solomon Mekonnen.</span>
            <span>&middot;</span>
            <span>All academic citations &amp; datasets open science verified.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('contact')}
              className="text-[#56C7D8] hover:underline"
            >
              negusesolomon948@gmail.com
            </button>
            <span>&middot;</span>
            <span>Addis Ababa / Barcelona</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
