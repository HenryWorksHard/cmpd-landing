// The privacy policy, as data.
//
// Written against the Privacy Act 1988 (Cth) and the 13 Australian Privacy
// Principles. The small-business exemption in s 6D does NOT apply to CMPD:
// it is removed for any organisation that provides a health service and
// holds health information, whatever its turnover. So the full Act applies.
//
// Health information is "sensitive information" under the Act, which is the
// highest category: it generally cannot be collected without consent, and it
// carries tighter limits on use and disclosure than ordinary personal
// information.
//
// Kept here rather than inline in JSX so the same text can be rendered in the
// app as well without the two drifting apart.

export const LAST_UPDATED = '3 November 2026';

export type Section = { heading: string; body: string[]; list?: string[] };

export const POLICY: Section[] = [
  {
    heading: 'Who this covers',
    body: [
      'This policy covers CMPD Collective ("CMPD", "we", "us") and everything we run: the website at cmpdcollective.com, the CMPD app at app.cmpdcollective.com, and the coaching and programming we provide through them.',
      'CMPD provides a health service and holds health information. That matters legally: the small business exemption in the Privacy Act 1988 (Cth) does not apply to organisations that do, regardless of size. We are bound by the Act and by all thirteen Australian Privacy Principles, the same as any hospital or insurer.',
    ],
  },
  {
    heading: 'What Eddy does, and what he does not do',
    body: [
      'Eddy is an exercise physiologist. He prescribes exercise. He does not diagnose.',
      'That distinction is the whole basis of this service. Every program we write is built on a diagnosis that an appropriate medical professional has already made — your GP, a specialist, a physiotherapist, a surgeon. We take that diagnosis as the starting point and design training around it.',
      'We do not tell you what is wrong with you. We do not interpret scans or imaging to reach a conclusion about your condition. We do not provide a second opinion on a diagnosis, replace medical treatment, or clear you to exercise. If you have not been diagnosed, or you have not been cleared to train, that has to come first, from someone qualified to give it.',
      'If anything you tell us suggests you need medical attention rather than a training program, we will say so and we will not sell you a program.',
    ],
  },
  {
    heading: 'What we collect',
    body: ['We collect only what we need to write and deliver your program, and to run the business behind it.'],
    list: [
      'Identity and contact details: your name, age, email address and phone number. If you fill in the injury intake form we also collect an emergency contact.',
      'Health information: the area of your body affected, how long you have had the problem, how it began, pain ratings, what makes it better and worse, your diagnosis and who gave it to you, prior surgery, fractures and major injuries, relevant medical conditions, and your answers to our screening questions.',
      'Clinical documents you choose to send us: scan and imaging reports, specialist letters, physiotherapy notes, surgical reports. You are never required to send these. We ask for them only when they would change the program.',
      'Training data: the sessions you complete, the weights and repetitions you log, your goals, and any progress photographs you choose to upload.',
      'Account and technical data: your login details, the times you use the app, the device and browser you use, and your IP address.',
      'Payment data: what you bought and when. Card numbers are entered directly into Stripe and never reach us or our systems.',
    ],
  },
  {
    heading: 'Consent, and why we ask',
    body: [
      'Health information is "sensitive information" under the Privacy Act, the most protected category there is. We cannot collect it without your consent.',
      'You give that consent by choosing to fill in the injury intake form, by sending us a scan or a medical document, or by entering health details into the app. You are never obliged to provide any of it. You can decline, and you can withdraw consent later by contacting us, though we may then be unable to write or continue a program safely.',
    ],
  },
  {
    heading: 'Confidentiality',
    body: [
      'What you tell us about your body and your health is confidential. We treat it that way as a professional obligation, not only a legal one.',
      'Inside CMPD, your information is seen only by the people who need it to deliver your program. In practice that is Eddy, and the administrator who maintains the systems. Nobody else in the organisation has access to your health information, and no other client can ever see it.',
      'We do not sell your information. We do not rent, trade or share it for anybody else’s marketing, ever. We do not use your health information to advertise to you.',
    ],
  },
  {
    heading: 'Scans, imaging and medical documents',
    body: [
      'If you send us a scan, an imaging report or any other clinical document, these rules apply to it:',
    ],
    list: [
      'You send it voluntarily, and only because you chose to. We will tell you when a document would help; we will not withhold a program for want of one we can work without.',
      'It is used for one purpose: understanding what your body can safely be asked to do, so the program suits it.',
      'It is visible only to Eddy and to the administrator who maintains the systems. It is never shown to another client, published, used in marketing, or included in a case study or social media post.',
      'We do not forward it to anyone — not another practitioner, not your employer, not an insurer — without asking you first and getting your agreement, unless the law requires us to.',
      'We do not interpret it diagnostically. Reading an image to decide what is wrong with you is a doctor’s job. We read the report to understand a diagnosis that has already been made.',
      'You can ask us to delete it at any time and we will, unless we are legally required to keep it. Deleting it does not delete the rest of your record.',
    ],
  },
  {
    heading: 'Your address and contact details',
    body: [
      'We collect contact details so we can reach you about your program, your account and your payments, and an emergency contact in case something happens during training.',
      'We use them for that and nothing else. We do not pass your address, phone number or email to any other organisation for their own purposes, and we do not add you to third-party marketing lists. If we send you anything promotional you can unsubscribe from it in one click, and doing so will never affect the service you receive.',
      'Your emergency contact is used only in an emergency. We do not discuss your health, your program or your account with them in any other circumstance.',
    ],
  },
  {
    heading: 'Who else touches your information',
    body: [
      'We use a small number of service providers to run CMPD. They process information on our behalf, under contract, and may not use it for their own purposes:',
    ],
    list: [
      'Supabase — the database and file storage holding your account, your program, your training history and any documents you upload.',
      'Vercel — hosting for the website and the app.',
      'Stripe — payment processing. Stripe handles your card details directly; we only ever see the fact and amount of a payment.',
      'Resend — the service that sends our emails, such as your password link and program notifications.',
    ],
  },
  {
    heading: 'Where your information is stored',
    body: [
      'Our providers operate internationally and some of them store or process data on servers outside Australia, including in the United States. By using CMPD you consent to that, as required by Australian Privacy Principle 8.',
      'We choose providers with recognised security practices and contractual obligations to protect the data they hold for us. We do not transfer your information to any other overseas recipient.',
    ],
  },
  {
    heading: 'How we keep it secure',
    body: ['The protections on your information are:'],
    list: [
      'Everything travels over an encrypted connection and is encrypted at rest by our providers.',
      'The database enforces access rules at the row level, so an account can only ever read the records belonging to it. This is enforced by the database itself, not only by the app.',
      'Uploaded documents and scans are held in private storage that cannot be read without authorisation. They are not publicly addressable.',
      'Access is limited to the people who need it. Staff access is tied to a named account and can be withdrawn.',
      'No system is perfectly secure, and we will not pretend otherwise. What we can say is what we do about it, which is the next section.',
    ],
  },
  {
    heading: 'If there is a data breach',
    body: [
      'We are covered by the Notifiable Data Breaches scheme.',
      'If we suspect a breach we will assess it within 30 days. If it is likely to result in serious harm to you, we will tell you and the Office of the Australian Information Commissioner as soon as practicable, and we will tell you plainly what happened, what was exposed and what to do about it.',
      'We would rather tell you about something that turned out to be harmless than stay quiet about something that was not.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'Health records are kept for at least seven years from your last contact with us. For anyone under 18 when we last saw them, records are kept until they turn 25.',
      'South Australia has no dedicated health records legislation, so we follow the standard accepted across Australian practice and the periods legislated in New South Wales, Victoria and the ACT.',
      'Account and payment records are kept for seven years to meet tax and business record obligations. Information we no longer need is deleted or de-identified.',
    ],
  },
  {
    heading: 'Your rights',
    body: ['Under the Australian Privacy Principles you can:'],
    list: [
      'Ask for a copy of what we hold about you. We will respond within 30 days and we will not charge you for the request itself.',
      'Ask us to correct anything inaccurate, out of date or incomplete.',
      'Ask us to delete information we no longer need, subject to the retention periods above.',
      'Withdraw consent to our holding your health information, accepting that we may then be unable to continue your program safely.',
      'Deal with us anonymously or under a pseudonym where that is lawful and practical. For a program built around your injury, it generally is not.',
      'Complain, and have the complaint taken seriously.',
    ],
  },
  {
    heading: 'Complaints',
    body: [
      'If you think we have mishandled your information, email contact@cmpdcollective.com. We will acknowledge it within 5 business days and respond substantively within 30 days.',
      'If you are not satisfied with our response, you can take it to the Office of the Australian Information Commissioner at oaic.gov.au or on 1300 363 992. You do not need our permission and you do not need to come to us first, though we would rather have the chance to fix it.',
    ],
  },
  {
    heading: 'Children',
    body: [
      'CMPD programs are intended for people aged 16 and over. We do not knowingly collect information from anyone under 16 without a parent or guardian’s involvement. If you believe we hold information about a child, contact us and we will deal with it.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      'If we change this policy we will update the date at the top. If a change materially affects how we handle your health information, we will tell you directly rather than relying on you noticing.',
    ],
  },
  {
    heading: 'Contact',
    body: [
      'Questions, requests and complaints: contact@cmpdcollective.com',
      'CMPD Collective, South Australia.',
    ],
  },
];
