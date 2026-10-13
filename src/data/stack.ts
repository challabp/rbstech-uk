// The technology we build with, by layer. Named products are examples of what we select from, not partnerships.
export interface Layer {
  name: string;
  role: string;
  choose: string; // how we choose within the layer
  options: string[];
}

export const stack: Layer[] = [
  {
    name: 'Models',
    role: 'Reasoning, language, vision and speech.',
    choose: 'Frontier models where the reasoning is hard, smaller and faster ones where it is not, and open-weight models where data must stay on your own infrastructure. Routing is configuration, so a new model release is a test run rather than a rebuild.',
    options: ['Anthropic Claude', 'OpenAI GPT', 'Google Gemini', 'Mistral', 'Open-weight models such as Llama and Qwen', 'Speech models for real-time voice'],
  },
  {
    name: 'Orchestration',
    role: 'Planning, tool use, memory and multi-agent coordination.',
    choose: 'The lightest framework that gives durable state and clear traces. Long-running work gets a workflow engine underneath so a restart never loses a case.',
    options: ['LangGraph', 'Claude Agent SDK', 'OpenAI Agents SDK', 'Microsoft Agent Framework', 'Google Agent Development Kit', 'Temporal for durable workflows'],
  },
  {
    name: 'Knowledge and retrieval',
    role: 'Finding the right passage, record or number.',
    choose: 'Hybrid search with re-ranking as the default. Permissions are enforced at retrieval time, so an agent can never quote what its user could not open.',
    options: ['PostgreSQL with pgvector', 'Elasticsearch and OpenSearch', 'Azure AI Search', 'Pinecone and Weaviate', 'Knowledge graphs where relationships matter', 'Document parsing with vision models'],
  },
  {
    name: 'Tools and integration',
    role: 'Connecting agents to the systems where work is recorded.',
    choose: 'APIs first. Model Context Protocol servers to give tools one consistent, permissioned interface. Supervised computer use only where a system offers no API.',
    options: ['Model Context Protocol', 'Agent2Agent protocol', 'REST, GraphQL and event APIs', 'ERP, CRM and core-system connectors', 'Browser and computer use', 'Telephony and messaging platforms'],
  },
  {
    name: 'Evaluation and observability',
    role: 'Knowing whether it works, before and after release.',
    choose: 'Every agent ships with an evaluation set you have signed off and tracing switched on from the first day.',
    options: ['OpenTelemetry tracing', 'Langfuse and LangSmith', 'Braintrust and promptfoo', 'Model-graded and human-graded evaluations', 'Guardrail and red-team suites', 'Cost and latency dashboards'],
  },
  {
    name: 'Cloud and data',
    role: 'Where it runs and where the data lives.',
    choose: 'Your cloud, your tenancy, your region. We deploy into the platform your security team already governs.',
    options: ['AWS and Amazon Bedrock', 'Microsoft Azure and Azure AI Foundry', 'Google Cloud and Vertex AI', 'Snowflake and Databricks', 'BigQuery and Microsoft Fabric', 'Private and on-premises deployment'],
  },
];

export const approvalClasses = [
  { name: 'Automatic', text: 'Low-risk, reversible actions inside policy. The agent acts and logs it.' },
  { name: 'Confirm', text: 'The agent states what it is about to do and proceeds when the user says yes.' },
  { name: 'Approve', text: 'A named person with the right authority reviews the evidence and decides.' },
  { name: 'Manual only', text: 'The agent prepares the work. It has no permission to perform the action.' },
];

export const controls = [
  {
    name: 'Evaluation before release',
    text: 'Each agent is tested against a set of real cases with answers you have agreed. A change that drops the pass rate below the agreed bar, 95% by default, does not ship.',
  },
  {
    name: 'An approval class for every action',
    text: 'Every tool an agent can call is classified as automatic, confirm, approve or manual only. The classification is yours to set and is enforced in code.',
  },
  {
    name: 'Traces you can replay',
    text: 'Every run records what the agent saw, what it called and why it decided. When someone asks what happened on a case, the answer takes a minute to find.',
  },
  {
    name: 'Your data stays yours',
    text: 'Agents run in your tenancy with least-privilege access. Your data is not used to train models, and retention follows your policy.',
  },
  {
    name: 'Designed for the regulation',
    text: 'We map each design to the rules that apply, such as UK GDPR, the EU AI Act and your sector regulator, and produce the documentation they expect.',
  },
  {
    name: 'A way to stop it',
    text: 'Each agent has a kill switch, a fallback to the manual process, and a runbook your team has rehearsed.',
  },
];

export const phases = [
  {
    name: 'Discovery',
    when: 'Weeks 1 to 2',
    text: 'We sit with the people who do the work, map the process as it really runs, and agree what good looks like. You get a design, an evaluation plan and a fixed price.',
  },
  {
    name: 'Working demo on your data',
    when: 'By week 3',
    text: 'A running agent on a sample of your real cases, scored against the answers your experts gave. This is the point to stop if the numbers are not there.',
  },
  {
    name: 'Production build',
    when: 'Weeks 4 to 10',
    text: 'Integrations, approval gates, security review, monitoring and the runbook. Release is gated on the evaluation set, not on a date.',
  },
  {
    name: 'Run and hand over',
    when: 'First 30 days live, then ongoing',
    text: 'The engineers who built it stay on call for the first month. After that we hand over to your team or keep running it under a support agreement.',
  },
];
