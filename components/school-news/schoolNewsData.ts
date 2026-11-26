export type NewsCategory =
  | "Academics"
  | "Sports"
  | "Cultural Events"
  | "Campus Life"
  | "Announcements";

export interface NewsArticle {
  id: string;
  section: "latest" | "academics" | "sports" | "creative" | "moments" | "announcements";
  category: NewsCategory;
  dateLabel: string;
  isPlaceholderDate?: boolean;
  headline: string;
  subhead: string;
  summary: string;
  fullStory: string[];
  image: string;
  imageAlt: string;
  accent: "yellow" | "red" | "orange" | "blue";
  maskShape: "torn-a" | "torn-b" | "torn-c" | "torn-d";
  badgeText?: string;
}

export interface CampusMomentPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tag: string;
  tilt: string;
  pinColor: "red" | "yellow" | "orange";
}

export interface UpcomingAnnouncement {
  id: string;
  category: NewsCategory;
  title: string;
  scheduleLabel: string;
  venueOrNote: string;
  description: string;
  isEditablePlaceholder: boolean;
}

export const NEWS_CATEGORIES: readonly ("All" | NewsCategory)[] = [
  "All",
  "Academics",
  "Sports",
  "Cultural Events",
  "Campus Life",
  "Announcements",
] as const;

/**
 * Authentic SAM Universe School stories & milestones sourced from the school portal.
 * Where verified dates or event schedules are not yet published, clearly marked
 * editable placeholders are used so editors can update them directly here.
 */
export const SCHOOL_NEWS_ARTICLES: NewsArticle[] = [
  // SECTION 02: LATEST SCHOOL NEWS
  {
    id: "sam-edutopia-2026",
    section: "latest",
    category: "Academics",
    dateLabel: "25 SEP 2026",
    headline: "SAM EDUTOPIA 2026 – Opening New Horizons in Higher Education",
    subhead: "50+ Universities & Institutions · Madurai Campus",
    summary:
      "Sri Aurobindo Mira Universal School hosted SAM EDUTOPIA 2026, bringing more than 50 leading universities and institutions together for its University Fair.",
    fullStory: [
      "Madurai, 25 September 2026: Sri Aurobindo Mira Universal School hosted SAM EDUTOPIA 2026, bringing more than 50 leading universities and institutions together for its University Fair.",
      "Students in Grades 11 and 12 from nearly 10 schools across Madurai and neighbouring regions explored pathways in engineering, medicine, arts and design, business, computer science and AI, research, hospitality, travel, and emerging fields.",
      "Students and parents met university representatives to discuss courses, admissions, scholarships, and careers. Led by Director Er. M.C. Abilash, the event opened new opportunities for students to explore, aspire, and excel.",
    ],
    image: "/img/s6.JPG",
    imageAlt: "SAM Universe School students smiling together at campus event",
    accent: "yellow",
    maskShape: "torn-a",
    badgeText: "FEATURED STORY",
  },
  {
    id: "bridging-pedagogy-finland",
    section: "latest",
    category: "Academics",
    dateLabel: "[DATE — EDITABLE]",
    isPlaceholderDate: true,
    headline: "Bridging Pedagogy – Finland Meets Our Classroom & OPPI–FGES Visit",
    subhead: "Early Childhood & Global Classroom Collaboration",
    summary:
      "The transformation project 'Bridging Pedagogy – Finland Meets Our Classroom' alongside the OPPI–FGES Onsite Visit highlights joyful, child-centred learning at SAM.",
    fullStory: [
      "Sri Aurobindo Mira Universal School continues to enrich its classroom practice through the FGES–OPPI Special Curriculum and the 'Bridging Pedagogy – Finland Meets Our Classroom' initiative.",
      "Focused on Kindergarten and foundational years, the collaboration showcases hands-on inquiry, curiosity-led exploration, and supportive educator mentorship.",
      "[Editor Note: Add verified visit dates, guest speaker names, and session highlights here before publishing updates.]",
    ],
    image: "/img/about/special-beyond-classroom.webp",
    imageAlt: "Students engaged in hands-on collaborative learning beyond the classroom",
    accent: "red",
    maskShape: "torn-b",
    badgeText: "GLOBAL PEDAGOGY",
  },
  {
    id: "investiture-and-afs",
    section: "latest",
    category: "Campus Life",
    dateLabel: "[DATE — EDITABLE]",
    isPlaceholderDate: true,
    headline: "Investiture Ceremony & AFS South Zone Conference Milestones",
    subhead: "Student Leadership & Intercultural Exchange",
    summary:
      "Recent campus milestones celebrate student leadership at the Investiture Ceremony and regional dialogue through the AFS South Zone Conference.",
    fullStory: [
      "SAM Universe School's recent school milestones include the Investiture Ceremony, celebrating student council stewardship, and participation in the AFS South Zone Conference.",
      "Alongside the 'Heart to Succeed' motivational series and the Cosmic Career Guidance initiative, these programs encourage students to lead with empathy and purpose.",
      "[Editor Note: Replace this placeholder summary with verified ceremony dates, office-bearer names, and conference notes.]",
    ],
    image: "/img/about/campus-entrance.webp",
    imageAlt: "Sri Aurobindo Mira Universal School campus entrance",
    accent: "orange",
    maskShape: "torn-c",
    badgeText: "CAMPUS MILESTONE",
  },

  // SECTION 03: ACADEMIC HIGHLIGHTS
  {
    id: "fges-oppi-kg-pedagogy",
    section: "academics",
    category: "Academics",
    dateLabel: "[TERM UPDATE — EDITABLE]",
    isPlaceholderDate: true,
    headline: "FGES–OPPI Special Curriculum in Kindergarten",
    subhead: "Play-Based Discovery & Foundational Curiosity",
    summary:
      "Our KG section's specialized pedagogy blends structured wonder, storytelling, and tactile exploration so young learners build confidence naturally.",
    fullStory: [
      "Designed around early childhood curiosity, the FGES–OPPI Special Curriculum invites Kindergarten learners to observe, question, and create every day.",
      "[Editor Note: Insert classroom observation highlights or term showcase dates here.]",
    ],
    image: "/img/about/letter-reading.webp",
    imageAlt: "Students immersed in reading and classroom discovery",
    accent: "yellow",
    maskShape: "torn-d",
    badgeText: "KG PEDAGOGY",
  },
  {
    id: "stem-tech-lab-discovery",
    section: "academics",
    category: "Academics",
    dateLabel: "[LAB FEATURE — EDITABLE]",
    isPlaceholderDate: true,
    headline: "Science Experiments, Robotics & Digital Classrooms",
    subhead: "Hands-On Inquiry Across Physics, Biology & Tech",
    summary:
      "From botanical observation to technology lab experiments, students test hypotheses with real instruments and collaborative problem-solving.",
    fullStory: [
      "Across SAM Universe School's digital classrooms, science labs, and outdoor botany corners, students connect textbook concepts to tangible experiments.",
      "[Editor Note: Add specific grade-level science fair dates or project titles when verified.]",
    ],
    image: "/img/about/letter-tech-lab.webp",
    imageAlt: "Students exploring technology and science activities in the lab",
    accent: "red",
    maskShape: "torn-a",
    badgeText: "STEM & LABS",
  },
  {
    id: "cosmic-career-heart-to-succeed",
    section: "academics",
    category: "Academics",
    dateLabel: "[SERIES — EDITABLE]",
    isPlaceholderDate: true,
    headline: "Cosmic Career Guidance & 'Heart to Succeed' Series",
    subhead: "Mentorship, Holistic Award & Future Readiness",
    summary:
      "Guiding senior learners with clarity through the Cosmic Career Guidance initiative and inspiring resilience via the 'Heart to Succeed' motivational series.",
    fullStory: [
      "SAM Universe School pairs academic rigor with thoughtful mentorship. Through the Cosmic Career Guidance initiative and the 'Heart to Succeed' motivational series, students gain perspective on higher studies and personal growth.",
      "[Editor Note: Add upcoming speaker session dates and Holistic Award details here.]",
    ],
    image: "/img/about/letter-botany.webp",
    imageAlt: "Students learning outdoors in the school botany garden",
    accent: "orange",
    maskShape: "torn-b",
    badgeText: "MENTORSHIP",
  },

  // SECTION 04: SPORTS & ACTIVITIES
  {
    id: "sports-track-and-field",
    section: "sports",
    category: "Sports",
    dateLabel: "[SEASON UPDATE — EDITABLE]",
    isPlaceholderDate: true,
    headline: "Track, Team Games & Athletic Spirit on Campus",
    subhead: "Energy · Teamwork · Fair Play",
    summary:
      "Students build stamina, coordination, and house camaraderie through daily field practice, team sports, and outdoor athletic training.",
    fullStory: [
      "Physical education is a cornerstone of life at Sri Aurobindo Mira Universal School, nurturing discipline, teamwork, and joyful movement across every grade.",
      "[Editor Note: Add verified Annual Sports Meet dates, house standings, and tournament results here.]",
    ],
    image: "/img/s1.jpg",
    imageAlt: "Students participating in energetic outdoor sports activities",
    accent: "yellow",
    maskShape: "torn-c",
    badgeText: "ATHLETICS",
  },
  {
    id: "sports-archery-equestrian",
    section: "sports",
    category: "Sports",
    dateLabel: "[CO-CURRICULAR — EDITABLE]",
    isPlaceholderDate: true,
    headline: "Archery, Equestrian & Outdoor Trekking Programs",
    subhead: "Focus, Balance & Adventure Beyond Walls",
    summary:
      "Specialized co-curricular sports—including archery, equestrian training, and guided trekking—help students develop poise and resilience.",
    fullStory: [
      "Beyond conventional court games, SAM Universe School offers archery, equestrian sessions, and trekking adventures that cultivate focus, courage, and respect for nature.",
      "[Editor Note: Update with verified coaching schedules or inter-school meet dates.]",
    ],
    image: "/img/about/letter-archery.webp",
    imageAlt: "Student practicing archery with focus and precision",
    accent: "red",
    maskShape: "torn-a",
    badgeText: "PRECISION SPORTS",
  },
  {
    id: "sports-equestrian-trek",
    section: "sports",
    category: "Sports",
    dateLabel: "[CAMPUS SPORTS — EDITABLE]",
    isPlaceholderDate: true,
    headline: "Equestrian Discipline & Outdoor Endurance",
    subhead: "Confidence in Every Stride",
    summary:
      "Guided equestrian and field activities teach young learners patience, posture, and partnership in an encouraging outdoor environment.",
    fullStory: [
      "Our campus sportsplex and outdoor training grounds host regular sessions designed to build physical confidence alongside academic balance.",
      "[Editor Note: Insert verified showcase or sports day event details here.]",
    ],
    image: "/img/about/letter-equestrian.webp",
    imageAlt: "Student riding during equestrian training session",
    accent: "orange",
    maskShape: "torn-d",
    badgeText: "OUTDOOR",
  },

  // SECTION 05: CREATIVE CORNER
  {
    id: "universal-metsa-carnival",
    section: "creative",
    category: "Cultural Events",
    dateLabel: "[EVENT — EDITABLE]",
    isPlaceholderDate: true,
    headline: "UNIVERSAL METSA CARNIVAL – Colour, Craft & Community",
    subhead: "Music, Student Stalls & Joyful Celebration",
    summary:
      "The Universal Metsa Carnival celebrates student imagination with vibrant craft corners, live performances, and shared family festivities.",
    fullStory: [
      "Recognized among SAM Universe School's signature community highlights, the Universal Metsa Carnival brings together students, teachers, and families for a day of creativity and celebration.",
      "[Editor Note: Add verified carnival dates, performance lineups, and stall highlights here.]",
    ],
    image: "/img/about/special-creative-arts.webp",
    imageAlt: "Students showcasing creative arts and colourful projects",
    accent: "yellow",
    maskShape: "torn-b",
    badgeText: "CARNIVAL",
  },
  {
    id: "creative-art-studio",
    section: "creative",
    category: "Cultural Events",
    dateLabel: "[STUDIO — EDITABLE]",
    isPlaceholderDate: true,
    headline: "Fine Arts, Paper Craft & Visual Storytelling",
    subhead: "Imagination in Action at the Art Studio",
    summary:
      "From brushwork to mixed-media cutouts, students express ideas boldly in dedicated art studios guided by practicing mentors.",
    fullStory: [
      "Inside the SAM Art Studio, students experiment with colour, texture, sculpture, and visual storytelling, turning everyday materials into expressive works.",
      "[Editor Note: Insert upcoming exhibition dates or art showcase themes here.]",
    ],
    image: "/img/about/letter-art-studio.webp",
    imageAlt: "Students painting and crafting inside the school art studio",
    accent: "red",
    maskShape: "torn-c",
    badgeText: "ART STUDIO",
  },
  {
    id: "creative-dance-music",
    section: "creative",
    category: "Cultural Events",
    dateLabel: "[CULTURAL — EDITABLE]",
    isPlaceholderDate: true,
    headline: "Classical & Contemporary Dance, Rhythm & Stagecraft",
    subhead: "Celebrating Heritage & Movement",
    summary:
      "Cultural assemblies and performing arts workshops give every student a stage to discover rhythm, confidence, and collaborative expression.",
    fullStory: [
      "Dance, music, and theatre weave through the school calendar, helping learners connect with cultural traditions while exploring contemporary choreography.",
      "[Editor Note: Add verified cultural fest dates or assembly performance notes here.]",
    ],
    image: "/img/about/letter-dance.webp",
    imageAlt: "Students performing traditional and contemporary dance on campus",
    accent: "orange",
    maskShape: "torn-d",
    badgeText: "PERFORMING ARTS",
  },
];

export const CAMPUS_MOMENTS_COLLAGE: CampusMomentPhoto[] = [
  {
    id: "moment-1",
    src: "/img/UNI - Photos/Christmas photots_/FRS09234.JPG",
    alt: "Festive campus celebration with students smiling together",
    caption: "Festive cheer & campus celebrations",
    tag: "CELEBRATION",
    tilt: "-3deg",
    pinColor: "red",
  },
  {
    id: "moment-2",
    src: "/img/s2.JPG",
    alt: "Students cheering together on campus grounds",
    caption: "Team spirit & shared smiles",
    tag: "CAMPUS LIFE",
    tilt: "2.4deg",
    pinColor: "yellow",
  },
  {
    id: "moment-3",
    src: "/img/about/letter-trekking.webp",
    alt: "Students on an outdoor trekking field excursion",
    caption: "Field trips & outdoor discovery",
    tag: "FIELD TRIP",
    tilt: "-1.8deg",
    pinColor: "orange",
  },
  {
    id: "moment-4",
    src: "/img/UNI - Photos/Christmas photots_/FRS09240.JPG",
    alt: "Students participating in stage activities and festive assembly",
    caption: "Morning assemblies & stage moments",
    tag: "ASSEMBLY",
    tilt: "3.1deg",
    pinColor: "red",
  },
  {
    id: "moment-5",
    src: "/img/s4.jpg",
    alt: "Students engaged in outdoor campus activity",
    caption: "Learning in motion every day",
    tag: "ACTIVITIES",
    tilt: "-2.5deg",
    pinColor: "yellow",
  },
  {
    id: "moment-6",
    src: "/img/UNI - Photos/Christmas photots_/FRS09250.JPG",
    alt: "Joyful group memory of SAM Universe School students",
    caption: "Little moments, big memories",
    tag: "MEMORIES",
    tilt: "1.9deg",
    pinColor: "orange",
  },
];

export const UPCOMING_ANNOUNCEMENTS: UpcomingAnnouncement[] = [
  {
    id: "ann-1",
    category: "Announcements",
    title: "Term Calendar & Upcoming Campus Circulars",
    scheduleLabel: "[UPCOMING DATE — EDITABLE PLACEHOLDER]",
    venueOrNote: "SAM Universe School · Madurai Campus",
    description:
      "Parent-teacher interactions, term assessments, and campus circulars are posted here as soon as official dates are confirmed by the school office.",
    isEditablePlaceholder: true,
  },
  {
    id: "ann-2",
    category: "Academics",
    title: "SAM EDUTOPIA & Career Guidance Follow-Up Desk",
    scheduleLabel: "Academic Year 2026–27 · Grade 11 & 12",
    venueOrNote: "Counselling & University Guidance Wing",
    description:
      "Following SAM EDUTOPIA 2026, students can connect with the Cosmic Career Guidance desk for university application timelines and portfolio reviews.",
    isEditablePlaceholder: false,
  },
  {
    id: "ann-3",
    category: "Cultural Events",
    title: "Universal Metsa Carnival & Cultural Showcase",
    scheduleLabel: "[SCHEDULE TO BE ANNOUNCED — EDITABLE]",
    venueOrNote: "Main Auditorium & Open Grounds",
    description:
      "Preparations for student art stalls, music ensembles, and dance showcases. Replace this placeholder with confirmed dates and timings.",
    isEditablePlaceholder: true,
  },
  {
    id: "ann-4",
    category: "Sports",
    title: "Inter-House Sports & Co-Curricular Trials",
    scheduleLabel: "[TRIAL DATES — EDITABLE PLACEHOLDER]",
    venueOrNote: "SAM Sportsplex & Archery Range",
    description:
      "House practice schedules for athletics, team games, archery, and equestrian modules will be updated here ahead of the next term meet.",
    isEditablePlaceholder: true,
  },
];
