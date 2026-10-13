// Use cases added to the original catalogue. Accounting & Audit lives in accounting.ts.

export interface Addition {
  industry: string; // industry slug
  name: string;
  summary: string;
  tags: string[];
  pattern: string; // pattern slug
  stage?: string;
  trigger?: string;
  system?: string;
  knowledge?: string;
  problem?: string;
  does?: string[];
  gate?: string;
  integrates?: string[];
  measures?: string[];
  benefits?: string[];
}

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

type Row = [industry: string, name: string, summary: string, tags: string[], pattern: string];

const rows: Row[] = [
  // Healthcare
  ['healthcare', 'Patient Access and Scheduling Agent', 'Books, moves and cancels appointments by phone or chat, checks eligibility, and fills cancelled slots from the waiting list.', ['Voice', 'Scheduling', 'Access'], P.chat],
  ['healthcare', 'Clinical Documentation Integrity Agent', 'Reviews charts for missing specificity before coding and sends the clinician a short, compliant query.', ['Coding', 'Documentation', 'Compliance'], P.decide],
  ['healthcare', 'Care Gap Closure Agent', 'Finds patients overdue for screening or review, reaches out in their preferred channel and books the visit.', ['Population health', 'Outreach', 'Quality'], P.watch],
  ['healthcare', 'Referral Letter and Discharge Summary Agent', 'Drafts referral letters and discharge summaries from the record for the clinician to check and sign.', ['Documentation', 'Clinician sign-off'], P.draft],

  // Finance & Banking
  ['finance-banking', 'Investment Research Agent', 'Reads filings, transcripts and broker notes and produces a cited research note on a company or theme.', ['Research', 'Citations', 'Buy side'], P.research],
  ['finance-banking', 'Private Credit Monitoring Agent', 'Reads borrower reporting packs as they arrive, tests covenants and warns the deal team of deterioration.', ['Private credit', 'Covenants', 'Monitoring'], P.watch],
  ['finance-banking', 'Due Diligence Questionnaire Agent', 'Answers investor questionnaires and RFPs from approved content, with compliance reviewing new wording.', ['Investor relations', 'DDQ', 'Approved content'], P.draft],
  ['finance-banking', 'Payment Scam Intervention Agent', 'Assesses risky outbound payments in real time, questions the customer in conversation and holds or releases within policy.', ['APP fraud', 'Real-time', 'Customer protection'], P.decide],
  ['finance-banking', 'Complaints Handling Agent', 'Classifies complaints, gathers the account history, drafts the final response and tracks regulatory deadlines.', ['Complaints', 'Consumer Duty', 'Deadlines'], P.decide],
  ['finance-banking', 'Portfolio Company Reporting Agent', 'Collects monthly numbers from portfolio companies in any format and builds one consistent view for the investment team.', ['Private equity', 'Reporting', 'Document AI'], P.txn],

  // Insurance
  ['insurance', 'Bordereaux Processing Agent', 'Reads bordereaux from coverholders in any layout, validates against the binder terms and loads clean data.', ['Delegated authority', 'London market', 'Data quality'], P.txn],
  ['insurance', 'Claims File Summary Agent', 'Summarises long claims files and medical records into a chronology with page references for the handler.', ['Claims', 'Document AI', 'Citations'], P.research],
  ['insurance', 'Property Damage Estimating Agent', 'Assesses photos and video of damage, drafts the scope of repair and routes complex losses to an adjuster.', ['Vision', 'Property', 'Estimating'], P.decide],
  ['insurance', 'Broker Submission Triage Agent', 'Reads broker emails and attachments as they land, scores appetite fit and puts the best risks in front of underwriters first.', ['Underwriting', 'Email', 'Prioritisation'], P.decide],

  // Legal
  ['legal', 'Contract Obligations Agent', 'Extracts obligations, renewals and notice periods from signed contracts and alerts owners before dates pass.', ['Contracts', 'Obligations', 'Monitoring'], P.watch],
  ['legal', 'AI Regulation Mapping Agent', 'Inventories a company’s AI systems, classifies them under the EU AI Act and similar rules, and drafts the required documentation.', ['EU AI Act', 'Governance', 'Compliance'], P.research],
  ['legal', 'Data Subject Request Agent', 'Finds a person’s data across systems, applies exemptions and redactions, and prepares the response pack for review.', ['Privacy', 'DSAR', 'Redaction'], P.orch],
  ['legal', 'Court Bundle and Chronology Agent', 'Builds paginated bundles and a cited chronology from the case documents.', ['Litigation', 'Bundles', 'Chronology'], P.draft],

  // Retail & E-commerce
  ['retail-ecommerce', 'Product Feed Agent for AI Shopping', 'Keeps product data complete and structured so AI shopping assistants can find, compare and buy from you.', ['Agentic commerce', 'Product data', 'Feeds'], P.watch],
  ['retail-ecommerce', 'Retail Media Campaign Agent', 'Plans, launches and tunes sponsored listings across marketplaces and retail media networks within budget rules.', ['Retail media', 'Optimisation'], P.data],
  ['retail-ecommerce', 'Marketplace Seller Onboarding Agent', 'Checks new sellers and listings against identity, safety and policy requirements before they go live.', ['Marketplace', 'Compliance', 'Trust'], P.decide],
  ['retail-ecommerce', 'Supplier Compliance Document Agent', 'Collects and checks supplier certificates, test reports and product-safety documents, and chases what has expired.', ['Suppliers', 'Product safety', 'Document AI'], P.txn],

  // Logistics & Supply Chain
  ['logistics-supply-chain', 'Tariff and Trade Scenario Agent', 'Models the landed-cost effect of tariff changes by product and origin and proposes sourcing or routing alternatives.', ['Tariffs', 'Landed cost', 'Scenarios'], P.data],
  ['logistics-supply-chain', 'Supplier Risk Monitoring Agent', 'Watches news, financial and delivery signals for each supplier and warns planners with the affected parts listed.', ['Risk', 'Suppliers', 'Monitoring'], P.watch],
  ['logistics-supply-chain', 'Dock and Yard Scheduling Agent', 'Books dock appointments with carriers by email and phone and re-sequences the yard when trucks run late.', ['Yard', 'Scheduling', 'Voice'], P.orch],
  ['logistics-supply-chain', 'Carrier Check-Call Agent', 'Phones and messages drivers and dispatchers for status updates and records them against the load.', ['Voice', 'Visibility', 'Brokerage'], P.chat],

  // Manufacturing
  ['manufacturing', 'Root Cause Analysis Agent', 'Assembles process, quality and maintenance data for a defect and drafts the 8D report with evidence.', ['Quality', '8D', 'Analysis'], P.research],
  ['manufacturing', 'Custom Quote Agent', 'Reads RFQs and drawings, estimates routing and cost, and drafts the quote for an estimator to approve.', ['Quoting', 'Drawings', 'Estimating'], P.draft],
  ['manufacturing', 'Work Instruction Agent', 'Writes and updates work instructions from engineering changes, video of the task and operator feedback.', ['Documentation', 'Multi-modal', 'Training'], P.draft],
  ['manufacturing', 'Product Compliance Dossier Agent', 'Builds material declarations and product-passport data from supplier documents and the bill of materials.', ['Product passport', 'REACH', 'Suppliers'], P.txn],

  // Software Development
  ['software-development', 'Legacy Modernisation Agent', 'Maps an old codebase, recovers the business rules and migrates it module by module with tests that prove equivalence.', ['Legacy', 'Migration', 'Testing'], P.orch],
  ['software-development', 'Ticket-to-Pull-Request Agent', 'Takes a well-specified ticket, writes the change in an isolated environment and opens a pull request with tests passing.', ['Background agents', 'Codebase', 'CI'], P.orch],
  ['software-development', 'AI Evaluation and Red-Team Agent', 'Runs regression and adversarial tests against your AI features on every change and blocks releases that regress.', ['Evals', 'Safety', 'CI'], P.watch],
  ['software-development', 'Dependency Upgrade Agent', 'Keeps dependencies current: reads changelogs, applies upgrades, fixes what breaks and explains the risk.', ['Supply chain', 'Maintenance'], P.line],
  ['software-development', 'Compliance Evidence Agent', 'Collects SOC 2 and ISO 27001 evidence from your systems continuously and flags controls that have drifted.', ['SOC 2', 'ISO 27001', 'Audit'], P.watch],

  // Customer Support
  ['customer-support', 'Back-Office Resolution Agent', 'Completes the follow-up work a ticket needs across systems with no API, operating the screens as a trained agent would.', ['Computer use', 'Back office', 'Resolution'], P.txn],
  ['customer-support', 'Voice of Customer Insight Agent', 'Reads every conversation to quantify what customers are asking for and what is going wrong, with examples.', ['Analytics', 'Product feedback'], P.data],
  ['customer-support', 'Vulnerable Customer Support Agent', 'Recognises signs of vulnerability in a conversation, adjusts the handling and routes to a specialist team.', ['Vulnerability', 'Compliance', 'Routing'], P.watch],

  // Marketing & Sales
  ['marketing-sales', 'Inbound Lead Response Agent', 'Answers new enquiries within a minute by chat, email or phone, qualifies them and books the meeting.', ['Speed to lead', 'Voice', 'Qualification'], P.chat],
  ['marketing-sales', 'Proposal and RFP Response Agent', 'Drafts proposals and RFP answers from approved content and past wins, and marks what needs an expert.', ['RFP', 'Proposals', 'Approved content'], P.draft],
  ['marketing-sales', 'AI Search Visibility Agent', 'Tracks how AI assistants describe and recommend your brand and proposes the content changes that would improve it.', ['AI search', 'Brand', 'Monitoring'], P.watch],
  ['marketing-sales', 'Pipeline Inspection Agent', 'Reads calls, emails and CRM fields to judge each deal’s real stage and tells managers where forecasts are soft.', ['Forecasting', 'CRM', 'RevOps'], P.data],

  // HR & Recruiting
  ['hr-recruiting', 'Skills Inventory Agent', 'Builds a current picture of workforce skills from project, learning and profile data to support staffing and planning.', ['Skills', 'Planning', 'Analytics'], P.data],
  ['hr-recruiting', 'Job Description and Pay Transparency Agent', 'Writes consistent, inclusive job descriptions with pay ranges that meet transparency rules in each location.', ['Pay transparency', 'Compliance', 'Content'], P.draft],
  ['hr-recruiting', 'Employee Relations Case Agent', 'Organises evidence and timelines for grievance and disciplinary cases and checks each step against policy.', ['Casework', 'Policy', 'Documentation'], P.research],

  // Real Estate
  ['real-estate', 'Building Safety Records Agent', 'Assembles and maintains the digital record of a building’s safety information and identifies missing documents.', ['Building safety', 'Golden thread', 'Document AI'], P.research],
  ['real-estate', 'Planning Application Agent', 'Reads local planning policy and precedent decisions and prepares the supporting statement for an application.', ['Planning', 'Policy', 'Citations'], P.research],
  ['real-estate', 'Lease Event Agent', 'Tracks rent reviews, breaks and expiries across the portfolio and prepares the notices and analysis ahead of each date.', ['Lease events', 'Monitoring'], P.watch],
  ['real-estate', 'Maintenance Triage and Dispatch Agent', 'Diagnoses repair requests from photos and descriptions, books the right contractor and keeps the tenant informed.', ['Repairs', 'Vision', 'Dispatch'], P.orch],

  // Education
  ['education', 'Student Enquiry and Admissions Agent', 'Answers prospective students at any hour, checks entry requirements and guides applications to completion.', ['Admissions', 'Chat', 'Conversion'], P.chat],
  ['education', 'Formative Feedback Agent', 'Gives students feedback on drafts against the rubric before they submit, without writing the work for them.', ['Feedback', 'Assessment', 'Learning'], P.chat],
  ['education', 'Accessible Course Materials Agent', 'Converts course materials into accessible formats with alt text, captions and transcripts, and checks them against standards.', ['Accessibility', 'Content'], P.draft],

  // Media & Entertainment
  ['media-entertainment', 'Archive Metadata Agent', 'Watches, listens to and tags archive footage so it can be searched by person, place, quote and scene.', ['Archive', 'Multi-modal', 'Search'], P.line],
  ['media-entertainment', 'Content Provenance and Disclosure Agent', 'Checks incoming and outgoing media for provenance credentials and synthetic content and applies the required labels.', ['Provenance', 'Synthetic media', 'Compliance'], P.decide],
  ['media-entertainment', 'Subscriber Retention Agent', 'Predicts cancellations from viewing and billing signals and triggers the offer or content most likely to keep each subscriber.', ['Churn', 'Subscriptions', 'Personalisation'], P.watch],

  // Travel & Hospitality
  ['travel-hospitality', 'Group and Events Sales Agent', 'Responds to event and group enquiries with availability, pricing and a tailored proposal within the hour.', ['Groups', 'Proposals', 'Sales'], P.draft],
  ['travel-hospitality', 'Guest Review Response Agent', 'Drafts replies to guest reviews in the property’s voice and sends operational issues to the right department.', ['Reviews', 'Reputation', 'Operations'], P.draft],
  ['travel-hospitality', 'Housekeeping and Maintenance Dispatch Agent', 'Sequences room cleaning and repairs around arrivals and departures and reassigns staff as the day changes.', ['Operations', 'Dispatch', 'Real-time'], P.orch],
  ['travel-hospitality', 'Refund and Compensation Agent', 'Works out what a disrupted passenger is owed under the applicable rules and pays or refers the claim.', ['Passenger rights', 'Claims', 'Decisioning'], P.decide],
];

export const additions: Addition[] = rows.map(([industry, name, summary, tags, pattern]) => ({
  industry,
  name,
  summary,
  tags,
  pattern,
}));
