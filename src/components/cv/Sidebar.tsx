import { useState, useEffect } from "react";
import {
  Briefcase, FolderOpen, GraduationCap, Award, Code, Globe,
  BookOpen, Trophy, Users, Book, Menu, X, ChevronRight
} from "lucide-react";

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  briefcase: Briefcase,
  folder: FolderOpen,
  "graduation-cap": GraduationCap,
  award: Award,
  code: Code,
  globe: Globe,
  "book-open": BookOpen,
  trophy: Trophy,
  users: Users,
  book: Book,
};

interface Section {
  id: string;
  title: string;
  icon?: string;
}

interface SidebarProps {
  sections: Section[];
  activeSection: string;
}

const Sidebar = ({ sections, activeSection }: SidebarProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-card border border-border shadow-md hover:bg-secondary transition-colors"
        aria-label={open ? "Cerrar navegación" : "Abrir navegación"}
      >
        {open ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <nav
        className={`fixed top-0 left-0 z-40 h-full w-64 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "hsl(var(--sidebar-background))" }}
        role="navigation"
        aria-label="Navegación del CV"
      >
        <div className="pt-16 px-2">
          <p
            className="px-4 pb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "hsl(var(--sidebar-primary))" }}
          >
            Secciones
          </p>
          <ul className="space-y-0.5">
            {sections.map((s) => {
              const Icon = s.icon ? iconMap[s.icon] : ChevronRight;
              const isActive = activeSection === s.id;
              return (
                <li key={s.id}>
                  <button
                    onClick={() => handleClick(s.id)}
                    className={`sidebar-link w-full text-left flex items-center gap-3 ${isActive ? "active" : ""}`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                    <span>{s.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
