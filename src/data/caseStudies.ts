// Case study content. Everything here is editable copy — review it for accuracy
// and anything you'd rather not make public before deploying.
//
// Optional fields (video, screenshots, results) render as dashed placeholders in
// `npm run dev` and are hidden entirely in production builds until you fill them in.

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  meta: { label: string; value: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  video?: { src: string; poster?: string };
  overview: { title: string; body: string }[];
  architecture: {
    intro: string;
    layers: { name: string; nodes: { title: string; detail: string }[] }[];
  };
  pipeline: {
    intro: string;
    stages: { name: string; detail: string }[];
    note: string;
  };
  challenges: { title: string; problem: string; approach: string }[];
  results?: { value: string; label: string }[];
  screenshots?: { src: string; caption: string }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "pipemotion",
    title: "pipeMOTION",
    tagline:
      "An AI-powered CRM that helps real estate and mortgage brokers manage client relationships, automate follow-up, and act on sales opportunities.",
    meta: [
      { label: "Role", value: "Co-Founder & CTO" },
      { label: "Scope", value: "Architecture, full-stack, AI, infrastructure" },
      { label: "Timeline", value: "2026 — Present" }, // TODO: confirm start date
      { label: "Status", value: "Live product" },
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Node.js / Express",
      "GraphQL (Apollo)",
      "MongoDB",
      "OpenAI",
      "Firebase Auth",
      "Google Cloud Run",
      "Paddle",
      "PostHog",
      "Playwright",
    ],
    links: [
      { label: "Visit pipemotion.com", href: "https://pipemotion.com" },
      // { label: "Book a demo", href: "https://calendly.com/..." }, // TODO: add your booking link
    ],
    // video: { src: "/pipemotion/demo.mp4", poster: "/pipemotion/poster.jpg" },
    overview: [
      {
        title: "The problem",
        body: "Brokers juggle hundreds of client relationships across inboxes, spreadsheets, and memory. Follow-ups slip, warm leads go cold, and opportunities are missed because no one has time to track every conversation.",
      },
      {
        title: "The solution",
        body: "pipeMOTION connects to a broker's inbox, understands each client conversation, and drafts, schedules, and tracks follow-ups automatically, keeping the broker in control of anything sent on their behalf.",
      },
      {
        title: "My role",
        body: "As co-founder and CTO I designed the system architecture and built the platform end to end: the Next.js app, the GraphQL API, the multi-agent AI pipeline, billing, analytics, testing, and cloud deployment.",
      },
    ],
    architecture: {
      intro:
        "A typed Next.js frontend talks to a single GraphQL API. The API owns business logic and orchestrates AI agents, inbox integrations, billing, and background jobs.",
      layers: [
        {
          name: "Client",
          nodes: [
            { title: "Web app", detail: "Next.js 16 · React 19 · Tailwind" },
            { title: "Auth", detail: "Firebase Authentication" },
          ],
        },
        {
          name: "API",
          nodes: [
            { title: "GraphQL API", detail: "Apollo Server on Express" },
            { title: "REST endpoints", detail: "Webhooks, OAuth callbacks, internal jobs" },
            { title: "Schedulers", detail: "Cron-driven follow-ups & reminders" },
          ],
        },
        {
          name: "Intelligence",
          nodes: [
            { title: "Agent orchestrator", detail: "Multi-agent email pipeline" },
            { title: "LLMs & embeddings", detail: "OpenAI models, semantic context" },
          ],
        },
        {
          name: "Data & integrations",
          nodes: [
            { title: "MongoDB", detail: "Clients, threads, tasks, workflows" },
            { title: "Gmail", detail: "Google APIs + OAuth" },
            { title: "Billing", detail: "Paddle subscriptions & webhooks" },
            { title: "Analytics", detail: "PostHog product analytics" },
            { title: "Storage & email", detail: "Cloud Storage · Resend" },
          ],
        },
      ],
    },
    pipeline: {
      intro:
        "Every inbound email runs through a pipeline of 20+ specialized agents. Each one does a single job well, which keeps prompts small, behaviour testable, and failures easy to isolate.",
      stages: [
        { name: "Classify", detail: "Is this a real client? What kind of email and enquiry is it?" },
        { name: "Understand", detail: "Extract details, build context, and model the relationship and tone." },
        { name: "Plan", detail: "Decide the next best action and when it should happen." },
        { name: "Write", detail: "Draft a reply in the broker's voice, rewrite, and add the signature." },
        { name: "Check", detail: "QA pass for accuracy and tone before anything moves forward." },
        { name: "Act", detail: "Schedule the send, create tasks, and set reminders." },
      ],
      note: "The broker stays in the loop: AI can be removed from any thread at any point.",
    },
    challenges: [
      {
        title: "Letting AI touch real inboxes safely",
        problem: "An AI that emails a broker's clients can't be wrong in public. Mistakes cost trust and deals.",
        approach:
          "Split the work into narrow agents with a dedicated QA stage, kept humans in control of every thread, and gated automated sends behind explicit rules.",
      },
      {
        title: "Testing conversations that haven't happened yet",
        problem: "Multi-turn email behaviour is hard to test with real data, and real client data can't be used for testing.",
        approach:
          "Built a simulation harness that generates synthetic client and agent replies to replay whole threads end to end. It runs only outside production.",
      },
      {
        title: "Shipping fast without breaking billing",
        problem: "A small team shipping daily, with payments and OAuth flows that are painful to test by hand.",
        approach:
          "Playwright end-to-end suites cover core flows, including a sandboxed checkout, plus scripted deploys to Google Cloud Run for frontend and API.",
      },
    ],
    // results: [
    //   { value: "—", label: "Brokers onboarded" },
    //   { value: "—", label: "Emails handled by AI" },
    //   { value: "—", label: "Hours saved per broker / week" },
    // ],
    // screenshots: [
    //   { src: "/pipemotion/dashboard.png", caption: "Client pipeline dashboard" },
    // ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
