export interface JourneyMilestone {
  id: string;
  yearTop: string;
  yearBottom: string;
  dateLabel: string;
  category: string;
  titlePrefix: string;
  titleHighlight: string;
  summary: string;
  details: string[];
  image: string;
  imageAlt: string;
  caption: string;
  side: "left" | "right";
}

export interface GrowingTogetherStrip {
  id: string;
  index: string;
  verticalTitle: string;
  category: string;
  captionTitle: string;
  caption: string;
  image: string;
  imageAlt: string;
  objectPosition: string;
  tone: "charcoal" | "grey" | "red" | "charcoal-red" | "white";
  staggerClass: string;
}

export const SECTION3_POSTER_HEADER = {
  bracketTop: "SRI AUROBINDO MIRA",
  bracketBottom: "UNIVERSAL SCHOOL · MADURAI",
} as const;

export const SECTION3_POSTER_STRIPS: GrowingTogetherStrip[] = [
  {
    id: "strip-curiosity",
    index: "01",
    verticalTitle: "CURIOSITY",
    category: "INQUISITIVE CLASSROOMS",
    captionTitle: "WHERE CURIOSITY FINDS ITS VOICE",
    caption:
      "Primary learners raising their hands eagerly alongside teachers in interactive smart-board classrooms.",
    image: "/img/about/collage-classroom-hands-bw.webp",
    imageAlt:
      "Primary students raising hands eagerly during a classroom lesson with their teacher",
    objectPosition: "50% 42%",
    tone: "charcoal",
    staggerClass: "md:mt-2",
  },
  {
    id: "strip-guidance",
    index: "02",
    verticalTitle: "MENTORSHIP",
    category: "50+ FACULTY",
    captionTitle: "50+ FACULTY GUIDING EVERY STEP",
    caption:
      "Subject-certified educators nurturing confident learners at a 1:15 faculty ratio across all stages.",
    image: "/img/about/special-educators.webp",
    imageAlt:
      "Sri Aurobindo Mira Universal School faculty members standing together on campus",
    objectPosition: "50% 24%",
    tone: "grey",
    staggerClass: "md:mt-11 lg:mt-14",
  },
  {
    id: "strip-creativity",
    index: "03",
    verticalTitle: "CREATIVITY",
    category: "FINE ARTS STUDIO",
    captionTitle: "FINE ARTS ATELIER",
    caption:
      "Exploring brushwork, composition, and visual storytelling together in our sunlit studio.",
    image: "/img/about/letter-art-studio.webp",
    imageAlt:
      "Students painting watercolors together in the Universal School art studio",
    objectPosition: "40% 40%",
    tone: "red",
    staggerClass: "md:mt-6 lg:mt-8",
  },
  {
    id: "strip-courage",
    index: "04",
    verticalTitle: "COURAGE",
    category: "CAMPUS ATHLETICS",
    captionTitle: "EQUESTRIAN & SPORTSPLEX SPIRIT",
    caption:
      "394 Sports Achievers recognized across district, state, national, and AMPS state honors.",
    image: "/img/about/letter-equestrian.webp",
    imageAlt:
      "Student riding in full helmet and protective gear on the campus riding track",
    objectPosition: "52% 28%",
    tone: "charcoal-red",
    staggerClass: "md:-mt-2 lg:-mt-3",
  },
  {
    id: "strip-harmony",
    index: "05",
    verticalTitle: "HARMONY",
    category: "PERFORMING ARTS",
    captionTitle: "RHYTHM & JOYFUL EXPRESSION",
    caption:
      "Classical movement, teamwork, and whole-child development on our 10-acre green campus.",
    image: "/img/about/letter-dance.webp",
    imageAlt:
      "Students practicing synchronized expressive dance in the school studio",
    objectPosition: "50% 30%",
    tone: "white",
    staggerClass: "md:mt-8 lg:mt-10",
  },
];

const [curiosityStrip, mentorshipStrip] = SECTION3_POSTER_STRIPS;

export const GROWING_TOGETHER_FEATURE = {
  image: curiosityStrip.image,
  imageAlt: curiosityStrip.imageAlt,
  objectPosition: curiosityStrip.objectPosition,
  index: curiosityStrip.index,
  category: curiosityStrip.category,
  title: curiosityStrip.captionTitle,
  caption: curiosityStrip.caption,
} as const;

export const GROWING_TOGETHER_OVERLAP = {
  image: mentorshipStrip.image,
  imageAlt: mentorshipStrip.imageAlt,
  objectPosition: mentorshipStrip.objectPosition,
  index: mentorshipStrip.index,
  category: mentorshipStrip.category,
  title: mentorshipStrip.captionTitle,
  caption: mentorshipStrip.caption,
} as const;

export const GROWING_TOGETHER_GALLERY = [
  ...SECTION3_POSTER_STRIPS.map((strip, index) => ({
    id: strip.id,
    image: strip.image,
    imageAlt: strip.imageAlt,
    objectPosition: strip.objectPosition,
    index: strip.index,
    category: strip.category,
    title: strip.captionTitle,
    caption: strip.caption,
    aspectClass: index % 2 === 0 ? "aspect-[16/10]" : "aspect-[4/3]",
  })),
  {
    id: "strip-exploration",
    image: "/img/about/letter-trekking.webp",
    imageAlt: "Students learning together on an outdoor trekking trail",
    objectPosition: "50% 40%",
    index: "06",
    category: "OUTDOOR LEARNING",
    title: "DISCOVERY BEYOND THE CLASSROOM",
    caption:
      "Outdoor exploration builds teamwork, resilience, and shared responsibility.",
    aspectClass: "aspect-[16/10]",
  },
] as const;

export const SECTION3_POSTER_FOOTER = {
  leftStrong: "50+ FACULTY",
  leftLight: "1:15 RATIO",
  rightStrong: "10 ACRES",
  rightLight: "SINCE 2001",
  colophonLeft:
    "KEELAMATHUR, MELAKKAL MAIN ROAD, MADURAI – 625 019  |  CBSE AFFILIATION NO. 1930282",
  colophonRight: "SAM UNIVERSE SCHOOL",
} as const;

export const SCHOOL_ORIGIN_SPECS = [
  { label: "INSTITUTION", value: "Sri Aurobindo Mira Universal School" },
  {
    label: "LOCATION",
    value: "Keelamathur, Melakkal Main Road, Madurai – 625 019",
  },
  {
    label: "EXPERIENCE",
    value: "25+ Years of Educational Excellence (Since 2001)",
  },
  { label: "AFFILIATION", value: "CBSE Affiliation No. 1930282 · School Code 55225" },
  { label: "CAMPUS", value: "10-Acre Green Learning Campus" },
  { label: "FACULTY CARE", value: "50+ Dedicated Faculty · 1:15 Educator Ratio" },
] as const;

export const SECTION1_ORIGIN_CONTENT = {
  eyebrow: "OUR HERITAGE · FOUNDED 2001 · MADURAI",
  headlineWords: ["EVERY", "GREAT", "JOURNEY", "HAS", "A"],
  headlineAccent: "BEGINNING.",
  subheading:
    "Committed to nurturing CBSE academic excellence, character, creativity, and confidence.",
  narrative:
    "Inspired by Sri Aurobindo and The Mother's vision of integral education and empathy, Sri Aurobindo Mira Universal School has nurtured generations of accomplished learners since 2001. Our vision is to foster holistic development in a safe, inspiring environment—empowering students through academic excellence and a spirit of discovery.",
  philosophyTitle: "OUR VISION & EDUCATIONAL MISSION",
  philosophyCopy:
    "Across foundational, primary, middle, and senior grades, our learning environment balances strong academics with moral depth—building Confidence, Compassion, and Capability in every child.",
  stats: [
    { number: "25+", label: "Years of Excellence", note: "Since 2001" },
    { number: "50+", label: "Dedicated Faculty", note: "1:15 Educator Ratio" },
    { number: "10 ACRES", label: "Madurai Campus", note: "Keelamathur" },
    { number: "CBSE", label: "Affiliation 1930282", note: "School Code 55225" },
  ],
} as const;

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: "milestone-2001-foundation",
    yearTop: "20",
    yearBottom: "01",
    dateLabel: "SINCE 2001",
    category: "FOUNDING ROOTS",
    titlePrefix: "INTEGRAL",
    titleHighlight: "BEGINNINGS",
    summary:
      "Grounded in Sri Aurobindo and The Mother's philosophy of integral education and empathy, the school began its journey in Madurai with a commitment to nurturing both intellect and character.",
    details: [
      "Balancing structured CBSE academics with holistic child development",
      "A safe, supportive campus built to encourage curiosity from early years upward",
    ],
    image: "/img/about/campus-entrance.webp",
    imageAlt:
      "Main campus entrance building of Sri Aurobindo Mira Universal School in Madurai",
    caption: "Campus Entrance · Keelamathur, Madurai",
    side: "right",
  },
  {
    id: "milestone-2023-experiential",
    yearTop: "20",
    yearBottom: "23",
    dateLabel: "2023 CAMPUS LIFE",
    category: "EXPERIENTIAL LEARNING",
    titlePrefix: "LEARNING BEYOND",
    titleHighlight: "THE CLASSROOM",
    summary:
      "Students strengthened teamwork, resilience, and compassion through lived experiences—ranging from outdoor trekking excursions to early-childhood nature and animal care on campus.",
    details: [
      "Outdoor scouting and trekking trails fostering shared responsibility",
      "Hands-on nature empathy welcoming younger learners outdoors",
    ],
    image: "/img/about/letter-trekking.webp",
    imageAlt:
      "SAM Universe students hiking together outdoors along a woodland trail",
    caption: "Student Trekking & Outdoor Learning · 2023",
    side: "left",
  },
  {
    id: "milestone-2024-unity",
    yearTop: "20",
    yearBottom: "24",
    dateLabel: "21 JUN 2024",
    category: "WELLNESS & CAMPUS UNITY",
    titlePrefix: "HEALTHY BODY,",
    titleHighlight: "CALM MIND",
    summary:
      "Students gathered together across our central green field and red synthetic athletic track under the national flag for collective yoga practice—celebrating physical vitality and inner stillness.",
    details: [
      "Whole-school participation across the central athletic grounds",
      "Integrating mindfulness, discipline, and daily physical well-being",
    ],
    image: "/img/photo_2024-06-21_17-07-37.jpg",
    imageAlt:
      "Aerial photograph of SAM Universe students practicing yoga together across the campus athletic field",
    caption: "Collective Yoga Day · 21 Jun 2024",
    side: "right",
  },
  {
    id: "milestone-2025-pedagogy",
    yearTop: "20",
    yearBottom: "25",
    dateLabel: "2025 – ONGOING",
    category: "CURRICULUM & COMPUTING",
    titlePrefix: "EVOLVING",
    titleHighlight: "PEDAGOGY",
    summary:
      "Advancing student-centered classrooms through computing labs, the FGES–OPPI Special Kindergarten Curriculum, the OPPI–FGES Onsite Visit, and our \"Bridging Pedagogy – Finland Meets Our Classroom\" initiative.",
    details: [
      "Dedicated computing and STEM laboratories supporting practical inquiry",
      "Global early-childhood and classroom methodology exchanges",
    ],
    image: "/img/about/letter-tech-lab.webp",
    imageAlt:
      "Senior high school students collaborating in the SAM Universe computing laboratory",
    caption: "Computing Lab & Classroom Innovation",
    side: "left",
  },
  {
    id: "milestone-2026-edutopia-sports",
    yearTop: "20",
    yearBottom: "26",
    dateLabel: "SEP – NOV 2026",
    category: "HIGHER ED & SPORTS EXCELLENCE",
    titlePrefix: "SAM EDUTOPIA &",
    titleHighlight: "SPORTSPLEX HONORS",
    summary:
      "On 25 September 2026, Director Er. M.C. Abilash led SAM EDUTOPIA 2026 in Madurai, bringing over 50 universities together for Grades 11–12 learners. The 9th Annual Senior School Sports Meet (20 Nov 2026) celebrated 394 sports achievers and AMPS Best School for Sports in Tamil Nadu recognition.",
    details: [
      "SAM EDUTOPIA University Fair serving students across nearly 10 Madurai schools",
      "394 Sports Achievers recognized across district, state, national, and international levels",
    ],
    image: "/img/about/letter-campus-aerial.webp",
    imageAlt:
      "Aerial photograph of the 10-acre campus, Universal Sportsplex athletic track, and courts",
    caption: "Universal Sportsplex & 10-Acre Campus · 2026",
    side: "right",
  },
  {
    id: "milestone-ongoing-programs",
    yearTop: "ON",
    yearBottom: "WARD",
    dateLabel: "CONTINUING PROGRAMS",
    category: "COMMUNITY & LEADERSHIP",
    titlePrefix: "GLOBAL DIALOGUE,",
    titleHighlight: "HOLISTIC GROWTH",
    summary:
      "School traditions and holistic student initiatives continue to shape leadership, empathy, and global awareness across our campus community.",
    details: [
      "Universal Metsa Carnival, Holistic Award, Cosmic Career guidance initiative",
      "Investiture Ceremony, \"Heart to Succeed\" series & AFS South Zone Conference",
    ],
    image: "/img/ac1.jpg",
    imageAlt:
      "SAM Universe School students performing on stage beneath the school banner",
    caption: "Annual Showcase & Campus Programs",
    side: "left",
  },
];
