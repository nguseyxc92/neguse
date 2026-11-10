import React, { useState, useEffect } from 'react';
import { Moon, Sun, Search, FileDown, Menu, X } from 'lucide-react';
import { PageRoute } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { asset, CV_PDF } from '../../utils/assets';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenCommandPalette,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { route: PageRoute; label: string }[] = [
    { route: 'about', label: 'About' },
    { route: 'research', label: 'Research' },
    { route: 'lab', label: 'Lab' },
    { route: 'publications', label: 'Publications' },
    { route: 'projects', label: 'Projects' },
    { route: 'expertise', label: 'Expertise' },
    { route: 'journey', label: 'Journey' },
    { route: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#03121E]/95 dark:bg-[#03121E]/95 bg-white/95 backdrop-blur-md border-b border-[#29475A]/60 dark:border-[#29475A]/60 border-slate-200 shadow-sm py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Zone 1: Single element Brand Wordmark */}
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#56C7D8] rounded-md"
            aria-label="Neguse Solomon Mekonnen Homepage"
          >
            <img
              src={asset('images/logo.png')}
              alt="NSM Logo"
              className="w-8 h-8 rounded-sm object-contain bg-[#03121E] border border-[#29475A]"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-[#F4F8FC] dark:text-[#F4F8FC] text-slate-900 group-hover:text-[#56C7D8] transition-colors leading-tight">
                Neguse Solomon
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#A8BAC9] dark:text-[#A8BAC9] text-slate-500 leading-none">
                MSc &middot; Structural Reliability
              </span>
            </div>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive =
                currentRoute === link.route ||
                (link.route === 'research' && currentRoute === 'research-detail') ||
                (link.route === 'projects' && currentRoute === 'project-detail');
              return (
                <button
                  key={link.route}
                  onClick={() => onNavigate(link.route)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? 'text-[#56C7D8] font-semibold'
                      : 'text-[#A8BAC9] dark:text-[#A8BAC9] text-slate-600 hover:text-[#F4F8FC] dark:hover:text-[#F4F8FC] hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#56C7D8] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#A8BAC9] dark:text-[#A8BAC9] text-slate-600 hover:text-[#F4F8FC] bg-[#102A3D]/70 dark:bg-[#102A3D]/70 bg-slate-100 hover:bg-[#163448] border border-[#29475A]/60 dark:border-[#29475A]/60 border-slate-300 rounded-lg transition-colors font-mono"
              title="Search (Ctrl/Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-[#56C7D8]" />
              <span className="hidden md:inline">Search</span>
              <kbd className="text-[10px] bg-[#03121E]/60 dark:bg-[#03121E]/60 bg-white px-1.5 py-0.5 rounded border border-[#29475A]/60">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#A8BAC9] dark:text-[#A8BAC9] text-slate-600 hover:text-[#F4F8FC] hover:bg-[#102A3D] dark:hover:bg-[#102A3D] hover:bg-slate-100 border border-transparent hover:border-[#29475A]/60 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#D6B675]" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Download CV Action */}
            <a
              href={CV_PDF}
              download="Neguse_Solomon_Mekonnen_CV.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#03121E] bg-[#56C7D8] hover:bg-[#56C7D8]/90 rounded-lg transition-colors whitespace-nowrap shadow-sm shadow-[#56C7D8]/20"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>CV</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#A8BAC9] hover:text-[#F4F8FC] hover:bg-[#102A3D] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-black/70 backdrop-blur-sm pt-20 px-4 animate-in fade-in duration-150">
          <div className="bg-[#061B2B] dark:bg-[#061B2B] bg-white border border-[#29475A] rounded-xl p-4 shadow-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between pb-3 border-b border-[#29475A]/60">
              <span className="text-xs uppercase font-mono text-[#56C7D8]">Navigation</span>
              <button
                onClick={onOpenCommandPalette}
                className="flex items-center gap-1 text-xs text-[#A8BAC9] px-2 py-1 rounded bg-[#102A3D]"
              >
                <Search className="w-3 h-3 text-[#56C7D8]" /> Search
              </button>
            </div>
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => {
                  onNavigate(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentRoute === link.route
                    ? 'bg-[#102A3D] text-[#56C7D8] font-semibold'
                    : 'text-[#A8BAC9] dark:text-[#A8BAC9] text-slate-700 hover:bg-[#102A3D]/50 hover:text-[#F4F8FC]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-[#29475A]/60 flex gap-2">
              <a
                href={CV_PDF}
                download="Neguse_Solomon_Mekonnen_CV.pdf"
                className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#03121E] bg-[#56C7D8] rounded-lg"
              >
                <FileDown className="w-4 h-4" /> Download CV (PDF)
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
