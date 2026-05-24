"use client";

import { motion } from "framer-motion";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { teamMembers } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  GitHubIcon,
  LinkedInIcon,
};

export function TeamSection() {
  return (
    <section id="team" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-neon mb-4">
            Our Team
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-balance">
            <span className="text-foreground">Meet the </span>
            <span className="text-neon">Experts</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
            A dedicated duo of skilled developers passionate about creating
            exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="glass-card neon-border rounded-2xl p-8 h-full transition-all duration-500 hover:scale-[1.02] hover:neon-glow">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon/20 to-neon/5 flex items-center justify-center">
                      <span className="text-4xl font-bold text-neon">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-neon flex items-center justify-center neon-glow">
                      <span className="text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-neon font-medium mt-1">{member.role}</p>

                  <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-medium rounded-full glass text-foreground/80"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-4">
                    {member.social.map((social) => {
                      const Icon = iconMap[social.icon];
                      return (
                        <a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full glass transition-all duration-300 hover:scale-110 hover:neon-glow"
                          aria-label={social.platform}
                        >
                          <Icon className="w-5 h-5 text-foreground/70 hover:text-neon transition-colors" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
