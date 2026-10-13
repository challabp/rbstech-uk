// The technology we build with, by layer. Named products are examples of what we select from, not partnerships.
export interface Layer {
  name: string;
  role: string;
  choose: string; // how we choose within the layer
  options: string[];
}

export const stack: Layer[] = [
  {
    name: 'AI models',
    role: 'The part that reads, reasons, writes and speaks.',
    choose: 'We use the most capable models for difficult work and faster, cheaper ones for simple work. Where data must not leave your own servers, we use models that can run there. Switching to a newer model is a setting, not a rebuild.',
    options: ['Anthropic Claude', 'OpenAI GPT', 'Google Gemini', 'Mistral', 'Open models such as Llama and Qwen', 'Speech models for live voice'],
  },
  {
    name: 'Agent frameworks',
    role: 'The part that plans the steps and keeps track of the work.',
    choose: 'We pick the simplest framework that does the job and keeps a clear record of every step. Long-running work is built so that nothing is lost if a system restarts.',
    options: ['LangGraph', 'Claude Agent SDK', 'OpenAI Agents SDK', 'Microsoft Agent Framework', 'Google Agent Development Kit', 'Temporal'],
  },
  {
    name: 'Knowledge and search',
    role: 'How the agent finds the right document, record or number.',
    choose: 'The agent searches your own documents and data, and can only see what the person using it is allowed to see.',
    options: ['PostgreSQL with pgvector', 'Elasticsearch and OpenSearch', 'Azure AI Search', 'Pinecone and Weaviate', 'Knowledge graphs', 'Document reading with vision models'],
  },
  {
    name: 'Connections to your systems',
    role: 'How the agent works inside the software you already use.',
    choose: 'We connect through each system’s official interface wherever one exists. Where it does not, the agent can operate the screens the way a member of staff would, under supervision.',
    options: ['Model Context Protocol', 'Agent2Agent protocol', 'REST, GraphQL and event APIs', 'ERP, CRM and core-system connectors', 'Browser and computer use', 'Phone and messaging platforms'],
  },
  {
    name: 'Testing and monitoring',
    role: 'How we know it works, before and after launch.',
    choose: 'Every agent is tested against real examples you have approved, and every step it takes in live use is recorded.',
    options: ['OpenTelemetry', 'Langfuse and LangSmith', 'Braintrust and promptfoo', 'Automated and human-reviewed tests', 'Safety and misuse testing', 'Cost and speed dashboards'],
  },
  {
    name: 'Cloud and data',
    role: 'Where the agent runs and where your data lives.',
    choose: 'In your own cloud account, in your region, on the platform your security team already manages.',
    options: ['AWS and Amazon Bedrock', 'Microsoft Azure and Azure AI Foundry', 'Google Cloud and Vertex AI', 'Snowflake and Databricks', 'BigQuery and Microsoft Fabric', 'Private and on-premises servers'],
  },
];

// Names recognisable to a non-technical reader, for the home page.
export const headline = ['Anthropic Claude', 'OpenAI', 'Google Gemini', 'Amazon Web Services', 'Microsoft Azure', 'Google Cloud'];

export const approvalClasses = [
  { name: 'Automatic', text: 'Low-risk actions that are easy to undo. The agent acts and records what it did.' },
  { name: 'Confirm', text: 'The agent says what it is about to do and goes ahead when the user agrees.' },
  { name: 'Approve', text: 'A named person with the right authority reviews the evidence and decides.' },
  { name: 'Staff only', text: 'The agent prepares the work. Only a member of staff can carry out the action.' },
];

export const controls = [
  {
    name: 'Tested before it goes live',
    text: 'We test every agent on real examples from your business, with answers your own experts have agreed. It goes live only when it passes.',
  },
  {
    name: 'Your people approve what matters',
    text: 'You decide which actions the agent can take on its own and which need a person’s approval.',
  },
  {
    name: 'A full record of every action',
    text: 'Every step the agent takes is recorded, so you can always see what it did and why.',
  },
  {
    name: 'Your data stays yours',
    text: 'The agent runs inside your own systems and sees only what it needs. Your data is never used to train AI models.',
  },
  {
    name: 'Built to meet the rules',
    text: 'We design each agent around the laws and regulations that apply to your industry, and provide the documents your regulator expects.',
  },
  {
    name: 'Easy to switch off',
    text: 'You can pause the agent at any time and return to the manual process. Your team will have practised doing so.',
  },
];

export const phases = [
  {
    name: 'Scoping',
    text: 'We learn how the work is done today and agree with you what success looks like. You receive a plan, a price and a timeline.',
  },
  {
    name: 'Proof on your data',
    text: 'We build a working version and test it on real examples from your business, so you can judge the results before committing to the full build.',
  },
  {
    name: 'Build and launch',
    text: 'We connect the agent to your systems, add the approvals and safeguards, and launch once it passes the tests we agreed.',
  },
  {
    name: 'Support',
    text: 'We stay alongside your team after launch. Then we hand over to you, or continue to run it for you.',
  },
];
