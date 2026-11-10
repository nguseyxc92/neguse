import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, BookOpen, Cpu, Code2, GraduationCap, ArrowRight } from 'lucide-react';
import { PageRoute } from '../../types';
import { RESEARCH_CASE_STUDIES } from '../../data/researchData';
import { PUBLICATIONS_DATA } from '../../data/publicationsData';
import { SOFTWARE_PROJECTS } from '../../data/projectsData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  // Close on Escape, toggle on Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return [
        { type: 'Page', title: 'Home', subtitle: 'Overview, hero & research impact', route: 'home' as PageRoute },
        { type: 'Page', title: 'About', subtitle: 'Background & research philosophy', route: 'about' as PageRoute },
        { type: 'Page', title: 'Research Overview', subtitle: 'Zijlweg viaduct, culverts & geopolymers', route: 'research' as PageRoute },
        { type: 'Lab', title: 'Computational Lab', subtitle: 'Reliability index, Bayesian updating & Monte Carlo', route: 'lab' as PageRoute },
        { type: 'Page', title: 'Publications Library', subtitle: 'Peer-reviewed papers, preprints & dissertations', route: 'publications' as PageRoute },
        { type: 'Page', title: 'Software Projects', subtitle: 'C++, Python & open-source repositories', route: 'projects' as PageRoute },
        { type: 'Page', title: 'Academic Journey', subtitle: 'Wollo Univ, UPC Barcelona, UniPD, UoPeople', route: 'journey' as PageRoute },
        { type: 'Page', title: 'Curriculum Vitae', subtitle: 'Academic CV view & direct PDF download', route: 'cv' as PageRoute },
        { type: 'Page', title: 'Contact', subtitle: 'PhD research inquiries & academic collaboration', route: 'contact' as PageRoute },
      ];
    }

    const q = query.toLowerCase();
    const items: Array<{
      type: string;
      title: string;
      subtitle: string;
      route: PageRoute;
      detailId?: string;
    }> = [];

    // Search Research
    RESEARCH_CASE_STUDIES.forEach((res) => {
      if (
        res.title.toLowerCase().includes(q) ||
        res.abstract.toLowerCase().includes(q) ||
        res.category.toLowerCase().includes(q) ||
        res.methods.some((m) => m.toLowerCase().includes(q))
      ) {
        items.push({
          type: 'Research',
          title: res.shortTitle,
          subtitle: `${res.category} · ${res.status}`,
          route: 'research-detail',
          detailId: res.id,
        });
      }
    });

    // Search Publications
    PUBLICATIONS_DATA.forEach((pub) => {
      if (
        pub.title.toLowerCase().includes(q) ||
        pub.abstract.toLowerCase().includes(q) ||
        pub.keywords.some((k) => k.toLowerCase().includes(q))
      ) {
        items.push({
          type: 'Publication',
          title: pub.title,
          subtitle: `${pub.year} · ${pub.type} · ${pub.venue}`,
          route: 'publications',
        });
      }
    });

    // Search Projects
    SOFTWARE_PROJECTS.forEach((proj) => {
      if (
        proj.name.toLowerCase().includes(q) ||
        proj.tagline.toLowerCase().includes(q) ||
        proj.techStack.some((t) => t.toLowerCase().includes(q))
      ) {
        items.push({
          type: 'Software',
          title: proj.name,
          subtitle: `${proj.techStack.slice(0, 3).join(', ')} · ${proj.status}`,
          route: 'project-detail',
          detailId: proj.id,
        });
      }
    });

    // Search Lab tools
    const labKeywords = ['reliability', 'beta', 'monte carlo', 'bayesian', 'conjugate', 'normal', 'mcmc', 'limit state', 'probability'];
    if (labKeywords.some((k) => k.includes(q) || q.includes(k))) {
      items.push({
        type: 'Lab Tool',
        title: 'Interactive Computational Lab',
        subtitle: 'Analytical Reliability · Normal-Normal Bayesian Updating · Monte Carlo UQ',
        route: 'lab',
      });
    }

    return items;
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl rounded-xl bg-[#061B2B] border border-[#29475A] shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-[#29475A]">
          <Search className="w-5 h-5 text-[#56C7D8] mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search research, publications, lab tools, repositories (e.g. 'Zijlweg', 'Bayesian', 'MCMC')..."
            className="w-full bg-transparent text-sm text-[#F4F8FC] placeholder-[#A8BAC9]/60 focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[#A8BAC9] hover:text-[#F4F8FC] hover:bg-[#102A3D] transition-colors"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto divide-y divide-[#29475A]/50 p-2">
          {results.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#A8BAC9]">
              No results found for &ldquo;{query}&rdquo;. Try &ldquo;Zijlweg&rdquo;, &ldquo;MCMC&rdquo;, or &ldquo;Digital Twin&rdquo;.
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onNavigate(item.route, item.detailId);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-[#102A3D] transition-colors flex items-center justify-between group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-[#03121E] border border-[#29475A] text-[#56C7D8] mt-0.5 shrink-0">
                    {item.type === 'Research' && <BookOpen className="w-4 h-4" />}
                    {item.type === 'Publication' && <GraduationCap className="w-4 h-4" />}
                    {item.type === 'Software' && <Code2 className="w-4 h-4" />}
                    {item.type === 'Lab Tool' && <Cpu className="w-4 h-4" />}
                    {item.type === 'Page' && <ArrowRight className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[#56C7D8] font-mono">
                      {item.type}
                    </div>
                    <div className="text-sm font-semibold text-[#F4F8FC] group-hover:text-[#56C7D8] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-[#A8BAC9] line-clamp-1">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#A8BAC9] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 text-xs text-[#A8BAC9] bg-[#03121E] border-t border-[#29475A] flex justify-between items-center font-mono">
          <span>Navigate with arrows / click to jump</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
