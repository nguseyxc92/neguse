import React from 'react';
import { ArrowRight, Compass, GraduationCap, Cpu, Layers, FileDown, ShieldCheck } from 'lucide-react';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-16">
      {/* Title & Introduction */}
      <div className="space-y-4 border-b border-[#29475A]/60 pb-8">
        <div className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
          Curriculum &middot; Philosophy &middot; Direction
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 tracking-tight">
          About Neguse Solomon Mekonnen
        </h1>
        <p className="text-base text-[#A8BAC9] leading-relaxed max-w-3xl">
          A computational civil engineer and structural reliability researcher dedicated to bridging
          physical mechanics, Bayesian probability, and scientific software systems.
        </p>
      </div>

      {/* Section A: Academic & Intellectual Journey */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#102A3D] border border-[#29475A] flex items-center justify-center text-[#56C7D8]">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
            Educational &amp; Intellectual Evolution
          </h2>
        </div>

        <div className="prose prose-invert max-w-none text-sm text-[#A8BAC9] space-y-4 leading-relaxed">
          <p>
            My engineering foundation took root at <strong className="text-[#F4F8FC]">Wollo University</strong> in
            Ethiopia, where I graduated with <strong className="text-[#F4F8FC]">First Class Honours (CGPA: 3.41/4.0)</strong> and
            Distinction in Civil Engineering. Recognizing early that engineering understanding requires physical rigor,
            I began teaching undergraduate tutorial courses and conducting experimental testing in the structural materials
            laboratory from my third year onward—two years before degree completion. My senior thesis explored the structural
            design and BIM optimization of a mixed-use commercial facility incorporating low-carbon geopolymer materials.
          </p>
          <p>
            To advance into structural risk and quantitative safety evaluation, I was selected for the prestigious
            European Union <strong className="text-[#F4F8FC]">Erasmus Mundus Joint Master (NoRISK)</strong> in Risk Assessment
            and Management of Civil Infrastructures, studying across the <strong className="text-[#F4F8FC]">Università degli Studi di Padova</strong> (Italy)
            and <strong className="text-[#F4F8FC]">Universitat Politècnica de Catalunya (UPC BarcelonaTech)</strong> (Spain) with an EMJM Consortium Scholarship.
            Supervised by Dr. Eva Lantsoght (TU Delft/USFQ) and Dr. Rolando Chacón (UPC), my dissertation achieved the first
            field application of the De Vries et al. Bayesian reliability updating framework to full-scale proof load monitoring data
            from an alkali-silica reaction (ASR)-affected bridge: the Zijlweg Viaduct in the Netherlands.
          </p>
          <p>
            Recognizing that modern civil engineering is fundamentally computational, I chose to concurrently pursue a
            <strong className="text-[#F4F8FC]"> Bachelor of Science in Computer Science at the University of the People</strong> (supported
            by a full academic scholarship, currently holding Cum Laude standing). This computer science curriculum was not a departure
            from civil engineering, but a deliberate expansion: mastering algorithm design, data structures, and software architecture
            to build robust, high-performance scientific computing engines and digital twins.
          </p>
        </div>
      </section>

      {/* Section B: How I Work - Three Connected Disciplines */}
      <section className="space-y-6 pt-4 border-t border-[#29475A]/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#102A3D] border border-[#29475A] flex items-center justify-center text-[#D6B675]">
            <Layers className="w-4 h-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
            How I Work: The Interconnected Triad
          </h2>
        </div>

        <p className="text-sm text-[#A8BAC9] leading-relaxed">
          I reject the separation between physical mechanics, mathematical statistics, and software architecture.
          High-integrity infrastructure engineering requires mastering all three:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-[#061B2B] border border-[#29475A] space-y-3">
            <div className="text-xs font-mono font-bold text-[#56C7D8] uppercase tracking-wider">
              1. Physical Engineering
            </div>
            <h3 className="text-sm font-bold text-[#F4F8FC]">
              Structural Mechanics &amp; Materials
            </h3>
            <p className="text-xs text-[#A8BAC9] leading-relaxed">
              Understanding reinforced concrete stress-strain behavior, cracking progression, shear mechanisms
              without stirrups, and complex deterioration phenomena like alkali-silica reaction (ASR) expansion.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#061B2B] border border-[#29475A] space-y-3">
            <div className="text-xs font-mono font-bold text-[#D6B675] uppercase tracking-wider">
              2. Computational Research
            </div>
            <h3 className="text-sm font-bold text-[#F4F8FC]">
              Bayesian &amp; Probabilistic Modeling
            </h3>
            <p className="text-xs text-[#A8BAC9] leading-relaxed">
              Formulating limit states, sampling multi-dimensional parameter spaces via Latin Hypercube and MCMC,
              and conditioning prior distributions on empirical sensor measurements and survival evidence.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#061B2B] border border-[#29475A] space-y-3">
            <div className="text-xs font-mono font-bold text-[#4EA9A5] uppercase tracking-wider">
              3. Software Engineering
            </div>
            <h3 className="text-sm font-bold text-[#F4F8FC]">
              Production Systems &amp; Visualization
            </h3>
            <p className="text-xs text-[#A8BAC9] leading-relaxed">
              Developing high-performance C++ simulation kernels, Python scientific pipelines, and responsive
              web interfaces that make complex probabilistic models interactive and verifiable.
            </p>
          </div>
        </div>
      </section>

      {/* Section C: Research Philosophy */}
      <section className="space-y-6 pt-4 border-t border-[#29475A]/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#102A3D] border border-[#29475A] flex items-center justify-center text-[#56C7D8]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
            Research Philosophy
          </h2>
        </div>

        <div className="p-6 rounded-xl bg-[#03121E] border border-[#29475A] space-y-4 text-xs sm:text-sm text-[#A8BAC9] leading-relaxed">
          <p>
            <strong className="text-[#F4F8FC]">Evidence Over Prescriptive Conservatism:</strong> Traditional design codes
            are intentionally conservative because they are developed for new structures with unknown construction quality.
            When applied to existing bridges, these models frequently declare adequate structures &ldquo;insufficient,&rdquo; triggering
            premature demolition, massive carbon emissions, and needless capital expenditure. Instrumented proof load testing
            provides physical evidence of true capacity.
          </p>
          <p>
            <strong className="text-[#F4F8FC]">Continuous Probability Over Binary Pass/Fail:</strong> Treating a proof test as
            a binary event (did the bridge collapse or survive?) discards almost all the information collected by sensor arrays.
            By coupling continuous sensor telemetry (strains and crack widths) with Bayesian updating, we extract quantitative
            reliability gains, allowing bridge owners to verify safety at lower, safer test load levels.
          </p>
          <p>
            <strong className="text-[#F4F8FC]">Transparent Accounting of Uncertainty:</strong> Every computational model has
            limitations. Scientific credibility requires reporting model uncertainties, sensor noise, sample sizes, and
            sensitivity indices transparently rather than obscuring them behind single deterministic safety factors.
          </p>
        </div>
      </section>

      {/* Section D: Current Academic Direction & PhD Exploration */}
      <section className="space-y-6 pt-4 border-t border-[#29475A]/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#102A3D] border border-[#29475A] flex items-center justify-center text-[#D6B675]">
            <Compass className="w-4 h-4" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
            Current Direction &amp; PhD Goals
          </h2>
        </div>

        <div className="space-y-4 text-sm text-[#A8BAC9] leading-relaxed">
          <p>
            Having completed my Erasmus Mundus master&apos;s dissertation and advanced coursework across Italy and Spain,
            I am preparing for <strong className="text-[#F4F8FC]">doctoral research beginning in 2027</strong>.
            My research vision centers on developing <strong className="text-[#56C7D8]">physics-informed digital twins and Bayesian updating frameworks</strong> for
            aging civil infrastructure networks.
          </p>
          <p>
            Key research questions I aim to investigate include:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li>
              How can continuous structural health monitoring (SHM) streams be dynamically ingested into Bayesian updating
              models to track time-dependent degradation (ASR progression, chloride corrosion, fatigue)?
            </li>
            <li>
              How can deep neural operator surrogates (Fourier Neural Operators, DeepONets) enable real-time finite element
              updating under stochastic environmental and traffic loading?
            </li>
            <li>
              How can multi-span spatial correlation and load redistribution be rigorously formulated to generalize single-component
              proof testing across entire transportation corridors?
            </li>
          </ul>
        </div>

        {/* Action strip */}
        <div className="pt-4 flex flex-wrap gap-4">
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#03121E] bg-[#56C7D8] hover:bg-[#56C7D8]/90 rounded-lg transition-colors"
          >
            <span>Inquire About PhD Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('journey')}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-[#F4F8FC] bg-[#102A3D] border border-[#29475A] rounded-lg hover:border-[#56C7D8] transition-colors"
          >
            <span>Inspect Academic Timeline</span>
          </button>
        </div>
      </section>
    </div>
  );
};
