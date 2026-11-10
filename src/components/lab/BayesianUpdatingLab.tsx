import React, { useState, useMemo } from 'react';
import { Plus, Trash2, RotateCcw, Info } from 'lucide-react';
import { KaTeXMath } from '../common/KaTeXMath';

export const BayesianUpdatingLab: React.FC = () => {
  // Prior parameters for structural yield moment / capacity (in kNm)
  const [priorMean, setPriorMean] = useState<number>(3000);
  const [priorStd, setPriorStd] = useState<number>(300);

  // Known observation measurement noise / standard deviation (sigma)
  const [measurementSigma, setMeasurementSigma] = useState<number>(180);

  // Array of observed test measurements (e.g. proof-load inferred capacities)
  const [observations, setObservations] = useState<number[]>([3250, 3320, 3290]);
  const [newObsInput, setNewObsInput] = useState<string>('3300');

  // Mathematical conjugate normal-normal calculations
  const { posteriorMean, posteriorStd, sampleMean, n, credibleLower, credibleUpper } = useMemo(() => {
    const count = observations.length;
    if (count === 0) {
      return {
        posteriorMean: priorMean,
        posteriorStd: priorStd,
        sampleMean: priorMean,
        n: 0,
        credibleLower: priorMean - 1.96 * priorStd,
        credibleUpper: priorMean + 1.96 * priorStd,
      };
    }

    const sMean = observations.reduce((a, b) => a + b, 0) / count;
    const priorPrecision = 1 / (priorStd * priorStd);
    const dataPrecision = count / (measurementSigma * measurementSigma);
    const postPrecision = priorPrecision + dataPrecision;
    const postVariance = 1 / postPrecision;
    const postStd = Math.sqrt(postVariance);
    const postMean = postVariance * (priorPrecision * priorMean + dataPrecision * sMean);

    return {
      posteriorMean: postMean,
      posteriorStd: postStd,
      sampleMean: sMean,
      n: count,
      credibleLower: postMean - 1.96 * postStd,
      credibleUpper: postMean + 1.96 * postStd,
    };
  }, [priorMean, priorStd, measurementSigma, observations]);

  const addObservation = () => {
    const val = parseFloat(newObsInput);
    if (!isNaN(val) && val > 0) {
      setObservations((prev) => [...prev, val]);
      setNewObsInput('');
    }
  };

  const removeObservation = (idx: number) => {
    setObservations((prev) => prev.filter((_, i) => i !== idx));
  };

  const resetObservations = () => {
    setObservations([3250, 3320, 3290]);
    setPriorMean(3000);
    setPriorStd(300);
    setMeasurementSigma(180);
  };

  // Generate SVG curve points for Prior, Likelihood (scaled), and Posterior
  const chartData = useMemo(() => {
    const center = posteriorMean;
    const minX = center - 4.5 * priorStd;
    const maxX = center + 4.5 * priorStd;
    const range = maxX - minX;

    const normPDF = (x: number, m: number, s: number) => {
      const z = (x - m) / s;
      return (1 / (s * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
    };

    const maxDens = Math.max(
      normPDF(priorMean, priorMean, priorStd),
      normPDF(posteriorMean, posteriorMean, posteriorStd)
    );

    const width = 680;
    const height = 180;
    const padding = 20;

    const priorPts: string[] = [];
    const postPts: string[] = [];
    const likePts: string[] = [];

    for (let i = 0; i <= 120; i++) {
      const xVal = minX + (i / 120) * range;
      const xPix = padding + (i / 120) * (width - 2 * padding);

      const yPrior = height - padding - (normPDF(xVal, priorMean, priorStd) / maxDens) * (height - 2 * padding);
      priorPts.push(`${xPix.toFixed(1)},${yPrior.toFixed(1)}`);

      const yPost = height - padding - (normPDF(xVal, posteriorMean, posteriorStd) / maxDens) * (height - 2 * padding);
      postPts.push(`${xPix.toFixed(1)},${yPost.toFixed(1)}`);

      if (n > 0) {
        const yLike = height - padding - (normPDF(xVal, sampleMean, measurementSigma / Math.sqrt(n)) / maxDens) * (height - 2 * padding);
        likePts.push(`${xPix.toFixed(1)},${yLike.toFixed(1)}`);
      }
    }

    return {
      priorPath: priorPts.join(' '),
      postPath: postPts.join(' '),
      likePath: likePts.join(' '),
      width,
      height,
      minX,
      maxX,
    };
  }, [priorMean, priorStd, posteriorMean, posteriorStd, sampleMean, measurementSigma, n]);

  return (
    <div className="rounded-xl bg-[#061B2B] dark:bg-[#061B2B] bg-white border border-[#29475A] p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#29475A]/60 gap-3">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
            Demonstration B &middot; Bayesian Evidence Integration
          </span>
          <h3 className="text-lg font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900">
            Conjugate Normal-Normal Bayesian Updating Explorer
          </h3>
        </div>
        <button
          onClick={resetObservations}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#A8BAC9] hover:text-[#F4F8FC] bg-[#102A3D] rounded-lg border border-[#29475A] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Demo
        </button>
      </div>

      {/* Explanation Banner */}
      <div className="my-4 p-4 rounded-lg bg-[#03121E] border border-[#29475A]/60 text-xs">
        <div className="flex items-center gap-2 text-[#56C7D8] font-semibold mb-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>Educational Conjugate Model vs Research-Grade MCMC</span>
        </div>
        <p className="text-[#A8BAC9] leading-relaxed mb-3">
          This educational demonstrator implements a mathematically exact conjugate normal-normal updating
          model to illustrate how experimental monitoring data progressively concentrates certainty
          and shifts parameter estimates. In the full Zijlweg bridge research, the non-linear limit states and
          survival events require 100M-sample MCMC sampling in C++.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 border-y border-[#29475A]/40 text-center">
          <div>
            <span className="text-[11px] font-mono text-[#A8BAC9]">Posterior Precision:</span>
            <KaTeXMath math="\frac{1}{\sigma_n^2} = \frac{1}{\sigma_0^2} + \frac{n}{\sigma^2}" block />
          </div>
          <div>
            <span className="text-[11px] font-mono text-[#A8BAC9]">Posterior Mean:</span>
            <KaTeXMath math="\mu_n = \sigma_n^2 \left(\frac{\mu_0}{\sigma_0^2} + \frac{n\bar{y}}{\sigma^2}\right)" block />
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
        {/* Prior Controls */}
        <div className="p-4 rounded-lg bg-[#102A3D]/70 border border-[#29475A]/60 space-y-3">
          <span className="text-xs font-bold text-[#D6B675] uppercase tracking-wider font-mono block">
            Prior Knowledge (&mu;_0, &sigma;_0)
          </span>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#A8BAC9]">Prior Mean (&mu;_0):</span>
              <span className="font-mono text-[#F4F8FC]">{priorMean} kNm</span>
            </div>
            <input
              type="range"
              min="2400"
              max="3600"
              step="50"
              value={priorMean}
              onChange={(e) => setPriorMean(Number(e.target.value))}
              className="w-full accent-[#D6B675]"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#A8BAC9]">Prior Uncertainty (&sigma;_0):</span>
              <span className="font-mono text-[#F4F8FC]">{priorStd} kNm</span>
            </div>
            <input
              type="range"
              min="100"
              max="600"
              step="20"
              value={priorStd}
              onChange={(e) => setPriorStd(Number(e.target.value))}
              className="w-full accent-[#D6B675]"
            />
          </div>
        </div>

        {/* Sensor Noise */}
        <div className="p-4 rounded-lg bg-[#102A3D]/70 border border-[#29475A]/60 space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono block">
            Sensor Characteristics (&sigma;)
          </span>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#A8BAC9]">Sensor Noise (&sigma;):</span>
              <span className="font-mono text-[#F4F8FC]">{measurementSigma} kNm</span>
            </div>
            <input
              type="range"
              min="60"
              max="400"
              step="20"
              value={measurementSigma}
              onChange={(e) => setMeasurementSigma(Number(e.target.value))}
              className="w-full accent-emerald-400"
            />
          </div>
          <p className="text-[11px] text-[#A8BAC9] leading-tight">
            Lower sensor noise increases the weight of new experimental evidence relative to prior beliefs.
          </p>
        </div>

        {/* Observation Management */}
        <div className="p-4 rounded-lg bg-[#102A3D]/70 border border-[#29475A]/60 space-y-3">
          <span className="text-xs font-bold text-[#56C7D8] uppercase tracking-wider font-mono block">
            Observed Data (n = {n})
          </span>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="e.g. 3350"
              value={newObsInput}
              onChange={(e) => setNewObsInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addObservation()}
              className="w-full px-2.5 py-1 text-xs bg-[#03121E] border border-[#29475A] rounded text-[#F4F8FC] font-mono focus:outline-none focus:border-[#56C7D8]"
            />
            <button
              onClick={addObservation}
              className="px-2.5 py-1 text-xs font-semibold bg-[#56C7D8] text-[#03121E] rounded hover:bg-[#56C7D8]/90 transition-colors shrink-0 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pt-1">
            {observations.map((obs, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#03121E] border border-[#29475A] text-xs font-mono text-[#F4F8FC]"
              >
                {obs}
                <button
                  onClick={() => removeObservation(idx)}
                  className="text-rose-400 hover:text-rose-300 ml-1"
                  aria-label="Remove observation"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Multi-Distribution Visualizer */}
      <div className="p-4 rounded-lg bg-[#03121E] border border-[#29475A]/60 mb-6">
        <div className="flex flex-wrap justify-between items-center text-xs mb-2 gap-2">
          <div className="flex items-center gap-4 font-mono">
            <span className="flex items-center gap-1.5 text-[#D6B675]">
              <span className="w-2.5 h-0.5 bg-[#D6B675] inline-block" /> Prior Distribution
            </span>
            {n > 0 && (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-0.5 bg-emerald-400 border-dashed border-b inline-block" /> Likelihood (Normalized)
              </span>
            )}
            <span className="flex items-center gap-1.5 text-[#56C7D8]">
              <span className="w-2.5 h-1 bg-[#56C7D8] inline-block" /> Posterior Distribution
            </span>
          </div>
          <span className="text-[11px] text-[#A8BAC9] font-mono">
            Variance Reduction: {(((priorStd - posteriorStd) / priorStd) * 100).toFixed(1)}%
          </span>
        </div>

        <svg viewBox={`0 0 ${chartData.width} ${chartData.height}`} className="w-full h-44 overflow-visible">
          {/* Baseline */}
          <line
            x1="20"
            y1={chartData.height - 20}
            x2={chartData.width - 20}
            y2={chartData.height - 20}
            stroke="#29475A"
            strokeWidth="1"
          />

          {/* Prior curve */}
          <polyline
            points={chartData.priorPath}
            fill="none"
            stroke="#D6B675"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Likelihood curve */}
          {n > 0 && (
            <polyline
              points={chartData.likePath}
              fill="none"
              stroke="#34D399"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              strokeOpacity="0.8"
            />
          )}

          {/* Posterior curve with subtle area fill */}
          <polygon
            points={`20,${chartData.height - 20} ${chartData.postPath} ${chartData.width - 20},${chartData.height - 20}`}
            fill="#56C7D8"
            fillOpacity="0.2"
          />
          <polyline
            points={chartData.postPath}
            fill="none"
            stroke="#56C7D8"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {/* Numerical Bayesian Summaries */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-[#102A3D] border border-[#29475A] font-mono">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A8BAC9] block">
            Posterior Mean (&mu;_n)
          </span>
          <span className="text-xl font-bold text-[#56C7D8] tabular-nums">
            {posteriorMean.toFixed(1)}{' '}
            <span className="text-xs text-[#A8BAC9] font-normal">kNm</span>
          </span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A8BAC9] block">
            Posterior Std (&sigma;_n)
          </span>
          <span className="text-xl font-bold text-[#F4F8FC] tabular-nums">
            {posteriorStd.toFixed(1)}{' '}
            <span className="text-xs text-[#A8BAC9] font-normal">kNm</span>
          </span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A8BAC9] block">
            95% Credible Interval
          </span>
          <span className="text-xs font-semibold text-[#F4F8FC] block mt-1 tabular-nums">
            [{credibleLower.toFixed(0)}, {credibleUpper.toFixed(0)}] kNm
          </span>
        </div>

        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#A8BAC9] block">
            Sample Mean (\bar&#123;y&#125;)
          </span>
          <span className="text-xl font-bold text-[#F4F8FC] tabular-nums">
            {n > 0 ? `${sampleMean.toFixed(1)} kNm` : 'None'}
          </span>
        </div>
      </div>
    </div>
  );
};
