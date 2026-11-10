import React, { useMemo } from 'react';
import { ArrowLeft, Github, ExternalLink, CheckCircle2, AlertCircle, Cpu, Terminal, GitBranch } from 'lucide-react';
import { PageRoute, SoftwareProject } from '../types';
import { SOFTWARE_PROJECTS } from '../data/projectsData';

interface ProjectDetailPageProps {
  projectId: string;
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectId, onNavigate }) => {
  const project: SoftwareProject = useMemo(() => {
    return SOFTWARE_PROJECTS.find((p) => p.id === projectId) || SOFTWARE_PROJECTS[0];
  }, [projectId]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      {/* Back Button */}
      <div>
        <button
          onClick={() => onNavigate('projects')}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A8BAC9] hover:text-[#56C7D8] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Software Projects</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="space-y-4 border-b border-[#29475A]/60 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#A8BAC9] font-mono">
          <span className="text-[#56C7D8] font-bold">{project.status}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{project.role}</span>
          <span aria-hidden="true">&middot;</span>
          <span className="text-[#D6B675]">{project.license}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 tracking-tight leading-snug">
          {project.name}
        </h1>

        <p className="text-base text-[#56C7D8] font-mono">
          {project.tagline}
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#03121E] bg-[#56C7D8] hover:bg-[#56C7D8]/90 rounded-lg transition-colors shadow-sm"
          >
            <Github className="w-4 h-4" />
            <span>View Public Repository</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#F4F8FC] bg-[#102A3D] border border-[#29475A] rounded-lg hover:border-[#56C7D8] transition-colors"
            >
              <span>Launch Live App</span>
              <ExternalLink className="w-3 h-3 text-[#56C7D8]" />
            </a>
          )}
        </div>
      </div>

      {/* Engineering Problem */}
      <section className="space-y-3">
        <h2 className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
          Software &amp; Computational Problem
        </h2>
        <div className="p-5 rounded-xl bg-[#03121E] border border-[#29475A] text-xs sm:text-sm text-[#A8BAC9] leading-relaxed">
          {project.engineeringProblem}
        </div>
      </section>

      {/* System Architecture Overview & Diagram */}
      <section className="space-y-4 pt-4 border-t border-[#29475A]/60">
        <h2 className="text-lg font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
          System Architecture &amp; Execution Pipeline
        </h2>
        <p className="text-xs sm:text-sm text-[#A8BAC9] leading-relaxed">
          {project.architectureOverview}
        </p>

        {/* Clean SVG Architecture Diagram */}
        <div className="p-6 rounded-xl bg-[#03121E] border border-[#29475A] overflow-x-auto">
          <svg viewBox="0 0 760 160" className="w-full min-w-[640px] h-36">
            {/* Box 1: Ingestion */}
            <rect x="20" y="40" width="160" height="80" rx="8" fill="#102A3D" stroke="#29475A" strokeWidth="1.5" />
            <text x="100" y="70" textAnchor="middle" className="text-xs font-mono fill-[#56C7D8] font-bold">
              1. Raw Sensor Data
            </text>
            <text x="100" y="90" textAnchor="middle" className="text-[10px] font-mono fill-[#A8BAC9]">
              36 channels &middot; .mat / .csv
            </text>

            {/* Arrow 1 */}
            <line x1="180" y1="80" x2="230" y2="80" stroke="#56C7D8" strokeWidth="2" />
            <polygon points="230,80 222,76 222,84" fill="#56C7D8" />

            {/* Box 2: Preprocessing */}
            <rect x="240" y="40" width="180" height="80" rx="8" fill="#102A3D" stroke="#29475A" strokeWidth="1.5" />
            <text x="330" y="65" textAnchor="middle" className="text-xs font-mono fill-[#D6B675] font-bold">
              2. Section &amp; LHS Engine
            </text>
            <text x="330" y="85" textAnchor="middle" className="text-[10px] font-mono fill-[#A8BAC9]">
              Nonlinear cross-section
            </text>
            <text x="330" y="100" textAnchor="middle" className="text-[10px] font-mono fill-[#A8BAC9]">
              100 samples &middot; Thorenfeldt
            </text>

            {/* Arrow 2 */}
            <line x1="420" y1="80" x2="470" y2="80" stroke="#56C7D8" strokeWidth="2" />
            <polygon points="470,80 462,76 462,84" fill="#56C7D8" />

            {/* Box 3: Sampling Kernel */}
            <rect x="480" y="40" width="240" height="80" rx="8" fill="#102A3D" stroke="#56C7D8" strokeWidth="1.5" />
            <text x="600" y="65" textAnchor="middle" className="text-xs font-mono fill-[#56C7D8] font-bold">
              3. C++ MCMC Sampling Core
            </text>
            <text x="600" y="85" textAnchor="middle" className="text-[10px] font-mono fill-[#A8BAC9]">
              100M iterations / load step
            </text>
            <text x="600" y="100" textAnchor="middle" className="text-[10px] font-mono fill-emerald-400 font-bold">
              &beta;_during, &beta;_after, &beta;_lower
            </text>
          </svg>
        </div>
      </section>

      {/* Implementation Highlights & Technical Decisions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-[#29475A]/60">
        <div className="space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[#56C7D8] font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#56C7D8]" />
            Implementation Highlights
          </h2>
          <ul className="space-y-2 text-xs text-[#A8BAC9]">
            {project.implementationHighlights.map((hl, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#56C7D8] font-bold">&bull;</span>
                <span className="leading-relaxed">{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-mono uppercase tracking-wider text-[#D6B675] font-bold flex items-center gap-1.5">
            <GitBranch className="w-4 h-4 text-[#D6B675]" />
            Key Technical Decisions
          </h2>
          <ul className="space-y-2 text-xs text-[#A8BAC9]">
            {project.technicalDecisions.map((td, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#D6B675] font-bold">&bull;</span>
                <span className="leading-relaxed">{td}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Limitations & Verification Notice */}
      <section className="p-4 rounded-xl bg-[#03121E] border border-[#29475A] space-y-2 text-xs text-[#A8BAC9]">
        <div className="flex items-center gap-2 text-rose-400 font-semibold font-mono">
          <AlertCircle className="w-4 h-4" />
          <span>Known Limitations &amp; Verification Status</span>
        </div>
        <ul className="space-y-1 list-disc pl-5">
          {project.limitations.map((lim, i) => (
            <li key={i}>{lim}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};
