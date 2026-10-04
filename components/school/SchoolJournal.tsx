import Image from "next/image";

const stories = [
  {
    category: "ACADEMICS",
    title: "Learning beyond the classroom",
    description:
      "How curiosity, collaboration, and hands-on experiences help students turn knowledge into understanding.",
    date: "12 SEP 2026",
    image: "/images/school/classroom.jpg",
    imageAlt: "Students learning together in a bright classroom",
    href: "/garden#academics",
  },
  {
    category: "CAMPUS LIFE",
    title: "A day shaped by discovery",
    description:
      "From morning classrooms to shared spaces, explore the experiences that make everyday school life meaningful.",
    date: "05 SEP 2026",
    image: "/images/school/students.jpg",
    imageAlt: "Students sharing a moment at school",
    href: "/garden#student-life",
  },
  {
    category: "ACHIEVEMENT",
    title: "Celebrating every student's journey",
    description:
      "Recognising the dedication, creativity, confidence, and growth of our students.",
    date: "28 AUG 2026",
    image: "/images/school/arts.jpg",
    imageAlt: "Students taking part in a school arts event",
    href: "/garden#gallery",
  },
];

export default function SchoolJournal() {
  return (
    <section id="journal" className="school-journal">
      <div className="school-section-shell">
        <header className="school-journal-header">
          <div>
            <p className="school-eyebrow">SCHOOL JOURNAL</p>
            <h2 className="school-serif school-section-title">
              Stories from our school
            </h2>
          </div>
          <p className="school-section-intro">
            Discover the moments, achievements, ideas, and experiences that
            shape our school community.
          </p>
        </header>

        <div className="school-journal-rule" />

        <div className="school-journal-grid">
          {stories.map((story) => (
            <article className="school-story" key={story.category}>
              <a className="school-story-image" href={story.href} tabIndex={-1}>
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw"
                />
              </a>
              <div className="school-story-meta school-mono">
                <span>{story.category}</span>
                <time>{story.date}</time>
              </div>
              <h3 className="school-serif">{story.title}</h3>
              <p className="school-story-description">{story.description}</p>
              <a className="school-story-link" href={story.href}>
                Read story <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
