# Neguse Solomon Mekonnen — Personal Website

Academic and engineering portfolio of **Neguse Solomon Mekonnen**: civil and software engineer, structural reliability researcher.

**Live site:** https://neguse.netlify.app/

---

## About

Research and software portfolio focused on probabilistic assessment and uncertainty quantification of existing civil infrastructure. It brings together publications, research case studies, software projects and a CV, with interactive tools that let visitors explore the methods behind the work.

## Pages

| Page | Content |
| :--- | :--- |
| Home | Introduction, key metrics, interactive Zijlweg Viaduct explorer, featured work |
| About | Background, research interests and approach |
| Research | Case studies: Zijlweg Viaduct Bayesian reliability updating, culvert surrogate digital twin, geopolymer concrete assessment |
| Lab | Interactive tools: Bayesian updating, reliability index calculator, Monte Carlo simulation |
| Publications | Papers, thesis and research output with abstracts, keywords and BibTeX |
| Projects | Software and engineering projects, including Tebib Labs |
| Expertise | Methods, programming languages and engineering software |
| Journey | Education, appointments, honors and affiliations |
| CV | Structured CV, embedded PDF viewer and downloads |
| Contact | Email and professional profile links |

Also included: dark and light theme, a quick-search command palette (`Ctrl/Cmd + K`), and LaTeX-rendered equations.

## Tech Stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS v4
- Motion (animations), KaTeX (equations), Lucide (icons)
- Hash-based routing (`/#/research`), so the site works on any static host

## Getting Started

```bash
npm install      # install dependencies
npm run dev      # development server at http://localhost:3000
npm run lint     # TypeScript type check
npm run build    # production build into /dist
npm run preview  # preview the production build
```

## Project Structure

```
public/
  files/        CV and thesis PDFs
  images/       logo and portrait
src/
  components/   layout, home, research, lab and common components
  data/         research, publications, projects, journey and expertise content
  pages/        one file per page
  utils/        asset path helpers
archive/        profile exports kept for reference (not deployed)
```

## Updating the CV

Replace `public/files/Neguse_Solomon_Mekonnen_CV.pdf` with the new file, keeping the same name, then push. The download buttons on the home page, navigation bar and CV page all use that file.

## Deployment

### GitHub Pages
1. Push to the `main` branch.
2. In the repository open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds and publishes the site on every push.

> If **Source** is set to "Deploy from a branch", the page will be blank, because the browser cannot run the raw source files. It must be GitHub Actions.

### Netlify
Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`).

Asset paths are relative and routing is hash-based, so the same build works on GitHub Pages, Netlify and a custom domain without extra configuration.

## Contact

- Email: negusesolomon948@gmail.com
- LinkedIn: [linkedin.com/in/negusesolomon](https://linkedin.com/in/negusesolomon)
- GitHub: [github.com/nguseyxc92](https://github.com/nguseyxc92)
- ORCID: [0009-0009-8145-4007](https://orcid.org/0009-0009-8145-4007)

© Neguse Solomon Mekonnen. All rights reserved.
