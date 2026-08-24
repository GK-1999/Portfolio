const PROFILE = {
  name: "Gaurav Kanere",
  availability: "available for cloud / devops roles",
  headlineHtml:
    "<strong>I build and ship cloud infrastructure.</strong> Data analyst moving into DevOps — with production projects on AWS to show for it, not just certificates.",
  roles: ["Cloud Engineer", "DevOps Engineer", "Linux Administrator", "Cloud Support Engineer"],
  location: "Pune, India",
  // Contact links. type "copy" copies to clipboard on click; "link" opens normally.
  contacts: [
    { type: "copy", label: "gaurav.kanere@gmail.com", value: "gaurav.kanere@gmail.com", href: "mailto:gaurav.kanere@gmail.com" },
    { type: "copy", label: "+91 70385 42965", value: "+91 70385 42965", href: "tel:+917038542965" },
    { type: "link", label: "GitHub", href: "https://github.com/GK-1999" },
    { type: "link", label: "LinkedIn", href: "https://linkedin.com/in/gaurav-kanere" },
  ],
  // The "service card" in the hero. Each row is [key, valueHtml].
  serviceCard: {
    heading: "status — healthy",
    rows: [
      ["focus", 'Infra as code, CI/CD, <span class="hl">AWS</span>'],
      ["region", "Pune, IN &middot; ap-south-1"],
      ["stack", "Terraform &middot; Docker &middot; Linux &middot; Python"],
      ["shipped", "3 projects deployed on AWS"],
      ["cert", "AWS SAA-C03 (self-study)"],
    ],
  },
};

const SUMMARY_HTML =
  "Computer Science engineer with a data-analytics background, now focused on " +
  "<strong>Cloud and DevOps</strong>. Over recent months I have designed, built and deployed real " +
  "multi-tenant applications end to end — <strong>application code, containerization, " +
  "CI/CD pipelines, and AWS infrastructure written as Terraform.</strong> The projects " +
  "below are all self-built and running on AWS, meant as direct evidence of " +
  "infrastructure capability rather than a list of buzzwords. Comfortable on Linux, " +
  "disciplined about cost, and biased toward simple architectures that match actual load. " +
  "Outside work I play competitive chess — I recently started playing over-the-board " +
  "tournaments, which is where EcoChess started.";

const SKILLS = [
  { label: "Cloud / AWS", tags: ["EC2", "S3", "RDS", "Route 53", "CloudFront", "ACM", "ALB / ASG", "ECR", "IAM & OIDC", "CloudWatch", "Budgets"] },
  { label: "DevOps / Infra", tags: ["Terraform", "Docker", "GitHub Actions CI/CD", "Linux", "Nginx", "Bash", "Git"] },
  { label: "Backend & data layer", tags: ["FastAPI", "SQLAlchemy 2.0", "Alembic", "PostgreSQL", "REST APIs", "pytest", "Gunicorn / Uvicorn"] },
  { label: "Languages", tags: ["Python", "SQL", "Bash", "HTML / CSS / JS", { text: "C / C++ (basic)", neutral: true }] },
  { label: "Data / Analytics", tags: [{ text: "Advanced Excel", neutral: true }, { text: "Tableau", neutral: true }, { text: "Power BI", neutral: true }, { text: "ETL (Python/SQL)", neutral: true }] },
  { label: "Learning now", tags: [{ text: "AWS SAA-C03", neutral: true }, { text: "Ansible", neutral: true }, { text: "Kubernetes", neutral: true }, { text: "Prometheus / Grafana", neutral: true }] },
];

const PROJECTS = [
  {
    name: "This portfolio site",
    tag: "Static site on AWS",
    domain: "gauravkanere.link",
    domainHref: "https://gauravkanere.link",
    status: { label: "live", kind: "live" },
    bullets: [
      "The page you are reading &mdash; a static HTML/CSS/JS site, no framework and no build step, served on AWS",
      "Apex domain plus per-project subdomains routed through one hosted zone; deployed by a CI pipeline on every push",
    ],
    tags: ["HTML", "CSS", "JavaScript", "S3", "CloudFront", "Route 53", "Lambda", "API Gateway", "SES", { text: "AI-assisted", neutral: true }],
    detailsLabel: "How it's built & hosted",
    detailBlocks: [
      {
        title: "Development",
        items: [
          "Content lives in <code>content.js</code> as plain data; <code>app.js</code> renders it &mdash; edit one file to change a project, no markup to touch",
          "<strong>AI-assisted build:</strong> I directed the design, structure and content and used an AI assistant to speed up the markup and styling &mdash; the layout, copy and hosting decisions are mine",
          "No React, no bundler, no dependencies to patch &mdash; deliberately kept as flat static files so hosting stays trivial and cheap",
          "Responsive down to mobile, keyboard-focus states and reduced-motion respected; version-controlled on GitHub as the single source of truth for the deploy",
        ],
      },
      {
        title: "AWS features used",
        aws: true,
        items: [
          "<strong>S3</strong> &mdash; private bucket holding the static files (the origin), locked down with Origin Access Control",
          "<strong>CloudFront</strong> &mdash; CDN in front of S3 for HTTPS, edge caching and low latency",
          "<strong>ACM</strong> &mdash; TLS certificate covering <code>gauravkanere.link</code> and its subdomains",
          "<strong>Route&nbsp;53</strong> &mdash; hosted zone for the apex domain and alias records for the <code>vitalid.</code> and <code>ecochess.</code> subdomains",
          "<strong>GitHub Actions</strong> &mdash; on push, syncs the files to S3 and issues a CloudFront cache invalidation",
          "<strong>API Gateway + Lambda + SES</strong> &mdash; serverless endpoint behind the &ldquo;Request access&rdquo; button; emails me the request and confirms to the visitor, so a static site can take submissions with no server to run",
        ],
      },
      {
        title: "Why this shape",
        items: [
          "The S3 + CloudFront + Route 53 + ACM pattern is the standard, near-free way to serve a static site on AWS &mdash; and doubles as a working demo of the exact pattern described above",
        ],
      },
    ],
  },

  {
    name: "VitalID",
    tag: "Emergency medical ID",
    domain: "vitalid.gauravkanere.link",
    domainHref: "https://vitalid.gauravkanere.link",
    status: { label: "live", kind: "live" },
    bullets: [
      "Physical card + QR-gated digital record giving first responders and verified doctors fast access to critical patient data",
      "Role-based access across patients, doctors, hospitals and admin, with cross-visit history anonymization for privacy",
    ],
    tags: ["FastAPI", "PostgreSQL", "Docker", "Nginx", "ReportLab", "GitHub Actions", "AWS EC2", { text: "AI-assisted", neutral: true }],
    detailsLabel: "View architecture & AWS",
    detailLinks: [
      { text: "Live demo ↗", href: "https://vitalid.gauravkanere.link" },
      { text: "GitHub ↗", href: "https://github.com/GK-1999/vitalid" },
    ],
    detailBlocks: [
      {
        title: "What I built",
        items: [
          "Designed and built solo &mdash; data model, API, PDF/QR card generation and role-based access",
          "Emergency (instant) vs. normal-visit (OTP-verified) access tiers over the same record",
          "Cross-doctor history anonymization so unrelated visits stay private",
          "Admin approval workflow for doctor and hospital verification",
          "<strong>GitHub Actions CI/CD:</strong> automated build and deploy to EC2 on every push to main",
          "<strong>AI-assisted development:</strong> I own the architecture and technical decisions; used an AI assistant to accelerate implementation",
        ],
      },
      {
        title: "AWS features used",
        aws: true,
        items: [
          "<strong>EC2</strong> for application hosting behind Nginx",
          "<strong>Route&nbsp;53</strong> for DNS on the vitalid subdomain",
          "<strong>S3</strong> for generated-asset storage",
          "<strong>AWS Budgets</strong> for cost alerting",
        ],
      },
    ],
  },

  {
    name: "EcoChess",
    tag: "B2B tournament SaaS",
    domain: "ecochess.gauravkanere.link",
    domainHref: "https://ecochess.gauravkanere.link",
    status: { label: "live", kind: "live" },
    bullets: [
      "Multi-tenant SaaS for running chess tournaments &mdash; 5 roles, centralized RBAC, Swiss &amp; Round Robin engines, Stockfish-based move analysis",
      "Built end to end: layered FastAPI backend, PostgreSQL, containerization, GitHub Actions CI/CD, and the full AWS infrastructure as Terraform",
    ],
    tags: ["FastAPI", "PostgreSQL", "Docker", "Terraform", "GitHub Actions", "AWS", "Nginx", { text: "AI-assisted", neutral: true }],

    detailsLabel: "View architecture & AWS",
    detailLinks: [
      { text: "GitHub ↗", href: "https://github.com/GK-1999/ecochess" },
    ],
    detailBlocks: [
      {
        title: "What I built",
        items: [
          "Designed the whole system solo &mdash; architecture, application, containers, CI/CD and infrastructure",
          "Layered backend: routers → services → repositories → SQLAlchemy 2.0 models, with RBAC centralized as FastAPI dependency guards (never inline)",
          "Swiss (FIDE Dutch) and Round Robin engines with tiebreak systems and waitlist auto-promotion",
          "Stockfish move classification run as a queued background worker, kept off the request path",
          "Multi-stage Dockerfile (non-root, gunicorn+uvicorn); schema fully owned by Alembic migrations",
          "<strong>AI-assisted development:</strong> I own the architecture and technical decisions; used an AI assistant to accelerate implementation",
        ],
      },
      {
        title: "Running vs. scaled down for cost",
        items: [
          "<strong>Fully working:</strong> all 5 roles and RBAC, tournament creation, Swiss and Round Robin pairing, registrations and waitlists, scoreboard, credit system, audit trail",
          "<strong>Scaled down:</strong> RDS runs single-AZ rather than Multi-AZ, and the Auto Scaling Group sits at one instance &mdash; the Terraform supports both, but a portfolio project doesn&#39;t justify the spend",
          "<strong>Started on request:</strong> Stockfish analysis is CPU-heavy, so the worker comes up with the environment rather than running idle",
          "Happy to walk through the cost model and what would trigger graduating to the fuller setup",
        ],
      },
      {
        title: "AWS features used",
        aws: true,
        items: [
          "<strong>Route&nbsp;53</strong> for DNS · <strong>ACM</strong> for TLS on the domain",
          "<strong>EC2 Auto Scaling Group</strong> behind an <strong>Application Load Balancer</strong>",
          "<strong>RDS PostgreSQL</strong> as the managed database",
          "<strong>S3</strong> for object storage (IAM instance-profile auth, keyless)",
          "<strong>ECR</strong> for container images · <strong>IAM OIDC</strong> for keyless GitHub Actions deploys",
          "<strong>CloudWatch</strong> for monitoring · <strong>Terraform</strong> for all infrastructure as code",
        ],
      },
    ],
  },
];

const EXPERIENCE = [
  {
    when: "Apr 2026 — Present",
    role: "Cloud & DevOps — Independent",
    org: "Self-directed, project-based",
    bullets: [
      "Designed and deployed EcoChess and VitalID on AWS end to end — application, Docker, CI/CD and Terraform-managed infrastructure.",
      "Built a Linux and cloud foundation on Ubuntu and Rocky Linux; documented commands and real-world SysAdmin / DevOps scenarios.",
      "Studying for AWS Solutions Architect Associate (SAA-C03); will sit the exam once consistently passing practice tests.",
    ],
  },
  {
    when: "Sep 2023 — Mar 2024",
    role: "Data Analyst Intern",
    org: "Aivariant · Bangalore, India",
    bullets: [
      "Built Excel Pivot / ETL workflows that reduced preprocessing time in analysis.",
      "Delivered dashboards across Excel, Tableau, SQL and Power BI; performed data wrangling and modelling on varied datasets.",
    ],
  },
  {
    when: "May 2021 — Jul 2022",
    role: "Trainee Engineer",
    org: "AFPLStores.com Pvt. Ltd.",
    bullets: [
      "Collated and analyzed operational data; prepared reports on trends, patterns and predictions for management.",
      "Reviewed performance indicators and presented findings to support decision-making.",
    ],
  },
];

const EDUCATION = [
  { when: "2021", degree: "B.E. — Computer Science & Engineering", school: "Sipna College of Engineering & Technology, Amravati", score: "75%" },
  { when: "2018", degree: "Diploma — Computer Science & Engineering", school: "P. R. Pote (Patil) Institute of Polytechnic & Technology, Amravati", score: "69.09%" },
];

const INTERESTS_HTML =
  "<strong>Chess</strong> &mdash; competitive player, recently began over-the-board tournaments; analyzing my own games led me to build EcoChess.";
