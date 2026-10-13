export interface Industry {
  slug: string;
  name: string;
  legacy?: string; // name used in the original catalogue
  line: string; // one-line summary for lists
  intro: string;
  system: string; // default system of record, used in diagrams
  knowledge: string; // default knowledge source, used in diagrams
  systems: string[]; // systems we expect to integrate with
  rules: string[]; // regulation and standards that shape the design
  focus: string[]; // where agents pay back first
}

export const industries: Industry[] = [
  {
    slug: 'accounting-audit',
    name: 'Accounting & Audit',
    line: 'Fieldwork, review, tax and firm operations for accounting practices.',
    intro:
      'Accounting firms sell judgement but spend most of their hours on mechanical work: chasing documents, cleaning client data, tying numbers out. We build agents that take that work on inside the firm’s own methodology, so partners and managers review rather than assemble.',
    system: 'Engagement file',
    knowledge: 'Firm methodology and prior-year files',
    systems: ['Engagement and workpaper software', 'Practice management, time and billing', 'Client request portals', 'General ledgers such as Xero, QuickBooks, Sage and NetSuite', 'Tax preparation software', 'Document management'],
    rules: ['ISA (UK) and PCAOB auditing standards', 'ISQM 1 quality management', 'IFRS, FRS 102 and US GAAP', 'Independence and ethics rules', 'UK anti-money-laundering regulations', 'HMRC Making Tax Digital'],
    focus: ['Client data clean-up and mapping', 'Request lists and evidence collection', 'Workpaper preparation and testing', 'Review against firm standards', 'Scheduling and utilisation'],
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    line: 'Patient access, clinical documentation and revenue cycle.',
    intro:
      'Clinical time is the scarcest resource in any health system. We build agents for the administrative load around care: intake, documentation, authorisations and billing, with a clinician signing anything that touches a patient’s record or treatment.',
    system: 'EHR',
    knowledge: 'Patient record and clinical policy',
    systems: ['Electronic health records via FHIR and HL7', 'Practice management and scheduling', 'Payer portals and clearing houses', 'Contact-centre telephony', 'Imaging and lab systems'],
    rules: ['HIPAA and UK GDPR special-category data', 'NHS DSPT and DCB0129 clinical safety', 'Medical-device rules where output informs diagnosis', 'Clinician sign-off on clinical content'],
    focus: ['Patient access and triage', 'Ambient documentation', 'Prior authorisation and denials', 'Follow-up and care gaps'],
  },
  {
    slug: 'finance-banking',
    name: 'Finance & Banking',
    legacy: 'Finance & Banking',
    line: 'Financial crime, credit, wealth and finance operations.',
    intro:
      'Banks and investment firms run on evidence gathering: an analyst pulls data from six systems to make one decision. We build agents that assemble the case, apply policy and leave the regulated judgement to the people accountable for it.',
    system: 'Core banking',
    knowledge: 'Customer, transaction and policy data',
    systems: ['Core banking and card platforms', 'Case management for fraud and AML', 'Sanctions and identity data providers', 'Loan origination', 'Portfolio and order management', 'Market data feeds'],
    rules: ['FCA and PRA rules including Consumer Duty', 'Model risk management such as SS1/23 and SR 11-7', 'Anti-money-laundering and sanctions regimes', 'PCI DSS', 'EU AI Act high-risk obligations for credit decisions'],
    focus: ['Fraud and AML investigation', 'Onboarding and KYC', 'Credit memos and monitoring', 'Research and client reporting'],
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    line: 'Claims, underwriting, distribution and compliance.',
    intro:
      'Insurance is a document business with a conversation at each end. We build agents that read submissions and claims files, hold the first conversation with the policyholder, and prepare decisions for underwriters and adjusters.',
    system: 'Policy and claims system',
    knowledge: 'Policy wordings and claims history',
    systems: ['Policy administration', 'Claims management', 'Rating engines', 'Broker portals and bordereaux', 'Third-party data such as weather, vehicle and property'],
    rules: ['FCA Consumer Duty and fair-value rules', 'Lloyd’s and delegated-authority requirements', 'US state filing requirements', 'Solvency reporting'],
    focus: ['First notice of loss', 'Submission intake', 'Fraud and subrogation', 'Renewals and servicing'],
  },
  {
    slug: 'legal',
    name: 'Legal',
    line: 'Contracts, research, disputes and practice operations.',
    intro:
      'Legal work rewards precision, and a wrong citation is worse than no answer. We build agents that work from your playbooks and precedents, cite every source, and keep a lawyer as the author of record.',
    system: 'Matter management',
    knowledge: 'Precedents, playbooks and the matter file',
    systems: ['Document management such as iManage and NetDocuments', 'Matter and practice management', 'Contract lifecycle management', 'Research databases', 'eDiscovery platforms', 'Time and billing'],
    rules: ['Privilege and confidentiality', 'SRA and bar professional-conduct rules', 'Court rules on AI-assisted filings', 'Client outside-counsel guidelines'],
    focus: ['Contract review against playbooks', 'Research with citations', 'Diligence and discovery', 'Intake, conflicts and billing'],
  },
  {
    slug: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    legacy: 'Retail & E-commerce',
    line: 'Merchandising, service, pricing and supply.',
    intro:
      'Retail margins are made in thousands of small decisions a day. We build agents that write and maintain the catalogue, serve customers in conversation, and keep stock and promotions in line with demand.',
    system: 'Commerce platform',
    knowledge: 'Catalogue, orders and customer history',
    systems: ['Commerce and order management', 'Product information management', 'ERP and warehouse systems', 'CRM and loyalty', 'Marketplaces and retail media', 'Payments and fraud tools'],
    rules: ['Consumer-rights and distance-selling law', 'PCI DSS', 'UK GDPR and marketing consent', 'Advertising standards'],
    focus: ['Catalogue content', 'Conversational shopping and returns', 'Inventory and promotions', 'Order fraud'],
  },
  {
    slug: 'logistics-supply-chain',
    name: 'Logistics & Supply Chain',
    legacy: 'Logistics & Supply Chain',
    line: 'Visibility, planning, freight and trade compliance.',
    intro:
      'Supply chains fail at the handoffs between companies. We build agents that watch shipments and suppliers, do the chasing by email, portal and phone, and replan when conditions change.',
    system: 'TMS and WMS',
    knowledge: 'Shipment, order and carrier data',
    systems: ['Transport and warehouse management', 'ERP and planning', 'Carrier and visibility APIs', 'EDI and supplier portals', 'Customs systems'],
    rules: ['Customs and tariff classification', 'Sanctions and export controls', 'Carrier contract terms', 'Emissions reporting such as CSRD and CBAM'],
    focus: ['Exception management', 'Quoting and tendering', 'Replenishment and demand sensing', 'Freight audit'],
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    line: 'Maintenance, quality, planning and field service.',
    intro:
      'Plants generate more data than their engineers can read. We build agents that watch equipment and quality signals, put the right procedure in an operator’s ear, and keep schedules and suppliers aligned with what is happening on the floor.',
    system: 'MES and ERP',
    knowledge: 'Asset, quality and production data',
    systems: ['Manufacturing execution and SCADA historians', 'ERP and planning', 'Maintenance management', 'Quality management', 'Product lifecycle management', 'Field-service platforms'],
    rules: ['ISO 9001 and sector quality standards', 'Health and safety reporting', 'Environmental permits and reporting', 'OT network segregation'],
    focus: ['Predictive maintenance', 'Quality inspection and root cause', 'Scheduling', 'Operator and field support'],
  },
  {
    slug: 'software-development',
    name: 'Software Development',
    legacy: 'Software Development',
    line: 'Review, testing, migration and operations.',
    intro:
      'Coding agents changed software delivery faster than any other field. We build the ones that fit into your repositories and pipelines: reviewers, migrators and on-call responders that open pull requests your engineers approve.',
    system: 'Repository and CI',
    knowledge: 'Codebase, tickets and runbooks',
    systems: ['Git hosting and code review', 'CI/CD pipelines', 'Issue trackers', 'Observability and incident tools', 'Cloud consoles and infrastructure as code', 'Security scanners'],
    rules: ['Branch protection and change control', 'SOC 2 and ISO 27001 evidence', 'Software supply-chain policy', 'Secrets handling'],
    focus: ['Code review and tests', 'Migrations and upgrades', 'Incident triage', 'Security findings'],
  },
  {
    slug: 'customer-support',
    name: 'Customer Support',
    line: 'Voice, chat, email and the back office behind them.',
    intro:
      'Support is where agentic AI is most proven. We build agents that resolve issues end to end across voice, chat and email, take actions in back-office systems, and hand over to a person with the whole story when they should.',
    system: 'CRM and ticketing',
    knowledge: 'Knowledge base and account history',
    systems: ['Ticketing and CRM', 'Contact-centre and telephony platforms', 'Knowledge bases', 'Billing and order systems', 'Quality-assurance tools'],
    rules: ['Call-recording and consent rules', 'Vulnerable-customer obligations', 'PCI DSS for payments by phone', 'Sector complaint-handling rules'],
    focus: ['Voice and chat resolution', 'Email triage', 'Agent assistance', 'Quality and knowledge'],
  },
  {
    slug: 'marketing-sales',
    name: 'Marketing & Sales',
    legacy: 'Marketing & Sales',
    line: 'Pipeline, content, intelligence and deal operations.',
    intro:
      'Revenue teams lose hours to research and admin that never reach a customer. We build agents that qualify inbound interest, prepare sellers, produce content to brand standard, and keep the CRM honest.',
    system: 'CRM',
    knowledge: 'Account, campaign and product data',
    systems: ['CRM such as Salesforce, HubSpot and Dynamics', 'Marketing automation', 'Ad platforms', 'Web analytics and CMS', 'Sales engagement and call recording', 'CPQ'],
    rules: ['UK GDPR, PECR and CAN-SPAM', 'Advertising standards and disclosure', 'Brand guidelines', 'Discount and approval policy'],
    focus: ['Lead response and qualification', 'Seller preparation', 'Content and creative', 'Deal desk and proposals'],
  },
  {
    slug: 'hr-recruiting',
    name: 'HR & Recruiting',
    legacy: 'HR & Recruiting',
    line: 'Hiring, employee service and workforce planning.',
    intro:
      'People teams field the same questions thousands of times and still have to treat each case fairly. We build agents that handle routine service and coordination, and that support decisions about people without making them.',
    system: 'HRIS and ATS',
    knowledge: 'HR policy and employee records',
    systems: ['HR information systems such as Workday and SAP SuccessFactors', 'Applicant tracking', 'Payroll and benefits', 'Learning platforms', 'Calendars and collaboration tools'],
    rules: ['Employment and equality law', 'EU AI Act high-risk rules for hiring', 'Pay-transparency requirements', 'UK GDPR for employee data'],
    focus: ['Employee helpdesk', 'Scheduling and onboarding', 'Sourcing and screening support', 'Workforce analytics'],
  },
  {
    slug: 'real-estate',
    name: 'Real Estate',
    line: 'Leasing, property management, transactions and investment.',
    intro:
      'Property runs on documents and deadlines spread across agents, tenants, lenders and contractors. We build agents that abstract the paperwork, coordinate the parties and keep portfolios compliant.',
    system: 'Property management system',
    knowledge: 'Leases, listings and market data',
    systems: ['Property management and accounting', 'Listing services and portals', 'CRM', 'Building management systems', 'Loan origination', 'Planning and land registries'],
    rules: ['Building Safety Act and fire-safety records', 'Tenancy and consumer law', 'AML checks on transactions', 'Energy-performance requirements'],
    focus: ['Lease abstraction', 'Tenant service', 'Transaction coordination', 'Valuation and diligence'],
  },
  {
    slug: 'education',
    name: 'Education',
    line: 'Teaching support, student services and administration.',
    intro:
      'Teachers and advisers are stretched, and students notice. We build agents that give teachers time back on planning and marking, and that give students an answer at any hour, with safeguards suited to learners.',
    system: 'SIS and LMS',
    knowledge: 'Curriculum, records and policy',
    systems: ['Student information systems', 'Learning management systems', 'Assessment platforms', 'Admissions and CRM', 'Library and research databases'],
    rules: ['Safeguarding and age-appropriate design', 'FERPA and UK GDPR for student data', 'Accessibility standards', 'Academic-integrity policy'],
    focus: ['Tutoring and feedback', 'Planning and assessment', 'Admissions and advising', 'Compliance reporting'],
  },
  {
    slug: 'media-entertainment',
    name: 'Media & Entertainment',
    legacy: 'Media & Entertainment',
    line: 'Production, rights, localisation and audience.',
    intro:
      'Media companies sit on archives they cannot search and release schedules they cannot staff. We build agents that cut, tag, localise and clear content, with editors holding final cut.',
    system: 'Asset and content management',
    knowledge: 'Content archive and rights data',
    systems: ['Media asset management', 'Content management', 'Rights and royalties systems', 'Ad servers', 'Streaming analytics', 'Editing suites'],
    rules: ['Copyright and licensing terms', 'Broadcast and advertising codes', 'Online-safety obligations', 'Disclosure of synthetic media'],
    focus: ['Clipping and metadata', 'Localisation', 'Rights and ad operations', 'Moderation'],
  },
  {
    slug: 'travel-hospitality',
    name: 'Travel & Hospitality',
    legacy: 'Travel & Hospitality',
    line: 'Booking, disruption, guest service and revenue.',
    intro:
      'Travel goes wrong in real time and customers want it fixed in real time. We build agents that plan, rebook and serve guests across channels, and that keep pricing and operations in step with demand.',
    system: 'Reservation system',
    knowledge: 'Inventory, bookings and guest profiles',
    systems: ['Property management and central reservations', 'Global distribution systems and NDC', 'Airline operations systems', 'Revenue management', 'Guest messaging and CRM'],
    rules: ['Passenger-rights rules such as UK261', 'Package-travel regulations', 'PCI DSS', 'Visa and entry requirements'],
    focus: ['Disruption recovery', 'Guest concierge', 'Group and corporate travel', 'Revenue management'],
  },
];

export const industryBySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));
// Lookup by the name used in the original catalogue.
export const industryByLegacy = Object.fromEntries(industries.map((i) => [i.legacy ?? i.name, i]));
