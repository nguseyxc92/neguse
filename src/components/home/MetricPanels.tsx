import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageRoute } from '../../types';

interface MetricPanelsProps {
  onNavigate: (route: PageRoute, detailId?: string) => void;
}

export const MetricPanels: React.FC<MetricPanelsProps> = ({ onNavigate }) => {
  const metrics = [
    {
      value: '100M',
      displayValue: '100 Million',
      unit: 'MCMC Samples / Load Step',
      title: 'High-Performance Sampling',
      explanation:
        'C++ Metropolis-Hastings MCMC implementation solving joint posterior resistance distributions across 5 proof load levels in Release mode.',
      attribution: 'Zijlweg Viaduct Bayesian Reliability Framework',
      route: 'research-detail' as PageRoute,
      detailId: 'zijlweg-viaduct',
    },
    {
      value: '+1.85',
      displayValue: '+1.85',
      unit: 'Reliability Index Units (\u0394\u03B2)',
      title: 'Monitoring Advantage',
      explanation:
        'Quantified advantage of crack-width monitoring (\u03B2_after = 3.81) over the uninstrumented survival-only lower bound (\u03B2_lower = 1.96) at Step 3 shear.',
      attribution: 'Viaduct Zijlweg Proof Load Test Shear Evaluation',
      route: 'research-detail' as PageRoute,
      detailId: 'zijlweg-viaduct',
    },
    {
      value: '5.33',
      displayValue: '5.33',
      unit: 'Annual Reliability Index (\u03B2_after)',
      title: 'Posterior Bending Safety',
      explanation:
        'Demonstrated annual structural reliability for flexure after full proof load (3,029 kNm), substantially exceeding the \u03B2 = 4.7 target for new structures.',
      attribution: 'MSc Dissertation, UPC Barcelona / UniPD (2026)',
      route: 'research-detail' as PageRoute,
      detailId: 'zijlweg-viaduct',
    },
    {
      value: '8,000\u00D7',
      displayValue: '8,000\u00D7',
      unit: 'Computational Acceleration',
      title: 'Neural Surrogate Speedup',
      explanation:
        'Five-network neural ensemble reproducing dynamic-wave EPA SWMM flood volumes with R\u00B2 = 0.998 on 72,000 simulated nodes across the Jemo\u2013Lancha corridor.',
      attribution: 'Culvert Surrogate Digital Twin Research (Addis Ababa)',
      route: 'research-detail' as PageRoute,
      detailId: 'culvert-digital-twin',
    },
  ];

  return (
    <section className="relative z-10 py-12 border-y border-[#29475A]/50 bg-[#061B2B]/60 dark:bg-[#061B2B]/60 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs uppercase font-mono tracking-widest text-[#56C7D8]">
              Empirical &amp; Numerical Evidence
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 mt-1">
              Key Quantitative Research Benchmarks
            </h2>
          </div>
          <p className="text-xs text-[#A8BAC9] dark:text-[#A8BAC9] text-slate-500 max-w-md">
            All metrics reflect documented peer-reviewed calculations, verified field sensor data,
            and reproducible open-source simulation pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-5 rounded-xl bg-[#102A3D]/80 dark:bg-[#102A3D]/80 bg-white border border-[#29475A]/60 dark:border-[#29475A]/60 border-slate-200 hover:border-[#56C7D8]/60 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 font-mono tracking-tight tabular-nums">
                    {m.displayValue}
                  </span>
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#56C7D8] font-semibold mb-3">
                  {m.unit}
                </div>
                <h3 className="text-sm font-semibold text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 mb-1.5">
                  {m.title}
                </h3>
                <p className="text-xs text-[#A8BAC9] dark:text-[#A8BAC9] text-slate-600 leading-relaxed">
                  {m.explanation}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#29475A]/40 dark:border-[#29475A]/40 border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-[#A8BAC9] dark:text-[#A8BAC9] text-slate-500 font-mono truncate max-w-[180px]">
                  {m.attribution}
                </span>
                <button
                  onClick={() => onNavigate(m.route, m.detailId)}
                  className="inline-flex items-center text-xs font-semibold text-[#56C7D8] hover:text-[#F4F8FC] transition-colors gap-1 group-hover:translate-x-0.5"
                  aria-label={`Inspect source for ${m.title}`}
                >
                  Inspect
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
