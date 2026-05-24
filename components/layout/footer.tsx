"use client";

import Link from "next/link";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const footerLinks = {
  company: [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/#team", label: "Team" },
    { href: "/#portfolio", label: "Portfolio" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-of-service", label: "Terms of Service" },
  ],
  social: [
    { href: "https://github.com/codest-in", icon: GitHubIcon, label: "GitHub" },
    {
      href: "https://linkedin.com/company/codest",
      icon: LinkedInIcon,
      label: "LinkedIn",
    },
    { href: "mailto:hello@codest.in", icon: EmailIcon, label: "Email" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card/50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-gradient">CODEST</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
              Premium digital solutions for modern businesses. We craft
              cutting-edge web applications, stunning 3D experiences, and robust
              backend architectures.
            </p>
            <div className="flex gap-4 mt-6">
              {footerLinks.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass-card neon-border transition-all duration-300 hover:scale-110 hover:neon-glow"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-foreground/70 hover:text-neon transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {currentYear} Codest. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with precision in India
          </p>
        </div>
      </div>
    </footer>
  );
}
