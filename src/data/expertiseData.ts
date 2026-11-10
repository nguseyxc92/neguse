export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Primary Research Focus" | "Core Competency" | "Applied Production"
    researchContext: string;
  }[];
}

export const EXPERTISE_CATEGORIES: SkillCategory[] = [
  {
    category: 'Scientific Programming & Numerical Computing',
    description: 'High-performance scientific computing, statistical modeling, data acquisition pipelines, and simulation tooling.',
    skills: [
      {
        name: 'C++ (C++17/20)',
        level: 'Primary Research Focus',
        researchContext: 'Architected high-throughput Metropolis-Hastings MCMC sampling core generating 100M iterations per load step for the Zijlweg viaduct reliability update.',
      },
      {
        name: 'Python (NumPy, SciPy, pandas, Matplotlib)',
        level: 'Primary Research Focus',
        researchContext: 'Developed Monte Carlo simulation engines for geopolymer concrete LCA and dynamic convergence diagnostics (Gelman-Rubin statistic, trace plots).',
      },
      {
        name: 'MATLAB',
        level: 'Core Competency',
        researchContext: 'Wrote automated preprocessing scripts to calibrate, zero-correct, and filter 36-channel raw field monitoring sensor files (.mat/.xls) from proof load tests.',
      },
    ],
  },
  {
    category: 'Computational & Probabilistic Methods',
    description: 'Mathematical frameworks for quantifying risk, modeling uncertainty, and updating structural knowledge from physical evidence.',
    skills: [
      {
        name: 'Bayesian Inference & Updating',
        level: 'Primary Research Focus',
        researchContext: 'Conditioned prior resistance models on non-linear monitoring evidence (strains and crack widths) and proof-load survival events.',
      },
      {
        name: 'Metropolis-Hastings MCMC',
        level: 'Primary Research Focus',
        researchContext: 'Sampled complex joint posterior probability density functions for bridge resistance and multi-variable load effect uncertainties.',
      },
      {
        name: 'Monte Carlo & Latin Hypercube Sampling (LHS)',
        level: 'Core Competency',
        researchContext: 'Applied 100-sample LHS for non-linear cross-section capacity and 72,000 parameter spaces for hydraulic digital twin surrogates.',
      },
      {
        name: 'Uncertainty Quantification & Limit-State Modeling',
        level: 'Primary Research Focus',
        researchContext: 'Modeled ultimate limit states (bending and shear) with JCSS probabilistic models and Eurocode reliability indices.',
      },
      {
        name: 'Sobol Global Sensitivity Analysis',
        level: 'Core Competency',
        researchContext: 'Decomposed variance in culvert flood volumes across uncertain rainfall, Manning roughness, and progressive siltation envelopes.',
      },
    ],
  },
  {
    category: 'Software Engineering & Web Systems',
    description: 'Translating mathematical formulations into production software architectures, interactive tools, and data systems.',
    skills: [
      {
        name: 'TypeScript & JavaScript',
        level: 'Applied Production',
        researchContext: 'Authored type-safe interactive scientific computing dashboards and laboratory demonstrators with rigorous numerical constraints.',
      },
      {
        name: 'React & Modern Frontend Architecture',
        level: 'Applied Production',
        researchContext: 'Architected responsive scientific visualization interfaces and component-driven engineering systems for Tebib Labs.',
      },
      {
        name: 'Node.js & API Integration',
        level: 'Applied Production',
        researchContext: 'Engineered data pipeline servers, file processing microservices, and client-side background Web Worker computation threads.',
      },
      {
        name: 'Tailwind CSS & Scientific Data UI',
        level: 'Applied Production',
        researchContext: 'Designed accessible dark-mode telemetry themes, mathematical notation layouts, and responsive technical portals.',
      },
    ],
  },
  {
    category: 'Structural Mechanics & Infrastructure Assessment',
    description: 'Physical behavior of reinforced concrete, material degradation, full-scale experimental testing, and structural health monitoring.',
    skills: [
      {
        name: 'Proof Load Testing & Level IV Assessment',
        level: 'Primary Research Focus',
        researchContext: 'Evaluated full-scale proof load protocols up to 1,342 kN on the Zijlweg viaduct to overcome conservative analytical ratings.',
      },
      {
        name: 'Mechanics-Based Stop Criteria (CSCT & CSDT)',
        level: 'Primary Research Focus',
        researchContext: 'Implemented Critical Shear Crack Theory and Critical Shear Displacement Theory traffic-light criteria on field LVDT crack sensors.',
      },
      {
        name: 'Alkali-Silica Reaction (ASR) Assessment',
        level: 'Primary Research Focus',
        researchContext: 'Investigated the ASR Prestressing Paradox: why real reinforcement restraint enhances capacity beyond code reduction penalties.',
      },
      {
        name: 'Nonlinear Cross-Section Analysis',
        level: 'Core Competency',
        researchContext: 'Formulated section models using the Thorenfeldt concrete compression curve, plain bar steel plasticity, and multi-layer reinforcement.',
      },
    ],
  },
  {
    category: 'Engineering Analysis & BIM Software',
    description: 'Industry-standard finite element, structural design, and Building Information Modeling software suites.',
    skills: [
      {
        name: 'ETABS & SAP2000',
        level: 'Core Competency',
        researchContext: 'Performed 3D linear and nonlinear dynamic frame analyses, seismic drift checks, and modal evaluations; taught university undergrads.',
      },
      {
        name: 'SAFE',
        level: 'Core Competency',
        researchContext: 'Modeled complex foundation mat systems and post-tensioned / reinforced concrete two-way slab deflections.',
      },
      {
        name: 'Autodesk Revit & AutoCAD Civil 3D',
        level: 'Applied Production',
        researchContext: 'BIM structural coordination, geometric highway alignment, earthwork cut-and-fill balancing, and parametric reinforcement detailing.',
      },
      {
        name: 'EPA SWMM 5',
        level: 'Applied Research',
        researchContext: 'Automated 1D/2D dynamic-wave hydraulic routing through PySWMM for urban box culvert digital twin modeling.',
      },
    ],
  },
  {
    category: 'Geospatial Analysis & Multi-Hazard Risk',
    description: 'Geographic information systems and spatial prioritization models for natural and technological hazards.',
    skills: [
      {
        name: 'QGIS & ArcGIS',
        level: 'Core Competency',
        researchContext: 'Developed spatial vulnerability layers across 248 buildings exposed to seismic, inundation, extreme wind, and structural fire hazards.',
      },
      {
        name: 'Multi-Criteria Retrofit Prioritization',
        level: 'Core Competency',
        researchContext: 'Formulated normalized multi-hazard risk indices (0–1.0) presented at the 22nd International Probabilistic Workshop (IPW 2026).',
      },
    ],
  },
];
