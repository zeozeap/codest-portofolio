"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  if (loading) return <div className="flex h-[60vh] items-center justify-center">Loading...</div>;

  if (error) return <div className="flex h-[60vh] items-center justify-center">Error: {error}</div>;

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-center text-muted-foreground">N/A</p>
      ) : (
        <div className="gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project._id}`}
              className="group"
            >
              <div className="bg-background rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No Image</span>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies && project.technologies.map((tech: string, index: number) => (
                      <span key={`${tech}-${index}`} className="px-2 py-0.5 text-xs rounded bg-primary/10 text-primary">
                        {tech}
                      </span>
                    )).slice(0, 4)}
                    {project.technologies && project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 text-xs rounded bg-primary/10 text-primary">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-foreground hover:underline mr-2"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </main>
  );
}