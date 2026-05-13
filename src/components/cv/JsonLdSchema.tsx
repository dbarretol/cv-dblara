import { useEffect } from "react";

interface CvItem {
  title?: string;
  org?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  summary?: string;
  bullets?: string[];
  tags?: string[];
  isVisible?: boolean;
}

interface SectionData {
  id: string;
  title: string;
  items: CvItem[];
  isVisible?: boolean;
}

interface Profile {
  name: string;
  title: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  summary?: string;
}

interface JsonLdSchemaProps {
  profile: Profile;
  sections: SectionData[];
}

const JsonLdSchema = ({ profile, sections }: JsonLdSchemaProps) => {
  // Extract skills from "skills" section
  const skillsSection = sections.find((s) => s.id === "skills");
  const allSkills = skillsSection
    ? skillsSection.items.flatMap((item) => item.tags || [])
    : [];

  // Extract education
  const educationSection = sections.find((s) => s.id === "education");
  const alumniOf = educationSection
    ? educationSection.items.map((item) => ({
        "@type": "EducationalOrganization",
        name: item.org,
        location: {
          "@type": "PostalAddress",
          addressLocality: item.location,
        },
      }))
    : [];

  // Extract experience
  const experienceSection = sections.find((s) => s.id === "experience");
  const hasOccupation = experienceSection
    ? experienceSection.items.map((item) => ({
        "@type": "Occupation",
        name: item.title,
        mainEntityOfPage: item.org,
        description: item.summary,
      }))
    : [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email ? `mailto:${profile.email}` : undefined,
    telephone: profile.phone && profile.phone.includes("@") ? undefined : profile.phone,
    url: profile.website,
    image: "https://raw.githubusercontent.com/dbarretol/dbl-bucket/refs/heads/main/images/icon_32.png",
    description: profile.summary,
    address: profile.location
      ? { "@type": "PostalAddress", addressLocality: profile.location }
      : undefined,
    sameAs: [profile.linkedin, profile.github, profile.website].filter(Boolean),
    knowsAbout: allSkills.length > 0 ? allSkills : [
      "Artificial Intelligence",
      "Renewable Energy",
      "Maintenance Management",
      "Machine Learning",
      "Data Science",
    ],
    alumniOf,
    hasOccupation,
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "person-jsonld";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById("person-jsonld");
      if (el) el.remove();
    };
  }, [schema]);

  return null;
};

export default JsonLdSchema;
