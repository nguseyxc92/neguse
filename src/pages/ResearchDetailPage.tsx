import React, { useMemo } from 'react';
import { ArrowLeft, ExternalLink, Github, FileText, CheckCircle2, AlertCircle, Layers } from 'lucide-react';
import { PageRoute, ResearchCaseStudy } from '../types';
import { RESEARCH_CASE_STUDIES } from '../data/researchData';
import { ZijlwegExplorer } from '../components/research/ZijlwegExplorer';
import { CulvertTwinSimulator } from '../components/research/CulvertTwinSimulator';
import { GeopolymerDashboard } from '../components/research/GeopolymerDashboard';

interface ResearchDetailPageProps {
  studyId: string;
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const ResearchDetailPage: React.FC<ResearchDetailPageProps> = ({ studyId, onNavigate }) => {
  const study: ResearchCaseStudy = useMemo(() => {
    return (
      RESEARCH_CASE_STUDIES.find((s) => s.id === studyId) ||
      RESEARCH_CASE_STUDIES[0]
    );
  }, [studyId]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      {/* Back Button */}
      <div>
        <button
          onClick={() => onNavigate('research')}
          className="inline-flex items-center gap-2 text-xs font-mono text-[#A8BAC9] hover:text-[#56C7D8] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Research Projects</span>
        </button>
      </div>

      {/* Header Info */}
      <div className="space-y-4 border-b border-[#29475A]/60 pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#A8BAC9] font-mono">
          <span className="text-[#56C7D8] font-semibold">{study.category}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{study.status}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{study.year}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 tracking-tight leading-snug">
          {study.title}
        </h1>

        {study.supervisorsOrCollaborators && (
          <div className="text-xs text-[#A8BAC9] font-mono">
            <span>Collaborators &amp; Supervisors: </span>
            <span className="text-[#F4F8FC] font-semibold">
              {study.supervisorsOrCollaborators.join(', ')}
            </span>
          </div>
        )}

        {/* Action badges: PDF, GitHub, DOI */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {study.paperPdf && (
            <a
              href={study.paperPdf}
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#03121E] bg-[#56C7D8] rounded-lg hover:bg-[#56C7D8]/90 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Dissertation PDF</span>
            </a>
          )}

          {study.githubUrl && (
            <a
              href={study.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono text-[#F4F8FC] bg-[#102A3D] border border-[#29475A] rounded-lg hover:border-[#56C7D8] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-[#A8BAC9]" />
            </a>
          )}

          {study.researchGateUrl && (
            <a
              href={study.researchGateUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono text-[#A8BAC9] hover:text-[#56C7D8] transition-colors"
            >
              <span>ResearchGate</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {study.doi && (
            <span className="text-xs font-mono text-[#A8BAC9]/80 py-1.5">
              DOI: {study.doi}
            </span>
          )}
        </div>
      </div>

      {/* Abstract */}
      <section className="space-y-3">
        <h2 className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
          Abstract
        </h2>
        <p className="text-sm text-[#A8BAC9] leading-relaxed">
          {study.abstract}
        </p>
      </section>

      {/* Research Question & Engineering Problem */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-xl bg-[#061B2B] border border-[#29475A] space-y-2">
          <span className="text-xs font-mono font-bold text-[#D6B675] uppercase tracking-wider block">
            Central Research Question
          </span>
          <p className="text-xs sm:text-sm text-[#F4F8FC] leading-relaxed italic">
            &ldquo;{study.researchQuestion}&rdquo;
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#061B2B] border border-[#29475A] space-y-2">
          <span className="text-xs font-mono font-bold text-[#56C7D8] uppercase tracking-wider block">
            Physical Engineering Problem
          </span>
          <p className="text-xs sm:text-sm text-[#A8BAC9] leading-relaxed">
            {study.engineeringProblem}
          </p>
        </div>
      </section>

      {/* Embedded Interactive Demonstrator (Flagship) */}
      <section className="space-y-4 pt-4">
        <div className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
          Interactive Model Execution
        </div>
        {study.id === 'zijlweg-viaduct' && <ZijlwegExplorer />}
        {study.id === 'culvert-digital-twin' && <CulvertTwinSimulator />}
        {study.id === 'geopolymer-concrete' && <GeopolymerDashboard />}
      </section>

      {/* Methodology & Computational Stack */}
      <section className="space-y-4 pt-4 border-t border-[#29475A]/60">
        <h2 className="text-lg font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
          Methodological Framework &amp; Implementation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#56C7D8] block">Applied Research Methods:</span>
            <ul className="space-y-2 text-xs text-[#A8BAC9]">
              {study.methods.map((m, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#56C7D8] shrink-0 mt-0.5" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-[#D6B675] block">Computational Stack &amp; Tools:</span>
            <div className="flex flex-wrap gap-2">
              {study.computationalStack.map((tool, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded bg-[#102A3D] border border-[#29475A] text-xs font-mono text-[#F4F8FC]"
                >
                  {tool}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#A8BAC9] pt-2 leading-relaxed">
              Implemented in accordance with open science practices, using reproducible scripts,
              verified physical inputs, and transparent numerical solvers.
            </p>
          </div>
        </div>
      </section>

      {/* Key Findings */}
      <section className="space-y-4 pt-4 border-t border-[#29475A]/60">
        <h2 className="text-lg font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
          Key Scientific Findings &amp; Quantitative Outcomes
        </h2>
        <div className="space-y-3">
          {study.keyFindings.map((finding, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-[#03121E] border border-[#29475A]/60 flex items-start gap-3"
            >
              <span className="text-xs font-mono font-bold text-[#56C7D8] shrink-0 mt-0.5">
                0{idx + 1}.
              </span>
              <p className="text-xs sm:text-sm text-[#F4F8FC] leading-relaxed">
                {finding}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Limitations and Research Significance */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#29475A]/60">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5" /> Methodological Limitations
          </span>
          <ul className="space-y-1.5 text-xs text-[#A8BAC9]">
            {study.limitations.map((lim, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-400">&bull;</span>
                <span>{lim}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Research Significance
          </span>
          <p className="text-xs text-[#A8BAC9] leading-relaxed">
            {study.researchSignificance}
          </p>
        </div>
      </section>

      {/* Bottom CTA for PhD Inquiries */}
      <div className="pt-8 border-t border-[#29475A]/60 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-xl bg-[#102A3D]/60 border border-[#29475A]">
        <div>
          <h3 className="text-sm font-bold text-[#F4F8FC]">
            Interested in the datasets or computational methods?
          </h3>
          <p className="text-xs text-[#A8BAC9]">
            All code repositories and preprocessing scripts are available for academic collaboration.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-4 py-2 text-xs font-semibold text-[#03121E] bg-[#56C7D8] rounded-lg hover:bg-[#56C7D8]/90 transition-colors whitespace-nowrap"
        >
          Discuss Research
        </button>
      </div>
    </div>
  );
};
