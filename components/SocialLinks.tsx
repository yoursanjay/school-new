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
    label: "WhatsApp Channel",
    href: "https://whatsapp.com/channel/0029VaApAurAjPXFmVeVbr2G",
    color: "#25D366",
    icon: (
      <svg className="h-full w-full" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.2 7.7c.3-.6.6-.6 1-.6h.4c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4 0 .6l-.5.7c-.2.2-.3.4-.1.7.3.6 1 1.5 1.8 2.1.9.7 1.6.9 1.9 1 .3.1.5.1.7-.1l.8-.9c.2-.2.4-.2.7-.1l1.6.8c.3.1.4.3.4.5 0 .3-.2 1-.6 1.3-.4.4-1.1.7-1.9.6-.9-.1-2.2-.6-3.8-1.7-1.3-.9-2.4-2.3-3.1-3.5-.6-1.1-.8-2-.5-2.8.1-.3.4-.6.7-.7Z"
        />
      </svg>
    ),
  },
];

export default function SocialLinks() {
  return (
    <nav className="flex items-center gap-2" aria-label="Social media">
      {socialLinks.map(({ label, href, color, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform duration-200 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ color }}
        >
          <span className="h-[18px] w-[18px]">{icon}</span>
        </a>
      ))}
    </nav>
  );
}
