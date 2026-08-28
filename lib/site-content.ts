export const navigation = [
  { label: "About Us", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Programmes", href: "/programmes" },
  { label: "Projects & Impact", href: "/projects" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Stories", href: "/stories" },
  { label: "Gallery", href: "/gallery" },
];

export const programmeCards = [
  {
    kicker: "Faith in action",
    title: "Evangelism & Discipleship",
    description: "Creating welcoming pathways for people to encounter Christ, grow in faith, and serve their communities.",
    icon: "cross",
  },
  {
    kicker: "Equipping potential",
    title: "Education & Empowerment",
    description: "Supporting learning, practical skills, mentorship, and opportunities that strengthen individuals and families.",
    icon: "book",
  },
  {
    kicker: "Compassion at work",
    title: "Humanitarian Outreach",
    description: "Responding to community needs with dignity, care, responsible stewardship, and lasting relationships.",
    icon: "heart",
  },
];

export const programmeCategories = [
  "Evangelism",
  "Discipleship",
  "Christian education",
  "Scholarships",
  "Youth development",
  "Empowerment",
  "Skills acquisition",
  "Healthcare support",
  "Humanitarian relief",
  "Community development",
  "Counselling",
  "Chaplaincy",
  "Training",
  "Family support",
  "Veteran Help",
  "Other outreach programmes",
];

export const publicPages: Record<string, { eyebrow: string; title: string; description: string }> = {
  about: { eyebrow: "Our identity", title: "Rooted in faith. Present in community.", description: "This page will share the ministry's verified story, mission, vision, values, leadership, and communities served once those details are supplied." },
  ministries: { eyebrow: "Our ministries", title: "Helping people grow in Christ", description: "Explore ministry areas designed to nurture faith, discipleship, Christian education, counselling, and service." },
  programmes: { eyebrow: "Programmes", title: "Practical pathways to lasting impact", description: "This flexible programme area will present active ministry and humanitarian work as administrators publish verified information." },
  projects: { eyebrow: "Projects & impact", title: "Transparent work. Meaningful outcomes.", description: "Current, upcoming, and completed projects will appear here with verified objectives, locations, updates, and impact information." },
  "get-involved": { eyebrow: "Get involved", title: "There is a place for you to serve", description: "Discover future opportunities to volunteer, partner, support a programme, or stand with the ministry in prayer." },
  stories: { eyebrow: "Stories", title: "Hope taking root", description: "Approved ministry news, testimonies, outreach reports, and project updates will be published here." },
  gallery: { eyebrow: "Impact gallery", title: "Moments of faith and service", description: "Verified, consent-aware photographs from outreach, training, events, and community activities will be managed here." },
  give: { eyebrow: "Give", title: "Support the mission with confidence", description: "Verified giving information and approved campaigns will appear here when the ministry supplies its official details. No payment provider is connected yet." },
  assistance: { eyebrow: "Request assistance", title: "A private path to ask for support", description: "A secure, confidential assistance-request workflow will be implemented in a later phase. Requests will never be published automatically." },
  contact: { eyebrow: "Contact", title: "We would be glad to hear from you", description: "Official ministry contact details and secure enquiry forms will appear here once verified information is supplied." },
};
