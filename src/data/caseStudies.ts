// Case study content. Everything here is editable copy — review it for accuracy
// and anything you'd rather not make public before deploying.
//
// Optional fields (video, screenshots, results) render as dashed placeholders in
// `npm run dev` and are hidden entirely in production builds until you fill them in.

export type CaseStudy = {
  slug: string;
  title: string;
  kicker?: string; // small label above the title, e.g. "Case Study · Bell"
  tagline: string;
  meta: { label: string; value: string }[];
  stack: string[];
  links: { label: string; href: string }[];
  video?: { src: string; poster?: string };
  overview: { title: string; body: string }[];
  intelligence?: {
    intro: string;
    features: { title: string; body: string }[];
    // Illustrative client card (fictional person) shown beside the features
    example: { name: string; intent: string; timeline: string; facts: string[]; next: string };
  };
  detections?: {
    title: string;
    intro: string;
    items: { name: string; signal: string; rootCause: string; action: string; featured?: boolean }[];
    audiences: { name: string; gets: string }[];
  };
  // Column diagram: sources → engine → audiences
  systemFlow?: {
    title: string;
    intro: string;
    columns: { name: string; nodes: { title: string; detail?: string; highlight?: boolean }[] }[];
  };
  // Before/after swim-lanes for one standout capability
  spotlight?: {
    title: string;
    intro: string;
    before: { label: string; steps: string[]; summary: string };
    after: { label: string; steps: string[]; summary: string };
    outcome: string;
    caption?: string;
  };
  architecture?: {
    intro: string;
    layers: { name: string; highlight?: boolean; nodes: { title: string; detail: string }[] }[];
    footnote?: string;
    // Detailed list of third-party services, grouped by category
    integrations?: { category: string; services: { name: string; purpose: string }[] }[];
    guardrails?: string[];
  };
  pipeline: {
    title: string;
    intro: string;
    stages: { name: string; detail: string }[];
    note: string;
  };
  challenges: { title: string; problem: string; approach: string }[];
  results?: { value: string; label: string }[];
  screenshots?: { src: string; caption: string }[];
  // Dev-only placeholder labels for content not added yet (omit to show nothing)
  placeholders?: { video?: string; results?: string[]; screenshots?: string[]; screenshotsSub?: string };
  cta: { title: string; body: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "pipemotion",
    title: "pipeMOTION",
    kicker: "Case Study",
    tagline:
      "An AI-powered CRM that builds a living, context-aware profile of every client, so real estate and mortgage brokers always know who to follow up with, when, and what to say.",
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
      "Gmail & Microsoft Graph APIs",
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
        body: "pipeMOTION connects to a broker's inbox and turns every conversation into client context: intent, timeline, relationships, and key dates. It uses that context to prioritize clients and to draft, schedule, and track follow-ups, keeping the broker in control of anything sent on their behalf.",
      },
      {
        title: "My role",
        body: "As co-founder and CTO I designed the product hand in hand with realtors and mortgage brokers, then architected and built it end to end: the Next.js app, the GraphQL API, the multi-agent AI pipeline, billing, analytics, testing, and cloud deployment.",
      },
    ],
    intelligence: {
      intro:
        "Deals stall when context lives in a broker's head. pipeMOTION keeps an always-current picture of every client and uses it to decide who needs attention next, raising deal throughput without adding work.",
      features: [
        {
          title: "Living client profiles",
          body: "An AI-built profile for each client that refreshes whenever they send something new, so context never goes stale and stays cheap to maintain.",
        },
        {
          title: "Timeline & intent detection",
          body: "Reads phrases like \"we're hoping to move in a couple of months\" against the message date, turns them into a target date, and scores intent as it gets closer.",
        },
        {
          title: "Relationship mapping",
          body: "Links spouses, family groups, and referrals with a primary contact, so a household is treated as one opportunity instead of scattered contacts.",
        },
        {
          title: "Key dates & occasions",
          body: "Picks up birthdays and milestones from conversations and turns them into timely touchpoints that keep relationships warm between deals.",
        },
        {
          title: "Follow-up that adapts",
          body: "Cadences pause when a client replies, re-anchor after real conversations, and escalate to the broker when a thread needs a human.",
        },
        {
          title: "Clean, trusted contacts",
          body: "AI separates real clients from newsletters and noise, flags unsure contacts for review, and never overrides a broker's own decision.",
        },
      ],
      example: {
        name: "Sarah T.",
        intent: "High",
        timeline: "1–3 months",
        facts: ["Pre-approved, first-time buyer", "Household: Sarah + Mark (spouse)", "Birthday: Mar 15", "Prefers email, replies evenings"],
        next: "Send three new listings in her area before Friday",
      },
    },
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
          highlight: true,
          nodes: [
            { title: "Agent orchestrator", detail: "Multi-agent email pipeline" },
            { title: "LLMs & embeddings", detail: "OpenAI models, semantic context" },
          ],
        },
        {
          name: "Data & integrations",
          nodes: [
            { title: "MongoDB", detail: "Clients, threads, tasks, workflows" },
            { title: "Inboxes", detail: "Gmail (Google APIs) · Outlook (Microsoft Graph)" },
            { title: "Billing", detail: "Paddle subscriptions & webhooks" },
            { title: "Analytics", detail: "PostHog product analytics" },
            { title: "Storage & email", detail: "Cloud Storage · Resend" },
          ],
        },
      ],
      footnote: "Frontend and API are containerized and deployed to Google Cloud Run.",
      integrations: [
        {
          category: "Inboxes",
          services: [
            { name: "Gmail", purpose: "Google APIs with OAuth to read client threads and send replies from the broker's own address." },
            { name: "Outlook", purpose: "Microsoft Graph for messages, folders, and sending mail, so Microsoft 365 brokers are supported too." },
          ],
        },
        {
          category: "AI",
          services: [
            { name: "OpenAI", purpose: "LLMs power each agent in the pipeline; embeddings rank the most relevant context and examples." },
          ],
        },
        {
          category: "Identity & security",
          services: [
            { name: "Firebase Authentication", purpose: "User sign-in and session management for the web app." },
            { name: "Admin MFA", purpose: "Time-based one-time passwords (TOTP) protect administrative access." },
            { name: "Encryption", purpose: "AES-256 encryption for sensitive data." },
          ],
        },
        {
          category: "Billing & growth",
          services: [
            { name: "Paddle", purpose: "Subscriptions, checkout, and webhooks that keep plan state in sync." },
            { name: "PostHog", purpose: "Product analytics to see how brokers actually use the product." },
            { name: "Calendly", purpose: "Booking onboarding calls directly from the app." },
          ],
        },
        {
          category: "Infrastructure",
          services: [
            { name: "Google Cloud Run", purpose: "Containerized frontend and API with scripted deploys." },
            { name: "Google Cloud Storage", purpose: "File and media uploads." },
            { name: "MongoDB", purpose: "Primary datastore for clients, threads, tasks, and workflows." },
            { name: "Resend", purpose: "Transactional emails and operational alerts." },
          ],
        },
      ],
      guardrails: [
        "Daily outbound send limits",
        "Allow-listed hosts for outbound requests",
        "Alerts on OAuth and AI provider failures",
        "AI can be removed from any thread at any time",
      ],
    },
    pipeline: {
      title: "The AI pipeline",
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
    placeholders: {
      video: "Demo video, 60–90s, from demo_video/revision_2",
      results: ["Brokers onboarded", "Emails handled by AI", "Hours saved / week", "Response time"],
      screenshots: ["Client pipeline / dashboard", "AI-drafted reply review", "Tasks & reminders", "Inbox connection & onboarding"],
      screenshotsSub: "Screens captured with synthetic demo data.",
    },
    cta: {
      title: "Want to see it live?",
      body: "Happy to walk through the product and the architecture behind it.",
    },
  },
  {
    slug: "bell-root-cause",
    title: "Home Network Root-Cause Detection",
    kicker: "Case Study · Bell",
    tagline:
      "A SQL-based detection platform that turns raw home-network data into clear root-cause insights, delivered to the technicians and front-line agents who fix the problem, and that proactively replaces failing modem power supplies.",
    meta: [
      { label: "Role", value: "Senior Data Scientist" },
      { label: "Company", value: "Bell" },
      { label: "Timeline", value: "Jul 2025 — Aug 2026" },
      { label: "Scope", value: "Detection logic, data pipelines, integrations" },
    ],
    stack: ["SQL", "Python", "OpenStack", "Linux", "Bash", "Ansible", "Anomaly detection", "Data analysis"],
    links: [], // internal platform: no public link
    overview: [
      {
        title: "The problem",
        body: "When a customer's internet or Wi-Fi underperforms, the people helping them often can't see why. Agents troubleshoot by trial and error, technicians arrive without a diagnosis, and the same issue drives repeat calls and visits.",
      },
      {
        title: "The solution",
        body: "A detection platform that continuously reads home-network data, flags known issue patterns like weak signal, poor performance, bad Wi-Fi experience, and failing modem power supplies, and pinpoints the likely root cause.",
      },
      {
        title: "My role",
        body: "I built the detection end to end: services on OpenStack that read data segmented across hundreds of SQL tables, logic that finds spikes and the conditions that pinpoint an issue, and the integration that uploads root-cause results to the frontline tools technicians and agents already use.",
      },
    ],
    // TODO: confirm these examples match what the platform actually detected and recommended
    detections: {
      title: "What it detects",
      intro:
        "Each detection turns a raw signal into a diagnosis and a next step, so whoever is helping the customer knows what is wrong and what to do about it.",
      items: [
        {
          name: "Low RSSI",
          signal: "Weak received signal strength between the gateway and the customer's devices.",
          rootCause: "Distance, placement, or obstructions between the gateway and where devices are used.",
          action: "Guide the customer or technician on placement, or recommend extending coverage.",
        },
        {
          name: "Poor network performance",
          signal: "Speeds, latency, or stability consistently below what the service should deliver.",
          rootCause: "Separates in-home issues from line or network-side problems.",
          action: "Route to the right fix first time: in-home troubleshooting, a technician visit, or escalation.",
        },
        {
          name: "Bad Wi-Fi experience",
          signal: "Patterns that point to a poor experience on Wi-Fi even when the connection itself is healthy.",
          rootCause: "In-home Wi-Fi conditions rather than the service itself.",
          action: "Give agents a clear explanation and targeted steps instead of generic troubleshooting.",
        },
        {
          name: "Bad power supply",
          featured: true,
          signal: "A combination of access-network and modem parameters, especially after an outage, that together point to a failing power supply.",
          rootCause: "A faulty modem power supply, not the network or the customer's setup.",
          action: "Email the customer an alert and ship a new power supply, cheaper than a technician visit or a new modem.",
        },
      ],
      audiences: [
        { name: "Front-line agents", gets: "A plain-language root cause during the call, so they can resolve or route correctly." },
        { name: "Field technicians", gets: "A diagnosis before arriving, so visits start with the likely fix." },
        { name: "Operations teams", gets: "Visibility into recurring issue patterns across the customer base." },
      ],
    },
    systemFlow: {
      title: "How it works",
      intro:
        "Home-network data flows into a SQL detection engine. Each detection resolves to a root cause, and the result goes to whoever can fix it fastest.",
      columns: [
        {
          name: "Data in",
          nodes: [
            { title: "Hundreds of SQL tables", detail: "Segmented network data" },
            { title: "Gateway & Wi-Fi telemetry", detail: "Signal, devices, Wi-Fi" },
            { title: "Service performance", detail: "Speed, latency, stability" },
            { title: "Outage events", detail: "Network outages & recovery" },
          ],
        },
        {
          name: "Detection services · OpenStack",
          nodes: [
            { title: "Low RSSI", detail: "Weak Wi-Fi signal" },
            { title: "Poor network performance", detail: "Below expected service" },
            { title: "Bad Wi-Fi experience", detail: "In-home Wi-Fi conditions" },
            { title: "Bad power supply", detail: "Access + modem parameters", highlight: true },
          ],
        },
        {
          name: "Analysis",
          nodes: [
            { title: "Spike detection", detail: "Abnormal jumps in key metrics" },
            { title: "Condition matching", detail: "Combined signals pinpoint the issue" },
            { title: "Root cause", detail: "Likely cause + recommended action" },
          ],
        },
        {
          name: "Action",
          nodes: [
            { title: "Frontline tools", detail: "Results uploaded for agents & techs" },
            { title: "Front-line agents", detail: "Root cause during the call" },
            { title: "Field technicians", detail: "Diagnosis before the visit" },
            { title: "Proactive replacement", detail: "Email alert + new power supply shipped" },
          ],
        },
      ],
    },
    // TODO: the "before" lane is an illustrative typical path; adjust to match reality
    spotlight: {
      title: "Spotlight: power supply detection",
      intro:
        "After a network outage, modems with failing power supplies can struggle to come back cleanly, and those customers stay down after everyone else has recovered. I built a detection that combines several access-network and modem parameters to identify a faulty power supply. We emailed the customer an alert and shipped them a new one, which is cheaper than sending a technician or a replacement modem.",
      before: {
        label: "Without detection",
        summary: "costly technician visit or new modem",
        steps: ["Network outage", "Modem fails to recover", "Customer calls support", "Agent troubleshoots", "Technician visit or modem swap", "Back online"],
      },
      after: {
        label: "With detection",
        summary: "a power supply in the mail",
        steps: ["Network outage", "Access & modem parameters analyzed", "Faulty power supply detected", "Customer emailed an alert", "New power supply shipped", "Back online"],
      },
      outcome: "~$20K/month in savings, because shipping a power supply is cheaper than a technician visit or a new modem. Customers also got a better experience after outages: an email explaining the problem and a fix in the mail, instead of discovering it themselves.",
      caption: "Simplified flow for illustration.",
    },
    pipeline: {
      title: "How the detection was built",
      intro:
        "The hard part was scale: the data lived across hundreds of segmented tables. I built services on OpenStack that read it in with SQL, looked for spikes and the combinations of conditions that point to a specific issue, and pushed the results into the tools frontline teams already use.",
      stages: [
        { name: "Read", detail: "Pull data segmented across hundreds of SQL tables into one view of each home." },
        { name: "Process", detail: "Detection services running on OpenStack crunch the data at scale." },
        { name: "Spot spikes", detail: "Flag abnormal jumps in key network and Wi-Fi metrics." },
        { name: "Pinpoint", detail: "Match combinations of conditions that point to a specific issue." },
        { name: "Upload", detail: "Send results to frontline tools for root-cause analysis on the spot." },
      ],
      note: "Built to align technicians, agents, and data on one shared diagnosis.",
    },
    // TODO: review — these describe typical challenges; adjust to what you actually faced
    challenges: [
      {
        title: "Signal versus noise",
        problem: "Home-network data is noisy. Flag too much and nobody trusts it; flag too little and real problems slip through.",
        approach: "Paired spike detection with multiple confirming conditions, so an issue is only flagged when the evidence points the same way.",
      },
      {
        title: "Making data useful on a live call",
        problem: "Front-line agents need an answer in seconds, not a dashboard of raw metrics.",
        approach: "Translated each detection into a plain-language root cause and a recommended next step.",
      },
      {
        title: "One diagnosis across teams",
        problem: "Agents, technicians, and data teams each saw a different slice of the problem.",
        approach: "Built a single integration that delivers the same root-cause result to every team that touches the customer.",
      },
    ],
    results: [
      { value: "~$20K", label: "Monthly savings from proactive power supply replacement" },
      // TODO: add more if you can share them, e.g. repeat visits avoided, homes covered
    ],
    cta: {
      title: "Want the deeper dive?",
      body: "Happy to walk through the detection approach and how it reached frontline teams.",
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
