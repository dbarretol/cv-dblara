import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

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

const ProfileHeader = ({ profile }: { profile: Profile }) => {
  const personalItems = [
    { icon: Mail, value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, value: profile.phone, href: `tel:${profile.phone}` },
    { icon: MapPin, value: profile.location },
  ].filter((c) => c.value);

  const socialItems = [
    { icon: Linkedin, value: "LinkedIn", href: profile.linkedin },
    { icon: Github, value: "GitHub", href: profile.github },
    { icon: Globe, value: "Web", href: profile.website },
  ].filter((c) => c.value);

  return (
    <header className="mb-10 pb-8 border-b-2 border-primary text-center" itemScope itemType="https://schema.org/Person">
      <h1
        className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-1"
        style={{ fontFamily: "var(--font-serif)" }}
        itemProp="name"
      >
        {profile.name}
      </h1>
      <p className="text-xl text-muted-foreground mb-4" style={{ fontFamily: "var(--font-serif)" }} itemProp="jobTitle">
        {profile.title}
      </p>

      <address className="not-italic">
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {personalItems.map((item, i) => {
            const Icon = item.icon;
            const content = (
              <span className="inline-flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {item.value}
              </span>
            );
            return item.href ? (
              <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label={item.value}>{content}</a>
            ) : (
              <span key={i} itemProp="address">{content}</span>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-5 text-sm text-muted-foreground">
          {socialItems.map((item, i) => {
            const Icon = item.icon;
            const content = (
              <span className="inline-flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                {item.value}
              </span>
            );
            return (
              <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label={item.value} itemProp="sameAs">{content}</a>
            );
          })}
        </div>
      </address>

      {profile.summary && (
        <p className="text-base leading-relaxed text-foreground max-w-3xl mx-auto" itemProp="description">{profile.summary}</p>
      )}
    </header>
  );
};

export default ProfileHeader;
