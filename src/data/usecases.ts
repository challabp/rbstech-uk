import legacy from './legacy.json';
import { additions, type Addition } from './additions';
import { accounting } from './accounting';
import { industries, industryByLegacy, industryBySlug } from './industries';
import { patternByLegacy, patternBySlug } from './patterns';
import { plain } from './plain';
import { summaries, names } from './summaries';

export interface UseCase {
  slug: string;
  name: string;
  summary: string;
  industry: string;
  pattern: string;
  tags: string[];
  isNew: boolean;
  stage?: string;
  trigger: string;
  system: string;
  knowledge: string;
  problem?: string;
  does?: string[];
  gate?: string;
  integrates?: string[];
  measures?: string[];
  benefits?: string[];
}

interface LegacyRow {
  ind: string;
  name: string;
  desc: string;
  tags: string[];
  topo: string;
  entry: string;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

// British spelling for text carried over from the original catalogue.
const stems = ['optimi', 'personali', 'summari', 'synthesi', 'prioriti', 'locali', 'organi', 'normali', 'recogni', 'authori', 'categori', 'moderni', 'utili', 'standardi', 'minimi', 'maximi', 'speciali'];
const british = (s: string) =>
  s
    .replace(new RegExp(`\\b(${stems.join('|')})z(e|ed|es|ing|ation|ations|er)\\b`, 'gi'), '$1s$2')
    .replace(/\banalyz(e|ed|es|ing)\b/gi, 'analys$1')
    .replace(/\bcatalog\b/g, 'catalogue')
    .replace(/\bdialog\b/g, 'dialogue')
    .replace(/\blabor\b/g, 'labour')
    .replace(/\bcenter/g, 'centre')
    .replace(/\b[Cc]opilot\b/g, (m) => (m[0] === 'C' ? 'Assistant' : 'assistant'));

const entryLabel: Record<string, string> = {
  'Teams chat': 'Chat message',
  'Teams chatbot': 'Chat assistant',
  'Form / document upload': 'Document upload',
  'System event / signal': 'System event',
  'Voice / telephony': 'Phone call',
  'System / API trigger': 'API event',
  'Email (shared mailboxes)': 'Shared mailbox',
};

const defaultTrigger: Record<string, string> = {
  'straight-line-task': 'Request form',
  'conversational-assistant': 'Voice or chat',
  'grounded-research': 'Analyst question',
  'draft-and-review': 'Brief',
  'decision-with-approval-gate': 'Case file',
  'transaction-processing': 'Inbound document',
  'watch-and-escalate': 'System event',
  'analytics-on-governed-data': 'Question or schedule',
  'orchestrator-and-specialists': 'Goal',
};

// Pattern corrections: the original catalogue assigned some use cases to a pattern that does not fit the work.
const P = {
  line: 'straight-line-task',
  chat: 'conversational-assistant',
  research: 'grounded-research',
  draft: 'draft-and-review',
  decide: 'decision-with-approval-gate',
  txn: 'transaction-processing',
  watch: 'watch-and-escalate',
  data: 'analytics-on-governed-data',
  orch: 'orchestrator-and-specialists',
};
const patternFix: Record<string, string> = {
  'Fraud Investigation Agent': P.orch,
  'Payer Policy Search Agent': P.research,
  'Post-Discharge Follow-up Agent': P.chat,
  'Medication Reconciliation Agent': P.decide,
  'Patient Billing Concierge': P.chat,
  'Personal Finance Coach Agent': P.chat,
  'Treasury Cash Position Agent': P.data,
  'Earnings Call Analyst Agent': P.draft,
  'Compliance Policy Q&A Agent': P.research,
  'Employee HR Helpdesk Agent': P.chat,
  'eDiscovery Review Agent': P.research,
  'Matter Status & Briefing Agent': P.draft,
  'Billing Narrative Agent': P.draft,
  'Lesson Planning Agent': P.draft,
  'Curriculum Design Agent': P.draft,
  'Assessment Builder Agent': P.draft,
  'Open-Response Grading Agent': P.decide,
  'Academic Advising Agent': P.chat,
  'Education Compliance Reporting Agent': P.draft,
  'Freight Quoting & Tendering Agent': P.txn,
  'Logistics Sustainability Reporting Agent': P.data,
  'Listing Content & Marketing Agent': P.draft,
  'Market Intelligence Agent': P.watch,
  'Tenant Service Agent': P.chat,
  'Transaction Coordinator Agent': P.orch,
  'Medical Bill Review Agent': P.decide,
  'Catastrophe Response Agent': P.orch,
  'Ad Trafficking & QC Agent': P.decide,
  'Podcast Production Agent': P.draft,
  'Creator Workflow Agent': P.draft,
  'Translation & Localization Agent': P.draft,
  'Rights Clearance Agent': P.decide,
  'Live Events Production Agent': P.watch,
  'Multi-City Itinerary Planner': P.chat,
  'Corporate Travel Policy Agent': P.chat,
  'Travel Customer Service Agent': P.chat,
  'OTA Merchandising Agent': P.data,
  'Attribution & Mix Modeling Agent': P.data,
  'Security Vulnerability Triage Agent': P.decide,
  'Codebase Migration Agent': P.orch,
  'Doc Writing & Maintenance Agent': P.draft,
  'Warranty & Claims Agent': P.decide,
  'Returns & Exchange Agent': P.chat,
  'Quality Inspection Agent': P.decide,
  'Spare Parts Inventory Agent': P.data,
};

function fromLegacy(r: LegacyRow): UseCase {
  const ind = industryByLegacy[r.ind];
  const pattern = patternFix[r.name] ?? patternByLegacy[r.topo].slug;
  const name = british(names[r.name] ?? r.name);
  if (!summaries[r.name]) throw new Error(`No plain-language summary for ${r.name}`);
  return {
    slug: slugify(name),
    name,
    summary: summaries[r.name],
    industry: ind.slug,
    pattern,
    tags: r.tags.map(british),
    isNew: false,
    trigger: patternFix[r.name] ? defaultTrigger[pattern] : (entryLabel[r.entry] ?? defaultTrigger[pattern]),
    system: ind.system,
    knowledge: ind.knowledge,
  };
}

function fromAddition(a: Addition): UseCase {
  const ind = industryBySlug[a.industry];
  return {
    ...a,
    slug: slugify(a.name),
    isNew: true,
    trigger: a.trigger ?? defaultTrigger[a.pattern],
    system: a.system ?? ind.system,
    knowledge: a.knowledge ?? ind.knowledge,
  };
}

const all: UseCase[] = [...accounting.map(fromAddition), ...(legacy as LegacyRow[]).map(fromLegacy), ...additions.map(fromAddition)];

// Keep industries in their defined order, with newer use cases after the established ones.
const order = Object.fromEntries(industries.map((i, n) => [i.slug, n]));
export const useCases: UseCase[] = all
  .map((u, n) => ({ u, n }))
  .sort((a, b) => order[a.u.industry] - order[b.u.industry] || a.n - b.n)
  .map(({ u }) => u);

const seen = new Set<string>();
for (const u of useCases) {
  if (seen.has(u.slug)) throw new Error(`Duplicate use case slug: ${u.slug}`);
  seen.add(u.slug);
  if (!patternBySlug[u.pattern]) throw new Error(`Unknown pattern on ${u.name}: ${u.pattern}`);
  if (!industryBySlug[u.industry]) throw new Error(`Unknown industry on ${u.name}: ${u.industry}`);
}

export const useCaseBySlug = Object.fromEntries(useCases.map((u) => [u.slug, u]));
export const byIndustry = (slug: string) => useCases.filter((u) => u.industry === slug);
export const byPattern = (slug: string) => useCases.filter((u) => u.pattern === slug);

export const fill = (text: string, u: Pick<UseCase, 'trigger' | 'system' | 'knowledge'>) =>
  text.replace(/\{trigger\}/g, u.trigger).replace(/\{system\}/g, u.system).replace(/\{knowledge\}/g, u.knowledge);

// Plain-language steps for a solution. Kept general on purpose: the exact
// systems and data are agreed with each customer during scoping.
export function howFor(u: UseCase): string[] {
  return plain[u.pattern].how.map((step) => fill(step, { trigger: u.trigger, system: 'your system', knowledge: 'your data' }));
}

export const counts = {
  useCases: useCases.length,
  industries: industries.length,
  patterns: Object.keys(patternBySlug).length,
};
