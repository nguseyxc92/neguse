import React from 'react';
import { ArrowRight, FileDown, Github, Mail, BookOpen, Cpu, ShieldCheck, Terminal, Compass } from 'lucide-react';
import { PageRoute } from '../types';
import { HeroBridgeCanvas } from '../components/home/HeroBridgeCanvas';
import { MetricPanels } from '../components/home/MetricPanels';
import { ZijlwegExplorer } from '../components/research/ZijlwegExplorer';
import { asset, CV_PDF } from '../utils/assets';

interface HomePageProps {
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-24 pb-12 overflow-hidden">
        {/* Interactive Finite Element Bridge Wireframe Background */}
        <HeroBridgeCanvas />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Typographic Hierarchy & Core Pitch (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Domain Label */}
              <div className="text-xs font-mono uppercase tracking-widest text-[#56C7D8] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#56C7D8]" />
                <span>COMPUTATIONAL ENGINEERING &middot; RESEARCH &middot; SOFTWARE</span>
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 leading-[1.08]">
                  Neguse Solomon Mekonnen
                </h1>
                <p className="text-xl sm:text-2xl font-medium text-[#56C7D8] mt-3 tracking-tight">
                  Engineering Reliability Through Computation.
                </p>
              </div>

              {/* Supporting Lead Text */}
              <p className="text-base text-[#A8BAC9] dark:text-[#A8BAC9] text-slate-600 leading-relaxed max-w-2xl">
                I am a computational civil engineer and software engineer working at the intersection of
                structural reliability, Bayesian inference, and scientific computing. My research focuses on
                using monitoring data, probabilistic models, and computational methods to better understand
                and assess infrastructure performance.
              </p>

              {/* Professional Status Callout */}
              <div className="p-3.5 rounded-lg bg-[#102A3D]/70 dark:bg-[#102A3D]/70 bg-slate-100 border border-[#29475A]/60 dark:border-[#29475A]/60 border-slate-300 max-w-xl text-xs flex items-center justify-between font-mono">
                <span className="text-[#A8BAC9] dark:text-[#A8BAC9] text-slate-600">Academic Status:</span>
                <span className="text-[#D6B675] font-semibold">
                  Exploring PhD Research Opportunities &middot; 2027
                </span>
              </div>

              {/* Primary & Secondary Action Cluster */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('research')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#03121E] bg-[#56C7D8] hover:bg-[#56C7D8]/90 rounded-lg transition-colors shadow-sm shadow-[#56C7D8]/20"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore My Research</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={CV_PDF}
                  download="Neguse_Solomon_Mekonnen_CV.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-700 bg-[#102A3D] dark:bg-[#102A3D] bg-white border border-[#29475A] dark:border-[#29475A] border-slate-300 hover:border-[#56C7D8] rounded-lg transition-colors"
                >
                  <FileDown className="w-4 h-4 text-[#56C7D8]" />
                  <span>Download Academic CV</span>
                </a>

                <a
                  href="https://github.com/nguseyxc92"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 text-sm text-[#A8BAC9] hover:text-[#F4F8FC] hover:bg-[#102A3D] rounded-lg transition-colors"
                  aria-label="View GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>

                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-3.5 py-2.5 text-sm text-[#A8BAC9] hover:text-[#F4F8FC] hover:bg-[#102A3D] rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D6B675]" />
                  <span>Contact Me</span>
                </button>
              </div>
            </div>

            {/* Right Column: Authentic Professional Headshot in Scientific Framing (5 cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group max-w-sm sm:max-w-md w-full">
                {/* Scientific Coordinate Overlay Framing */}
                <div className="absolute -inset-2 rounded-2xl border border-[#29475A]/80 pointer-events-none" />
                <div className="absolute -top-3 -left-3 text-[10px] font-mono text-[#56C7D8] bg-[#03121E] px-1.5 py-0.5 border border-[#29475A] rounded">
                  POS: 51.64&deg;N 5.04&deg;E
                </div>
                <div className="absolute -bottom-3 -right-3 text-[10px] font-mono text-[#D6B675] bg-[#03121E] px-1.5 py-0.5 border border-[#29475A] rounded">
                  UPC &middot; UniPD &middot; Wollo
                </div>

                {/* Headshot Container */}
                <div className="relative rounded-xl overflow-hidden border border-[#29475A] bg-[#061B2B] shadow-2xl aspect-[4/5]">
                  <img
                    src={asset('images/portrait.png')}
                    alt="Neguse Solomon Mekonnen - Computational Civil Engineer"
                    className="w-full h-full object-cover object-top filter contrast-[1.02] brightness-95"
                  />
                  {/* Subtle contrast gradient scrim at the bottom */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#03121E] via-[#03121E]/60 to-transparent">
                    <div className="text-xs font-bold text-[#F4F8FC] font-sans">
                      Neguse Solomon Mekonnen
                    </div>
                    <div className="text-[11px] font-mono text-[#56C7D8] mt-0.5">
                      MSc NoRISK &middot; BSc Civil Eng &middot; BSc CS (cand.)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Impact Metrics Strip */}
      <MetricPanels onNavigate={onNavigate} />

      {/* Three Connected Disciplines Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
            Core Methodological Triad
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 mt-1">
            Three Connected Disciplines
          </h2>
          <p className="text-xs sm:text-sm text-[#A8BAC9] mt-2">
            Bridging mechanical physics, statistical inference, and software engineering into unified solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Discipline 1: Physical Engineering */}
          <div className="p-6 rounded-xl bg-[#102A3D]/60 border border-[#29475A]/60 space-y-4 hover:border-[#56C7D8]/60 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#03121E] border border-[#29475A] flex items-center justify-center text-[#56C7D8]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
              1. Physical Engineering
            </h3>
            <p className="text-xs text-[#A8BAC9] leading-relaxed">
              Deep grounding in structural mechanics, load paths, material non-linearity, alkali-silica
              reaction (ASR) degradation, full-scale proof load protocols, and laboratory material testing.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#56C7D8] flex items-center gap-1">
              <span>RC Mechanics</span> &middot; <span>CSCT/CSDT</span> &middot; <span>SHM</span>
            </div>
          </div>

          {/* Discipline 2: Computational Research */}
          <div className="p-6 rounded-xl bg-[#102A3D]/60 border border-[#29475A]/60 space-y-4 hover:border-[#56C7D8]/60 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#03121E] border border-[#29475A] flex items-center justify-center text-[#D6B675]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
              2. Computational Research
            </h3>
            <p className="text-xs text-[#A8BAC9] leading-relaxed">
              Formulating probabilistic models, Bayesian inference, Metropolis-Hastings MCMC sampling,
              Latin Hypercube simulation, uncertainty quantification, and deep-learning surrogate twins.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#D6B675] flex items-center gap-1">
              <span>Bayesian MCMC</span> &middot; <span>Surrogates</span> &middot; <span>Sobol UQ</span>
            </div>
          </div>

          {/* Discipline 3: Software Engineering */}
          <div className="p-6 rounded-xl bg-[#102A3D]/60 border border-[#29475A]/60 space-y-4 hover:border-[#56C7D8]/60 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#03121E] border border-[#29475A] flex items-center justify-center text-[#4EA9A5]">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
              3. Software Engineering
            </h3>
            <p className="text-xs text-[#A8BAC9] leading-relaxed">
              Writing production-grade C++, Python, TypeScript, and modern web architectures. Building
              maintainable algorithms, reproducible simulation pipelines, and interactive engineering tools.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#4EA9A5] flex items-center gap-1">
              <span>C++ Core</span> &middot; <span>Python Data</span> &middot; <span>React / Wasm</span>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Research Interactive Spotlight: Zijlweg Viaduct */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
              Flagship Master&apos;s Dissertation
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 mt-1">
              Zijlweg Viaduct Bayesian Reliability Framework
            </h2>
          </div>
          <button
            onClick={() => onNavigate('research-detail', 'zijlweg-viaduct')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#56C7D8] hover:text-[#F4F8FC] transition-colors"
          >
            <span>Read Complete Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Embedded Interactive Explorer */}
        <ZijlwegExplorer />
      </section>

      {/* Computational Lab Preview Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#102A3D] to-[#061B2B] border border-[#29475A] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs uppercase font-mono tracking-wider text-[#56C7D8]">
              Interactive Lab Environment
            </div>
            <h3 className="text-2xl font-bold text-[#F4F8FC]">
              Explore the Scientific Computing Lab
            </h3>
            <p className="text-xs sm:text-sm text-[#A8BAC9] leading-relaxed">
              Test real limit-state mathematical formulations in the browser: classical vs. probabilistic
              safety indices, normal-normal conjugate Bayesian parameter updating, and 50,000-sample
              Monte Carlo uncertainty propagation with CSV export.
            </p>
          </div>
          <button
            onClick={() => onNavigate('lab')}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#03121E] bg-[#56C7D8] hover:bg-[#56C7D8]/90 rounded-lg transition-colors whitespace-nowrap shadow-lg shrink-0"
          >
            <Cpu className="w-4 h-4" />
            <span>Open Computational Lab</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Prospective PhD Supervision Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="p-8 rounded-2xl bg-[#061B2B] border border-[#D6B675]/40 text-center space-y-4 max-w-3xl mx-auto">
          <div className="text-xs uppercase font-mono tracking-wider text-[#D6B675] font-semibold">
            Doctoral Research 2027
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#F4F8FC]">
            Interested in Research Collaboration or PhD Supervision?
          </h3>
          <p className="text-xs sm:text-sm text-[#A8BAC9] leading-relaxed">
            I am actively exploring doctoral opportunities in structural reliability, physics-informed digital
            twins, Bayesian inference, and probabilistic machine learning for resilient infrastructure.
            I welcome discussions with faculty advisors and research groups.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#03121E] bg-[#D6B675] hover:bg-[#D6B675]/90 rounded-lg transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Let&apos;s Connect</span>
            </button>
            <button
              onClick={() => onNavigate('journey')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-[#F4F8FC] bg-[#102A3D] border border-[#29475A] rounded-lg hover:border-[#56C7D8] transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#56C7D8]" />
              <span>Academic Journey</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
