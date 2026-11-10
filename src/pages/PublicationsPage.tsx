import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, FileText, ExternalLink, GraduationCap } from 'lucide-react';
import { PageRoute, PublicationItem } from '../types';
import { PUBLICATIONS_DATA } from '../data/publicationsData';

interface PublicationsPageProps {
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const PublicationsPage: React.FC<PublicationsPageProps> = ({ onNavigate }) => {
  const [activeType, setActiveType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const types = [
    'All',
    'Conference Paper',
    'Preprint',
    'MSc Dissertation',
    'Manuscript in Preparation',
  ];

  const filteredPublications = useMemo(() => {
    return PUBLICATIONS_DATA.filter((pub) => {
      const matchesType = activeType === 'All' || pub.type === activeType;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        pub.title.toLowerCase().includes(q) ||
        pub.abstract.toLowerCase().includes(q) ||
        pub.authors.some((a) => a.toLowerCase().includes(q)) ||
        pub.keywords.some((k) => k.toLowerCase().includes(q)) ||
        pub.venue.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [activeType, searchQuery]);

  const handleCopyBibtex = (id: string, bibtex: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-12">
      {/* Header */}
      <div className="border-b border-[#29475A]/60 pb-8 space-y-4">
        <div className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
          Academic Output &middot; Open Science
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 tracking-tight">
          Publications &amp; Scholarly Output
        </h1>
        <p className="text-sm sm:text-base text-[#A8BAC9] max-w-3xl leading-relaxed">
          Peer-reviewed conference proceedings, research preprints, master&apos;s dissertation,
          and journal manuscripts in preparation. All publications adhere to rigorous open science standards.
        </p>

        {/* Scholarly Index Quick Links */}
        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[#A8BAC9]">
          <a
            href="https://orcid.org/0009-0009-8145-4007"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-[#56C7D8] transition-colors"
          >
            <span className="font-bold text-[#A6CE39]">iD</span>
            <span>ORCID: 0009-0009-8145-4007</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
          <span>&middot;</span>
          <a
            href="https://scholar.google.com/citations?user=3zitT4AAAAAJ"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-[#56C7D8] transition-colors"
          >
            <span>Google Scholar Profile</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
          <span>&middot;</span>
          <a
            href="https://www.researchgate.net/profile/Neguse-Solomon-Mekonnen"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-[#56C7D8] transition-colors"
          >
            <span>ResearchGate</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Type Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#03121E] border border-[#29475A] rounded-lg">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeType === t
                  ? 'bg-[#56C7D8] text-[#03121E] font-bold shadow-sm'
                  : 'text-[#A8BAC9] hover:text-[#F4F8FC]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-[#A8BAC9] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search title, author, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#03121E] text-[#F4F8FC] border border-[#29475A] rounded-lg font-mono placeholder-[#A8BAC9]/60 focus:outline-none focus:border-[#56C7D8]"
          />
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-6">
        {filteredPublications.map((pub) => (
          <div
            key={pub.id}
            className="p-6 rounded-xl bg-[#061B2B] dark:bg-[#061B2B] bg-white border border-[#29475A] hover:border-[#56C7D8]/60 transition-colors shadow-xl space-y-4"
          >
            {/* Metadata Header (Zero-Pill Rule) */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#A8BAC9] font-mono">
              <span className="text-[#56C7D8] font-bold">{pub.type}</span>
              <span aria-hidden="true">&middot;</span>
              <span>{pub.year}</span>
              <span aria-hidden="true">&middot;</span>
              <span className="text-[#D6B675]">{pub.status}</span>
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 leading-snug">
              {pub.title}
            </h2>

            {/* Authors */}
            <div className="text-xs text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-700">
              {pub.authors.map((author, i) => (
                <span key={i}>
                  {author === 'Neguse Solomon Mekonnen' ? (
                    <strong className="text-[#56C7D8] underline decoration-dotted">{author}</strong>
                  ) : (
                    author
                  )}
                  {i < pub.authors.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>

            {/* Venue */}
            <div className="text-xs font-mono text-[#A8BAC9]">
              {pub.venue}
            </div>

            {/* Abstract */}
            <p className="text-xs text-[#A8BAC9] leading-relaxed">
              {pub.abstract}
            </p>

            {/* Keywords */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {pub.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono text-[#A8BAC9] bg-[#03121E] px-2 py-0.5 rounded border border-[#29475A]/60"
                >
                  {kw}
                </span>
              ))}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-[#29475A]/50 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                {pub.pdfUrl && (
                  <a
                    href={pub.pdfUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold text-[#03121E] bg-[#56C7D8] rounded-md hover:bg-[#56C7D8]/90 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                )}

                {pub.url && (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#A8BAC9] hover:text-[#56C7D8] transition-colors"
                  >
                    <span>View on ResearchGate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {pub.doi && (
                  <span className="font-mono text-[11px] text-[#A8BAC9]">
                    DOI: {pub.doi}
                  </span>
                )}
              </div>

              {/* Copy BibTeX Button */}
              <button
                onClick={() => handleCopyBibtex(pub.id, pub.bibtex)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#A8BAC9] hover:text-[#F4F8FC] bg-[#102A3D] rounded border border-[#29475A] transition-colors"
                title="Copy BibTeX Citation"
              >
                {copiedId === pub.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied BibTeX!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy BibTeX</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
