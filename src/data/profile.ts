// All site content lives here. Edit this file to update the portfolio —
// components read from it and don't need to change.

export const profile = {
  name: "Chris Moen",
  title: "Principal Software Architect",
  location: "Canada",
  tagline:
    "I design and build full-stack platforms, data pipelines, and AI-powered systems — from networks serving 1.5M users to SaaS products for brokers.",
  about: [
    "I'm a Principal Software Architect and Co-Founder/CTO at pipeMOTION, where I lead development of a full-stack, AI-powered platform that helps real estate and mortgage brokers manage client relationships and move deals forward.",
    "Before that I spent over seven years at Bell across data science, access networking, and TV SRE — building anomaly-detection pipelines, shipping CI/CD at scale, and keeping critical services at 99% availability for millions of users.",
    "I studied Electrical Engineering (Systems & Control) at the University of Toronto.",
  ],
  // Rotating words for typed/animated hero text
  roles: ["Software Architect", "AI Engineer", "Data Scientist", "Full-Stack Developer"],
  // Put your headshot in public/ (e.g. public/me.jpg) and set photo: "/me.jpg"
  photo: "" as string,
  email: "moenchris1@gmail.com",
  resumeUrl: "/resume.pdf",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/chris-moen-453473b6" },
    { label: "GitHub", href: "https://github.com/" }, // TODO: add your GitHub username
  ],
};

export type Job = {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
};

export const experience: Job[] = [
  {
    company: "pipeMOTION",
    role: "Principal Software Architect · Co-Founder & CTO",
    period: "Aug 2026 — Present",
    highlights: [
      "Lead development of a full-stack platform and AI-powered systems for real estate and mortgage brokers.",
      "Automate workflows and client communication, and surface sales opportunities brokers can act on.",
    ],
  },
  {
    company: "Bell",
    role: "Senior Data Scientist",
    period: "Jul 2025 — Aug 2026",
    highlights: [
      "Built SQL-based anomaly-detection and analytics pipelines to catch production issues across large-scale systems.",
      "Wrote diagnostic and automation tooling (Python, Bash, Ansible) for root-cause analysis, API health monitoring, and service recovery.",
    ],
  },
  {
    company: "Bell",
    role: "Software Engineer — Access Networking",
    period: "Mar 2022 — Jul 2025",
    highlights: [
      "Designed and shipped networking solutions for 1.5M users across 3 modem brands.",
      "Led an IPTV performance initiative that cut $735K+ in daily maintenance costs.",
      "Resolved major Giga Hub issues, improving QoS by 10% and reaching 99% service reliability.",
    ],
  },
  {
    company: "Bell",
    role: "DevOps Engineer — TV SRE",
    period: "May 2019 — Jun 2022",
    location: "Ottawa, ON",
    highlights: [
      "Coordinated hundreds of deployments to 1.5M+ users, including Crave and Amazon Prime integrations and firmware upgrades.",
      "Built and maintained CI/CD pipelines, cutting deployment time by 20%.",
      "Built Kibana/PowerShell monitoring that kept services at 99% availability.",
    ],
  },
  {
    company: "Wizeprep",
    role: "Software Engineer",
    period: "Jun 2019 — Jun 2020",
    location: "Vancouver, BC",
    highlights: [
      "Designed, built, and deployed 3 applications in a fast-paced Agile team.",
      "Integrated Google Data Studio and HubSpot dashboards, and built JavaScript add-ons for Google Tag Manager.",
    ],
  },
  {
    company: "Bell",
    role: "Solutions Architect Co-op",
    period: "Sep 2017 — Aug 2018",
    location: "Video Innovation Centre",
    highlights: [
      "Did QA, debugging, and redesign work on 2 concurrent projects.",
      "Wrote Python and PowerShell automation that sped up deployments.",
    ],
  },
];

export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  href?: string;
  repo?: string;
};

// TODO: replace these placeholders with your real projects.
export const projects: Project[] = [
  {
    title: "pipeMOTION",
    category: "Product",
    description:
      "AI-powered CRM for real estate and mortgage brokers: workflow automation, client communication, and opportunity detection.",
    tags: ["React", "GraphQL", "Node.js", "MongoDB", "AI"],
    href: "#",
  },
  {
    title: "Anomaly Detection Pipeline",
    category: "Data",
    description:
      "SQL and Python pipeline that flags production anomalies across large-scale systems and feeds diagnostic tooling.",
    tags: ["SQL", "Python", "Data Analysis"],
  },
  {
    title: "Project Three",
    category: "Open Source",
    description: "Short description of what it does, the problem it solves, and your role.",
    tags: ["TypeScript", "Tailwind"],
    repo: "#",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "Bash", "PowerShell"] },
  { group: "Frontend", items: ["React", "Tailwind CSS", "Vite"] },
  { group: "Backend & Data", items: ["Node.js", "GraphQL", "MongoDB", "REST APIs", "Machine Learning"] },
  { group: "DevOps", items: ["Linux", "Ansible", "CI/CD", "Kibana", "Docker"] },
];

// Self-assessed proficiency (0–100) for skill bars. Adjust to taste.
export const skillLevels = [
  { name: "TypeScript / React", level: 90 },
  { name: "Python", level: 90 },
  { name: "SQL & Data Analysis", level: 95 },
  { name: "GraphQL / Node.js", level: 85 },
  { name: "DevOps & CI/CD", level: 90 },
  { name: "Machine Learning", level: 80 },
];

export const services = [
  {
    icon: "architecture",
    title: "Software Architecture",
    description: "Scalable, secure system design from greenfield SaaS platforms to large multi-vendor environments.",
  },
  {
    icon: "data",
    title: "Data & Machine Learning",
    description: "Anomaly detection, analytics pipelines, and AI features that turn raw data into decisions.",
  },
  {
    icon: "devops",
    title: "DevOps & Reliability",
    description: "CI/CD, monitoring, and automation that keep services at 99% availability for millions of users.",
  },
  {
    icon: "fullstack",
    title: "Full-Stack Development",
    description: "React, GraphQL, and Node.js products built end-to-end, from schema to polished UI.",
  },
] as const;

export const stats = [
  { value: "7+", label: "Years of experience" },
  { value: "1.5M+", label: "Users served" },
  { value: "$735K+", label: "Daily cost savings delivered" },
  { value: "99%", label: "Service reliability" },
];

// Words that scroll across the lime marquee bands
export const marquee = [
  "Software Architecture",
  "AI Systems",
  "Data Science",
  "Full-Stack",
  "DevOps",
  "Cloud & CI/CD",
  "Reliability",
];

export const certifications = [
  "Certified Wireless Network Administrator (CWNA)",
  "SAFe 4 Practitioner",
  "Developing Effective Business Presentations",
];

export const education = {
  school: "University of Toronto",
  degree: "B.A.Sc., Electrical Engineering — Systems & Control",
  period: "2014 — 2019",
};
