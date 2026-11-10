import React, { useState } from 'react';
import { Cpu, Activity, BarChart3, Info } from 'lucide-react';
import { PageRoute } from '../types';
import { ReliabilityCalculator } from '../components/lab/ReliabilityCalculator';
import { BayesianUpdatingLab } from '../components/lab/BayesianUpdatingLab';
import { MonteCarloLab } from '../components/lab/MonteCarloLab';

interface LabPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const LabPage: React.FC<LabPageProps> = () => {
  const [activeTab, setActiveTab] = useState<'demoA' | 'demoB' | 'demoC'>('demoA');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 space-y-10">
      {/* Page Header */}
      <div className="border-b border-[#29475A]/60 pb-8 space-y-4">
        <div className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
          Interactive Scientific Computing Environment
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 tracking-tight">
          Computational Engineering Lab
        </h1>
        <p className="text-sm sm:text-base text-[#A8BAC9] max-w-3xl leading-relaxed">
          Demonstrating the direct connection between engineering mathematics, statistical physics,
          and interactive software engineering. All calculations run client-side in real time using
          transparent numerical formulations.
        </p>
      </div>

      {/* Lab Module Selector Navigation */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 bg-[#03121E] border border-[#29475A] rounded-xl">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setActiveTab('demoA')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'demoA'
                ? 'bg-[#56C7D8] text-[#03121E] font-bold shadow-sm'
                : 'text-[#A8BAC9] hover:text-[#F4F8FC] hover:bg-[#102A3D]'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Demo A: Limit State &amp; &beta; Index</span>
          </button>

          <button
            onClick={() => setActiveTab('demoB')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'demoB'
                ? 'bg-[#56C7D8] text-[#03121E] font-bold shadow-sm'
                : 'text-[#A8BAC9] hover:text-[#F4F8FC] hover:bg-[#102A3D]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Demo B: Conjugate Bayesian Updating</span>
          </button>

          <button
            onClick={() => setActiveTab('demoC')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'demoC'
                ? 'bg-[#56C7D8] text-[#03121E] font-bold shadow-sm'
                : 'text-[#A8BAC9] hover:text-[#F4F8FC] hover:bg-[#102A3D]'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Demo C: Monte Carlo &amp; UQ</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-[#A8BAC9] px-3 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Interactive Engine Active</span>
        </div>
      </div>

      {/* Active Demonstrator Stage */}
      <div className="transition-all duration-200">
        {activeTab === 'demoA' && <ReliabilityCalculator />}
        {activeTab === 'demoB' && <BayesianUpdatingLab />}
        {activeTab === 'demoC' && <MonteCarloLab />}
      </div>

      {/* Mathematical & Software Integrity Notice */}
      <div className="p-4 rounded-xl bg-[#03121E] border border-[#29475A]/60 flex items-start gap-3 text-xs text-[#A8BAC9]">
        <Info className="w-4 h-4 text-[#56C7D8] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-[#F4F8FC]">Scientific Integrity Note:</span>
          <p className="leading-relaxed">
            These interactive demonstrations are built with rigorous client-side math routines (exact normal CDF approximations,
            conjugate Gaussian posteriors, and Box-Muller transforms). They serve an educational and exploratory function,
            distinct from the full C++ MCMC sampling engine used in the Zijlweg Viaduct research.
          </p>
        </div>
      </div>
    </div>
  );
};
