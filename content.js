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
  { label: "Cloud / AWS", tags: ["EC2", "S3", "Route 53", "CloudFront", "ACM", "ALB / ASG", "ECR", "IAM & OIDC", "Budgets"] },
  { label: "DevOps / Infra", tags: ["Terraform", "Docker", "GitHub Actions CI/CD", "Linux", "Nginx", "Bash", "Git"] },
  { label: "Backend & data layer", tags: ["FastAPI", "Alembic", "PostgreSQL", "REST APIs", "pytest", "Uvicorn"] },
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
      "Static HTML/CSS/JavaScript portfolio hosted on AWS with automated CI/CD deployment",
      "Custom domain with HTTPS, globally cached through CloudFront, deployed on every GitHub push",
    ],
    tags: ["HTML", "CSS", "JavaScript", "S3", "CloudFront", "Route 53", "GitHub Actions"],
    detailsLabel: "How it's built & deployed",
    detailBlocks: [
      {
        title: "Development",
        items: [
          "Designed the architecture and structure myself; used AI to accelerate the HTML/CSS/JavaScript implementation",
          "Manually provisioned all AWS infrastructure: S3 bucket, CloudFront distribution, Route 53, ACM certificate, IAM users with least-privilege policies",
          "Built the GitHub Actions CI/CD pipeline for automated deployment and cache invalidation",
          "Debugged end-to-end until the site was fully live and accessible — DNS propagation, OAC permissions, CloudFront cache behavior, everything",
        ],
      },
      {
        title: "AWS features used",
        aws: true,
        items: [
          "<strong>S3</strong> — private bucket holding the static files (the origin), locked with Origin Access Control",
          "<strong>CloudFront</strong> — CDN in front of S3 for HTTPS, edge caching, and low latency globally",
          "<strong>ACM</strong> — TLS certificate covering <code>gauravkanere.link</code>",
          "<strong>Route 53</strong> — hosted zone for the apex domain and DNS management",
          "<strong>GitHub Actions</strong> — on push, syncs files to S3 and invalidates the CloudFront cache",
        ],
      },
      {
        title: "Why this shape",
        items: [
          "S3 + CloudFront + Route 53 + ACM is the standard, cost-effective pattern for static site hosting on AWS",
          "Demonstrates infrastructure thinking: chose this design deliberately for cost (~$0.50/month), scale, and caching behavior",
          "Proves end-to-end ownership: architecture decisions, infrastructure setup, deployment automation, and operational debugging",
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
