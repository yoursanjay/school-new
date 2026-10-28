import styles from "./FixedSocialSidebar.module.css";

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/samuniversalschool/",
    color: "#1877F2",
    icon: (
      <>
        <circle cx="12" cy="12" r="12" />
        <path
          fill="#fff"
          d="M13.9 24v-8.44h2.85l.54-3.49H13.9V9.83c0-.96.47-1.9 1.97-1.9h1.52V4.95s-1.38-.24-2.7-.24c-2.77 0-4.56 1.68-4.56 4.7v2.24H7.08v3.49h3.05v8.44c.61.13 1.24.2 1.87.2s1.27-.07 1.9-.2Z"
        />
      </>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sri_aurobindo_mira_universal/",
    color: "#E4405F",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.25" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/samuniversal",
    color: "#FF0000",
    icon: (
      <>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z" />
        <path fill="#fff" d="m9.6 15.6 6.2-3.6-6.2-3.6v7.2Z" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/school/sri-aurobindo-mira-universal-school-2/",
    color: "#0A66C2",
    icon: (
      <path d="M5.2 7.7a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM3.7 9h3v11h-3V9Zm4.8 0h2.9v1.5h.1A3.2 3.2 0 0 1 14.4 8c3.1 0 3.7 2 3.7 4.7V20h-3v-6.5c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V20h-3V9Z" />
    ),
  },
];

export default function FixedSocialSidebar() {
  return (
    <>
      <nav className={styles.sidebar} aria-label="Social media">
        {socialLinks.map(({ label, href, color, icon }) => (
          <a
            key={label}
            className={styles.link}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <span className={styles.iconCircle} style={{ color }}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                {icon}
              </svg>
            </span>
          </a>
        ))}
      </nav>
      <a
        className={styles.channelButton}
        href="https://whatsapp.com/channel/0029VaApAurAjPXFmVeVbr2G"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Channel"
      >
        <svg
          className={styles.channelIcon}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4Z"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.2 7.7c.3-.6.6-.6 1-.6h.4c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4 0 .6l-.5.7c-.2.2-.3.4-.1.7.3.6 1 1.5 1.8 2.1.9.7 1.6.9 1.9 1 .3.1.5.1.7-.1l.8-.9c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5 0 .3-.2 1-.6 1.3-.4.4-1.1.7-1.9.6-.9-.1-2.2-.6-3.8-1.7-1.3-.9-2.4-2.3-3.1-3.5-.6-1.1-.8-2-.5-2.8.1-.3.4-.6.7-.7Z"
            fill="#fff"
          />
        </svg>
      </a>
    </>
  );
}
