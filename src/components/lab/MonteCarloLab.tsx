import React, { useState, useMemo, useCallback } from 'react';
import { Play, Download, RotateCcw, BarChart3, LineChart } from 'lucide-react';
import { KaTeXMath } from '../common/KaTeXMath';

// Simple pseudo-random number generator for reproducible seeds
function seededRandom(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// Box-Muller transform for standard normal random variable
function sampleStandardNormal(rand: () => number): number {
  let u = 0;
  let v = 0;
  while (u === 0) u = rand();
  while (v === 0) v = rand();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export const MonteCarloLab: React.FC = () => {
  const [modelType, setModelType] = useState<'linear' | 'rcBeam'>('linear');
  const [sampleCount, setSampleCount] = useState<number>(10000);
  const [seed, setSeed] = useState<number>(42);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Model parameters
  // Linear: R ~ N(meanR, covR), S ~ N(meanS, covS)
  const [meanR, setMeanR] = useState<number>(3250);
  const [covR, setCovR] = useState<number>(0.137);
  const [meanS, setMeanS] = useState<number>(2200);
  const [covS, setCovS] = useState<number>(0.12);

  // Run simulation computation
  const simulationResults = useMemo(() => {
    const rand = seededRandom(seed);
    const zSamples: number[] = new Array(sampleCount);
    let failCount = 0;
    const convergenceTrace: Array<{ step: number; pf: number }> = [];
    const traceInterval = Math.max(1, Math.floor(sampleCount / 50));

    for (let i = 0; i < sampleCount; i++) {
      let z = 0;
      if (modelType === 'linear') {
        const r = meanR * (1 + covR * sampleStandardNormal(rand));
        const s = meanS * (1 + covS * sampleStandardNormal(rand));
        z = r - s;
      } else {
        // RC Beam flexural limit state:
        // Z = As * fy * (d - a/2) - M_load where a = (As * fy) / (0.85 * fc * b)
        const fc = 36.4 * (1 + 0.10 * sampleStandardNormal(rand)); // MPa
        const fy = 230 * (1 + 0.05 * sampleStandardNormal(rand)); // MPa
        const As = 0.03708; // m^2 (total bottom reinforcement)
        const b = 6.60; // m
        const d = 0.516; // m
        const M_load = 2200 * (1 + 0.12 * sampleStandardNormal(rand)); // kNm

        const a = (As * fy * 1e3) / (0.85 * fc * b);
        const leverArm = Math.max(0.1, d - 0.5 * a);
        const capacity = As * (fy * 1e3) * leverArm; // kNm
        z = capacity - M_load;
      }

      zSamples[i] = z;
      if (z < 0) {
        failCount++;
      }

      if ((i + 1) % traceInterval === 0 || i === sampleCount - 1) {
        convergenceTrace.push({
          step: i + 1,
          pf: failCount / (i + 1),
        });
      }
    }

    const pf = failCount / sampleCount;
    // Estimate reliability index beta = -Phi^(-1)(Pf)
    const beta = pf > 0 && pf < 1 ? -Math.sqrt(2) * (function invErf(x) {
      // Winitzki approximation
      const a = 0.147;
      const term1 = 2 / (Math.PI * a) + Math.log(1 - x * x) / 2;
      const term2 = Math.log(1 - x * x) / a;
      const inner = term1 * term1 - term2;
      const sgn = x < 0 ? -1 : 1;
      return sgn * Math.sqrt(Math.sqrt(inner) - term1);
    })(2 * pf - 1) : pf === 0 ? 6.0 : 0;

    // 95% Wilson score confidence interval for Pf
    const zCrit = 1.96;
    const denominator = 1 + (zCrit * zCrit) / sampleCount;
    const centerAdjusted = pf + (zCrit * zCrit) / (2 * sampleCount);
    const rad = zCrit * Math.sqrt((pf * (1 - pf)) / sampleCount + (zCrit * zCrit) / (4 * sampleCount * sampleCount));
    const ciLower = Math.max(0, (centerAdjusted - rad) / denominator);
    const ciUpper = Math.min(1, (centerAdjusted + rad) / denominator);

    // Compute histogram bins
    let minZ = Infinity;
    let maxZ = -Infinity;
    for (let i = 0; i < sampleCount; i++) {
      if (zSamples[i] < minZ) minZ = zSamples[i];
      if (zSamples[i] > maxZ) maxZ = zSamples[i];
    }

    const numBins = 30;
    const binWidth = (maxZ - minZ) / numBins;
    const bins = Array.from({ length: numBins }, (_, idx) => ({
      binStart: minZ + idx * binWidth,
      binEnd: minZ + (idx + 1) * binWidth,
      count: 0,
      isFailure: minZ + (idx + 1) * binWidth <= 0,
    }));

    for (let i = 0; i < sampleCount; i++) {
      const idx = Math.min(numBins - 1, Math.floor((zSamples[i] - minZ) / binWidth));
      if (idx >= 0 && idx < numBins) {
        bins[idx].count++;
      }
    }

    const maxBinCount = Math.max(...bins.map((b) => b.count));

    return {
      pf,
      beta,
      ciLower,
      ciUpper,
      failCount,
      totalSamples: sampleCount,
      convergenceTrace,
      bins,
      maxBinCount,
      zSamples,
    };
  }, [modelType, sampleCount, seed, meanR, covR, meanS, covS]);

  const handleRerun = () => {
    setIsSimulating(true);
    setSeed((prev) => prev + 1);
    setTimeout(() => setIsSimulating(false), 200);
  };

  const handleDownloadCSV = useCallback(() => {
    const rows = ['Sample_Index,Limit_State_Z,Is_Failure'];
    const limit = Math.min(5000, simulationResults.zSamples.length);
    for (let i = 0; i < limit; i++) {
      const z = simulationResults.zSamples[i];
      rows.push(`${i + 1},${z.toFixed(4)},${z < 0 ? 1 : 0}`);
    }
    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `monte_carlo_samples_n${simulationResults.totalSamples}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [simulationResults]);

  return (
    <div className="rounded-xl bg-[#061B2B] dark:bg-[#061B2B] bg-white border border-[#29475A] p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#29475A]/60 gap-3">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
            Demonstration C &middot; Uncertainty Propagation
          </span>
          <h3 className="text-lg font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
            Browser Monte Carlo Simulation Engine
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRerun}
            disabled={isSimulating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#03121E] bg-[#56C7D8] hover:bg-[#56C7D8]/90 rounded-lg transition-colors shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isSimulating ? 'Sampling...' : 'Rerun Seed'}</span>
          </button>
          <button
            onClick={handleDownloadCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#A8BAC9] hover:text-[#F4F8FC] bg-[#102A3D] rounded-lg border border-[#29475A] transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> CSV Export
          </button>
        </div>
      </div>

      {/* Model Selection and Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        <div className="p-4 rounded-lg bg-[#102A3D]/70 border border-[#29475A]/60 space-y-3">
          <span className="text-xs font-bold text-[#56C7D8] uppercase tracking-wider font-mono block">
            1. Limit-State Model
          </span>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs text-[#F4F8FC] cursor-pointer">
              <input
                type="radio"
                name="modelType"
                checked={modelType === 'linear'}
                onChange={() => setModelType('linear')}
                className="accent-[#56C7D8]"
              />
              <span>Linear Limit State: Z = R - S</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-[#F4F8FC] cursor-pointer">
              <input
                type="radio"
                name="modelType"
                checked={modelType === 'rcBeam'}
                onChange={() => setModelType('rcBeam')}
                className="accent-[#56C7D8]"
              />
              <span>RC Cross-Section Flexural Limit State</span>
            </label>
          </div>

          <div className="pt-2 border-t border-[#29475A]/40 text-[11px] text-[#A8BAC9] font-mono">
            Seed ID: {seed} &middot; Wilson 95% Bound
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#102A3D]/70 border border-[#29475A]/60 space-y-3">
          <span className="text-xs font-bold text-[#D6B675] uppercase tracking-wider font-mono block">
            2. Sample Count (N)
          </span>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#A8BAC9]">Simulated Iterations:</span>
            <span className="font-mono text-[#F4F8FC] font-bold">{sampleCount.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="2000"
            max="30000"
            step="2000"
            value={sampleCount}
            onChange={(e) => setSampleCount(Number(e.target.value))}
            className="w-full accent-[#D6B675]"
          />
          <p className="text-[11px] text-[#A8BAC9] leading-tight">
            Higher N narrows the Wilson confidence interval and stabilizes extreme tail estimates.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#102A3D]/70 border border-[#29475A]/60 space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono block">
            3. Demand Level (&mu;_S)
          </span>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#A8BAC9]">Mean Live Load:</span>
            <span className="font-mono text-[#F4F8FC] font-bold">{meanS} kNm</span>
          </div>
          <input
            type="range"
            min="1400"
            max="3000"
            step="50"
            value={meanS}
            onChange={(e) => setMeanS(Number(e.target.value))}
            className="w-full accent-emerald-400"
          />
          <div className="text-[11px] text-[#A8BAC9]">
            Adjusting live load shifts the failure boundary into the tail.
          </div>
        </div>
      </div>

      {/* Visualizations: Histogram & Convergence Trace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Plot 1: Histogram of Outcomes */}
        <div className="p-4 rounded-lg bg-[#03121E] border border-[#29475A]/60">
          <div className="flex items-center justify-between text-xs mb-3 font-mono">
            <span className="flex items-center gap-1.5 text-[#56C7D8]">
              <BarChart3 className="w-3.5 h-3.5" /> Distribution of Safety Margin (Z)
            </span>
            <span className="text-rose-400 font-semibold">
              Failure Region (Z &lt; 0): {simulationResults.failCount} hits
            </span>
          </div>

          <svg viewBox="0 0 340 140" className="w-full h-36">
            <line x1="20" y1="120" x2="320" y2="120" stroke="#29475A" strokeWidth="1" />
            {simulationResults.bins.map((bin, i) => {
              const x = 25 + (i / simulationResults.bins.length) * 280;
              const barHeight = (bin.count / (simulationResults.maxBinCount || 1)) * 95;
              const y = 120 - barHeight;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width="7.5"
                  height={Math.max(1, barHeight)}
                  fill={bin.isFailure ? '#FB7185' : '#56C7D8'}
                  fillOpacity={bin.isFailure ? 0.9 : 0.6}
                  stroke={bin.isFailure ? '#E11D48' : '#22D3EE'}
                  strokeWidth="0.5"
                />
              );
            })}
          </svg>
          <div className="flex justify-between text-[10px] text-[#A8BAC9] font-mono mt-1 px-2">
            <span>Negative (Failure Z &lt; 0)</span>
            <span className="text-[#56C7D8]">Zero Margin</span>
            <span>Positive (Safe Z &gt; 0)</span>
          </div>
        </div>

        {/* Plot 2: Convergence of Pf */}
        <div className="p-4 rounded-lg bg-[#03121E] border border-[#29475A]/60">
          <div className="flex items-center justify-between text-xs mb-3 font-mono">
            <span className="flex items-center gap-1.5 text-[#D6B675]">
              <LineChart className="w-3.5 h-3.5" /> Convergence Trace of Estimated P_f
            </span>
            <span className="text-[#A8BAC9] text-[11px]">
              Final P_f = {(simulationResults.pf * 100).toFixed(3)}%
            </span>
          </div>

          <svg viewBox="0 0 340 140" className="w-full h-36">
            <line x1="25" y1="120" x2="320" y2="120" stroke="#29475A" strokeWidth="1" />
            {/* Target asymptote line */}
            <line
              x1="25"
              y1={120 - Math.min(100, simulationResults.pf * 100 * 8)}
              x2="320"
              y2={120 - Math.min(100, simulationResults.pf * 100 * 8)}
              stroke="#D6B675"
              strokeDasharray="2 2"
              strokeWidth="1"
            />
            {/* Convergence polyline */}
            <polyline
              points={simulationResults.convergenceTrace
                .map((pt, idx) => {
                  const x = 25 + (idx / (simulationResults.convergenceTrace.length - 1)) * 285;
                  const y = 120 - Math.min(105, pt.pf * 100 * 8);
                  return `${x.toFixed(1)},${y.toFixed(1)}`;
                })
                .join(' ')}
              fill="none"
              stroke="#56C7D8"
              strokeWidth="2"
            />
          </svg>
          <div className="flex justify-between text-[10px] text-[#A8BAC9] font-mono mt-1 px-2">
            <span>N = 1</span>
            <span>Stabilized Sampling</span>
            <span>N = {simulationResults.totalSamples.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Quantitative Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-[#102A3D] border border-[#29475A] font-mono">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A8BAC9] block">
            Estimated Failure P_f
          </span>
          <span className="text-xl font-bold text-[#F4F8FC] tabular-nums">
            {simulationResults.pf < 1e-4
              ? simulationResults.pf.toExponential(2)
              : simulationResults.pf.toFixed(5)}
          </span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A8BAC9] block">
            Equivalent &beta; Index
          </span>
          <span className="text-2xl font-bold text-[#56C7D8] tabular-nums">
            {simulationResults.beta.toFixed(2)}
          </span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A8BAC9] block">
            95% Wilson CI for P_f
          </span>
          <span className="text-xs font-semibold text-[#F4F8FC] block mt-1 tabular-nums">
            [{simulationResults.ciLower.toFixed(4)}, {simulationResults.ciUpper.toFixed(4)}]
          </span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A8BAC9] block">
            Standard Error (s_e)
          </span>
          <span className="text-xl font-bold text-[#F4F8FC] tabular-nums">
            {Math.sqrt(
              (simulationResults.pf * (1 - simulationResults.pf)) / simulationResults.totalSamples
            ).toExponential(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
