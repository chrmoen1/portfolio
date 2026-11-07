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
  // Transparent-background cutout and a square face crop, both in public/
  photo: "/me.webp" as string,
  avatar: "/me-avatar.webp" as string,
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
      "Designed the product in close collaboration with realtors and mortgage brokers, turning their day-to-day workflows into requirements and iterating on their feedback.",
      "Architected and built the platform end to end: Next.js / React frontend, Node.js + GraphQL API, MongoDB, deployed on Google Cloud Run.",
      "Designed a multi-agent AI pipeline of 20+ specialized agents that classifies, drafts, QA-checks, and schedules client emails, with the broker always in the loop.",
      "Built context-aware client profiles that detect buying timelines and intent, map family relationships, and track key dates to prioritize follow-ups and improve deal throughput.",
      "Built a simulation harness that generates synthetic client conversations to test AI behaviour end to end before release.",
      "Integrated Gmail, Firebase Auth, Paddle billing, and PostHog analytics, with Playwright end-to-end tests covering core and payment flows.",
    ],
  },
  {
    company: "Bell",
    role: "Senior Data Scientist",
    period: "Jul 2025 — Aug 2026",
    highlights: [
      "Built an integration system connecting field technicians and support agents with automated home-network root-cause detection, saving ~$20K/month.",
      "Led cross-team investigations spanning multiple network teams to uncover complex, hard-to-trace root causes and drive fixes to resolution.",
      "Deployed SQL-based anomaly-detection and analytics solutions to help manage a network of 1.5M+ users, catching production issues across large-scale systems.",
      "Wrote diagnostic and automation tooling (Python, Bash, Ansible) for root-cause analysis, API health monitoring, and service recovery.",
    ],
  },
  {
    company: "Bell",
    role: "Software Engineer — Access Networking",
    period: "Mar 2022 — Jul 2025",
    highlights: [
      "Designed and shipped networking solutions across 3 modem brands.",
      "Deployed SQL scripts and built automated detection systems with Ansible, Bash, and Python to surface and diagnose access-network issues across the modem fleet.",
      "Containerized and deployed solutions to OpenStack using Docker.",
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
      "Coordinated hundreds of deployments, including Crave and Amazon Prime integrations and firmware upgrades.",
      "Deployed .NET solutions delivering IPTV services on Windows-based OpenStack infrastructure.",
      "Built automated deployment solutions with Octopus Deploy for consistent, repeatable releases.",
      "Built and maintained CI/CD pipelines, cutting deployment time by 20%.",
      "Built Kibana/PowerShell monitoring with automated detection of network anomaly spikes across key IPTV services, keeping them at 99% availability.",
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
  caseStudy?: string; // slug in caseStudies.ts → opens #/work/<slug>
};

// TODO: replace these placeholders with your real projects.
export const projects: Project[] = [
  {
    title: "pipeMOTION",
    category: "Product",
    description:
      "AI-powered CRM for real estate and mortgage brokers: workflow automation, client communication, and opportunity detection.",
    tags: ["React", "GraphQL", "Node.js", "MongoDB", "AI"],
    href: "https://pipemotion.com",
    caseStudy: "pipemotion",
  },
  {
    title: "Home Network Root-Cause Detection",
    category: "Data",
    description:
      "SQL detection platform at Bell that diagnoses low signal, poor performance, and bad Wi-Fi, and delivers root causes to technicians and front-line agents.",
    tags: ["SQL", "Python", "OpenStack", "Anomaly Detection"],
    caseStudy: "bell-root-cause",
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
  { group: "Backend & Data", items: ["Node.js", "GraphQL", ".NET", "MongoDB", "REST APIs", "Machine Learning"] },
  { group: "DevOps", items: ["Linux", "Windows Server", "Ansible", "Octopus Deploy", "CI/CD", "Kibana", "Docker", "OpenStack"] },
];

// Core strengths shown beside the experience list
export const coreStrengths = [
  "React / JavaScript",
  "Python",
  "SQL & Data Analysis",
  "GraphQL / Node.js",
  "DevOps & CI/CD",
  "Machine Learning",
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
  { value: "8+", label: "Years of experience" },
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
