import React from 'react';
import { ArrowRight, Github, ExternalLink, Code2, Terminal, Cpu } from 'lucide-react';
import { PageRoute, SoftwareProject } from '../types';
import { SOFTWARE_PROJECTS } from '../data/projectsData';

interface ProjectsPageProps {
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      {/* Header */}
      <div className="border-b border-[#29475A]/60 pb-8 space-y-4">
        <div className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
          Software Engineering &middot; Scientific Codebases
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 tracking-tight">
          Software Architecture &amp; Repositories
        </h1>
        <p className="text-sm sm:text-base text-[#A8BAC9] max-w-3xl leading-relaxed">
          Production-grade engineering implementations translating structural mathematics and
          statistical inference into high-performance software systems. All codebases are public,
          documented, and reproducible.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SOFTWARE_PROJECTS.map((proj) => (
          <div
            key={proj.id}
            className="flex flex-col justify-between p-6 rounded-xl bg-[#061B2B] dark:bg-[#061B2B] bg-white border border-[#29475A] hover:border-[#56C7D8]/60 transition-all shadow-xl group"
          >
            <div className="space-y-4">
              {/* Unboxed Metadata (Zero-Pill Rule) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#A8BAC9] font-mono">
                <span className="text-[#56C7D8] font-bold">{proj.status}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{proj.role}</span>
                <span aria-hidden="true">&middot;</span>
                <span className="text-[#D6B675]">{proj.license}</span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="text-xl font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 group-hover:text-[#56C7D8] transition-colors leading-snug">
                  {proj.name}
                </h2>
                <p className="text-xs text-[#56C7D8] mt-1 font-mono">
                  {proj.tagline}
                </p>
              </div>

              {/* Engineering Problem */}
              <p className="text-xs text-[#A8BAC9] leading-relaxed line-clamp-3">
                {proj.engineeringProblem}
              </p>

              {/* Tech Stack Chips */}
              <div>
                <span className="text-[11px] font-mono text-[#A8BAC9] block mb-1">
                  Technology Stack:
                </span>
                <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                  {proj.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-[#102A3D] border border-[#29475A] text-[#F4F8FC] text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-6 mt-6 border-t border-[#29475A]/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <a
                  href={proj.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A8BAC9] hover:text-[#56C7D8] transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#56C7D8] hover:underline"
                  >
                    <span>Live App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <button
                onClick={() => onNavigate('project-detail', proj.id)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#56C7D8] hover:text-[#F4F8FC] group-hover:translate-x-1 transition-all"
              >
                <span>Architecture Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
