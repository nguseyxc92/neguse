// Resolves files in /public so they work on any host or sub-path
// (GitHub Pages repo path, Netlify, custom domain).
export const asset = (path: string): string =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const CV_PDF = asset('files/Neguse_Solomon_Mekonnen_CV.pdf');
export const THESIS_PDF = asset('files/Mekonnen_2026_Zijlweg_Viaduct_Reliability.pdf');
