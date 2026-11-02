// The principles behind the work. Each has a one-line "why" and a link to the
// original source, so readers can see where the idea comes from.

export interface Principle {
  name: string;
  why: string;
  url: string;
  source: string;
}

export const securityPrinciples: Principle[] = [
  {
    name: "Zero Trust",
    why: "Verify every request, grant the least access needed, and assume something is already compromised. The network is not a trust boundary.",
    url: "https://learn.microsoft.com/security/zero-trust/zero-trust-overview",
    source: "Microsoft Learn",
  },
  {
    name: "Least privilege",
    why: "No standing admin rights: roles are eligible through PIM, and each automation gets only the permissions its job needs.",
    url: "https://csrc.nist.gov/glossary/term/least_privilege",
    source: "NIST",
  },
  {
    name: "Identity over secrets",
    why: "Pipelines and jobs sign in with workload identity, so there are no passwords or keys to leak or rotate.",
    url: "https://learn.microsoft.com/entra/workload-id/workload-identities-overview",
    source: "Microsoft Learn",
  },
  {
    name: "Private by default",
    why: "Data services sit behind private endpoints, so they're never reachable from the public internet.",
    url: "https://learn.microsoft.com/azure/private-link/private-endpoint-overview",
    source: "Microsoft Learn",
  },
];

export const engineeringPrinciples: Principle[] = [
  {
    name: "KISS",
    why: "The simplest design that works is the easiest to secure, review and hand off to a teammate.",
    url: "https://en.wikipedia.org/wiki/KISS_principle",
    source: "Wikipedia",
  },
  {
    name: "YAGNI",
    why: "Build for the need in front of me, not a guessed future one. Extra options are extra things to maintain and get wrong.",
    url: "https://martinfowler.com/bliki/Yagni.html",
    source: "Martin Fowler",
  },
  {
    name: "DRY",
    why: "Logic that shows up twice becomes one shared module, so a fix lands everywhere at once. But abstraction only helps if the team can still follow it: a little repetition beats a module nobody else can read or change.",
    url: "https://thevaluable.dev/dry-principle-cost-benefit-example/",
    source: "The Valuable Dev",
  },
  {
    name: "Code where it pays off",
    why: "Repeated work and access rules go in Git and through review. Some things stay in the portal on purpose, like SCIM app provisioning when the tooling can't manage it cleanly, and those get documented instead.",
    url: "https://martinfowler.com/bliki/InfrastructureAsCode.html",
    source: "Martin Fowler",
  },
  {
    name: "Conventional Commits",
    why: "Commit messages like feat: and fix: make history readable and let tooling write the changelog and pick the next version.",
    url: "https://www.conventionalcommits.org/en/v1.0.0/",
    source: "conventionalcommits.org",
  },
  {
    name: "Semantic Versioning",
    why: "Module releases tell users what changed: a major bump means a breaking change, so upgrades are never a surprise.",
    url: "https://semver.org/",
    source: "semver.org",
  },
];

export const operationsPrinciples: Principle[] = [
  {
    name: "Observable by default",
    why: "Scripts and pipelines log to one shared place, with Application Insights and workbooks showing what ran and what failed, so problems are found from data, not guesses.",
    url: "https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview",
    source: "Microsoft Learn",
  },
  {
    name: "Alert on what matters",
    why: "Alerts fire on real failures, like an expiring Kerberos ticket or a failed sync, not on noise, so people still trust them when they go off.",
    url: "https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-overview",
    source: "Microsoft Learn",
  },
  {
    name: "Backups that restore",
    why: "File shares get scheduled backups plus soft delete as a safety net, and a backup only counts once a restore has been tested.",
    url: "https://learn.microsoft.com/azure/backup/azure-file-share-backup-overview",
    source: "Microsoft Learn",
  },
  {
    name: "Plan the rollback first",
    why: "Every cutover has a written way back before it starts, and a rollback is treated as information, not failure.",
    url: "https://sre.google/sre-book/postmortem-culture/",
    source: "Google SRE book",
  },
];
