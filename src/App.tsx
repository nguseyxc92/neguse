import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/common/CommandPalette';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ResearchPage } from './pages/ResearchPage';
import { ResearchDetailPage } from './pages/ResearchDetailPage';
import { LabPage } from './pages/LabPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ExpertisePage } from './pages/ExpertisePage';
import { JourneyPage } from './pages/JourneyPage';
import { CVPage } from './pages/CVPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [detailId, setDetailId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Synchronize routing with window hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setCurrentPage('home');
        setDetailId(null);
        return;
      }

      if (hash.startsWith('research/')) {
        const id = hash.replace('research/', '');
        setCurrentPage('research-detail');
        setDetailId(id);
      } else if (hash.startsWith('projects/')) {
        const id = hash.replace('projects/', '');
        setCurrentPage('project-detail');
        setDetailId(id);
      } else {
        const validRoutes: PageRoute[] = [
          'home', 'about', 'research', 'research-detail', 'lab',
          'publications', 'projects', 'project-detail', 'expertise',
          'journey', 'cv', 'contact'
        ];
        if (validRoutes.includes(hash as PageRoute)) {
          setCurrentPage(hash as PageRoute);
          setDetailId(null);
        } else {
          setCurrentPage('home');
          setDetailId(null);
        }
      }
    };

    // Initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: PageRoute, id?: string) => {
    if (page === 'research-detail' && id) {
      window.location.hash = `research/${id}`;
    } else if (page === 'project-detail' && id) {
      window.location.hash = `projects/${id}`;
    } else {
      window.location.hash = page === 'home' ? '' : page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'research':
        return <ResearchPage onNavigate={navigateTo} />;
      case 'research-detail':
        return (
          <ResearchDetailPage
            studyId={detailId || 'zijlweg-viaduct'}
            onNavigate={navigateTo}
          />
        );
      case 'lab':
        return <LabPage onNavigate={navigateTo} />;
      case 'publications':
        return <PublicationsPage onNavigate={navigateTo} />;
      case 'projects':
        return <ProjectsPage onNavigate={navigateTo} />;
      case 'project-detail':
        return (
          <ProjectDetailPage
            projectId={detailId || 'zijlweg-bayesian-reliability'}
            onNavigate={navigateTo}
          />
        );
      case 'expertise':
        return <ExpertisePage onNavigate={navigateTo} />;
      case 'journey':
        return <JourneyPage onNavigate={navigateTo} />;
      case 'cv':
        return <CVPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-[#061B2B] text-slate-800 dark:text-slate-100 transition-colors duration-200">
        {/* Top Navigation Bar */}
        <Navbar
          currentRoute={currentPage}
          onNavigate={(route: PageRoute) => navigateTo(route)}
          onOpenCommandPalette={() => setIsSearchOpen(true)}
        />

        {/* Global Quick Search (Cmd + K) */}
        <CommandPalette
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={(page: PageRoute, id?: string) => navigateTo(page, id)}
        />

        {/* Main Page Content */}
        <main className="flex-1 w-full">
          {renderCurrentPage()}
        </main>

        {/* Unified Editorial Footer */}
        <Footer onNavigate={(route: PageRoute) => navigateTo(route)} />
      </div>
    </ThemeProvider>
  );
}
