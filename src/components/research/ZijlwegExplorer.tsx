import React, { useState } from 'react';
import { ShieldCheck, Layers, GitCompare, Activity, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ZIJLWEG_LOAD_STEPS, ZijlwegLoadStepData } from '../../data/researchData';
import { KaTeXMath } from '../common/KaTeXMath';

export const ZijlwegExplorer: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'bending' | 'shear'>('shear');
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(2); // Default to Step 3 (+1.85 key finding)

  const currentStep: ZijlwegLoadStepData = ZIJLWEG_LOAD_STEPS[selectedStepIndex];

  return (
    <div className="rounded-xl bg-[#061B2B] dark:bg-[#061B2B] bg-white border border-[#29475A] p-6 shadow-xl space-y-6">
      {/* Header and Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#29475A]/60 gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
            Interactive Case Study Demonstrator
          </span>
          <h3 className="text-lg font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
            Zijlweg Viaduct Bayesian Reliability &amp; Stop Criteria Explorer
          </h3>
          <p className="text-xs text-[#A8BAC9] mt-0.5">
            Empirical data from the June 2015 full-scale proof load test on Span 4 (1965 ASR-affected slab bridge)
          </p>
        </div>

        {/* Bending vs Shear Toggle */}
        <div className="flex items-center gap-1 p-1 bg-[#03121E] border border-[#29475A] rounded-lg shrink-0">
          <button
            onClick={() => setActiveMode('bending')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeMode === 'bending'
                ? 'bg-[#56C7D8] text-[#03121E] font-bold shadow-sm'
                : 'text-[#A8BAC9] hover:text-[#F4F8FC]'
            }`}
          >
            Bending Test (Strain LVDTs 2&amp;3)
          </button>
          <button
            onClick={() => setActiveMode('shear')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeMode === 'shear'
                ? 'bg-[#56C7D8] text-[#03121E] font-bold shadow-sm'
                : 'text-[#A8BAC9] hover:text-[#F4F8FC]'
            }`}
          >
            Shear Test (Crack LVDTs 14&ndash;16)
          </button>
        </div>
      </div>

      {/* Step Selector Slider / Buttons */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#A8BAC9]">
            Select Proof Load Step (Cyclic Loading Protocol)
          </span>
          <span className="text-xs font-mono font-bold text-[#56C7D8]">
            Step {currentStep.step} of 5 &middot; {currentStep.nominalLoad}
          </span>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {ZIJLWEG_LOAD_STEPS.map((st, idx) => {
            const isSelected = selectedStepIndex === idx;
            const appliedForce =
              activeMode === 'bending' ? st.appliedForceBending : st.appliedForceShear;
            return (
              <button
                key={st.step}
                onClick={() => setSelectedStepIndex(idx)}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'bg-[#102A3D] border-[#56C7D8] ring-1 ring-[#56C7D8]'
                    : 'bg-[#03121E]/60 border-[#29475A]/60 hover:border-[#29475A] text-[#A8BAC9]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={isSelected ? 'text-[#56C7D8] font-bold' : ''}>
                    Step {st.step}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="Stop Criteria: Green" />
                </div>
                <div className="text-xs font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 mt-1">
                  {appliedForce.toFixed(0)} kN
                </div>
                <div className="text-[10px] text-[#A8BAC9] truncate mt-0.5">
                  {activeMode === 'bending'
                    ? `${st.criticalMoment.toFixed(0)} kNm`
                    : `${st.criticalShear.toFixed(0)} kN`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Comparative View: Sensor Readings & Reliability Evaluation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Sensor Telemetry & Stop Criteria (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Real Sensor Telemetry Box */}
          <div className="p-4 rounded-lg bg-[#03121E] border border-[#29475A]/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#56C7D8] uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                {activeMode === 'bending' ? 'Strain Sensor Channels' : 'Crack Width Channels'}
              </span>
              <span className="text-[10px] font-mono text-[#A8BAC9]">1,000mm Gauge LVDTs</span>
            </div>

            {activeMode === 'bending' ? (
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 rounded bg-[#102A3D]/60 border border-[#29475A]/40">
                  <span className="text-[#A8BAC9]">LVDT02 (Longitudinal Strain):</span>
                  <span className="text-[#F4F8FC] font-semibold">{currentStep.strainLVDT02.toFixed(3)} &mu;&epsilon;</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[#102A3D]/60 border border-[#29475A]/40">
                  <span className="text-[#A8BAC9]">LVDT03 (Longitudinal Strain):</span>
                  <span className="text-[#F4F8FC] font-semibold">{currentStep.strainLVDT03.toFixed(3)} &mu;&epsilon;</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[#102A3D] border border-[#56C7D8]/40 text-[#56C7D8]">
                  <span>Governing Strain (&epsilon;_s,max):</span>
                  <span className="font-bold">{currentStep.maxStrain.toFixed(3)} &mu;&epsilon;</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between p-2 rounded bg-[#102A3D]/60 border border-[#29475A]/40">
                  <span className="text-[#A8BAC9]">LVDT14 (Side Face Shear):</span>
                  <span className="text-[#F4F8FC] font-semibold">{(currentStep.crackLVDT14 * 1000).toFixed(1)} &mu;m</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[#102A3D]/60 border border-[#29475A]/40">
                  <span className="text-[#A8BAC9]">LVDT15 (Bottom Face Crack):</span>
                  <span className="text-[#F4F8FC] font-semibold">{(currentStep.crackLVDT15 * 1000).toFixed(1)} &mu;m</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[#102A3D]/60 border border-[#29475A]/40">
                  <span className="text-[#A8BAC9]">LVDT16 (Transverse Crack):</span>
                  <span className="text-[#F4F8FC] font-semibold">{(currentStep.crackLVDT16 * 1000).toFixed(1)} &mu;m</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[#102A3D] border border-[#56C7D8]/40 text-[#56C7D8]">
                  <span>Max Weighted Crack (w_max,w):</span>
                  <span className="font-bold">{currentStep.maxCrackWidth.toFixed(4)} mm</span>
                </div>
              </div>
            )}
          </div>

          {/* Operational Stop Criteria Traffic Light Box */}
          <div className="p-4 rounded-lg bg-[#03121E] border border-[#29475A]/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#D6B675] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Mechanics-Based Stop Criteria (CSCT / CSDT)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                Green Light
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-[#A8BAC9]">
              <div className="flex justify-between font-mono">
                <span>CSCT Indicator (I_CSCT):</span>
                <span className="text-[#F4F8FC] font-semibold">
                  {currentStep.csctIndicator.toFixed(3)} / 1.63 MPa^0.5
                </span>
              </div>
              <div className="flex justify-between font-mono">
                <span>CSDT Indicator (I_CSDT):</span>
                <span className="text-[#F4F8FC] font-semibold">
                  {currentStep.csdtIndicator.toFixed(6)} MPa&middot;mm
                </span>
              </div>
              <div className="flex justify-between font-mono text-[11px] pt-1 border-t border-[#29475A]/40 text-emerald-400">
                <span>Governing min(I_CSDT, I_CSCT):</span>
                <span className="font-bold">{currentStep.minStopIndicator.toFixed(6)}</span>
              </div>
            </div>

            <p className="text-[11px] text-[#A8BAC9] leading-relaxed">
              All indicators remained far below warning thresholds (0.05 for CSDT, 0.825 for CSCT),
              confirming the structure operated strictly in the uncracked/elastic regime throughout proof loading.
            </p>
          </div>
        </div>

        {/* Right: Quantitative Reliability Indices Comparison (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-lg bg-[#102A3D]/70 border border-[#29475A]/60">
            <span className="text-xs font-mono font-bold text-[#56C7D8] uppercase tracking-wider block mb-3">
              Reliability Indices Comparison at Step {currentStep.step}
            </span>

            {/* Comparison Metrics */}
            <div className="grid grid-cols-3 gap-3 font-mono text-center mb-4">
              <div className="p-3 rounded bg-[#03121E] border border-[#29475A]">
                <span className="text-[10px] text-[#A8BAC9] uppercase block">
                  &beta;_during (Test Risk)
                </span>
                <span className="text-lg font-bold text-[#F4F8FC]">
                  {activeMode === 'bending'
                    ? currentStep.bendingBetaDuring.toFixed(2)
                    : currentStep.shearBetaDuring.toFixed(2)}
                </span>
                <span className="text-[10px] text-[#A8BAC9] block mt-0.5">
                  Under applied load
                </span>
              </div>

              <div className="p-3 rounded bg-[#03121E] border border-[#56C7D8]/60">
                <span className="text-[10px] text-[#56C7D8] uppercase block font-bold">
                  &beta;_after (Updated)
                </span>
                <span className="text-xl font-extrabold text-[#56C7D8]">
                  {activeMode === 'bending'
                    ? currentStep.bendingBetaAfter.toFixed(2)
                    : currentStep.shearBetaAfter.toFixed(2)}
                </span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">
                  Annual traffic safety
                </span>
              </div>

              <div className="p-3 rounded bg-[#03121E] border border-[#29475A]">
                <span className="text-[10px] text-[#D6B675] uppercase block">
                  &beta;_lower (Survival Only)
                </span>
                <span className="text-lg font-bold text-[#D6B675]">
                  {activeMode === 'bending'
                    ? currentStep.bendingBetaLower !== null
                      ? currentStep.bendingBetaLower.toFixed(2)
                      : '< 0'
                    : currentStep.shearBetaLower !== null
                    ? currentStep.shearBetaLower.toFixed(2)
                    : 'N/A'}
                </span>
                <span className="text-[10px] text-[#A8BAC9] block mt-0.5">
                  Uninstrumented lower bound
                </span>
              </div>
            </div>

            {/* Key Analytical Takeaway Callout */}
            {activeMode === 'shear' && currentStep.step === 3 && (
              <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 mb-4 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold">Key Thesis Finding (+1.85 Advantage): </span>
                  At Step 3 shear, monitoring crack width data yielded{' '}
                  <span className="font-mono font-bold">&beta; = 3.81</span>, compared to only{' '}
                  <span className="font-mono font-bold">&beta; = 1.96</span> from survival alone.
                  This proves that instrumentation demonstrates adequacy at a lower, safer load level!
                </div>
              </div>
            )}

            {/* Evolution Polyline SVG Chart */}
            <div className="p-3 rounded bg-[#03121E] border border-[#29475A]/60">
              <div className="flex justify-between items-center text-[11px] font-mono text-[#A8BAC9] mb-1">
                <span>Reliability Index Evolution Across Steps 1 to 5</span>
                <span className="text-[#56C7D8]">&beta; Target = 4.0 (Annual Disapproval)</span>
              </div>

              <svg viewBox="0 0 400 130" className="w-full h-32">
                {/* Horizontal reference lines */}
                <line x1="30" y1="95" x2="385" y2="95" stroke="#29475A" strokeWidth="0.75" />
                {/* Target line: beta = 4.0 */}
                <line x1="30" y1="45" x2="385" y2="45" stroke="#D6B675" strokeDasharray="3 3" strokeWidth="1" />
                <text x="35" y="40" className="text-[9px] font-mono fill-[#D6B675]">
                  &beta;_target = 4.0
                </text>
                {/* Target line: beta = 4.7 (new build) */}
                <line x1="30" y1="28" x2="385" y2="28" stroke="#34D399" strokeDasharray="2 2" strokeWidth="0.75" />
                <text x="300" y="24" className="text-[9px] font-mono fill-[#34D399]">
                  New Build (&beta;=4.7)
                </text>

                {/* Plot points & line for beta_after */}
                {ZIJLWEG_LOAD_STEPS.map((st, i) => {
                  const x = 50 + i * 80;
                  const bVal = activeMode === 'bending' ? st.bendingBetaAfter : st.shearBetaAfter;
                  // scale: beta 0 at y=115, beta 6 at y=10
                  const y = 115 - (bVal / 6.0) * 105;
                  const isCur = selectedStepIndex === i;

                  return (
                    <g key={i}>
                      {i < ZIJLWEG_LOAD_STEPS.length - 1 && (
                        <line
                          x1={x}
                          y1={y}
                          x2={50 + (i + 1) * 80}
                          y2={
                            115 -
                            ((activeMode === 'bending'
                              ? ZIJLWEG_LOAD_STEPS[i + 1].bendingBetaAfter
                              : ZIJLWEG_LOAD_STEPS[i + 1].shearBetaAfter) /
                              6.0) *
                              105
                          }
                          stroke="#56C7D8"
                          strokeWidth="2.5"
                        />
                      )}
                      <circle
                        cx={x}
                        cy={y}
                        r={isCur ? 6 : 3.5}
                        fill={isCur ? '#F4F8FC' : '#56C7D8'}
                        stroke="#03121E"
                        strokeWidth="1.5"
                        className="cursor-pointer"
                        onClick={() => setSelectedStepIndex(i)}
                      />
                      <text
                        x={x}
                        y={y - 8}
                        textAnchor="middle"
                        className="text-[9px] font-mono fill-[#F4F8FC] font-bold"
                      >
                        {bVal.toFixed(2)}
                      </text>
                      <text
                        x={x}
                        y="125"
                        textAnchor="middle"
                        className="text-[9px] font-mono fill-[#A8BAC9]"
                      >
                        S{st.step}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Sectional Model Detail Note */}
          <div className="p-3 rounded-lg bg-[#03121E] border border-[#29475A]/60 text-xs text-[#A8BAC9] flex items-start gap-2">
            <Layers className="w-4 h-4 text-[#56C7D8] mt-0.5 shrink-0" />
            <div className="leading-relaxed">
              <span className="font-semibold text-[#F4F8FC]">Corrected Sectional Inventory: </span>
              Incorporating all 4 bottom reinforcement layers (&Phi;28@300, &Phi;16@300, &Phi;19@150, &Phi;16@200)
              yielded <KaTeXMath math="M_{y,mean} = 3,248.87\text{ kNm}" /> (<KaTeXMath math="\text{CoV} = 0.137" />),
              correcting earlier literature omissions that underestimated capacity by 44%.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
