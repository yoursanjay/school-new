const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/samuniversalschool/",
    color: "#1877F2",
    icon: (
      <svg className="h-full w-full" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.56-4.7 1.32 0 2.7.24 2.7.24v2.98h-1.52c-1.5 0-1.97.94-1.97 1.9v2.24h3.35l-.54 3.49H13.9V24C19.63 23.1 24 18.09 24 12.07Z"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sri_aurobindo_mira_universal/",
    color: "#E4405F",
    icon: (
      <svg className="h-full w-full" viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/samuniversal",
    color: "#FF0000",
    icon: (
      <svg className="h-full w-full" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8Z"
        />
        <path fill="#fff" d="m9.6 15.6 6.2-3.6-6.2-3.6v7.2Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/school/sri-aurobindo-mira-universal-school-2/",
    color: "#0A66C2",
    icon: (
      <svg className="h-full w-full" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M5.2 7.7a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6ZM3.7 9h3v11h-3V9Zm4.8 0h2.9v1.5h.1A3.2 3.2 0 0 1 14.4 8c3.1 0 3.7 2 3.7 4.7V20h-3v-6.5c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V20h-3V9Z"
        />
      </svg>
    ),
  },
];

export default function SocialLinks() {
  return (
    <nav className="flex flex-row items-center gap-1.5" aria-label="Social media">
      {socialLinks.map(({ label, href, color, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ color }}
        >
          <span className="h-4 w-4">{icon}</span>
        </a>
      ))}
    </nav>
  );
}
