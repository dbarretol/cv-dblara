import { ExternalLink } from "lucide-react";

interface CvItem {
  title?: string;
  org?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  summary?: string;
  bullets?: string[];
  tags?: string[];
  image?: string;
  links?: { label: string; url: string }[];
  isVisible?: boolean;
}

interface SectionData {
  id: string;
  title: string;
  items: CvItem[];
  isVisible?: boolean;
}

const CvSection = ({ section }: { section: SectionData }) => {
  if (section.isVisible === false) return null;

  const visibleItems = (section.items || []).filter((item) => item.isVisible !== false);
  if (visibleItems.length === 0) return null;

  return (
    <section id={section.id} className="mb-12 scroll-mt-20" aria-label={section.title}>
      <h2 className="section-title">{section.title}</h2>

      <div className="space-y-6">
        {visibleItems.map((item, i) => (
          <article key={i} className="flex gap-4">
            {/* Optional image */}
            {item.image && (
              <div className="flex-shrink-0 w-12 h-12 mt-1">
                <img
                  src={item.image}
                  alt={`${item.org || item.title} logo`}
                  className="w-12 h-12 object-contain rounded-sm bg-card border border-border p-1"
                  loading="lazy"
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              {/* Title row */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                {item.title && <h3 className="cv-item-title">{item.title}</h3>}
                {(item.startDate || item.endDate) && (
                  <span className="cv-item-date whitespace-nowrap">
                    {item.startDate}
                    {item.endDate && ` – ${item.endDate}`}
                  </span>
                )}
              </div>

              {/* Org & location */}
              {(item.org || item.location) && (
                <p className="cv-item-org">
                  {item.org}
                  {item.location && <span className="not-italic text-muted-foreground"> · {item.location}</span>}
                </p>
              )}

              {/* Summary */}
              {item.summary && (
                <p className="text-sm text-foreground mt-1 leading-relaxed">{item.summary}</p>
              )}

              {/* Bullets */}
              {item.bullets && item.bullets.length > 0 && (
                <ul className="mt-2 space-y-1 text-sm text-foreground list-disc list-outside ml-4">
                  {item.bullets.map((b, j) => (
                    <li key={j} className="leading-relaxed">{b}</li>
                  ))}
                </ul>
              )}

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap">
                  {item.tags.map((tag, j) => (
                    <span key={j} className="cv-tag">{tag}</span>
                  ))}
                </div>
              )}

              {/* Links */}
              {item.links && item.links.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-3">
                  {item.links.map((link, j) => (
                    <a
                      key={j}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CvSection;
