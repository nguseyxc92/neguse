import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ExternalLink, 
  GraduationCap, 
  Briefcase, 
  BookOpen, 
  Award, 
  Code, 
  Mail
} from 'lucide-react';
import { DEGREES, APPOINTMENTS, HONORS_AWARDS, HonorAward } from '../data/journeyData';
import { PUBLICATIONS_DATA } from '../data/publicationsData';
import { AcademicCredential, Appointment, PublicationItem, PageRoute } from '../types';
import { CV_PDF, THESIS_PDF } from '../utils/assets';

interface CVPageProps {
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const CVPage: React.FC<CVPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'pdf'>('interactive');
  const cvPdfPath = CV_PDF;
  const thesisPdfPath = THESIS_PDF;

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Bar with Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-cyan-400 dark:text-cyan-400 mb-2">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Academic Curriculum Vitae</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 dark:text-slate-100">
              Curriculum Vitae
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-sans mt-1">
              Neguse Solomon Mekonnen • Updated 2026 • Verified Academic Record
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#102A3D] border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'interactive'
                    ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:white'
                }`}
              >
                Structured CV
              </button>
              <button
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'pdf'
                    ? 'bg-white dark:bg-cyan-500 text-slate-900 dark:text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:white'
                }`}
              >
                PDF Document
              </button>
            </div>

            {/* Download Buttons */}
            <a
              href={cvPdfPath}
              download="Neguse_Solomon_Mekonnen_CV.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV (PDF)</span>
            </a>

            <a
              href={thesisPdfPath}
              download="Mekonnen_2026_Zijlweg_Viaduct_Reliability.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors"
              title="Download Master's Thesis"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>MSc Thesis (PDF)</span>
            </a>
          </div>
        </div>

        {/* View Mode: PDF Embedded Viewer */}
        {activeTab === 'pdf' && (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#102A3D] overflow-hidden shadow-lg">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Viewing: Neguse_Solomon_Mekonnen_CV.pdf</span>
              <a
                href={cvPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                <span>Open in new tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="w-full h-[850px] bg-slate-200 dark:bg-slate-950 flex flex-col items-center justify-center">
              <iframe
                src={`${cvPdfPath}#toolbar=1`}
                title="Academic CV Viewer"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        )}

        {/* View Mode: Structured Reader (Academic Typography) */}
        {activeTab === 'interactive' && (
          <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#081f33] border border-slate-200 dark:border-slate-800 shadow-xl text-slate-800 dark:text-slate-200">
            
            {/* Header / Contact Bar */}
            <div className="border-b border-slate-200 dark:border-slate-700 pb-8 mb-8">
              <h2 className="text-3xl font-display font-bold text-slate-950 dark:text-white tracking-tight">
                Neguse Solomon Mekonnen
              </h2>
              <p className="text-base font-medium text-cyan-600 dark:text-cyan-400 mt-1">
                Computational Civil Engineer • Structural Reliability Researcher • Software Engineer
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-slate-600 dark:text-slate-400 mt-4">
                <a href="mailto:negusesolomon948@gmail.com" className="hover:text-cyan-500 transition-colors">
                  negusesolomon948@gmail.com
                </a>
                <span>•</span>
                <a href="https://github.com/nguseyxc92" target="_blank" rel="noreferrer" className="hover:text-cyan-500 transition-colors">
                  github.com/nguseyxc92
                </a>
                <span>•</span>
                <a href="https://linkedin.com/in/negusesolomon" target="_blank" rel="noreferrer" className="hover:text-cyan-500 transition-colors">
                  linkedin.com/in/negusesolomon
                </a>
                <span>•</span>
                <span>ORCID: 0009-0009-8145-4007</span>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="mb-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-3 border-b border-slate-100 dark:border-slate-800 pb-1">
                Executive Profile
              </h3>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
                Erasmus Mundus scholar holding a Master of Science in Risk Assessment and Management of Civil Infrastructures from Universitat Politècnica de Catalunya (UPC) and University of Padua. Specializes in structural reliability, Bayesian updating, proof load testing verification, non-linear finite element modeling, and scientific computing. Combining 5+ years of software engineering expertise with rigorous continuum mechanics to advance digital twins and probabilistic infrastructure resilience.
              </p>
            </div>

            {/* Education */}
            <div className="mb-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-800 pb-1 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-500" />
                <span>Education</span>
              </h3>
              <div className="space-y-6">
                {DEGREES.map((deg: AcademicCredential, i: number) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <span className="font-bold text-sm text-slate-950 dark:text-slate-100">
                        {deg.degree}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {deg.period}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
                      <span>{deg.institution} — {deg.location}</span>
                      {deg.grade && <span className="font-mono text-emerald-600 dark:text-emerald-400">{deg.grade}</span>}
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 pt-1">
                      {deg.highlights.map((h: string, hIdx: number) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications & Preprints */}
            <div className="mb-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-800 pb-1 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-cyan-500" />
                <span>Peer-Reviewed Publications &amp; Preprints</span>
              </h3>
              <div className="space-y-4">
                {PUBLICATIONS_DATA.map((pub: PublicationItem, i: number) => (
                  <div key={i} className="text-xs leading-relaxed">
                    <p className="text-slate-900 dark:text-slate-200">
                      <span className="font-semibold">{pub.authors.join(', ')}</span> ({pub.year}).{' '}
                      <span className="italic">"{pub.title}"</span>.{' '}
                      <span className="text-cyan-600 dark:text-cyan-400 font-medium">{pub.venue}</span>.
                      {pub.doi && <span className="font-mono text-slate-500"> DOI: {pub.doi}</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic & Professional Appointments */}
            <div className="mb-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-800 pb-1 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-500" />
                <span>Academic &amp; Professional Experience</span>
              </h3>
              <div className="space-y-6">
                {APPOINTMENTS.map((apt: Appointment, i: number) => (
                  <div key={i} className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <span className="font-bold text-sm text-slate-950 dark:text-slate-100">
                        {apt.role} — {apt.organization}
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {apt.period}
                      </span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 space-y-1 pt-1">
                      {apt.responsibilities.map((r: string, idx: number) => (
                        <li key={idx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Honors & Scholarships */}
            <div className="mb-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-800 pb-1 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-500" />
                <span>Honors &amp; Fellowships</span>
              </h3>
              <div className="space-y-3">
                {HONORS_AWARDS.map((h: HonorAward, i: number) => (
                  <div key={i} className="text-xs flex justify-between gap-4">
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">{h.title}</span> —{' '}
                      <span className="text-slate-600 dark:text-slate-400">{h.grantor}</span>
                    </div>
                    <span className="font-mono text-slate-500 shrink-0">{h.year}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Computational & Scientific Skills */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-400 mb-4 border-b border-slate-100 dark:border-slate-800 pb-1 flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-500" />
                <span>Computational &amp; Laboratory Skills</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">Structural &amp; Scientific: </span>
                  <span className="text-slate-600 dark:text-slate-400">DIANA FEA, OpenSees, SAP2000, ETABS, CSCT Kinematics, Proof Load Testing.</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">Probabilistic &amp; ML: </span>
                  <span className="text-slate-600 dark:text-slate-400">Bayesian Inference, FORM/SORM, Monte Carlo, PyMC, SciPy, Scikit-learn.</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">Programming Languages: </span>
                  <span className="text-slate-600 dark:text-slate-400">Python, TypeScript/JavaScript, MATLAB, C++, SQL.</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 dark:text-slate-200">Software &amp; DevOps: </span>
                  <span className="text-slate-600 dark:text-slate-400">React, Node.js, Next.js, Express, Docker, Git, CI/CD, Three.js.</span>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">References available upon request.</span>
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Inquire about Academic Supervision or Collaboration</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
