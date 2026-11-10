import { AcademicCredential, Appointment } from '../types';

export const EDUCATION_CREDENTIALS: AcademicCredential[] = [
  {
    degree: 'MSc Erasmus Mundus Joint Master (NoRISK)',
    field: 'Risk Assessment and Management of Civil Infrastructures',
    institution: 'Universitat Politècnica de Catalunya (UPC BarcelonaTech) & Università degli Studi di Padova',
    location: 'Barcelona, Spain & Padova, Italy',
    period: 'Oct 2025 – Sep 2026',
    grade: 'MSc Dissertation Grade: Excellent / Distinction',
    status: 'Completed',
    description: 'Elite European Union Erasmus Mundus Joint Master program specialized in probabilistic infrastructure assessment, structural health monitoring, natural hazards, and quantitative risk management.',
    highlights: [
      'Master Thesis: "Bayesian Updating of Bridge Structural Reliability Using Monitoring Data, Stop Criteria, and Proof Load Testing: A Case Study of the Zijlweg Viaduct"',
      'Supervised by Dr. Eva Lantsoght (TU Delft / USFQ) and Dr. Rolando Chacón (UPC BarcelonaTech)',
      'Laurea Magistrale in Ingegneria Civile conferred by Università degli Studi di Padova (Credential ID: nt_EmFJXQ9qO70ddjZqjVQ)',
      'Selected as the global representative face of the NoRISK Master program by the university consortium',
    ],
    scholarshipOrHonor: 'Awarded prestigious Erasmus Mundus (EMJM) Full Consortium Scholarship (€10,000 tuition and comprehensive health coverage)',
  },
  {
    degree: 'BSc in Computer Science',
    field: 'Computer Science, Algorithms & Software Engineering',
    institution: 'University of the People',
    location: 'Pasadena, CA (Online / Global)',
    period: 'Sep 2024 – Jan 2027 (Expected)',
    grade: 'Academic Standing: Cum Laude',
    status: 'In Progress',
    description: 'Pursued concurrently as a deliberate, rigorous expansion of computational engineering, software architecture, algorithm design, data structures, and scientific computing capabilities.',
    highlights: [
      'Core focus: High-performance algorithms, system architecture, database systems, object-oriented software engineering, and scientific computing pipelines',
      'Directly informs the development of C++ numerical engines, WebAssembly pipelines, and full-stack engineering tools',
      'Served as official University Ambassador promoting accessible STEM education',
    ],
    scholarshipOrHonor: 'Awarded UoPeople Full Scholarship ($6,900 covering 100% of assessment fees throughout the entire degree program)',
  },
  {
    degree: 'BSc in Civil Engineering',
    field: 'Structural Engineering & Infrastructure Design',
    institution: 'Wollo University, Kombolcha Institute of Technology',
    location: 'Kombolcha, Ethiopia',
    period: 'Oct 2018 – Sep 2023',
    grade: 'First Class Honours (CGPA: 3.41 / 4.0)',
    status: 'Completed',
    description: 'Five-year intensive civil engineering curriculum covering structural mechanics, reinforced concrete design, steel structures, geotechnical engineering, hydraulic structures, and finite element modeling.',
    highlights: [
      'Graduated with Distinction and received Wollo University Leadership Excellence Award',
      'Undergraduate Thesis: "Structural Design and Performance Optimization of a Mixed-Use Building Integrating Sustainable Geopolymer Concrete via Building Information Modeling (BIM)"',
      'Appointed as undergraduate academic tutor and laboratory assistant starting in 3rd year—two years before degree completion',
      'Elected President of Ethiopian Civil Engineering Students Association (ECESA Wollo Chapter, 1,000+ members)',
    ],
    scholarshipOrHonor: 'Graduated with Distinction; Leadership Excellence Award (2023)',
  },
];

export const ACADEMIC_APPOINTMENTS: Appointment[] = [
  {
    role: 'Graduate Researcher — Structural Reliability',
    organization: 'Universitat Politècnica de Catalunya (UPC) / TU Delft Collaboration',
    location: 'Barcelona, Catalonia, Spain',
    period: 'Mar 2026 – Sep 2026',
    type: 'Research',
    responsibilities: [
      'Applied the De Vries et al. (2025) Bayesian reliability updating framework to full-scale monitoring data from the 2015 proof load test of Viaduct Zijlweg (first field application to an ASR-deteriorated bridge).',
      'Engineered cross-section analysis in C++ using Latin Hypercube Sampling (100 realisations), determining yield moment statistics: My,mean = 3,248.87 kNm, CoV = 0.137.',
      'Quantified a +1.85 reliability-index advantage of crack-width monitoring over the survival-only lower-bound approach at Step 3 shear.',
      'Demonstrated physical and mathematical consistency between mechanics-based stop criteria (CSCT/CSDT) and Bayesian posterior updates.',
      'Preprocessed multi-channel sensor data in MATLAB; executed MCMC simulations in C++ Release mode; generated publication figures and diagnostics in Python.',
    ],
  },
  {
    role: 'Lecturer — Structural Analysis & Computational Engineering',
    organization: 'Wollo University, Department of Civil Engineering',
    location: 'Kombolcha, Ethiopia',
    period: 'Sep 2023 – Present',
    type: 'Teaching',
    responsibilities: [
      'Deliver core undergraduate engineering lectures in Structural Analysis, Reinforced Concrete Design, and Computational Engineering software (ETABS, SAP2000, AutoCAD).',
      'Design academic curricula, lecture materials, and quantitative grading rubrics; maintained 90%+ student success rate across 200+ students per year.',
      'Mentor undergraduate senior thesis students from problem formulation through probabilistic modeling and finite element verification.',
    ],
  },
  {
    role: 'Research Assistant — Structural and Materials Testing Laboratory',
    organization: 'Wollo University, Department of Civil Engineering',
    location: 'Kombolcha, Ethiopia',
    period: 'Jan 2023 – Present',
    type: 'Research',
    responsibilities: [
      'Execute compressive, splitting tensile, and flexural tests on concrete, steel reinforcement, and natural pozzolan aggregates.',
      'Collect and calibrate load-deformation datasets used for empirical material models and probabilistic capacity formulations.',
      'Maintain continuous experimental involvement, including remote collaboration and testing during academic return visits.',
    ],
  },
  {
    role: 'Academic Tutor & Laboratory Assistant',
    organization: 'Wollo University, Department of Civil Engineering',
    location: 'Kombolcha, Ethiopia',
    period: 'Oct 2021 – Sep 2023',
    type: 'Teaching',
    responsibilities: [
      'Supported faculty professors in structural mechanics, soil mechanics, and matrix structural analysis for over 200 students annually.',
      'Authored laboratory tutorial manuals formally adopted into the departmental curriculum.',
    ],
  },
  {
    role: 'Founding Engineer',
    organization: 'Tebib Labs',
    location: 'Addis Ababa, Ethiopia',
    period: 'Oct 2026 – Present',
    type: 'Professional',
    responsibilities: [
      'Lead software engineering and applied R&D initiatives translating structural reliability theories and Bayesian updating algorithms into interactive web software and digital tools.',
    ],
  },
];

export const CERTIFICATIONS = [
  {
    title: 'Laurea Magistrale in Ingegneria Civile',
    issuer: 'Università degli Studi di Padova (Italy)',
    year: '2026',
    credentialId: 'nt_EmFJXQ9qO70ddjZqjVQ',
  },
  {
    title: 'Data Analytics and Digital Transformation',
    issuer: 'Arizona State University (ASU)',
    year: '2025',
  },
  {
    title: 'SAP2000 & SAFE Structural Engineering Certification',
    issuer: 'ECESA-WOU',
    year: '2023',
  },
  {
    title: 'Advanced AutoCAD Civil 3D & InRoads Certification',
    issuer: 'ECESA-WOU',
    year: '2022',
  },
  {
    title: 'Diploma in Project Management',
    issuer: 'Alison',
    year: '2023',
    credentialId: '1266-22777052',
  },
];

export const DEGREES = EDUCATION_CREDENTIALS;
export const APPOINTMENTS = ACADEMIC_APPOINTMENTS;

export interface HonorAward {
  year: string;
  title: string;
  grantor: string;
  description: string;
}

export const HONORS_AWARDS: HonorAward[] = [
  {
    year: '2025 – 2026',
    title: 'Erasmus Mundus Joint Master Scholarship (€10,000+)',
    grantor: 'European Education and Culture Executive Agency (EACEA)',
    description: 'Fully funded European Commission scholarship covering tuition, insurance, and mobility between UPC BarcelonaTech and Università di Padova for the NoRISK MSc.',
  },
  {
    year: '2024 – 2027',
    title: 'University of the People Full Degree Scholarship ($6,900)',
    grantor: 'University of the People',
    description: 'Full scholarship covering 100% of examination and degree assessment fees for the entire Bachelor of Science in Computer Science degree program.',
  },
  {
    year: '2023',
    title: 'Leadership Excellence & Departmental Distinction Award',
    grantor: 'Wollo University',
    description: 'Conferred at graduation for top academic achievement (CGPA 3.41/4.0 First Class Honours) and 2-year leadership as President of ECESA Wollo Chapter (1,000+ members).',
  },
  {
    year: '2021 – 2023',
    title: 'Early Undergraduate Academic Tutorship Appointment',
    grantor: 'Wollo University Department of Civil Engineering',
    description: 'Unprecedented appointment as department tutor and laboratory assistant 2 years prior to degree graduation.',
  },
];

export const PHD_RESEARCH_INTERESTS = [
  {
    topic: 'Bayesian Dynamic Updating & Proof Load Testing',
    description: 'Formulating joint mechanics-probabilistic models conditioning resistance tail distributions on field sensor data under non-linear concrete damage.',
  },
  {
    topic: 'Physics-Informed Surrogates for Digital Twins',
    description: 'Developing high-throughput deep neural operators and Gaussian process emulators for 1D/2D hydraulic and structural continuum simulations.',
  },
  {
    topic: 'Structural Reliability with Advanced MCMC / Subset Simulation',
    description: 'High-dimensional rare-event simulation, adaptive Kriging (AK-MCS), and global sensitivity analysis for deteriorating civil infrastructure.',
  },
  {
    topic: 'Lifecycle Resilience & Optimal Risk-Based Decision Making',
    description: 'Value of Information (VoI) frameworks determining optimal inspection and proof load test stopping decisions under deep epistemic uncertainty.',
  },
];
