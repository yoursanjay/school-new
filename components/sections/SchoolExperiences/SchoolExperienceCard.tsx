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
  index: number;
  offset: number;
  totalCount: number;
  onActivate: () => void;
};

export default function SchoolExperienceCard({
  experience,
  isOpen,
  index,
  offset,
  totalCount,
  onActivate,
}: SchoolExperienceCardProps) {
  const depth = Math.abs(offset);

  return (
    <button
      id={`school-experience-${index}`}
      type="button"
      role="option"
      aria-selected={isOpen}
      className={`school-experience-card ${isOpen ? "is-open" : ""}`.trim()}
      style={{
        width: isOpen ? "42%" : "18%",
        transform: `translate3d(${offset * 34}px, ${isOpen ? -4 : 0}px, 0) rotate(${offset * 5.5}deg) scale(${isOpen ? 1 : 0.92})`,
        zIndex: totalCount - depth,
      }}
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
