"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import GitHubIcon from "@mui/icons-material/GitHub";

interface Project {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
}

const placeholderProjects: Project[] = [
  {
    _id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with payment integration, inventory management, and real-time analytics.",
    thumbnail: "/images/placeholder-project-1.jpg",
    tags: ["Next.js", "MongoDB", "Stripe", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    isFeatured: true,
  },
  {
    _id: "2",
    title: "3D Product Configurator",
    description:
      "Interactive 3D product visualization tool allowing customers to customize and preview products in real-time.",
    thumbnail: "/images/placeholder-project-2.jpg",
    tags: ["Three.js", "React", "WebGL", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
    isFeatured: true,
  },
  {
    _id: "3",
    title: "SaaS Dashboard",
    description:
      "Comprehensive analytics dashboard with real-time data visualization, user management, and reporting features.",
    thumbnail: "/images/placeholder-project-3.jpg",
    tags: ["React", "TypeScript", "Chart.js", "Express"],
    liveUrl: "#",
    githubUrl: "#",
    isFeatured: true,
  },
];

export function PortfolioSection() {
  const [projects, setProjects] = useState<Project[]>(placeholderProjects);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/featured`
        );
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setProjects(data);
          }
        }
      } catch {
        console.log("Using placeholder projects");
      }
    };

    fetchProjects();
  }, []);

  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-medium text-neon mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-balance">
            <span className="text-foreground">Featured </span>
            <span className="text-neon">Projects</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore our portfolio of successful projects that showcase our
            expertise and creativity
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === "all"
                ? "bg-neon text-primary-foreground neon-glow"
                : "glass-card hover:bg-white/10"
            }`}
          >
            All Projects
          </button>
          {allTags.slice(0, 5).map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === tag
                  ? "bg-neon text-primary-foreground neon-glow"
                  : "glass-card hover:bg-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-2xl overflow-hidden h-full transition-all duration-500 hover:neon-border hover:scale-[1.02]">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-neon/20 to-neon/5" />
                  {project.thumbnail.startsWith("/images/placeholder") ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neon/10 to-transparent">
                      <span className="text-4xl font-bold text-neon opacity-50">
                        {project.title[0]}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium rounded-full glass text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-neon hover:underline"
                      >
                        <OpenInNewIcon className="w-4 h-4" />
                        Live Demo
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-foreground"
                      >
                        <GitHubIcon className="w-4 h-4" />
                        Source
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-neon text-primary-foreground font-semibold tracking-wide transition-all duration-300 hover:scale-105 neon-glow shine-button"
          >
            Start Your Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
