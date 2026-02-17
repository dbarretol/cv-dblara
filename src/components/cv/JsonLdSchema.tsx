import { useEffect } from "react";

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

const JsonLdSchema = ({ profile }: { profile: Profile }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    email: profile.email ? `mailto:${profile.email}` : undefined,
    telephone: profile.phone,
    url: profile.website,
    description: profile.summary,
    address: profile.location
      ? { "@type": "PostalAddress", addressLocality: profile.location }
      : undefined,
    sameAs: [profile.linkedin, profile.github, profile.website].filter(Boolean),
    knowsAbout: [
      "Cloud Computing",
      "Data Engineering",
      "Machine Learning",
      "Azure",
      "Google Cloud",
      "Apache Spark",
      "Databricks",
      "Python",
      "Terraform",
    ],
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
  }, []);

  return null;
};

export default JsonLdSchema;
