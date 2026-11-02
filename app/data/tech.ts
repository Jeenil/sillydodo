// One entry per technology: brand color, logo and official docs.
// Logos are from devicon (MIT) and live in public/logos. Techs without an
// official logo there show a color dot instead.

export interface Tech {
  label: string;
  color: string;
  docsUrl: string;
  logo?: string;
}

export const tech = {
  terraform: {
    label: "Terraform",
    color: "#7B42BC",
    docsUrl: "https://developer.hashicorp.com/terraform/docs",
    logo: "/logos/terraform.svg",
  },
  powershell: {
    label: "PowerShell",
    color: "#5391FE",
    docsUrl: "https://learn.microsoft.com/powershell/",
    logo: "/logos/powershell.svg",
  },
  azure: {
    label: "Azure",
    color: "#0078D4",
    docsUrl: "https://learn.microsoft.com/azure/",
    logo: "/logos/azure.svg",
  },
  entra: {
    label: "Entra ID",
    color: "#0078D4",
    docsUrl: "https://learn.microsoft.com/entra/",
  },
  intune: {
    label: "Intune",
    color: "#0078D4",
    docsUrl: "https://learn.microsoft.com/mem/intune/",
  },
  activeDirectory: {
    label: "Active Directory",
    color: "#00A4EF",
    docsUrl: "https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview",
  },
  graph: {
    label: "Microsoft Graph",
    color: "#2B88D8",
    docsUrl: "https://learn.microsoft.com/graph/overview",
  },
  logAnalytics: {
    label: "Azure Log Analytics",
    color: "#0078D4",
    docsUrl: "https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview",
    logo: "/logos/azure.svg",
  },
  kubernetes: {
    label: "Kubernetes",
    color: "#326CE5",
    docsUrl: "https://kubernetes.io/docs/",
    logo: "/logos/kubernetes.svg",
  },
  typescript: {
    label: "TypeScript",
    color: "#3178C6",
    docsUrl: "https://www.typescriptlang.org/docs/",
    logo: "/logos/typescript.svg",
  },
  go: {
    label: "Go",
    color: "#00ADD8",
    docsUrl: "https://go.dev/doc/",
    logo: "/logos/go.svg",
  },
  githubActions: {
    label: "GitHub Actions",
    color: "#2088FF",
    docsUrl: "https://docs.github.com/actions",
    logo: "/logos/githubactions.svg",
  },
  grafana: {
    label: "Grafana",
    color: "#F46800",
    docsUrl: "https://grafana.com/docs/grafana/latest/",
    logo: "/logos/grafana.svg",
  },
  bash: {
    label: "Bash",
    color: "#4EAA25",
    docsUrl: "https://www.gnu.org/software/bash/manual/",
    logo: "/logos/bash.svg",
  },
  markdown: {
    label: "Markdown",
    color: "#888888",
    docsUrl: "https://www.markdownguide.org/",
    logo: "/logos/markdown.svg",
  },
  pester: {
    label: "Pester",
    color: "#E65C2B",
    docsUrl: "https://pester.dev/docs/quick-start",
  },
  discord: {
    label: "Discord",
    color: "#5865F2",
    docsUrl: "https://discord.com/developers/docs",
  },
  discogs: {
    label: "Discogs API",
    color: "#D4A017",
    docsUrl: "https://www.discogs.com/developers",
  },
} satisfies Record<string, Tech>;

export type TechKey = keyof typeof tech;
