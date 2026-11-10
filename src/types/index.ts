export type PageRoute =
  | 'home'
  | 'about'
  | 'research'
  | 'research-detail'
  | 'lab'
  | 'publications'
  | 'projects'
  | 'project-detail'
  | 'expertise'
  | 'journey'
  | 'cv'
  | 'contact';

export interface ResearchCaseStudy {
  id: string;
  title: string;
  shortTitle: string;
  category: 'Structural Reliability' | 'Digital Twins' | 'Sustainable Materials' | 'Multi-Hazard Risk' | 'Forensic Engineering';
  status: 'Completed MSc Dissertation' | 'Preprint (Under Review)' | 'Published Conference Paper' | 'Journal Manuscript in Prep' | 'Undergraduate Thesis';
  year: number;
  featured: boolean;
  abstract: string;
  researchQuestion: string;
  engineeringProblem: string;
  context: string;
  methods: string[];
  computationalStack: string[];
  keyFindings: string[];
  limitations: string[];
  researchSignificance: string;
  supervisorsOrCollaborators?: string[];
  doi?: string;
  researchGateUrl?: string;
  githubUrl?: string;
  paperPdf?: string;
  targetVenue?: string;
  metrics?: {
    label: string;
    value: string;
    caption: string;
  }[];
}

export interface PublicationItem {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  type: 'Conference Paper' | 'Preprint' | 'MSc Dissertation' | 'Manuscript in Preparation';
  status: string;
  doi?: string;
  url?: string;
  pdfUrl?: string;
  abstract: string;
  keywords: string[];
  bibtex: string;
}

export interface SoftwareProject {
  id: string;
  name: string;
  tagline: string;
  role: string;
  repoUrl: string;
  liveUrl?: string;
  techStack: string[];
  architectureOverview: string;
  engineeringProblem: string;
  implementationHighlights: string[];
  technicalDecisions: string[];
  status: 'Active Open Source' | 'Production R&D' | 'Research Prototype';
  limitations: string[];
  license: string;
}

export interface AcademicCredential {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  status: 'Completed' | 'In Progress';
  description: string;
  highlights: string[];
  scholarshipOrHonor?: string;
}

export interface Appointment {
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'Research' | 'Teaching' | 'Professional';
  responsibilities: string[];
}
