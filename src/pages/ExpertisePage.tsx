import React, { useState } from 'react';
import { EXPERTISE_CATEGORIES, SkillCategory } from '../data/expertiseData';
import { PageRoute } from '../types';
import { CheckCircle2, ChevronRight, Cpu, ArrowRight, Terminal } from 'lucide-react';

interface ExpertisePageProps {
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const ExpertisePage: React.FC<ExpertisePageProps> = ({ onNavigate }) => {
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>(EXPERTISE_CATEGORIES[0].category);

  const activeCategory: SkillCategory = EXPERTISE_CATEGORIES.find(c => c.category === selectedCategoryName) || EXPERTISE_CATEGORIES[0];

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-cyan-400 dark:text-cyan-400 mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Core Competencies &amp; Research Capabilities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Tri-Discipline Technical Expertise
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            Bridging mechanics-based civil engineering, rigorous Bayesian and probabilistic statistics, and modern full-stack software architecture. Every technical capability is backed by executed research implementations or deployed production software.
          </p>
        </div>

        {/* Tri-Discipline Synergy Diagram */}
        <div className="mb-16 p-8 rounded-2xl bg-slate-900/60 dark:bg-[#102A3D]/70 border border-slate-700/60 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/3 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">The Integrative Edge</span>
              <h2 className="text-2xl font-display font-semibold text-white">The Intersection of 3 Disciplines</h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Most structural engineers treat algorithms as black boxes; many computer scientists lack continuum mechanics depth. My research lives precisely at their convergence.
              </p>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
              {/* Discipline 1 */}
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-cyan-500/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm mb-3">
                  01
                </div>
                <h3 className="font-semibold text-white text-base mb-1">Physical Mechanics</h3>
                <p className="text-xs text-slate-300 mb-3">Continuum mechanics, non-linear finite element formulations, CSCT shear kinematics, and limit states.</p>
                <div className="text-[11px] font-mono text-cyan-300">DIANA FEA • Eurocode • ACI</div>
              </div>

              {/* Discipline 2 */}
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-amber-500/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-mono font-bold text-sm mb-3">
                  02
                </div>
                <h3 className="font-semibold text-white text-base mb-1">Probabilistic Computing</h3>
                <p className="text-xs text-slate-300 mb-3">Bayesian updating with proof load proofing, FORM/SORM, surrogate Gaussian processes, and Markov Chain Monte Carlo.</p>
                <div className="text-[11px] font-mono text-amber-300">SciPy • NumPy • Surrogate ML</div>
              </div>

              {/* Discipline 3 */}
              <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm mb-3">
                  03
                </div>
                <h3 className="font-semibold text-white text-base mb-1">Software Systems</h3>
                <p className="text-xs text-slate-300 mb-3">Production full-stack architecture, high-performance WASM/WebGL visualization, RESTful microservices, and automated testing.</p>
                <div className="text-[11px] font-mono text-emerald-300">TypeScript • React • Node • Docker</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Category Selector & Skills Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 mb-2">Skill Domains</h2>
            {EXPERTISE_CATEGORIES.map((category) => {
              const isSelected = category.category === selectedCategoryName;
              return (
                <button
                  key={category.category}
                  onClick={() => setSelectedCategoryName(category.category)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 font-medium shadow-sm'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-slate-400'}`} />
                    <span className="text-sm font-sans">{category.category}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-cyan-500' : 'text-slate-400 opacity-60 group-hover:translate-x-0.5'}`} />
                </button>
              );
            })}

            {/* Quick Link Card */}
            <div className="mt-8 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#102A3D]/40">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">Verify in Interactive Lab</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Test my probabilistic formulations directly with live parameter sweeps in the computational sandbox.
              </p>
              <button
                onClick={() => onNavigate('lab')}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors cursor-pointer"
              >
                <span>Launch Computational Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Active Domain Detail */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#102A3D]/80 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="border-b border-slate-100 dark:border-slate-800/80 pb-6 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                  Domain Profile
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {activeCategory.skills.length} Core Methods Documented
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-slate-100 mb-2">
                {activeCategory.category}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 font-sans">
                {activeCategory.description}
              </p>
            </div>

            {/* Skills List with Concrete Research Applications */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Methods &amp; Concrete Research Applications
              </h3>
              {activeCategory.skills.map((skill, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-[#163448]/40 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1.5">
                    <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      Level: <span className="text-slate-800 dark:text-slate-200 font-medium">{skill.level}</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-6 font-sans leading-relaxed">
                    <strong className="text-slate-700 dark:text-slate-200 font-medium">Applied in: </strong>
                    {skill.researchContext}
                  </p>
                </div>
              ))}
            </div>

            {/* Cross-Discipline Highlight */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#163448]/30 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-cyan-500 shrink-0" />
                <span className="text-xs text-slate-600 dark:text-slate-300 font-sans">
                  Have a research or software project leveraging these capabilities?
                </span>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="text-xs font-mono font-medium text-cyan-600 dark:text-cyan-400 hover:underline shrink-0"
              >
                Inquire &rarr;
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
