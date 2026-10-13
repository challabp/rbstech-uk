// The nine architecture patterns every solution is built from.
// Node titles may contain {trigger}, {system} and {knowledge}, filled per use case.

export type NodeKind = 'trigger' | 'agent' | 'tool' | 'data' | 'human' | 'out';

export interface DNode {
  id: string;
  c: number; // column, 0-based
  r: number; // row, 0-based
  kind: NodeKind;
  t: string;
  s?: string;
}
export interface DEdge {
  from: string;
  to: string;
  label?: string;
  back?: boolean; // loop or return path, drawn dashed
}
export interface Step {
  kind: NodeKind;
  who: string;
  does: string;
}
export interface Pattern {
  slug: string;
  legacy: string;
  name: string;
  short: string;
  when: string;
  why: string;
  control: string;
  outcome: string;
  measures: string[];
  stack: string[];
  nodes: DNode[];
  edges: DEdge[];
  steps: Step[];
}

export const patterns: Pattern[] = [
  {
    slug: 'straight-line-task',
    legacy: 'Linear pipeline',
    name: 'Straight-line task',
    short: 'Intake, act, confirm.',
    when: 'A contained job in one system with a clear definition of done.',
    why: 'The task lives in one system and has one right answer, so the design stays deliberately small: take the request in, do the work, confirm it. Adding orchestration here would add failure points without adding value.',
    control: 'A completion check runs before anything is confirmed. Items that fail it go to a named queue with the reason attached.',
    outcome: 'A routine task that runs reliably at any volume',
    measures: ['Share of items completed without a person', 'End-to-end handling time', 'Completion-check failure rate'],
    stack: ['A fast, low-cost model tier', 'Typed tool calls to one system', 'Schema-validated output', 'Trace logging'],
    nodes: [
      { id: 'in', c: 0, r: 0, kind: 'trigger', t: '{trigger}', s: 'request arrives' },
      { id: 'read', c: 1, r: 0, kind: 'agent', t: 'Read and classify', s: 'intent, required fields' },
      { id: 'act', c: 2, r: 0, kind: 'tool', t: '{system}', s: 'perform the action' },
      { id: 'chk', c: 2, r: 1, kind: 'agent', t: 'Completion check', s: 'did it do what was asked' },
      { id: 'out', c: 1, r: 1, kind: 'out', t: 'Confirm to requester' },
      { id: 'q', c: 0, r: 1, kind: 'human', t: 'Exception queue', s: 'only failed checks' },
    ],
    edges: [
      { from: 'in', to: 'read' },
      { from: 'read', to: 'act' },
      { from: 'act', to: 'chk' },
      { from: 'chk', to: 'out', label: 'pass' },
      { from: 'out', to: 'q', label: 'fail', back: true },
    ],
    steps: [
      { kind: 'trigger', who: 'Intake', does: 'Request received from {trigger} and normalised into one record.' },
      { kind: 'agent', who: 'Agent', does: 'Classifies the request and checks every required field is present.' },
      { kind: 'tool', who: 'Tool call', does: 'Performs the action in {system}.' },
      { kind: 'agent', who: 'Agent', does: 'Runs the completion check against the original request.' },
      { kind: 'out', who: 'Result', does: 'Confirms to the requester and writes the trace to the audit store.' },
    ],
  },
  {
    slug: 'conversational-assistant',
    legacy: 'Conversational assist loop',
    name: 'Conversational assistant',
    short: 'Ask, clarify, act, hand over.',
    when: 'The work happens in dialogue, by voice or chat, and the person may not know what to ask for.',
    why: 'The work happens in conversation, so the defining feature is the clarification loop. When the agent is unsure it asks rather than guesses, and when it reaches the edge of its remit it hands over to a person with the full context.',
    control: 'Actions that change a record are confirmed with the user first. A handover to a person carries the transcript and what has already been tried.',
    outcome: 'Faster resolution, available around the clock',
    measures: ['Resolution without handover', 'Turns to resolution', 'Handover quality as rated by staff', 'User satisfaction'],
    stack: ['A frontier model for dialogue', 'Streaming speech-to-text and text-to-speech for voice', 'Retrieval over approved knowledge', 'Session memory with retention limits'],
    nodes: [
      { id: 'in', c: 0, r: 0, kind: 'trigger', t: '{trigger}', s: 'voice or chat' },
      { id: 'und', c: 1, r: 0, kind: 'agent', t: 'Understand', s: 'intent, identity, context' },
      { id: 'kn', c: 2, r: 0, kind: 'data', t: '{knowledge}', s: 'retrieve what applies' },
      { id: 'clar', c: 1, r: 1, kind: 'agent', t: 'Clarify', s: 'ask when unsure' },
      { id: 'act', c: 2, r: 1, kind: 'tool', t: '{system}', s: 'look up, book, update' },
      { id: 'hum', c: 0, r: 1, kind: 'human', t: 'Handover', s: 'with full context' },
      { id: 'out', c: 2, r: 2, kind: 'out', t: 'Answer and follow-up' },
    ],
    edges: [
      { from: 'in', to: 'und' },
      { from: 'und', to: 'kn' },
      { from: 'und', to: 'clar', label: 'unsure' },
      { from: 'clar', to: 'hum', label: 'out of remit', back: true },
      { from: 'kn', to: 'act' },
      { from: 'act', to: 'out' },
    ],
    steps: [
      { kind: 'trigger', who: 'Intake', does: 'Conversation opens on {trigger}.' },
      { kind: 'agent', who: 'Agent', does: 'Identifies the person and what they are trying to get done.' },
      { kind: 'data', who: 'Retrieval', does: 'Pulls the policies and records that apply from {knowledge}.' },
      { kind: 'agent', who: 'Agent', does: 'Asks one clarifying question where the request is ambiguous.' },
      { kind: 'tool', who: 'Tool call', does: 'Carries out the agreed action in {system}.' },
      { kind: 'out', who: 'Result', does: 'Confirms what was done and sends a written summary.' },
    ],
  },
  {
    slug: 'grounded-research',
    legacy: 'Retrieval-grounded analysis',
    name: 'Grounded research',
    short: 'Retrieve, reason, cite.',
    when: 'The answer is only useful if every claim can be traced to a source the reader trusts.',
    why: 'Correctness depends on citing the right source. Hybrid retrieval that respects permissions and freshness feeds a reasoning step that has to ground every claim, and a claim with no source is removed before the reader sees it.',
    control: 'Each statement links to the passage it came from. A verification pass removes anything it cannot ground, and the reviewer sees what was dropped.',
    outcome: 'Defensible answers in a fraction of the research time',
    measures: ['Citation precision on a signed-off test set', 'Unsupported-claim rate', 'Research time per question', 'Reviewer edit distance'],
    stack: ['Hybrid search with keyword and vector indexes', 'Re-ranking', 'Permission-trimmed retrieval', 'A frontier model with long context', 'Citation verification'],
    nodes: [
      { id: 'in', c: 0, r: 0, kind: 'trigger', t: '{trigger}', s: 'question or file' },
      { id: 'plan', c: 1, r: 0, kind: 'agent', t: 'Plan the search', s: 'break into sub-questions' },
      { id: 'ret', c: 2, r: 0, kind: 'data', t: '{knowledge}', s: 'hybrid retrieval' },
      { id: 'rea', c: 2, r: 1, kind: 'agent', t: 'Reason over sources', s: 'every claim cited' },
      { id: 'ver', c: 1, r: 1, kind: 'agent', t: 'Verify citations', s: 'drop what is unsupported' },
      { id: 'hum', c: 0, r: 1, kind: 'human', t: 'Reviewer', s: 'reads with sources' },
    ],
    edges: [
      { from: 'in', to: 'plan' },
      { from: 'plan', to: 'ret' },
      { from: 'ret', to: 'rea' },
      { from: 'rea', to: 'ver' },
      { from: 'ver', to: 'hum' },
      { from: 'ver', to: 'plan', label: 'gap found', back: true },
    ],
    steps: [
      { kind: 'trigger', who: 'Intake', does: 'Question arrives from {trigger}.' },
      { kind: 'agent', who: 'Agent', does: 'Breaks it into sub-questions and plans the searches.' },
      { kind: 'data', who: 'Retrieval', does: 'Searches {knowledge}, limited to what the requester may see.' },
      { kind: 'agent', who: 'Agent', does: 'Reasons across the sources and drafts findings with citations.' },
      { kind: 'agent', who: 'Verifier', does: 'Checks each citation against its passage and removes unsupported claims.' },
      { kind: 'human', who: 'Reviewer', does: 'Receives the analysis with every source one click away.' },
    ],
  },
  {
    slug: 'draft-and-review',
    legacy: 'Generative authoring pipeline',
    name: 'Draft and review',
    short: 'Draft, check, edit, publish.',
    when: 'High volumes of written or visual output that must meet a house standard.',
    why: 'The risk here is a wrong or ungrounded document, not a wrong transaction. So the design centres on a grounded first draft, an automated quality check against your standards, and a person who edits and signs before anything is published.',
    control: 'Drafts must pass an evaluation gate for grounding and style before a person sees them. Nothing is published without a named approver.',
    outcome: 'First drafts in minutes, in your house style',
    measures: ['Time to first draft', 'Share of drafts accepted with light edits', 'Evaluation pass rate', 'Reviewer edit distance'],
    stack: ['A frontier model for drafting', 'A second model as evaluator', 'Templates and style rules as structured prompts', 'Document and image generation tools'],
    nodes: [
      { id: 'in', c: 0, r: 0, kind: 'trigger', t: '{trigger}', s: 'brief or source files' },
      { id: 'ctx', c: 1, r: 0, kind: 'data', t: '{knowledge}', s: 'facts, precedents, style' },
      { id: 'dr', c: 2, r: 0, kind: 'agent', t: 'Draft', s: 'grounded in the sources' },
      { id: 'ev', c: 2, r: 1, kind: 'agent', t: 'Evaluate', s: 'grounding and style gate' },
      { id: 'hum', c: 1, r: 1, kind: 'human', t: 'Edit and approve', s: 'named approver' },
      { id: 'out', c: 0, r: 1, kind: 'tool', t: '{system}', s: 'publish or file' },
    ],
    edges: [
      { from: 'in', to: 'ctx' },
      { from: 'ctx', to: 'dr' },
      { from: 'dr', to: 'ev' },
      { from: 'ev', to: 'hum', label: 'pass' },
      { from: 'hum', to: 'out', label: 'approved' },
      { from: 'ev', to: 'dr', label: 'revise', back: true },
    ],
    steps: [
      { kind: 'trigger', who: 'Intake', does: 'Brief and source material received from {trigger}.' },
      { kind: 'data', who: 'Retrieval', does: 'Gathers facts, precedents and style rules from {knowledge}.' },
      { kind: 'agent', who: 'Agent', does: 'Writes the first draft, grounded in the gathered sources.' },
      { kind: 'agent', who: 'Evaluator', does: 'Scores the draft for grounding and house style; sends it back if it falls short.' },
      { kind: 'human', who: 'Approver', does: 'Edits and approves. Their changes feed the next evaluation set.' },
      { kind: 'tool', who: 'Tool call', does: 'Files the approved version in {system}.' },
    ],
  },
  {
    slug: 'decision-with-approval-gate',
    legacy: 'Decision + approval gate',
    name: 'Decision with approval gate',
    short: 'Assess, recommend, route by risk.',
    when: 'A consequential judgement is being made about a person, a payment or a compliance position.',
    why: 'A consequential judgement is being made, so the approve and refer branches are first-class parts of the design. Low-risk cases inside policy proceed, everything else goes to a person with the reasoning and evidence attached, and every decision is recorded.',
    control: 'Each action carries an approval class: automatic, confirm, approve or manual only. Thresholds are set with you and changed only through review.',
    outcome: 'Consistent, audit-ready decisions with risk properly gated',
    measures: ['Agreement with expert decisions on a signed-off set', 'Share of cases auto-cleared', 'Override rate and reasons', 'Decision turnaround'],
    stack: ['A frontier model for reasoning', 'Rules engine for hard policy limits', 'Document extraction', 'Append-only decision log'],
    nodes: [
      { id: 'in', c: 0, r: 0, kind: 'trigger', t: '{trigger}', s: 'case arrives' },
      { id: 'ev', c: 1, r: 0, kind: 'data', t: 'Gather evidence', s: '{knowledge}' },
      { id: 'as', c: 2, r: 0, kind: 'agent', t: 'Assess against policy', s: 'score, reasons, confidence' },
      { id: 'auto', c: 2, r: 1, kind: 'tool', t: '{system}', s: 'low risk: proceed' },
      { id: 'hum', c: 1, r: 1, kind: 'human', t: 'Approver', s: 'higher risk: decide' },
      { id: 'log', c: 1, r: 2, kind: 'out', t: 'Decision record', s: 'evidence and rationale' },
    ],
    edges: [
      { from: 'in', to: 'ev' },
      { from: 'ev', to: 'as' },
      { from: 'as', to: 'auto', label: 'within limits' },
      { from: 'as', to: 'hum', label: 'refer' },
      { from: 'hum', to: 'log' },
      { from: 'auto', to: 'log' },
    ],
    steps: [
      { kind: 'trigger', who: 'Intake', does: 'Case received from {trigger}.' },
      { kind: 'data', who: 'Retrieval', does: 'Assembles the evidence: documents, history and the policies that apply.' },
      { kind: 'agent', who: 'Agent', does: 'Assesses the case against policy and produces a recommendation with reasons.' },
      { kind: 'agent', who: 'Router', does: 'Checks the recommendation against risk limits to decide who acts.' },
      { kind: 'human', who: 'Approver', does: 'Reviews referred cases with evidence and reasoning side by side, then decides.' },
      { kind: 'out', who: 'Result', does: 'Records the decision in {system} with its full rationale.' },
    ],
  },
  {
    slug: 'transaction-processing',
    legacy: 'Transactional integration',
    name: 'Transaction processing',
    short: 'Extract, validate, post, reconcile.',
    when: 'Money or records move in a system of record and accuracy matters more than eloquence.',
    why: 'Money or records move in a system of record, so the design is built around extraction, validation, posting and reconciliation. Clean items go straight through. Exceptions are the only thing a person sees, and they arrive with the mismatch already explained.',
    control: 'Validation rules and tolerance bands are deterministic code, not model judgement. Postings are idempotent and reconciled after the fact.',
    outcome: 'Straight-through processing with exceptions caught early',
    measures: ['Straight-through rate', 'Field-level extraction accuracy', 'Exception rate by cause', 'Cost per item'],
    stack: ['Document extraction with vision models', 'Deterministic validation rules', 'ERP and core-system connectors', 'Idempotent workflow engine'],
    nodes: [
      { id: 'in', c: 0, r: 0, kind: 'trigger', t: '{trigger}', s: 'document or event' },
      { id: 'ex', c: 1, r: 0, kind: 'agent', t: 'Extract', s: 'fields with confidence' },
      { id: 'val', c: 2, r: 0, kind: 'agent', t: 'Validate and match', s: 'rules, tolerances' },
      { id: 'post', c: 2, r: 1, kind: 'tool', t: '{system}', s: 'post the transaction' },
      { id: 'rec', c: 1, r: 1, kind: 'out', t: 'Reconcile', s: 'confirm it landed' },
      { id: 'hum', c: 0, r: 1, kind: 'human', t: 'Exception desk', s: 'mismatch explained' },
    ],
    edges: [
      { from: 'in', to: 'ex' },
      { from: 'ex', to: 'val' },
      { from: 'val', to: 'post', label: 'clean' },
      { from: 'post', to: 'rec' },
      { from: 'rec', to: 'hum', label: 'exception', back: true },
    ],
    steps: [
      { kind: 'trigger', who: 'Intake', does: 'Item received from {trigger}.' },
      { kind: 'agent', who: 'Agent', does: 'Extracts the fields, each with a confidence score.' },
      { kind: 'agent', who: 'Validator', does: 'Matches against reference data and applies tolerance rules.' },
      { kind: 'tool', who: 'Tool call', does: 'Posts the clean item to {system}.' },
      { kind: 'out', who: 'Result', does: 'Reconciles the posting and closes the item.' },
      { kind: 'human', who: 'Exception desk', does: 'Sees only mismatches, each with the cause identified.' },
    ],
  },
  {
    slug: 'watch-and-escalate',
    legacy: 'Event-driven monitoring loop',
    name: 'Watch and escalate',
    short: 'Monitor, detect, diagnose, alert.',
    when: 'Nobody asks a question. Something changes and somebody needs to know before it becomes a problem.',
    why: 'There is no human trigger. The agent wakes on a signal, runs a continuous watch loop and escalates only when something crosses a threshold. That is why it has an event stream and a conditional branch where other patterns have an intake form.',
    control: 'Escalation thresholds are tuned against false-positive cost. Every alert states what changed, the evidence, and the suggested next step.',
    outcome: 'Problems caught and acted on before they escalate',
    measures: ['Detection lead time', 'Alert precision', 'Missed-event rate from back-testing', 'Time from alert to action'],
    stack: ['Event streaming and scheduled jobs', 'Statistical baselines alongside model judgement', 'A fast model tier for the watch loop', 'A frontier model for diagnosis'],
    nodes: [
      { id: 'src', c: 0, r: 0, kind: 'data', t: 'Signal sources', s: '{knowledge}' },
      { id: 'ing', c: 1, r: 0, kind: 'tool', t: 'Event stream', s: 'ingest and normalise' },
      { id: 'mon', c: 2, r: 0, kind: 'agent', t: 'Watch', s: 'compare with baseline' },
      { id: 'dia', c: 2, r: 1, kind: 'agent', t: 'Diagnose', s: 'cause, impact, priority' },
      { id: 'act', c: 1, r: 1, kind: 'tool', t: '{system}', s: 'open a case, draft the fix' },
      { id: 'hum', c: 0, r: 1, kind: 'human', t: 'Owner', s: 'alerted with evidence' },
    ],
    edges: [
      { from: 'src', to: 'ing' },
      { from: 'ing', to: 'mon' },
      { from: 'mon', to: 'dia', label: 'anomaly' },
      { from: 'dia', to: 'act' },
      { from: 'act', to: 'hum' },
      { from: 'mon', to: 'ing', label: 'normal: keep watching', back: true },
    ],
    steps: [
      { kind: 'data', who: 'Signal', does: 'New events arrive from {knowledge}.' },
      { kind: 'agent', who: 'Watcher', does: 'Compares each signal with its baseline. Most are normal and stay in the loop.' },
      { kind: 'agent', who: 'Agent', does: 'Diagnoses the anomaly: likely cause, who is affected, how urgent.' },
      { kind: 'tool', who: 'Tool call', does: 'Opens a case in {system} and drafts the recommended response.' },
      { kind: 'human', who: 'Owner', does: 'Receives the alert with evidence and a proposed next step.' },
    ],
  },
  {
    slug: 'analytics-on-governed-data',
    legacy: 'Data-grounded analytics',
    name: 'Analytics on governed data',
    short: 'Query, model, explain, recommend.',
    when: 'The question is quantitative and the answer has to match the numbers finance already reports.',
    why: 'The agent reasons over enterprise data, so it sits on a governed data layer and a semantic model with agreed definitions. It writes queries and runs models rather than doing arithmetic in prose, which keeps its numbers consistent with the ones the business already trusts.',
    control: 'Figures come from executed queries, never from model recall. Recommendations above a set value need sign-off before they are applied.',
    outcome: 'Decision-ready analysis from a single source of truth',
    measures: ['Query correctness on a benchmark set', 'Forecast error against actuals', 'Time from question to answer', 'Value of recommendations adopted'],
    stack: ['Warehouse or lakehouse with a semantic layer', 'Text-to-SQL with query validation', 'Optimisation and forecasting libraries', 'Sandboxed code execution'],
    nodes: [
      { id: 'in', c: 0, r: 0, kind: 'trigger', t: '{trigger}', s: 'question or schedule' },
      { id: 'sem', c: 1, r: 0, kind: 'data', t: 'Semantic model', s: 'agreed definitions' },
      { id: 'q', c: 2, r: 0, kind: 'agent', t: 'Query and model', s: 'SQL, forecasts, optimisers' },
      { id: 'ex', c: 2, r: 1, kind: 'agent', t: 'Explain', s: 'drivers, options, trade-offs' },
      { id: 'hum', c: 1, r: 1, kind: 'human', t: 'Decision owner', s: 'approves the change' },
      { id: 'out', c: 0, r: 1, kind: 'tool', t: '{system}', s: 'apply the decision' },
    ],
    edges: [
      { from: 'in', to: 'sem' },
      { from: 'sem', to: 'q' },
      { from: 'q', to: 'ex' },
      { from: 'ex', to: 'hum' },
      { from: 'hum', to: 'out', label: 'approved' },
    ],
    steps: [
      { kind: 'trigger', who: 'Intake', does: 'Question or scheduled run starts from {trigger}.' },
      { kind: 'data', who: 'Data', does: 'Resolves the terms against the semantic model so the definitions match reporting.' },
      { kind: 'agent', who: 'Agent', does: 'Writes and runs the queries and models in a sandbox.' },
      { kind: 'agent', who: 'Agent', does: 'Explains the drivers and sets out options with their trade-offs.' },
      { kind: 'human', who: 'Decision owner', does: 'Chooses an option. Larger changes need explicit sign-off.' },
      { kind: 'tool', who: 'Tool call', does: 'Applies the approved change in {system}.' },
    ],
  },
  {
    slug: 'orchestrator-and-specialists',
    legacy: 'Orchestrator + parallel sub-agents',
    name: 'Orchestrator and specialists',
    short: 'Plan, fan out, reconcile, deliver.',
    when: 'The job crosses several systems or disciplines and parts of it can run at the same time.',
    why: 'The task spans domains that can run concurrently, so an orchestrator breaks it down, hands the parts to specialist agents and reconciles what they return. It is faster than one large agent, and each specialist can be tested on its own.',
    control: 'The orchestrator checks specialist results for conflicts before anything is committed. Each specialist has its own permissions and its own evaluation set.',
    outcome: 'Cross-team work completed in one coordinated pass',
    measures: ['End-to-end cycle time', 'Tasks completed without rework', 'Specialist-level evaluation pass rates', 'Cost per completed job'],
    stack: ['Agent-to-agent orchestration with durable state', 'Model Context Protocol tool servers', 'A mix of model tiers per specialist', 'Distributed tracing across agents'],
    nodes: [
      { id: 'in', c: 0, r: 1, kind: 'trigger', t: '{trigger}', s: 'goal arrives' },
      { id: 'or', c: 1, r: 1, kind: 'agent', t: 'Orchestrator', s: 'plan and assign' },
      { id: 'a', c: 2, r: 0, kind: 'agent', t: 'Specialist', s: 'records and history' },
      { id: 'b', c: 2, r: 1, kind: 'agent', t: 'Specialist', s: 'documents and evidence' },
      { id: 'c', c: 2, r: 2, kind: 'agent', t: 'Specialist', s: 'scheduling and outreach' },
      { id: 'rec', c: 1, r: 2, kind: 'agent', t: 'Reconcile', s: 'resolve conflicts' },
      { id: 'out', c: 0, r: 2, kind: 'tool', t: '{system}', s: 'commit the result' },
      { id: 'hum', c: 0, r: 0, kind: 'human', t: 'Coordinator', s: 'sees conflicts only' },
    ],
    edges: [
      { from: 'in', to: 'or' },
      { from: 'or', to: 'a' },
      { from: 'or', to: 'b' },
      { from: 'or', to: 'c' },
      { from: 'or', to: 'rec' },
      { from: 'rec', to: 'out' },
      { from: 'or', to: 'hum', label: 'conflict', back: true },
    ],
    steps: [
      { kind: 'trigger', who: 'Intake', does: 'Goal received from {trigger}.' },
      { kind: 'agent', who: 'Orchestrator', does: 'Breaks the goal into tasks and assigns each to a specialist.' },
      { kind: 'agent', who: 'Specialists', does: 'Work in parallel, each with its own tools and permissions.' },
      { kind: 'agent', who: 'Orchestrator', does: 'Reconciles the results and resolves conflicts between them.' },
      { kind: 'human', who: 'Coordinator', does: 'Is asked only where the specialists disagree or a limit is reached.' },
      { kind: 'tool', who: 'Tool call', does: 'Commits the combined result to {system}.' },
    ],
  },
];

export const patternBySlug = Object.fromEntries(patterns.map((p) => [p.slug, p]));
export const patternByLegacy = Object.fromEntries(patterns.map((p) => [p.legacy, p]));
