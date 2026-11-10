import React, { useState, useMemo } from 'react';
import { RefreshCw, Info } from 'lucide-react';
import { KaTeXMath } from '../common/KaTeXMath';

// Cumulative normal distribution function approximation
function normalCDF(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x) / Math.SQRT2;

  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

  return 0.5 * (1.0 + sign * y);
}

export const ReliabilityCalculator: React.FC = () => {
  // Inputs: Resistance R and Load S
  const [meanR, setMeanR] = useState<number>(3250); // kNm (matching Zijlweg mean capacity)
  const [covR, setCovR] = useState<number>(0.137); // matching Zijlweg CoV
  const [meanS, setMeanS] = useState<number>(1650); // kNm (matching annual traffic demand)
  const [covS, setCovS] = useState<number>(0.10);

  const resetDefaults = () => {
    setMeanR(3250);
    setCovR(0.137);
    setMeanS(1650);
    setCovS(0.10);
  };

  const stdR = meanR * covR;
  const stdS = meanS * covS;

  // Safety margin Z = R - S
  const meanZ = meanR - meanS;
  const stdZ = Math.sqrt(stdR * stdR + stdS * stdS);

  // Reliability index beta and failure probability Pf
  const beta = stdZ > 0 ? meanZ / stdZ : 0;
  const pf = normalCDF(-beta);

  // Code benchmarks
  const eurocodeTarget50 = 3.8;
  const dutchTargetDisapprovalAnnual = 4.0;
  const dutchTargetNewAnnual = 4.7;

  // Generate SVG curve points for R, S, and Z
  const chartPoints = useMemo(() => {
    const minVal = Math.min(meanS - 3.5 * stdS, 0);
    const maxVal = Math.max(meanR + 3.5 * stdR, 4500);
    const range = maxVal - minVal;

    const rPoints: string[] = [];
    const sPoints: string[] = [];

    const normPDF = (x: number, m: number, s: number) => {
      const z = (x - m) / s;
      return (1 / (s * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
    };

    // Find peak height for scaling
    const peakS = normPDF(meanS, meanS, stdS);
    const peakR = normPDF(meanR, meanR, stdR);
    const maxDensity = Math.max(peakS, peakR);

    const width = 680;
    const height = 180;
    const padding = 20;

    for (let i = 0; i <= 100; i++) {
      const xVal = minVal + (i / 100) * range;
      const xPixel = padding + (i / 100) * (width - 2 * padding);

      const densR = normPDF(xVal, meanR, stdR);
      const yPixelR = height - padding - (densR / maxDensity) * (height - 2 * padding);
      rPoints.push(`${xPixel.toFixed(1)},${yPixelR.toFixed(1)}`);

      const densS = normPDF(xVal, meanS, stdS);
      const yPixelS = height - padding - (densS / maxDensity) * (height - 2 * padding);
      sPoints.push(`${xPixel.toFixed(1)},${yPixelS.toFixed(1)}`);
    }

    return {
      rPath: rPoints.join(' '),
      sPath: sPoints.join(' '),
      minVal,
      maxVal,
      width,
      height,
    };
  }, [meanR, stdR, meanS, stdS]);

  return (
    <div className="rounded-xl bg-[#061B2B] dark:bg-[#061B2B] bg-white border border-[#29475A] p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#29475A]/60 gap-3">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
            Demonstration A &middot; Fundamental Reliability Theory
          </span>
          <h3 className="text-lg font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
            Classical Reliability Index &amp; Limit State Solver
          </h3>
        </div>
        <button
          onClick={resetDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#A8BAC9] hover:text-[#F4F8FC] bg-[#102A3D] rounded-lg border border-[#29475A] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Case Study Values
        </button>
      </div>

      {/* Model Formulation Callout */}
      <div className="my-4 p-4 rounded-lg bg-[#03121E] dark:bg-[#03121E] bg-slate-50 border border-[#29475A]/60 text-xs">
        <div className="flex items-center gap-2 text-[#56C7D8] font-semibold mb-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>Analytical Model (Independent Normal Resistance &amp; Load Effect)</span>
        </div>
        <p className="text-[#A8BAC9] leading-relaxed mb-3">
          For a linear limit state <KaTeXMath math="Z = R - S" /> where resistance{' '}
          <KaTeXMath math="R \sim \mathcal{N}(\mu_R, \sigma_R^2)" /> and load effect{' '}
          <KaTeXMath math="S \sim \mathcal{N}(\mu_S, \sigma_S^2)" />, failure occurs when{' '}
          <KaTeXMath math="Z < 0" />:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 border-y border-[#29475A]/40 text-center">
          <div>
            <span className="text-[11px] font-mono text-[#A8BAC9]">Reliability Index:</span>
            <KaTeXMath math="\beta = \frac{\mu_R - \mu_S}{\sqrt{\sigma_R^2 + \sigma_S^2}}" block />
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#A8BAC9]">Probability of Failure:</span>
            <KaTeXMath math="P_f = \Phi(-\beta)" block />
          </div>
        </div>
      </div>

      {/* Parameter Controls & Numeric Readouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Resistance R Controls */}
        <div className="p-4 rounded-lg bg-[#102A3D]/70 dark:bg-[#102A3D]/70 bg-slate-100 border border-[#29475A]/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#56C7D8] uppercase tracking-wider font-mono">
              Structural Resistance (R)
            </span>
            <span className="text-xs font-mono text-[#A8BAC9]">
              &sigma;_R = {stdR.toFixed(1)} kNm
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A8BAC9]">Mean Capacity (&mu;_R):</span>
                <span className="font-mono font-semibold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
                  {meanR} kNm
                </span>
              </div>
              <input
                type="range"
                min="1800"
                max="4500"
                step="50"
                value={meanR}
                onChange={(e) => setMeanR(Number(e.target.value))}
                className="w-full accent-[#56C7D8] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A8BAC9]">Coefficient of Variation (CoV_R):</span>
                <span className="font-mono font-semibold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
                  {(covR * 100).toFixed(1)} %
                </span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.25"
                step="0.005"
                value={covR}
                onChange={(e) => setCovR(Number(e.target.value))}
                className="w-full accent-[#56C7D8] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Load Effect S Controls */}
        <div className="p-4 rounded-lg bg-[#102A3D]/70 dark:bg-[#102A3D]/70 bg-slate-100 border border-[#29475A]/60">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#D6B675] uppercase tracking-wider font-mono">
              Load Effect Demand (S)
            </span>
            <span className="text-xs font-mono text-[#A8BAC9]">
              &sigma;_S = {stdS.toFixed(1)} kNm
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A8BAC9]">Mean Demand (&mu;_S):</span>
                <span className="font-mono font-semibold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
                  {meanS} kNm
                </span>
              </div>
              <input
                type="range"
                min="800"
                max="3200"
                step="50"
                value={meanS}
                onChange={(e) => setMeanS(Number(e.target.value))}
                className="w-full accent-[#D6B675] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-[#A8BAC9]">Coefficient of Variation (CoV_S):</span>
                <span className="font-mono font-semibold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
                  {(covS * 100).toFixed(1)} %
                </span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.25"
                step="0.005"
                value={covS}
                onChange={(e) => setCovS(Number(e.target.value))}
                className="w-full accent-[#D6B675] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SVG Distribution Plot */}
      <div className="p-4 rounded-lg bg-[#03121E] border border-[#29475A]/60 mb-6">
        <div className="flex justify-between items-center text-xs mb-2">
          <div className="flex items-center gap-4 font-mono">
            <span className="flex items-center gap-1.5 text-[#D6B675]">
              <span className="w-2.5 h-0.5 bg-[#D6B675] inline-block" /> Load Effect Demand S
            </span>
            <span className="flex items-center gap-1.5 text-[#56C7D8]">
              <span className="w-2.5 h-0.5 bg-[#56C7D8] inline-block" /> Resistance Capacity R
            </span>
          </div>
          <span className="text-[11px] text-[#A8BAC9] font-mono">Overlap area &prop; Probability of Failure</span>
        </div>

        <svg viewBox={`0 0 ${chartPoints.width} ${chartPoints.height}`} className="w-full h-44 overflow-visible">
          {/* Baseline */}
          <line
            x1="20"
            y1={chartPoints.height - 20}
            x2={chartPoints.width - 20}
            y2={chartPoints.height - 20}
            stroke="#29475A"
            strokeWidth="1"
          />

          {/* Load curve S */}
          <polygon
            points={`20,${chartPoints.height - 20} ${chartPoints.sPath} ${chartPoints.width - 20},${chartPoints.height - 20}`}
            fill="#D6B675"
            fillOpacity="0.2"
          />
          <polyline
            points={chartPoints.sPath}
            fill="none"
            stroke="#D6B675"
            strokeWidth="2"
          />

          {/* Resistance curve R */}
          <polygon
            points={`20,${chartPoints.height - 20} ${chartPoints.rPath} ${chartPoints.width - 20},${chartPoints.height - 20}`}
            fill="#56C7D8"
            fillOpacity="0.2"
          />
          <polyline
            points={chartPoints.rPath}
            fill="none"
            stroke="#56C7D8"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Output Results Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-[#102A3D] border border-[#29475A] font-mono">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A8BAC9] block">
            Mean Safety Margin
          </span>
          <span className="text-xl font-bold text-[#F4F8FC] tabular-nums">
            {meanZ.toFixed(1)}{' '}
            <span className="text-xs text-[#A8BAC9] font-normal">kNm</span>
          </span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A8BAC9] block">
            Reliability Index (&beta;)
          </span>
          <span
            className={`text-2xl font-bold tabular-nums ${
              beta >= dutchTargetDisapprovalAnnual
                ? 'text-emerald-400'
                : beta >= eurocodeTarget50
                ? 'text-yellow-400'
                : 'text-rose-400'
            }`}
          >
            {beta.toFixed(2)}
          </span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A8BAC9] block">
            Failure Prob (P_f)
          </span>
          <span className="text-xl font-bold text-[#F4F8FC] tabular-nums">
            {pf < 1e-6 ? pf.toExponential(2) : pf.toFixed(6)}
          </span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A8BAC9] block">
            Eurocode Target Status
          </span>
          <span
            className={`text-xs font-semibold block mt-1 ${
              beta >= dutchTargetNewAnnual
                ? 'text-emerald-400'
                : beta >= dutchTargetDisapprovalAnnual
                ? 'text-cyan-400'
                : 'text-rose-400'
            }`}
          >
            {beta >= dutchTargetNewAnnual
              ? 'Exceeds New Build (\u03B2 \u2265 4.7)'
              : beta >= dutchTargetDisapprovalAnnual
              ? 'Satisfies Disapproval (\u03B2 \u2265 4.0)'
              : 'Insufficient (< 4.0)'}
          </span>
        </div>
      </div>
    </div>
  );
};
