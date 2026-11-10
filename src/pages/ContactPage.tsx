import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink, 
  CheckCircle2, 
  BookOpen, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

import { PageRoute } from '../types';

interface ContactPageProps {
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    subjectCategory: 'PhD Research Opportunity',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In client-only portfolio, we format a mailto URL and show confirmation
    const subject = encodeURIComponent(`[${formData.subjectCategory}] From ${formData.name} (${formData.affiliation || 'Academic/Industry'})`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nAffiliation: ${formData.affiliation}\n\nMessage:\n${formData.message}`
    );
    
    // Open default email client
    window.location.href = `mailto:negusesolomon948@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-cyan-400 dark:text-cyan-400 mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>Connect & Inquire</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            I welcome discussions regarding prospective PhD supervision, academic research collaborations, probabilistic structural modeling consultations, or scientific software development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Channels & Academic Profiles */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Primary Contact Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#102A3D]/70 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-display font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Direct Inquiries
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
                  Typically responsive within 24–48 hours for academic correspondence.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:negusesolomon948@gmail.com"
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#163448]/50 border border-slate-200/80 dark:border-slate-700/60 hover:border-cyan-500/50 transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Direct Email</div>
                    <div className="text-xs sm:text-sm font-mono font-medium text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 truncate transition-colors">
                      negusesolomon948@gmail.com
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-[#163448]/50 border border-slate-200/80 dark:border-slate-700/60">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Current Academic Base</div>
                    <div className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100 font-sans">
                      Barcelona, Spain (UPC) & International
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Profiles */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Verified Academic & Code Profiles
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href="https://github.com/nguseyxc92"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Github className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>

                  <a
                    href="https://linkedin.com/in/negusesolomon"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-sky-500" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>

                  <a
                    href="https://www.researchgate.net/profile/Neguse-Solomon-Mekonnen"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <span className="font-serif font-bold text-emerald-500 text-sm">RG</span>
                    <span>ResearchGate</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>

                  <a
                    href="https://scholar.google.com/citations?user=3zitT4AAAAAJ"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>Google Scholar</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                </div>
              </div>

              {/* Startup & Engineering link */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="https://tebib-labs.netlify.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 hover:text-cyan-500 transition-colors"
                >
                  <span>Engineering Lab: Tebib Labs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Note for PhD Supervisors */}
            <div className="p-5 rounded-xl bg-slate-900 dark:bg-[#071927] border border-cyan-500/30 text-white space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Note for Prospective PhD Supervisors</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                I am prepared to discuss potential doctoral research frameworks, grant alignments, and computational methodology immediately. Preprints, full thesis chapters, and finite element benchmark scripts are available upon request.
              </p>
            </div>

          </div>

          {/* Right Column: Structured Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#102A3D]/80 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="mb-6">
                <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Send an Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans">
                  Fill in your details below to compose an academic or technical inquiry.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Inquiry Initiated</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-md mx-auto">
                      Your default mail client has been opened with your inquiry pre-formatted. If it did not trigger, you can directly email <span className="font-mono font-semibold">negusesolomon948@gmail.com</span>.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                  >
                    Reset Form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Prof. Maria Rossi / Dr. Chen"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@university.edu"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Affiliation / Institution
                    </label>
                    <input
                      type="text"
                      value={formData.affiliation}
                      onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                      placeholder="e.g. MIT, ETH Zurich, TU Delft, Research Institute"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.subjectCategory}
                      onChange={(e) => setFormData({ ...formData, subjectCategory: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    >
                      <option value="PhD Research Opportunity">PhD Research Opportunity / Supervision</option>
                      <option value="Academic Research Collaboration">Academic Research Collaboration</option>
                      <option value="Preprint or Code Access Request">Preprint / Code Access Request</option>
                      <option value="Scientific Software Development">Scientific Software Development</option>
                      <option value="General Technical Inquiry">General Technical Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your inquiry, research area, or collaboration ideas..."
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-colors shadow-md cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Academic Inquiry</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-500 dark:text-slate-400">
                    Will open your native mail client addressed to negusesolomon948@gmail.com
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
