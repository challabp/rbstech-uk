// Single place for company facts shown across the site.
// Check every value here before going live.
export const site = {
  name: 'RBS Technologies',
  legal: 'RBS Technologies Ltd',
  url: 'https://rbstech.uk',
  email: 'hello@rbstech.uk',
  // Web3Forms access key for the contact form. It is designed to be public: it only
  // allows sending to the inbox it was issued for. While empty, the form falls back
  // to opening the visitor's email app.
  formKey: '',
  // Companies House number. Left empty until confirmed; the footer omits it while blank.
  companyNo: '',
  country: 'United Kingdom',
  tagline: 'AI agents for everyday business work',
  description:
    'RBS Technologies builds AI agents that take routine work off your team, with your people in charge of the important decisions. Solutions for sixteen industries.',
};

export const nav = [
  { href: '/solutions/', label: 'Solutions' },
  { href: '/industries/', label: 'Industries' },
  { href: '/approach/', label: 'How we work' },
  { href: '/technology/', label: 'Technology' },
];
