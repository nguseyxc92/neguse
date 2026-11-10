import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, BookOpen, Layers, ShieldCheck, Cpu } from 'lucide-react';
import { PageRoute, ResearchCaseStudy } from '../types';
import { RESEARCH_CASE_STUDIES } from '../data/researchData';

interface ResearchPageProps {
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Structural Reliability',
    'Digital Twins',
    'Sustainable Materials',
    'Multi-Hazard Risk',
    'Forensic Engineering',
  ];

  const filteredStudies = useMemo(() => {
    return RESEARCH_CASE_STUDIES.filter((study) => {
      const matchesCategory =
        activeCategory === 'All' || study.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        study.title.toLowerCase().includes(q) ||
        study.shortTitle.toLowerCase().includes(q) ||
        study.abstract.toLowerCase().includes(q) ||
        study.methods.some((m) => m.toLowerCase().includes(q)) ||
        study.computationalStack.some((s) => s.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      {/* Page Header */}
      <div className="border-b border-[#29475A]/60 pb-8 space-y-4">
        <div className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
          Intellectual Centerpiece &middot; Empirical Case Studies
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 tracking-tight">
          Research Portfolio &amp; Case Studies
        </h1>
        <p className="text-sm sm:text-base text-[#A8BAC9] max-w-3xl leading-relaxed">
          Detailed investigations combining physical structural mechanics, Bayesian updating,
          uncertainty quantification, and high-performance scientific computing. Every study includes
          verified data, explicit limitations, and interactive computational models.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#03121E] border border-[#29475A] rounded-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#56C7D8] text-[#03121E] font-bold shadow-sm'
                  : 'text-[#A8BAC9] hover:text-[#F4F8FC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-[#A8BAC9] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search methods, models, titles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#03121E] text-[#F4F8FC] border border-[#29475A] rounded-lg font-mono placeholder-[#A8BAC9]/60 focus:outline-none focus:border-[#56C7D8]"
          />
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            className={`flex flex-col justify-between rounded-xl bg-[#061B2B] dark:bg-[#061B2B] bg-white border ${
              study.featured ? 'border-[#56C7D8]/80' : 'border-[#29475A]'
            } p-6 shadow-xl hover:border-[#56C7D8] transition-all group`}
          >
            <div className="space-y-4">
              {/* Unboxed Metadata Header (Zero-Pill Rule) */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#A8BAC9] font-mono">
                <span className="text-[#56C7D8] font-semibold">{study.category}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{study.status}</span>
                <span aria-hidden="true">&middot;</span>
                <span>{study.year}</span>
              </div>

              {/* Title */}
              <h2 className="text-lg font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 group-hover:text-[#56C7D8] transition-colors leading-snug">
                {study.title}
              </h2>

              {/* Abstract / Summary */}
              <p className="text-xs text-[#A8BAC9] leading-relaxed line-clamp-4">
                {study.abstract}
              </p>

              {/* Research Metrics preview if available */}
              {study.metrics && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#29475A]/40 font-mono">
                  {study.metrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="p-2 rounded bg-[#03121E] border border-[#29475A]/60">
                      <span className="text-[10px] text-[#A8BAC9] block truncate">{m.label}</span>
                      <span className="text-base font-bold text-[#56C7D8]">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Methods list */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-[#A8BAC9] block mb-1">
                  Computational Stack &amp; Methods:
                </span>
                <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-[#F4F8FC]/80">
                  {study.computationalStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-[#102A3D] border border-[#29475A] text-[#56C7D8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-6 mt-6 border-t border-[#29475A]/60 flex items-center justify-between">
              <span className="text-xs font-mono text-[#A8BAC9]">
                {study.doi ? `DOI: ${study.doi}` : 'Empirical Case Study'}
              </span>

              <button
                onClick={() => onNavigate('research-detail', study.id)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#56C7D8] hover:text-[#F4F8FC] group-hover:translate-x-1 transition-all"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
