export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  avatar?: string;
  social: {
    platform: string;
    url: string;
    icon: string;
  }[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "uttam-sharma",
    name: "Uttam Sharma",
    role: "The App Developer",
    bio: "Specializing in building powerful, scalable web applications with modern JavaScript frameworks and backend technologies.",
    skills: [
      "Next.js",
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JavaScript",
      "GitHub",
    ],
    social: [
      {
        platform: "GitHub",
        url: "https://github.com/i-am-uttam",
        icon: "GitHubIcon",
      },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/uttam-sharma-745306258/",
        icon: "LinkedInIcon",
      },
    ],
  },
  {
    id: "aman-sharma",
    name: "Aman Sharma",
    role: "Full-Stack Engineer & 3D Specialist",
    bio: "Creating immersive digital experiences with cutting-edge 3D technologies and full-stack expertise.",
    skills: [
      "React.js",
      "Three.js",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Material UI",
      "Framer Motion",
      "TypeScript",
      "Docker",
    ],
    social: [
      {
        platform: "GitHub",
        url: "https://github.com/zeozeap",
        icon: "GitHubIcon",
      },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/aman-sharma-19b487411/",
        icon: "LinkedInIcon",
      },
    ],
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "/contact" },
];

export interface FooterLink {
  label: string;
  href: string;
}

export const footerLinks = {
  company: [
    { label: "Home", href: "/" },
    { label: "Services", href: "#services" },
    { label: "Team", href: "#team" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};
