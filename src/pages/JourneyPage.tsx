import React from 'react';
import { DEGREES, APPOINTMENTS, HONORS_AWARDS, PHD_RESEARCH_INTERESTS, HonorAward } from '../data/journeyData';
import { AcademicCredential, Appointment, PageRoute } from '../types';
import { 
  GraduationCap, 
  Briefcase, 
  Award, 
  Compass, 
  MapPin, 
  Calendar, 
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2
} from 'lucide-react';

interface JourneyPageProps {
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const JourneyPage: React.FC<JourneyPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-cyan-400 dark:text-cyan-400 mb-3">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic Trajectory &amp; Vision</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
            Academic Journey &amp; Credentials
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            From premier structural engineering education across top European institutions (UPC Barcelona &amp; University of Padua) under the prestigious European Commission Erasmus Mundus scholarship to parallel formal computer science training and engineering leadership.
          </p>
        </div>

        {/* PhD Horizon Callout Banner */}
        <div className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a2336] to-[#102A3D] text-white border border-cyan-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-cyan-300 text-xs font-mono mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Targeting Fall 2027 PhD Opportunities</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
              Future PhD Research Agenda
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-6 leading-relaxed font-sans">
              I am actively seeking PhD positions with leading research groups specializing in Structural Reliability, Probabilistic Mechanics, Physics-Informed Machine Learning, and Digital Twin Lifecycle Infrastructure. My objective is to push the frontiers of non-linear Bayesian inference for large-scale deteriorating infrastructure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {PHD_RESEARCH_INTERESTS.map((interest: { topic: string; description: string }, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-sm text-slate-100">{interest.topic}</h3>
                    <p className="text-xs text-slate-300 mt-1">{interest.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-md cursor-pointer"
              >
                <span>Discuss Research Alignment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('cv')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-medium transition-colors cursor-pointer"
              >
                <span>Review Academic CV</span>
              </button>
            </div>
          </div>
        </div>

        {/* Education Timeline */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
            <GraduationCap className="w-6 h-6 text-cyan-500" />
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-slate-100">
              Formal Education
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-6 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {DEGREES.map((deg: AcademicCredential, index: number) => (
              <div key={index} className="relative pl-12 sm:pl-16 group">
                {/* Node icon */}
                <div className="absolute left-2 sm:left-4 top-1.5 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-cyan-500 bg-white dark:bg-[#061B2B] group-hover:scale-125 transition-transform" />
                
                <div className="p-6 rounded-2xl bg-white dark:bg-[#102A3D]/70 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-cyan-500/40 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-xl font-display font-bold text-slate-900 dark:text-slate-100">
                        {deg.degree}
                      </h3>
                      <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
                        {deg.field}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md w-fit">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{deg.period}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 font-sans">
                    <span className="font-medium text-slate-900 dark:text-slate-200">{deg.institution}</span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {deg.location}
                    </span>
                    {deg.grade && (
                      <>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="font-mono font-medium text-emerald-600 dark:text-emerald-400">
                          {deg.grade}
                        </span>
                      </>
                    )}
                  </div>

                  {deg.scholarshipOrHonor && (
                    <div className="mb-4 p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-800 dark:text-cyan-300 flex items-center gap-2">
                      <Award className="w-4 h-4 shrink-0 text-cyan-500" />
                      <span>{deg.scholarshipOrHonor}</span>
                    </div>
                  )}

                  <ul className="space-y-1.5 mb-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {deg.highlights.map((h: string, hIdx: number) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-sans leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                    {deg.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Academic & Professional Appointments */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Briefcase className="w-6 h-6 text-amber-500" />
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-slate-100">
              Research &amp; Academic Appointments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {APPOINTMENTS.map((apt: Appointment, index: number) => (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-white dark:bg-[#102A3D]/70 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded">
                      {apt.period}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {apt.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {apt.role}
                  </h3>
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-4">
                    {apt.organization}
                  </div>
                  <ul className="space-y-2 mb-4">
                    {apt.responsibilities.map((r: string, i: number) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400">
                  Appointment Type: <span className="text-cyan-600 dark:text-cyan-400">{apt.type}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Honors & Awards */}
        <section>
          <div className="flex items-center gap-3 mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Award className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-slate-100">
              Honors, Scholarships &amp; Awards
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {HONORS_AWARDS.map((award: HonorAward, index: number) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white dark:bg-[#102A3D]/70 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 mb-2">
                    <span>{award.year}</span>
                    <span className="text-amber-500 font-semibold">{award.grantor}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {award.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans mb-4">
                    {award.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Credential</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
