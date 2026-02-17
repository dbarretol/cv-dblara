import { useState, useEffect, useCallback, useMemo } from "react";
import cvData from "@/data/cv.json";
import ProfileHeader from "@/components/cv/ProfileHeader";
import CvSection from "@/components/cv/CvSection";
import Sidebar from "@/components/cv/Sidebar";
import PdfDownloadButton from "@/components/cv/PdfDownloadButton";
import JsonLdSchema from "@/components/cv/JsonLdSchema";

const Index = () => {
  const { profile, sections } = cvData;

  // Filter visible sections (and sections with at least one visible item)
  const visibleSections = useMemo(
    () =>
      sections.filter((s) => {
        if (s.isVisible === false) return false;
        const hasVisibleItems = (s.items || []).some((item) => item.isVisible !== false);
        return hasVisibleItems;
      }),
    [sections]
  );

  const [activeSection, setActiveSection] = useState(visibleSections[0]?.id || "");

  const handleScroll = useCallback(() => {
    const offsets = visibleSections.map((s) => {
      const el = document.getElementById(s.id);
      return { id: s.id, top: el ? el.getBoundingClientRect().top : Infinity };
    });
    const current = offsets.reduce((closest, cur) =>
      Math.abs(cur.top - 80) < Math.abs(closest.top - 80) ? cur : closest
    );
    setActiveSection(current.id);
  }, [visibleSections]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-background">
      <JsonLdSchema profile={profile} />

      <Sidebar
        sections={visibleSections.map((s) => ({ id: s.id, title: s.title, icon: s.icon }))}
        activeSection={activeSection}
      />

      <PdfDownloadButton />

      <main id="cv-content" className="max-w-3xl mx-auto px-6 py-12 md:py-16" role="main">
        <ProfileHeader profile={profile} />

        {sections.map((section) => (
          <CvSection key={section.id} section={section} />
        ))}

        <footer className="mt-16 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>Última actualización: Febrero 2026</p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
