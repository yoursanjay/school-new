import Image from "next/image";

export type SchoolExperience = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  imageAlt: string;
};

type SchoolExperienceCardProps = {
  experience: SchoolExperience;
  isOpen: boolean;
  onActivate: () => void;
};

export default function SchoolExperienceCard({
  experience,
  isOpen,
  onActivate,
}: SchoolExperienceCardProps) {
  return (
    <button
      type="button"
      className={`school-experience-card ${isOpen ? "is-open" : ""}`.trim()}
      style={{ width: isOpen ? "32%" : "16%" }}
      aria-pressed={isOpen}
      onMouseEnter={onActivate}
      onFocus={onActivate}
    >
      <span className="school-experience-visual" aria-hidden="true">
        <Image
          src={experience.image}
          alt={experience.imageAlt}
          fill
          sizes="(max-width: 1100px) 50vw, 25vw"
          priority={isOpen}
        />
      </span>
      <span className="school-experience-visual-glow" aria-hidden="true" />
      <span className="school-experience-copy">
        <span className="school-experience-eyebrow">{experience.eyebrow}</span>
        <span className="school-experience-title">{experience.title}</span>
        <span className="school-experience-description">
          {experience.description}
        </span>
        <span className="school-experience-cta">
          {experience.cta} <span aria-hidden="true">→</span>
        </span>
      </span>
    </button>
  );
}
