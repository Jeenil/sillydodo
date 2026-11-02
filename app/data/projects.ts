// All project content for the site lives here, so adding a project is a data
// change only. Keep work entries generic: no internal names or systems.

import type { TechKey } from "./tech";

export type RoleId = "engineer" | "senior" | "support";

export interface Role {
  id: RoleId;
  title: string;
  dates: string;
}

// Same order and titles as the resume
export const roles: Role[] = [
  { id: "engineer", title: "Associate Systems Engineer", dates: "Nov 2024 – Present" },
  { id: "senior", title: "Senior Support Specialist", dates: "Nov 2023 – Nov 2024" },
  { id: "support", title: "System Support Specialist", dates: "Apr 2021 – Nov 2023" },
];

export interface WorkProject {
  name: string;
  role: RoleId;
  // One line, always visible on the card
  summary: string;
  // Headline number shown big on the card
  metric?: { value: string; label: string };
  status?: string;
  // Shown when the card is expanded
  details?: string[];
  // What I learned or would do differently next time
  lesson?: string;
  // Mermaid chart, only where a picture explains more than the text
  diagram?: string;
  tech?: TechKey[];
}

// Add new entries here as projects wrap up
export const workProjects: WorkProject[] = [
  {
    name: "Onboarding and Access as Code",
    role: "engineer",
    tech: ["entra", "terraform", "graph"],
    summary: "New hires get the right access on day one, based on their department, location and title.",
    details: [
      "The HR system creates each new hire's accounts automatically.",
      "Entitlement Management rules in Terraform assign access packages from department, location and title.",
      "Every rule change goes through a reviewed pull request instead of a manual ticket.",
    ],
    lesson:
      "I waited too long on upstream Terraform fixes that never shipped. Next time I'll contribute upstream or build my own module sooner.",
    diagram: `
flowchart LR
    HR([HR system]) -->|department, location, title| USERS[Entra ID users]
    PR([Pull request]) --> CI[Lint, plan, review]
    CI --> POL[Auto-assignment policies]
    USERS --> POL
    POL --> PKG[Access packages]
    PKG --> RES[Groups, Teams, SharePoint, apps]
`,
  },
  {
    name: "External Users to Entra ID",
    role: "engineer",
    tech: ["entra", "graph", "powershell"],
    metric: { value: "3,650", label: "external users moved" },
    summary: "Moved users across ~197 client organizations from email-based login to Entra ID.",
    details: [
      "Users are defined in a config file in Git; a pipeline invites them and grants app access through access packages.",
      "A sync every 2 hours keeps access current, with retries when Microsoft Graph throttles.",
    ],
    lesson:
      "The first pass missed users who hadn't signed in for 8+ months. Next time I'll scope inactive accounts in from the start and check the counts before cutover.",
  },
  {
    name: "File Shares to Azure Files",
    role: "engineer",
    tech: ["azure", "kubernetes", "activeDirectory"],
    metric: { value: "16 TB", label: "migrated, zero data loss" },
    summary: "Moved on-prem file shares to Azure Files with least-privilege access.",
    details: [
      "Private endpoints and Kerberos sign-in instead of storage keys.",
      "Permissions rebuilt around read-only and read-write groups.",
      "Cutover and rollback tooling written first: the first attempt rolled back cleanly and the second succeeded.",
      "Kubernetes workloads on-prem and in AKS moved onto the new mounts.",
    ],
    lesson:
      "The first cutover was rolled back because a firewall rule blocked outbound traffic. Next time I'll test every network path from the real workload before cutover.",
    diagram: `
flowchart LR
    ONP[On-prem Kubernetes] -->|SMB with Kerberos| PE[Private endpoint]
    AKS[AKS] -->|SMB with Kerberos| PE
    PE --> AZF[(Azure Files)]
    AD[Active Directory] -->|Kerberos tickets| ONP
    AD -->|Kerberos tickets| AKS
`,
  },
  {
    name: "SFTP to Azure",
    role: "engineer",
    tech: ["azure", "terraform"],
    status: "In progress",
    summary: "Moving client file transfers from on-prem servers to Azure.",
    details: [
      "Dedicated networking, load balancing and firewall rules, with tightened network security groups.",
      "Storage lifecycle rules for transferred data.",
    ],
  },
  {
    name: "Hybrid Data Transfer on Kubernetes",
    role: "engineer",
    tech: ["kubernetes", "azure"],
    metric: { value: "585 GB+", label: "of transfers handled" },
    summary: "Designed file and HL7 data transfers across on-prem and Azure, then moved them to Kubernetes.",
  },
  {
    name: "CI/CD Guardrails",
    role: "engineer",
    tech: ["powershell", "terraform"],
    summary: "Every change is linted, validated and safety-checked before a teammate reviews it.",
    details: [
      "Linting for scripts and config files.",
      "Checks that block changes to protected locations.",
      "Migration scripts that refuse mismatched source and destination paths.",
    ],
  },
  {
    name: "Scheduled PowerShell on AKS",
    role: "engineer",
    tech: ["powershell", "kubernetes", "azure"],
    summary: "Scheduled scripts run as Kubernetes CronJobs and sign in with workload identity, not stored secrets.",
    lesson: "A stale container image ran in production. Next time I'll pin immutable image tags from day one.",
  },
  {
    name: "Active Directory as Code",
    role: "engineer",
    tech: ["activeDirectory", "powershell"],
    summary: "Service accounts and gMSAs are managed through pipelines instead of by hand.",
  },
  {
    name: "Onboarding and Offboarding Automation",
    role: "senior",
    tech: ["powershell", "activeDirectory"],
    metric: { value: "$200K", label: "saved per year" },
    summary: "Cut processing time from 4 hours to 15 minutes.",
  },
  {
    name: "File Servers to Azure and SharePoint",
    role: "senior",
    tech: ["azure", "powershell"],
    metric: { value: "10 TB+", label: "migrated" },
    summary: "Moved on-prem file servers and VMs to Azure Storage and SharePoint Online, 2 weeks ahead of schedule.",
  },
  {
    name: "Access Cleanup",
    role: "senior",
    tech: ["activeDirectory", "azure"],
    metric: { value: "50+", label: "file shares locked down" },
    summary: "Tightened permissions across file shares, 30+ servers and 5+ storage accounts.",
  },
  {
    name: "Endpoint Management",
    role: "support",
    tech: ["intune"],
    metric: { value: "3h → 45m", label: "device setup" },
    summary: "Set up 700+ Windows and macOS laptops and reached 100% LAPS, BitLocker and MDM compliance in 3 months.",
  },
];

// What I've picked up so far, said casually with a King Gizzard nod.
// Shown on the About page.
export const lessonsLearned = [
  "Plan the way back before going forward. Every cutover should be able to loop home, Nonagon Infinity style.",
  "Keep it simple. A riff the whole band can play beats a microtonal masterpiece nobody else can tune to.",
  "Test from where the real thing runs, not just from my laptop. Learned that one the hard way.",
  "Write a short design doc first, so everyone agrees on the setlist before the show.",
  "Logs and alerts go in at the start, not after the rats' nest is already on fire.",
  "Not everything needs to be code. Some things live in the portal, as long as they're written down.",
];

export interface Repo {
  name: string;
  repoUrl: string;
  description: string;
  // First entry sets the card's accent color and logo
  tech: TechKey[];
  // Plain labels that aren't a technology
  tags?: string[];
  registryUrl?: string;
  registryLabel?: string;
  registryColor?: string;
  extraLink?: { label: string; url: string };
  // Published packages are listed first, apart from side projects
  published?: boolean;
  // Fixes sent to other projects while building this one
  upstream?: { label: string; url: string; merged: boolean }[];
}

// Public GitHub repos only; private repos 404 for visitors
export const repos: Repo[] = [
  {
    name: "terraform-azuread-identity-governance",
    repoUrl: "https://github.com/Jeenil/terraform-azuread-identity-governance",
    description:
      "Terraform module for Entra ID Entitlement Management: catalogs, access packages, auto-assignment policies and SharePoint/Teams resources. Runs a real identity governance setup; 22 releases so far.",
    tech: ["terraform", "entra", "graph"],
    tags: ["Identity Governance"],
    registryUrl: "https://registry.terraform.io/modules/Jeenil/identity-governance/azuread/latest",
    registryLabel: "Terraform Registry",
    published: true,
    registryColor: "purple",
    extraLink: {
      label: "Why this exists",
      url: "https://registry.terraform.io/modules/Jeenil/identity-governance/azuread/latest#why-not-use-fortytwoservicesterraform-azuread-entitlement-management",
    },
    upstream: [
      {
        label: "Microsoft msgraph provider: honour Graph API Retry-After",
        url: "https://github.com/microsoft/terraform-provider-msgraph/pull/119",
        merged: true,
      },
      {
        label: "fortytwoservices EM module: auto-assignment policy support",
        url: "https://github.com/fortytwoservices/terraform-azuread-entitlement-management/pull/313",
        merged: true,
      },
      {
        label: "HashiCorp azuread provider: AadApplication and SharePointOnline associations",
        url: "https://github.com/hashicorp/terraform-provider-azuread/pull/1880",
        merged: false,
      },
    ],
  },
  {
    name: "entra-vacuum",
    repoUrl: "https://github.com/Jeenil/entra-vacuum",
    description:
      "PowerShell module that syncs access package assignments to their auto-assignment rules faster than Entra's 24-hour cycle, with a drift preview before it changes anything.",
    tech: ["powershell", "entra", "graph", "githubActions", "pester"],
    registryUrl: "https://www.powershellgallery.com/packages/EntraVacuum",
    registryLabel: "PSGallery",
    published: true,
    registryColor: "blue",
  },
  {
    name: "music-logger",
    repoUrl: "https://github.com/Jeenil/music-logger",
    description:
      "Watches my Spotify playback, posts track changes to Discord and charts my listening in Grafana from Azure Log Analytics. Runs 24/7 on Railway.",
    tech: ["typescript", "logAnalytics", "grafana", "discord"],
  },
  {
    name: "discogs-state-mgmt",
    repoUrl: "https://github.com/Jeenil/discogs-state-mgmt",
    description:
      "My record collection as a JSON file in Git: edit the file and the Discogs collection follows.",
    tech: ["powershell", "githubActions", "discogs"],
    tags: ["Declarative State"],
  },
  {
    name: "casio-lk-keyboard-learning-guide",
    repoUrl: "https://github.com/Jeenil/casio-lk-keyboard-learning-guide",
    description:
      "My step-by-step notes for learning keyboard on a Casio LK.",
    tech: ["markdown"],
    tags: ["Music", "Documentation"],
  },
];
