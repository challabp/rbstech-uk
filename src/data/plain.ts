// Plain-language description of each kind of work an agent does.
// Keyed by pattern slug. This is what most visitors read; the technical
// design for each lives on the Technology page.
// Steps may contain {system} and {knowledge}, filled per solution.

export interface Plain {
  label: string; // name shown to visitors
  summary: string;
  challenge: string;
  how: string[];
  benefits: string[];
  control: string;
  measures: string[];
}

export const plain: Record<string, Plain> = {
  'straight-line-task': {
    label: 'Routine tasks',
    summary: 'The agent takes a simple request, completes it in one system and confirms it is done.',
    challenge: 'A simple, repetitive task takes up staff time every day, and it gets delayed whenever the team is busy.',
    how: [
      'A request comes in.',
      'The agent reads it and checks nothing is missing.',
      'It completes the task in {system}.',
      'It checks the result and confirms back to the person who asked.',
      'Anything it cannot complete goes to your team, with the reason.',
    ],
    benefits: ['Routine requests are completed in minutes, at any hour', 'Staff time goes to work that needs a person', 'Every request is handled the same way, with a record of what was done'],
    control: 'The agent checks its own work before confirming. Anything it cannot complete goes to a named person, with the reason.',
    measures: ['How many requests are completed without staff time', 'How long each request takes', 'How often a person has to step in'],
  },
  'conversational-assistant': {
    label: 'Conversations',
    summary: 'The agent talks with people by phone or chat, answers their questions and completes their requests.',
    challenge: 'People wait in queues for answers and simple requests, and staff spend their day repeating the same information.',
    how: [
      'Someone gets in touch by phone or chat.',
      'The agent works out who they are and what they need, and asks if anything is unclear.',
      'It finds the right information in {knowledge}.',
      'It completes the request in {system}, after confirming with the person.',
      'If a member of staff is needed, it hands over with the full conversation.',
    ],
    benefits: ['People get help straight away, day or night', 'Routine requests are completed in the conversation, not passed around', 'Staff pick up only the cases that need them, with the full history in front of them'],
    control: 'The agent confirms before it changes anything, and hands over to a member of staff whenever a request is outside what it is allowed to do.',
    measures: ['How many requests are resolved without a handover', 'How satisfied people are afterwards', 'How long people wait'],
  },
  'grounded-research': {
    label: 'Research and review',
    summary: 'The agent reads large volumes of documents and answers questions, showing the source for every point.',
    challenge: 'Finding the right answer means reading through large volumes of documents. It takes skilled people hours and is easy to get wrong under time pressure.',
    how: [
      'A question or a document arrives.',
      'The agent searches {knowledge}, limited to what the person is allowed to see.',
      'It writes up what it found, with a link to the source for every point.',
      'It checks each point against its source and removes anything it cannot support.',
      'Your expert reviews the result and makes the final call.',
    ],
    benefits: ['Answers in minutes instead of hours of reading', 'Every statement links to its source, so it can be checked quickly', 'Experts spend their time on judgement, not on searching'],
    control: 'Every point links to its source so your expert can check it. The expert, not the agent, makes the final call.',
    measures: ['Time saved per question', 'How often the sources are right, checked against your experts', 'How much your experts change the result'],
  },
  'draft-and-review': {
    label: 'Drafting',
    summary: 'The agent writes the first version of a document for a person to edit and approve.',
    challenge: 'Skilled people spend hours writing first drafts of documents that follow a familiar format, leaving less time to review and improve them.',
    how: [
      'A request arrives.',
      'The agent gathers the facts and past examples from {knowledge}.',
      'It writes a first draft in your house style.',
      'It checks the draft against your standards and corrects it.',
      'A member of your team edits and approves it.',
      'The approved version is saved to {system}.',
    ],
    benefits: ['A good first draft in minutes', 'Consistent with your standards and style every time', 'Your people stay the authors: nothing goes out without their approval'],
    control: 'Nothing is sent or published until a named member of your team has reviewed and approved it.',
    measures: ['Time to a first draft', 'How many drafts are approved with only light edits', 'How consistent the output is with your standards'],
  },
  'decision-with-approval-gate': {
    label: 'Decisions and approvals',
    summary: 'The agent gathers the evidence, recommends a decision, and passes anything that is not simple to a person.',
    challenge: 'Each case needs someone to gather the evidence, check it against the rules and decide. Simple cases wait in the same queue as difficult ones.',
    how: [
      'A case arrives.',
      'The agent gathers the evidence and the rules that apply.',
      'It assesses the case and recommends a decision, with its reasons.',
      'Simple, low-risk cases within your limits go ahead.',
      'Everything else goes to your approver with the evidence laid out.',
      'The decision and the reasons are recorded in {system}.',
    ],
    benefits: ['Straightforward cases are cleared quickly and consistently', 'Your experts spend their time on the difficult cases', 'A full record of how each decision was reached'],
    control: 'You set the limits. Only simple, low-risk cases inside those limits go ahead automatically. Everything else is decided by your approver.',
    measures: ['How often the agent agrees with your experts', 'How many cases are cleared without waiting', 'How quickly decisions are made'],
  },
  'transaction-processing': {
    label: 'Document and data processing',
    summary: 'The agent reads documents, checks the details and enters them into your systems.',
    challenge: 'Staff copy information from documents into systems by hand. It is slow, and mistakes are found late.',
    how: [
      'A document or file arrives.',
      'The agent reads it and picks out the details.',
      'It checks those details against {knowledge} and your rules.',
      'Items that pass are entered into {system}.',
      'It confirms each entry was recorded correctly.',
      'Items that do not match go to your team, with the difference explained.',
    ],
    benefits: ['Most items are processed without anyone touching them', 'Fewer keying errors, caught before they cause problems', 'Staff deal only with exceptions, with the issue already explained'],
    control: 'The checks follow fixed rules that you set. Your team sees every item that does not match, and nothing unusual is entered without them.',
    measures: ['How many items go through without manual work', 'How accurate the captured details are', 'Cost per item processed'],
  },
  'watch-and-escalate': {
    label: 'Monitoring and alerts',
    summary: 'The agent keeps watch around the clock and alerts the right person when something needs attention.',
    challenge: 'Problems are spotted late, because nobody has time to keep watching every account, shipment, machine or deadline.',
    how: [
      'The agent keeps watch over {knowledge}.',
      'Most of what it sees is normal, and it carries on watching.',
      'When something looks wrong, it works out the likely cause and who is affected.',
      'It opens a case in {system} and prepares a recommended response.',
      'The right person is alerted, with the evidence and a suggested next step.',
    ],
    benefits: ['Problems are caught early, before they become expensive', 'Round-the-clock watching with no gaps', 'Alerts arrive with the cause and a suggested next step, so people can act straight away'],
    control: 'The agent raises the alert and suggests what to do. Your team decides what action to take.',
    measures: ['How early problems are caught', 'How many alerts turn out to be real', 'How quickly alerts are acted on'],
  },
  'analytics-on-governed-data': {
    label: 'Analysis and planning',
    summary: 'The agent analyses your data, explains what it shows and sets out the options.',
    challenge: 'Good decisions depend on analysis that takes days to prepare, so plans are based on old numbers or on instinct.',
    how: [
      'A question is asked, or a regular review is due.',
      'The agent pulls the figures from {knowledge}, using your definitions.',
      'It runs the analysis and tests different options.',
      'It explains what is driving the numbers and sets out the options.',
      'Your decision-maker chooses. Larger changes need sign-off.',
      'The approved change is made in {system}.',
    ],
    benefits: ['Answers to business questions in minutes, not days', 'Numbers that match your official reports', 'Clear options with the trade-offs explained, ready for a decision'],
    control: 'The agent sets out the options. Your decision-maker chooses, and larger changes need sign-off before anything is changed.',
    measures: ['Time from question to answer', 'How accurate forecasts are against what happened', 'The value of the recommendations you adopt'],
  },
  'orchestrator-and-specialists': {
    label: 'Coordination across teams',
    summary: 'A lead agent splits a large job between specialist agents and brings their work together.',
    challenge: 'The work crosses several teams and systems. Each handover adds delay, and things get lost in between.',
    how: [
      'A job starts.',
      'A lead agent breaks it into parts.',
      'Specialist agents handle each part at the same time, each in its own system.',
      'The lead agent brings the results together and checks they agree.',
      'Your coordinator is asked only when something needs a decision.',
      'The finished work is recorded in {system}.',
    ],
    benefits: ['Work that took days of back-and-forth is finished in one pass', 'Nothing is lost between teams or systems', 'People are involved only where a decision is needed'],
    control: 'Each agent can only do what you have allowed. When something needs a judgement call, it goes to your coordinator.',
    measures: ['Total time from start to finish', 'How often the work is right first time', 'Cost per completed job'],
  },
};
