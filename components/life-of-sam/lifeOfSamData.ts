export interface DocumentaryChapter {
  id: string;
  timeOfDay: string;
  chapterNum: string;
  heading: string;
  lead: string;
  body: string;
  primaryImage: string;
  primaryAlt: string;
  secondaryImage?: string;
  secondaryAlt?: string;
}

export const DAY_IN_LIFE_CHAPTERS = {
  morning: {
    id: "day-01-morning",
    timeOfDay: "08:15 AM · ARRIVAL",
    chapterNum: "01",
    heading: "EVERY DAY BEGINS WITH POSSIBILITIES.",
    lead:
      "Morning sunlight streams through the campus gate as buses pull in, backpacks swing onto shoulders, and friends call out to one another across the courtyard. A new day begins.",
    primaryImage: "/img/about/campus-entrance.webp",
    primaryAlt: "Sri Aurobindo Mira Universal School campus entrance bathed in morning light",
    busImage: "/img/transport/bus-hero.jpg",
    busAlt: "SAM Universe school bus arriving at the campus gate",
  },

  classrooms: {
    id: "day-02-classrooms",
    timeOfDay: "09:30 AM · DISCOVERY",
    chapterNum: "02",
    heading: "INSIDE OUR CLASSROOMS",
    lead:
      "Thoughtful educators, open books, and curious questions turn everyday lessons into shared moments of real understanding.",
    body:
      "From foundational reading circles to collaborative discussion, students learn at a human pace—guided to ask why, listen carefully, and think independently. Every classroom is a stage for ideas.",
    primaryImage: "/img/about/special-beyond-classroom.webp",
    primaryAlt: "Teachers and students engaged in hands-on interactive classroom learning at SAM Universe",
    secondaryImage: "/img/about/letter-reading.webp",
    secondaryAlt: "Students reading books together in a bright, well-lit SAM classroom",
  },

  friendships: {
    id: "day-03-friendships",
    timeOfDay: "11:15 AM · TOGETHER",
    chapterNum: "03",
    heading: "FRIENDSHIPS & CONNECTIONS",
    lead:
      "The quiet magic of school life lives in shared laughter, group projects, and teammates who encourage each other without being asked.",
    body:
      "Across grades and houses, students build lasting bonds—working side by side, cheering one another on, and growing in empathy every single day.",
    primaryImage: "/img/s6.JPG",
    primaryAlt: "SAM Universe School students smiling and spending time together on campus",
    secondaryImage: "/img/s2.JPG",
    secondaryAlt: "Students sharing a moment of teamwork and joy during campus activities",
  },

  beyond: {
    id: "day-04-beyond",
    timeOfDay: "01:45 PM · OUTDOORS",
    chapterNum: "04",
    heading: "BEYOND THE CLASSROOM",
    lead:
      "Open skies, track lanes, archery ranges, and leafy trails invite students to move, explore, and build genuine resilience.",
    body:
      "Physical vitality and outdoor curiosity balance academic focus—giving every learner space to run, aim, and discover real confidence through motion.",
    primaryImage: "/img/s1.jpg",
    primaryAlt: "SAM Universe students participating in outdoor sports and playground athletics",
    secondaryImage: "/img/about/letter-archery.webp",
    secondaryAlt: "Student practising archery in the SAM outdoor range",
    tertiaryImage: "/img/about/letter-trekking.webp",
    tertiaryAlt: "SAM students exploring nature on an outdoor trekking excursion",
  },

  talent: {
    id: "day-05-talent",
    timeOfDay: "03:00 PM · EXPRESSION",
    chapterNum: "05",
    heading: "DISCOVER YOUR TALENT",
    lead:
      "Paintbrushes, stage rhythms, science instruments, and quiet imagination come alive as students explore what truly moves them.",
    body:
      "Whether sketching in the art studio, rehearsing on stage, or testing ideas in the science and technology lab—every student finds their voice and their medium.",
    artImage: "/img/about/letter-art-studio.webp",
    artAlt: "SAM Universe students painting and creating together in the art studio",
    danceImage: "/img/about/letter-dance.webp",
    danceAlt: "Students performing classical and contemporary dance on the SAM campus stage",
    labImage: "/img/about/letter-tech-lab.webp",
    labAlt: "Students conducting experiments in the SAM Universe science and technology lab",
  },

  moments: {
    id: "day-06-moments",
    timeOfDay: "04:10 PM · MEMORIES",
    chapterNum: "06",
    heading: "MOMENTS TO REMEMBER",
    lead:
      "Morning assemblies, seasonal celebrations, botany walks, and everyday smiles—woven into a year of shared memories that last long after school ends.",
    gallery: [
      {
        src: "/img/UNI - Photos/Christmas photots_/FRS09234.JPG",
        alt: "SAM Universe students celebrating together during a school gathering",
        caption: "Campus celebrations & shared joy",
      },
      {
        src: "/img/about/letter-botany.webp",
        alt: "Students exploring plants and nature in the SAM school garden",
        caption: "Botany walks & outdoor curiosity",
      },
      {
        src: "/img/UNI - Photos/Christmas photots_/FRS09240.JPG",
        alt: "Students participating in a joyful SAM school assembly",
        caption: "Assemblies & stage moments",
      },
      {
        src: "/img/UNI - Photos/Christmas photots_/FRS09250.JPG",
        alt: "Smiling SAM classmates together at the end of a school celebration",
        caption: "Everyday friendships that last",
      },
    ],
  },

  finale: {
    id: "day-07-finale",
    timeOfDay: "04:45 PM · HOMEWARD",
    chapterNum: "07",
    heading: "THIS IS LIFE AT SAM.",
    lead:
      "A place where mornings feel hopeful, afternoons spark discovery, and every student goes home a little wiser and more confident than they were yesterday.",
    primaryImage: "/img/about/letter-campus-aerial.webp",
    primaryAlt: "Aerial view of the Sri Aurobindo Mira Universal School campus at golden hour",
  },
} as const;
