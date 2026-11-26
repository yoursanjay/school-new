export interface SafetyFeature {
  id: string;
  badge: string;
  title: string;
  description: string;
  icon: "shield" | "seatbelt" | "crossing" | "supervision";
}

export interface SmartStep {
  id: string;
  step: string;
  title: string;
  detail: string;
}

export interface TeamRole {
  id: string;
  role: string;
  tag: string;
  summary: string;
  editableNote: string;
  image: string;
  imageAlt: string;
}

export interface ComfortHighlight {
  id: string;
  metric: string;
  title: string;
  description: string;
}

export interface RouteZonePlaceholder {
  id: string;
  zoneCode: string;
  zoneTitle: string;
  stopsLabel: string;
  timingLabel: string;
  isEditablePlaceholder: boolean;
}

export const SAFETY_FEATURES: SafetyFeature[] = [
  {
    id: "safe-boarding",
    badge: "01 · BOARDING CARE",
    title: "Supervised Boarding & Alighting",
    description:
      "Trained route attendants assist students step on and off at every designated pickup and drop point.",
    icon: "supervision",
  },
  {
    id: "seat-discipline",
    badge: "02 · IN-TRANSIT",
    title: "Seatbelt & Seated Travel Discipline",
    description:
      "Students remain securely seated throughout the journey with clear aisle etiquette and calm supervision.",
    icon: "seatbelt",
  },
  {
    id: "campus-crossing",
    badge: "03 · CAMPUS GATE",
    title: "Guided Campus Gate Crossing",
    description:
      "Dedicated arrival and dispersal zones inside the campus keep pedestrians and vehicles safely separated.",
    icon: "crossing",
  },
  {
    id: "vehicle-checks",
    badge: "04 · INSPECTION",
    title: "Routine Safety & Readiness Checks",
    description:
      "Vehicles undergo regular mechanical, brake, and cleanliness checks before morning and afternoon runs.",
    icon: "shield",
  },
];

export const SMART_TRANSPORT_STEPS: SmartStep[] = [
  {
    id: "smart-1",
    step: "STEP 01",
    title: "Defined Coverage Zones",
    detail:
      "Routes are structured across major Madurai residential corridors to keep daily commute times balanced.",
  },
  {
    id: "smart-2",
    step: "STEP 02",
    title: "Fixed Pickup & Drop Points",
    detail:
      "Clearly communicated stop points ensure families know the exact meeting location every morning and afternoon.",
  },
  {
    id: "smart-3",
    step: "STEP 03",
    title: "Direct Transport Office Line",
    detail:
      "Parents can reach the school transport desk directly for schedule updates, route clarifications, or support.",
  },
];

export const TRANSPORT_TEAM_ROLES: TeamRole[] = [
  {
    id: "team-drivers",
    role: "Experienced School Bus Drivers",
    tag: "DRIVING TEAM",
    summary:
      "Licensed, steady drivers familiar with Madurai school corridors and defensive, child-first road habits.",
    editableNote: "[Editable Placeholder: Add verified driver training credentials or team size]",
    image: "/img/transport/bus-hero.jpg",
    imageAlt: "SAM Universe School yellow bus prepared for student arrival",
  },
  {
    id: "team-attendants",
    role: "Dedicated Route Attendants",
    tag: "STUDENT SUPPORT",
    summary:
      "Each bus route is supported by a route attendant who greets students, checks attendance, and assists younger children.",
    editableNote: "[Editable Placeholder: Add attendant briefing or parent-handover protocol notes]",
    image: "/img/about/special-educators.webp",
    imageAlt: "Caring school mentors supporting students on campus",
  },
  {
    id: "team-coordinators",
    role: "Campus Transport Coordination Desk",
    tag: "PARENT DESK",
    summary:
      "A responsive school coordination team that manages stop assignments, arrival dispersal, and parent enquiries.",
    editableNote: "Direct School Line: 90470 77677 · universal@sriaurobindomira.org",
    image: "/img/about/campus-entrance.webp",
    imageAlt: "Sri Aurobindo Mira Universal School campus entrance",
  },
];

export const COMFORT_HIGHLIGHTS: ComfortHighlight[] = [
  {
    id: "comfort-1",
    metric: "CLEAN",
    title: "Clean & Orderly Interiors",
    description:
      "Daily cabin cleaning and ventilated seating keep the bus interior fresh and welcoming for students.",
  },
  {
    id: "comfort-2",
    metric: "1:1 SEAT",
    title: "Adequate Seating Per Route",
    description:
      "Route capacities are planned carefully so every student has a comfortable seat without overcrowding.",
  },
  {
    id: "comfort-3",
    metric: "CARE",
    title: "Courteous, Calm Atmosphere",
    description:
      "Drivers and attendants foster a respectful, friendly morning and evening ride for all age groups.",
  },
];

/**
 * Editable route zone placeholders — never invent actual school routes, bus numbers, or timings.
 * School administrators can replace these placeholders with verified route sheets.
 */
export const ROUTE_ZONE_PLACEHOLDERS: RouteZonePlaceholder[] = [
  {
    id: "zone-a",
    zoneCode: "CORRIDOR A",
    zoneTitle: "[Madurai North / East Zone — Editable]",
    stopsLabel: "[Stop List Placeholder — Edit with verified pickup points]",
    timingLabel: "[Morning & Return Timing — Editable]",
    isEditablePlaceholder: true,
  },
  {
    id: "zone-b",
    zoneCode: "CORRIDOR B",
    zoneTitle: "[Madurai Central / West Zone — Editable]",
    stopsLabel: "[Stop List Placeholder — Edit with verified pickup points]",
    timingLabel: "[Morning & Return Timing — Editable]",
    isEditablePlaceholder: true,
  },
  {
    id: "zone-c",
    zoneCode: "CORRIDOR C",
    zoneTitle: "[Melakkal & Neighbouring Areas — Editable]",
    stopsLabel: "[Stop List Placeholder — Edit with verified pickup points]",
    timingLabel: "[Morning & Return Timing — Editable]",
    isEditablePlaceholder: true,
  },
  {
    id: "zone-d",
    zoneCode: "CORRIDOR D",
    zoneTitle: "[Madurai South / Ring Road — Editable]",
    stopsLabel: "[Stop List Placeholder — Edit with verified pickup points]",
    timingLabel: "[Morning & Return Timing — Editable]",
    isEditablePlaceholder: true,
  },
];
