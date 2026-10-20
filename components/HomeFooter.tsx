import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";

const discoverLinks = [
  { label: "About Us", href: "/garden#about" },
  { label: "Academics", href: "/garden#academics" },
  { label: "School Life", href: "/garden#student-life" },
];

const exploreLinks = [
  { label: "Admissions", href: "/garden#admissions" },
  { label: "Gallery", href: "/garden#gallery" },
  { label: "Learning Beyond One Campus", href: "/garden#facilities" },
];

export default function HomeFooter() {
  return (
    <footer className="home-footer" aria-label="School footer">
      <div className="home-footer__grid-pattern" aria-hidden="true" />
      <div className="home-footer__circle home-footer__circle--one" aria-hidden="true" />
      <div className="home-footer__circle home-footer__circle--two" aria-hidden="true" />

      <div className="home-footer__container">
        <div className="home-footer__main">
          <section className="home-footer__contact-card" aria-labelledby="home-footer-contact-title">
            <span className="home-footer__label" id="home-footer-contact-title">Reach us</span>
            <Link className="home-footer__school-mark" href="/" aria-label="Sri Aurobindo Mira Universal School home">
              <Image
                src="/img/logo.png"
                alt="Sri Aurobindo Mira Universal School"
                width={800}
                height={400}
                sizes="160px"
              />
            </Link>

            <div className="home-footer__contact-list">
              <a href="tel:+919047077677">
                <Phone aria-hidden="true" />
                <span>+91 90470 77677</span>
              </a>
              <a href="mailto:info@school.edu">
                <Mail aria-hidden="true" />
                <span>info@school.edu</span>
              </a>
              <a href="https://maps.google.com/?q=Sri+Aurobindo+Mira+Universal+School+Madurai">
                <MapPin aria-hidden="true" />
                <span>Keelamathur, Melakkal Main Road, Madurai – 625016, Tamil Nadu</span>
              </a>
            </div>
          </section>

          <section className="home-footer__story" aria-labelledby="home-footer-story-title">
            <p className="home-footer__eyebrow">SRI AUROBINDO MIRA UNIVERSAL SCHOOL</p>
            <h2 id="home-footer-story-title">Nurturing Young Minds,<br />Shaping Bright Futures.</h2>

            <div className="home-footer__link-groups">
              <nav aria-label="Discover">
                <h3>Discover</h3>
                <ul>
                  {discoverLinks.map(({ label, href }) => (
                    <li key={label}><a href={href}>{label}</a></li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Explore">
                <h3>Explore</h3>
                <ul>
                  {exploreLinks.map(({ label, href }) => (
                    <li key={label}><a href={href}>{label}</a></li>
                  ))}
                </ul>
              </nav>
            </div>
          </section>

          <div className="home-footer__student-art" aria-hidden="true">
            <Image
              src="/img/footerimg.png"
              alt=""
              width={1672}
              height={941}
              sizes="(max-width: 480px) 280px, (max-width: 760px) 340px, (max-width: 1240px) 440px, 500px"
              className="object-contain"
            />
          </div>
        </div>

        <div className="home-footer__bottom">
          <p>© {new Date().getFullYear()} Sri Aurobindo Mira Universal School. All rights reserved.</p>
          <div className="home-footer__bottom-links">
            <a href="mailto:info@school.edu?subject=Privacy%20Policy">Privacy Policy</a>
            <a href="mailto:info@school.edu?subject=Terms%20of%20Use">Terms of Use</a>
            <a className="home-footer__top-link" href="#hero">
              Back to top <ArrowUp aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .home-footer {
          position: relative;
          isolation: isolate;
          min-height: 760px;
          overflow: hidden;
          background: #1B2633;
          color: #f5f0e5;
        }

        .home-footer__grid-pattern {
          position: absolute;
          inset: 0;
          z-index: -3;
          opacity: 0.22;
          background-image:
            linear-gradient(rgba(146, 180, 151, 0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(146, 180, 151, 0.16) 1px, transparent 1px);
          background-size: 46px 46px;
          mask-image: linear-gradient(90deg, black, transparent 90%);
        }

        .home-footer__circle {
          position: absolute;
          z-index: -2;
          border: 1px solid rgba(184, 205, 159, 0.18);
          border-radius: 50%;
          pointer-events: none;
        }

        .home-footer__circle--one {
          top: -230px;
          right: 17%;
          width: 520px;
          height: 520px;
        }

        .home-footer__circle--two {
          top: -150px;
          right: 22%;
          width: 360px;
          height: 360px;
        }

        .home-footer__container {
          position: relative;
          z-index: 1;
          width: min(1280px, calc(100% - 72px));
          margin: 0 auto;
          padding: 88px 0 28px;
        }

        .home-footer__main {
          position: relative;
          display: grid;
          grid-template-columns: minmax(250px, 0.85fr) minmax(400px, 1.25fr) minmax(420px, 1.45fr);
          align-items: stretch;
          gap: clamp(28px, 3.2vw, 44px);
          min-height: 520px;
        }

        .home-footer__contact-card {
          position: relative;
          align-self: start;
          padding: 34px 30px 32px;
          border: 1px solid rgba(212, 218, 171, 0.2);
          border-radius: 5px;
          background: #123e34;
          box-shadow: 0 18px 36px rgba(2, 19, 15, 0.2);
        }

        .home-footer__label {
          position: absolute;
          top: -13px;
          left: 25px;
          padding: 5px 12px;
          background: #e2bc45;
          color: #173b2e;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          line-height: 1;
          text-transform: uppercase;
        }

        .home-footer__school-mark {
          display: inline-flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          color: #fffaf0;
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.2;
          text-decoration: none;
        }

        .home-footer__school-mark img {
          flex: 0 0 160px;
          width: 160px;
          height: auto;
          object-fit: contain;
        }

        .home-footer__contact-list {
          display: flex;
          flex-direction: column;
          gap: 17px;
          margin-top: 38px;
        }

        .home-footer__contact-list a {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          color: rgba(245, 240, 229, 0.8);
          font-size: 0.86rem;
          line-height: 1.5;
          text-decoration: none;
        }

        .home-footer__contact-list a:hover,
        .home-footer__link-groups a:hover,
        .home-footer__bottom a:hover { color: #f0ca57; }

        .home-footer__contact-list svg {
          flex: 0 0 17px;
          width: 17px;
          height: 17px;
          margin-top: 2px;
          color: #e2bc45;
          stroke-width: 1.7;
        }

        .home-footer__story {
          position: relative;
          z-index: 2;
          max-width: none;
          padding: 16px 0 22px;
        }

        .home-footer__eyebrow {
          margin: 0 0 16px;
          color: #e2bc45;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          line-height: 1.3;
          text-transform: uppercase;
        }

        .home-footer__story h2 {
          margin: 0;
          color: #fffaf0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(2.35rem, 3.2vw, 3.15rem);
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1.04;
        }

        .home-footer__link-groups {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 40px;
          margin-top: 34px;
        }

        .home-footer__link-groups h3 {
          margin: 0 0 18px;
          color: #e2bc45;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .home-footer__link-groups ul {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .home-footer__link-groups a {
          color: rgba(245, 240, 229, 0.75);
          font-size: 0.9rem;
          line-height: 1.4;
          text-decoration: none;
          transition: color 160ms ease;
        }

        .home-footer__student-art {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          align-self: end;
          justify-self: end;
          width: min(100%, 500px);
          min-height: 100%;
          pointer-events: none;
        }

        .home-footer__student-art img {
          display: block;
          width: min(100%, 500px);
          height: auto;
          object-fit: contain;
          object-position: bottom center;
        }

        .home-footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(205, 220, 181, 0.24);
          color: rgba(245, 240, 229, 0.58);
          font-size: 0.76rem;
          line-height: 1.5;
        }

        .home-footer__bottom p { margin: 0; }
        .home-footer__bottom-links {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 21px;
        }

        .home-footer__bottom a {
          color: rgba(245, 240, 229, 0.68);
          text-decoration: none;
          transition: color 160ms ease;
        }

        .home-footer__top-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #e2bc45 !important;
          font-weight: 700;
        }

        .home-footer__top-link svg { width: 14px; height: 14px; }

        @media (max-width: 1240px) {
          .home-footer__main {
            grid-template-columns: minmax(240px, 0.9fr) minmax(0, 1.1fr);
            gap: 32px;
            min-height: 520px;
          }
          .home-footer__contact-card { grid-column: 1; grid-row: 1 / span 2; align-self: center; }
          .home-footer__story { grid-column: 2; }
          .home-footer__story h2 { font-size: clamp(2.45rem, 5vw, 3.5rem); }
          .home-footer__student-art {
            grid-column: 2;
            width: min(100%, 440px);
          }
        }

        @media (max-width: 760px) {
          .home-footer { min-height: 0; }
          .home-footer__container {
            width: min(560px, calc(100% - 40px));
            padding-top: 64px;
          }
          .home-footer__main {
            display: flex;
            flex-direction: column;
            gap: 48px;
            min-height: 0;
          }
          .home-footer__contact-card { width: 100%; box-sizing: border-box; }
          .home-footer__story { max-width: none; padding: 0; }
          .home-footer__story h2 { font-size: clamp(2rem, 8.2vw, 3.2rem); }
          .home-footer__link-groups { margin-top: 38px; gap: 28px; }
          .home-footer__student-art {
            justify-self: center;
            width: min(100%, 400px);
            margin-top: 0;
          }
          .home-footer__bottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 15px;
            margin-top: 30px;
          }
          .home-footer__bottom-links { justify-content: flex-start; gap: 13px 18px; }
        }

        @media (max-width: 480px) {
          .home-footer__container { width: calc(100% - 32px); }
          .home-footer__contact-card { padding: 31px 22px 28px; }
          .home-footer__link-groups { grid-template-columns: 1fr 1fr; gap: 18px; }
          .home-footer__link-groups a { font-size: 0.84rem; }
          .home-footer__student-art { width: min(100%, 340px); }
        }
      `}</style>
    </footer>
  );
}
