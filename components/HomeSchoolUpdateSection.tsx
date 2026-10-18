import styles from "./HomeSchoolUpdateSection.module.css";

export default function HomeSchoolUpdateSection() {
  return (
      <section className={styles.section} aria-labelledby="school-update-title">
        <div className={styles.layout}>
          <div className={styles.leftColumn}>
            <div className={styles.content}>
              <header className={styles.header}>
                <h1 id="school-update-title">Sri Aurobindo Mira Universal School</h1>
                <p className={styles.subtitle}>Website Update and Enhancement</p>
              </header>
  
              <div className={styles.copy}>
                <h2>Website Content Revision and Update</h2>
                <ul className={styles.revisionList}>
                  <li>The meticulously revised write-up for the school portal to prepare for implementation.</li>
                  <li>Poster and Graphic Updates: Freshly designed visual posters and banners are to be integrated across the site.</li>
                  <li>FGES-OPPI Special Curriculum Topic: Detailed updates regarding the KG section&apos;s specialized pedagogy are to be added to showcase our unique early childhood approach.</li>
                  <li>About Us Section: The foundational narrative has been completely revised to better reflect our evolving mission and vision.</li>
                </ul>
  
                <section className={styles.news} aria-labelledby="news-heading">
                  <h2 id="news-heading">Latest News and Achievements</h2>
                  <p>Updates must include our recent recognition with</p>
                  <ul className={styles.newsList}>
                    <li>EDUTOPIA</li>
                    <li>OPPI&#8211;FGES Onsite Visit</li>
                    <li>UNIVERSAL METSA CARNIVAL</li>
                    <li>Holistic Award</li>
                    <li>Cosmic Career guidance initiative, and</li>
                    <li>The transformation &quot;Bridging Pedagogy - Finland Meets Our Classroom&quot; project.</li>
                    <li>Recent School Milestones: Coverage of the prestigious Investiture Ceremony,</li>
                    <li>The &quot;Heart to Succeed&quot; motivational series</li>
                    <li>AFS SOUTH ZONE CONFERENCE</li>
                  </ul>
                </section>
                <div className={styles.decorations} aria-hidden="true">
                  <svg className={`${styles.doodle} ${styles.books}`} viewBox="0 0 72 64" role="presentation">
                    <path d="M9 40h25v15H9z" fill="#f4c95d" stroke="#3e3b68" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M14 29h25v15H14z" fill="#70c6d1" stroke="#3e3b68" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M20 18h25v15H20z" fill="#f08c82" stroke="#3e3b68" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M26 24h13M20 35h13M15 46h13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    <path d="M53 14v5m-2.5-2.5h5M57 39v4m-2-2h4" stroke="#8c6bd0" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <svg className={`${styles.doodle} ${styles.pencil}`} viewBox="0 0 72 64" role="presentation">
                    <path d="m17 45 28-28 10 10-28 28-13 3z" fill="#f5c45d" stroke="#3e3b68" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="m45 17 5-5a5 5 0 0 1 7 7l-5 8M17 45l10 10M16 58l3-13" fill="#f08c82" stroke="#3e3b68" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="m23 39 10 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <svg className={`${styles.doodle} ${styles.cap}`} viewBox="0 0 72 64" role="presentation">
                    <path d="m8 27 28-15 28 15-28 15z" fill="#7160a8" stroke="#3e3b68" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="M19 33v12c10 8 24 8 34 0V33M64 27v17" fill="#8c79c3" stroke="#3e3b68" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                    <circle cx="64" cy="47" r="3" fill="#f4c95d" />
                  </svg>
                  <svg className={`${styles.doodle} ${styles.bag}`} viewBox="0 0 72 64" role="presentation">
                    <path d="M24 20a12 12 0 0 1 24 0" fill="none" stroke="#3e3b68" strokeWidth="3" strokeLinecap="round" />
                    <rect x="15" y="19" width="42" height="38" rx="10" fill="#78bfa4" stroke="#3e3b68" strokeWidth="2.5" />
                    <path d="M22 38h28v13H22z" fill="#f5c45d" stroke="#3e3b68" strokeWidth="2.5" strokeLinejoin="round" />
                    <circle cx="36" cy="31" r="2" fill="#3e3b68" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
