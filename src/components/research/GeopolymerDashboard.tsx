import React, { useState } from 'react';
import { Leaf, DollarSign, Award, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { KaTeXMath } from '../common/KaTeXMath';

export const GeopolymerDashboard: React.FC = () => {
  // Scenario: local activator price discount (from 0% current import price to 60% with domestic silicate synthesis)
  const [activatorDiscount, setActivatorDiscount] = useState<number>(0);
  const [concreteClass, setConcreteClass] = useState<'C25' | 'C30'>('C30');

  // Baseline data from paper (Ethiopian Roads Administration / Tatek pumice data)
  const carbonData = {
    GPC: 161, // kg CO2e / m3
    PPC: 303, // kg CO2e / m3 (Ethiopian blended cement baseline)
    OPC: 393, // kg CO2e / m3 (European/US baseline)
  };

  // Base raw material cost in ETB / m3 at mid market rates
  // In GPC, sodium silicate + NaOH = 92% of materials cost
  const basePPCcost = 6200; // ETB/m3
  const baseGPCactivatorCost = 10800; // 92% of GPC cost
  const baseGPCpozzolanAggCost = 900;

  const currentActivatorCost = baseGPCactivatorCost * (1 - activatorDiscount / 100);
  const currentGPCcost = Math.round(currentActivatorCost + baseGPCpozzolanAggCost);
  const costPremiumPercent = Math.round(((currentGPCcost - basePPCcost) / basePPCcost) * 100);

  // Carbon reduction
  const carbonSavingsPercent = Math.round(((carbonData.PPC - carbonData.GPC) / carbonData.PPC) * 100);

  return (
    <div className="rounded-xl bg-[#061B2B] dark:bg-[#061B2B] bg-white border border-[#29475A] p-6 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#29475A]/60 gap-4">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
            Interactive Trade-Off Analysis
          </span>
          <h3 className="text-lg font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
            Natural-Pozzolan Geopolymer vs Ethiopian PPC &amp; OPC
          </h3>
          <p className="text-xs text-[#A8BAC9] mt-0.5">
            Probabilistic LCA, materials economics, and Eurocode EN 1990 column reliability
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#A8BAC9] font-mono">Mix Strength:</span>
          <div className="flex rounded-lg border border-[#29475A] overflow-hidden">
            {(['C25', 'C30'] as const).map((cls) => (
              <button
                key={cls}
                onClick={() => setConcreteClass(cls)}
                className={`px-3 py-1 text-xs font-mono transition-colors ${
                  concreteClass === cls
                    ? 'bg-[#56C7D8] text-[#03121E] font-bold'
                    : 'bg-[#03121E] text-[#A8BAC9] hover:text-[#F4F8FC]'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Triad Comparison Strips: Carbon, Cost, Structural Reliability */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Embodied Carbon */}
        <div className="p-4 rounded-lg bg-[#102A3D]/70 border border-[#29475A]/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" /> Embodied Carbon (GWP)
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                -{carbonSavingsPercent}% vs PPC
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-[#A8BAC9] mb-1">
                  <span>Natural-Pozzolan GPC:</span>
                  <span className="text-emerald-400 font-bold">{carbonData.GPC} kg CO2e/m&sup3;</span>
                </div>
                <div className="w-full bg-[#03121E] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full"
                    style={{ width: `${(carbonData.GPC / carbonData.OPC) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#A8BAC9] mb-1">
                  <span>Ethiopian PPC (Blended):</span>
                  <span className="text-[#D6B675] font-semibold">{carbonData.PPC} kg CO2e/m&sup3;</span>
                </div>
                <div className="w-full bg-[#03121E] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#D6B675] h-full rounded-full"
                    style={{ width: `${(carbonData.PPC / carbonData.OPC) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-[#A8BAC9] mb-1">
                  <span>Ordinary Portland (OPC):</span>
                  <span className="text-rose-400 font-semibold">{carbonData.OPC} kg CO2e/m&sup3;</span>
                </div>
                <div className="w-full bg-[#03121E] h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-400 h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-[#A8BAC9] mt-3 pt-2 border-t border-[#29475A]/40 leading-tight">
            GPC achieves 161 kg CO2e/m&sup3; (5th-95th percentile: 135 to 201), cutting carbon nearly in half.
          </p>
        </div>

        {/* Metric 2: Unit Materials Cost & Domestic Silicate Slider */}
        <div className="p-4 rounded-lg bg-[#102A3D]/70 border border-[#29475A]/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-[#D6B675] uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" /> Unit Cost &amp; Parity
              </span>
              <span
                className={`text-xs font-mono font-bold ${
                  costPremiumPercent <= 0 ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {costPremiumPercent <= 0 ? 'Parity Reached' : `+${costPremiumPercent}% Premium`}
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs mb-3">
              <div className="flex justify-between text-[#A8BAC9]">
                <span>GPC Materials Cost:</span>
                <span className="text-[#F4F8FC] font-bold">{currentGPCcost.toLocaleString()} ETB/m&sup3;</span>
              </div>
              <div className="flex justify-between text-[#A8BAC9]">
                <span>Ethiopian PPC Reference:</span>
                <span className="text-[#F4F8FC]">{basePPCcost.toLocaleString()} ETB/m&sup3;</span>
              </div>
            </div>

            {/* Domestic Silicate Slider */}
            <div className="p-2.5 rounded bg-[#03121E] border border-[#29475A] space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-[#56C7D8]">Domestic Silicate Discount:</span>
                <span className="text-[#F4F8FC] font-bold">-{activatorDiscount}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={activatorDiscount}
                onChange={(e) => setActivatorDiscount(Number(e.target.value))}
                className="w-full accent-[#56C7D8]"
              />
              <span className="text-[10px] text-[#A8BAC9] block leading-tight">
                Simulates domestic silicate synthesis from Tatek pumice to cut chemical activator expenses.
              </span>
            </div>
          </div>
          <p className="text-[11px] text-[#A8BAC9] mt-3 pt-2 border-t border-[#29475A]/40 leading-tight">
            Commercial sodium silicate + NaOH make up ~92% of GPC cost. Parity requires a ~50% cost reduction.
          </p>
        </div>

        {/* Metric 3: Column Structural Reliability */}
        <div className="p-4 rounded-lg bg-[#102A3D]/70 border border-[#29475A]/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-[#56C7D8] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> Column Reliability
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                Passes EN 1990
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between text-[#A8BAC9]">
                <span>Demonstrated Reliability Index:</span>
                <span className="text-[#56C7D8] font-bold text-base">&beta; = 4.80</span>
              </div>
              <div className="flex justify-between text-[#A8BAC9]">
                <span>Eurocode EN 1990 Target (&beta;_t):</span>
                <span className="text-[#F4F8FC]">&beta; = 3.80</span>
              </div>
              <div className="flex justify-between text-[#A8BAC9]">
                <span>Required Cross-Section Area Delta:</span>
                <span className="text-emerald-400 font-bold">+4% only</span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-[#A8BAC9] mt-3 pt-2 border-t border-[#29475A]/40 leading-tight">
            Structural reliability parity with PPC is readily achieved with a negligible 4% increase in column area.
          </p>
        </div>
      </div>

      {/* Sensitivity Analysis Note */}
      <div className="p-3 rounded-lg bg-[#03121E] border border-[#29475A]/60 text-xs text-[#A8BAC9] flex items-start gap-2 font-mono">
        <span className="text-[#56C7D8] font-bold">&bull;</span>
        <div className="leading-relaxed">
          <strong className="text-[#F4F8FC]">Spearman Rank Correlation: </strong>
          Sodium silicate solution dominates total GWP (rank correlation 0.93) and total cost (0.92),
          while pumice pozzolan contributes only 0.25 and aggregates 0.12.
        </div>
      </div>
    </div>
  );
};
