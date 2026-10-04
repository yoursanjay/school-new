const contactDetails = {
  phone: "+91 90470 77677",
  phoneHref: "tel:+919047077677",
  email: "info@school.edu",
  address: "Keelamathur, Melakkal Main Road, Madurai – 625016, Tamil Nadu",
  whatsappHref: "https://wa.me/919047077677",
};

const footerGroups = [
  {
    title: "SCHOOL",
    links: [
      { label: "About", href: "/garden#about" },
      { label: "Academics", href: "/garden#academics" },
      { label: "Campus", href: "/garden#facilities" },
      { label: "Student Life", href: "/garden#student-life" },
    ],
  },
  {
    title: "ADMISSIONS",
    links: [
      { label: "Admissions", href: "/garden#admissions" },
      { label: "Enquire Now", href: "/garden#contact" },
      { label: "Visit Campus", href: "/garden#facilities" },
      { label: "FAQs", href: "#faq" },
    ],
  },
  {
    title: "COMMUNITY",
    links: [
      { label: "School Journal", href: "#journal" },
      { label: "Events", href: "/garden#gallery" },
      { label: "Gallery", href: "/garden#gallery" },
      { label: "Testimonials", href: "#community" },
    ],
  },
];

export default function SchoolFooter() {
  return (
    <footer id="school-footer" className="school-footer">
      <div className="school-section-shell">
        <div className="school-footer-cta">
          <div>
            <p className="school-eyebrow school-eyebrow-light">
              YOUR NEXT CHAPTER
            </p>
            <h2 className="school-serif">Begin the journey</h2>
          </div>
          <div className="school-footer-cta-copy">
            <p>
              Discover a school where curiosity becomes confidence and every
              student is encouraged to grow.
            </p>
            <div>
              <a className="school-footer-primary" href="/garden#admissions">
                Explore admissions <span aria-hidden="true">↗</span>
              </a>
              <a className="school-footer-secondary" href="/garden#contact">
                Contact our school
              </a>
            </div>
          </div>
        </div>

        <div className="school-footer-links">
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="school-mono">{group.title}</h3>
              <ul>
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <address className="school-footer-contact">
            <h3 className="school-mono">CONTACT</h3>
            <ul>
              <li>
                <a href={contactDetails.phoneHref}>{contactDetails.phone}</a>
              </li>
              <li>
                <a href={`mailto:${contactDetails.email}`}>
                  {contactDetails.email}
                </a>
              </li>
              <li>{contactDetails.address}</li>
              <li>
                <a href={contactDetails.whatsappHref}>WhatsApp</a>
              </li>
            </ul>
          </address>
        </div>

        <div className="school-footer-bottom school-mono">
          <span>SAM UNIVERSAL SCHOOL</span>
          <span>Excellence · Community · Growth</span>
          <span>© 2026 All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
