// Single source of truth for all CV / portfolio content.
// Edit this file to update what appears on the site — no component edits needed.

export interface SocialLink {
  label: string
  href: string
  kind: 'github' | 'linkedin' | 'email'
}

export const personal = {
  name: 'Amey Tripathi',
  pitch: 'Full-stack engineer building low-latency, scalable systems.',
  location: 'London, UK',
  email: 'amey_tripathi@outlook.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/Supragroza34', kind: 'github' },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/amey-tripathi-335670256',
      kind: 'linkedin',
    },
    { label: 'Email', href: 'mailto:amey_tripathi@outlook.com', kind: 'email' },
  ] satisfies SocialLink[],
}

export const about = {
  summary:
    "I'm a Computer Science student at King's College London, currently on a Software " +
    'Engineering industrial placement at Lloyds Banking Group. I care about systems that ' +
    'stay fast and correct under real load, and about writing frontend code that feels as ' +
    'considered as the backend behind it.',
  education: {
    institution: "King's College London",
    institutionUrl: 'https://www.kcl.ac.uk',
    degree: 'BSc Computer Science with a Year in Industry',
    years: '2024 – 2028',
    predicted: 'Predicted First',
  },
}

export interface ExperienceEntry {
  id: string
  role: string
  org: string
  orgUrl?: string
  period: string
  summary: string
  highlights: string[]
}

export const experience: ExperienceEntry[] = [
  {
    id: 'lloyds',
    role: 'Software Engineering Industrial Placement',
    org: 'Lloyds Banking Group',
    orgUrl: 'https://www.lloydsbankinggroup.com',
    period: 'Jun 2026 – Present',
    summary:
      'Agile team modernising and scaling the Home Insurance Customer Claims Platform.',
    highlights: [
      'Backend development and performance optimisation within a regulated banking environment',
      'Software quality practices across a large, long-lived codebase',
      'Agile delivery alongside product, QA and platform teams',
    ],
  },
  {
    id: 'aarn',
    role: 'Backend Development Intern',
    org: 'AARN Limited',
    period: 'Sep – Nov 2025',
    summary: 'Scalable APIs in Node.js, Python and Java for an education platform.',
    highlights: [
      'Deployed and maintained a fleet of Linux servers on AWS',
      'Provided L2 support for production issues',
      'Used C++ for API performance optimisation',
    ],
  },
  {
    id: 'essential-healthcare',
    role: 'Database Integration Intern',
    org: 'Essential Healthcare',
    period: 'Jul – Aug 2025',
    summary: 'Integrated healthcare databases with PostgreSQL and internal APIs.',
    highlights: [
      'Built Python automation that improved data consistency by 20%',
    ],
  },
  {
    id: 'cooleat',
    role: 'Frontend Development Intern',
    org: 'CoolEat',
    period: 'Jan – Mar 2025',
    summary: 'Modular React components with Redux and Hooks-based state management.',
    highlights: ['Integrated Node.js APIs into the frontend application'],
  },
  {
    id: 'sanmita',
    role: 'Software Engineering Intern',
    org: 'SANMITA',
    period: 'Sep – Oct 2023',
    summary: 'System and software testing, bug tracking and data analysis.',
    highlights: ['Drove UI/UX fixes that improved platform stability by 15%'],
  },
  {
    id: 'opusnoctis',
    role: 'Co-Founder & Product Designer',
    org: 'OpusNoctis',
    period: 'Sep 2022 – Jun 2023',
    summary: 'Designed jigsaw coasters using CAD and laser cutting, sold at trade fairs.',
    highlights: [
      'Generated £300+ in revenue at trade fairs',
      'Young Enterprise Regional Finalist',
    ],
  },
]

export interface Project {
  id: string
  name: string
  description: string
  tech: string[]
  github?: string
  size: 'lg' | 'md' | 'sm'
}

export const projects: Project[] = [
  {
    id: 'goldenbonds',
    name: 'GoldenBonds',
    description:
      'Accessibility-first MERN social platform designed for elderly users, focused on simple navigation and large-contrast UI.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/Supragroza34/GoldenBonds',
    size: 'lg',
  },
  {
    id: 'productivity-buzzer',
    name: 'Productivity Buzzer',
    description:
      'Raspberry Pi 3B+ device using an ultrasonic sensor to track desk presence and nudge focus habits.',
    tech: ['Python', 'Raspberry Pi', 'GPIO'],
    github: 'https://github.com/Supragroza34/Productivity-Buzzer',
    size: 'md',
  },
  {
    id: 'planetary-simulations',
    name: 'Motion Simulator',
    description:
      '3D orbital mechanics simulator modelling gravitational motion between bodies, inspired by BPhO Computational Challenge work.',
    tech: ['Python', '3D Graphics', 'Physics'],
    github: 'https://github.com/Supragroza34/Planetary-Simulations',
    size: 'lg',
  },
  {
    id: 'self-driving-sim',
    name: 'Self-Driving Sim',
    description: 'A 2D self-driving car simulator with sensor-based obstacle avoidance.',
    tech: ['Swift', 'SpriteKit'],
    size: 'md',
  },
  {
    id: 'weather-app',
    name: 'Weather App',
    description: 'A Java desktop app pulling live weather data from a public API.',
    tech: ['Java', 'REST API'],
    size: 'sm',
  },
  {
    id: 'tripchat',
    name: 'TripChat',
    description: 'Vanilla JS chat application with OAuth login and PostgreSQL persistence.',
    tech: ['JavaScript', 'OAuth', 'PostgreSQL'],
    size: 'md',
  },
  {
    id: 'gravity',
    name: 'Gravity',
    description: 'A small Python simulation exploring gravitational field behaviour.',
    tech: ['Python'],
    size: 'sm',
  },
]

export interface SkillGroup {
  label: string
  items: string[]
}

export const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: ['Python', 'Java', 'JavaScript / TypeScript', 'C++', 'Swift', 'HTML / CSS'],
  },
  {
    label: 'Frameworks',
    items: ['React', 'Node.js', 'Express', 'Django', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    label: 'Tools',
    items: ['Git', 'AWS', 'PostgreSQL', 'MongoDB', 'Linux', 'Postman'],
  },
  {
    label: 'Graphics / Simulation',
    items: ['OpenGL', 'Unity', 'SpriteKit'],
  },
]

export interface ModuleGrade {
  module: string
  grade: string
}

export const kclGrades: ModuleGrade[] = [
  { module: 'Language Design Paradigms', grade: '94%' },
  { module: 'C++ / Scala', grade: '94%' },
  { module: 'Robotics', grade: '96%' },
  { module: 'Logic', grade: '88%' },
  { module: 'Software Engineering Project', grade: '86%' },
  { module: 'Introduction to AI', grade: '85%' },
  { module: 'Functional & Concurrent Programming (FC2)', grade: '82%' },
  { module: 'Database Systems', grade: '81%' },
  { module: 'Java', grade: '81%' },
]

export interface Award {
  title: string
  year: string
  /** Path to a certificate PDF in /public/awards, e.g. '/awards/bpho-gold.pdf' */
  pdfUrl?: string
}

export const awards: Award[] = [
  {
    title: "King's College London Dean's Commendation for AKC — Semester 1",
    year: '2026',
    pdfUrl: '/awards/kcl-akc-sem1-deans-commendation-2026.pdf',
  },
  {
    title: "King's College London Dean's Commendation for AKC — Semester 2",
    year: '2026',
    pdfUrl: '/awards/kcl-akc-sem2-deans-commendation-2026.pdf',
  },
  {
    title: "King's College London Dean's Commendation for AKC — Semester 2 Essay",
    year: '2026',
    pdfUrl: '/awards/kcl-akc-sem2-essay-deans-commendation-2026.pdf',
  },
  { title: 'BPhO Computational Challenge — Gold', year: '2024' },
  { title: 'UKMT Senior Maths Challenge — Silver', year: '2024' },
  { title: 'Young Enterprise — Regional Finalist', year: '2023' },
]

export interface Certification {
  title: string
  year: string
}

export const certifications: Certification[] = [
  { title: 'AWS for Developers', year: '2025' },
  { title: 'Full Stack Coding Bootcamp', year: '2025' },
  { title: 'Diploma in Computer Networking', year: '2023' },
]

export const github = {
  username: 'Supragroza34',
  excludeRepos: ['Supragroza34'],
}
