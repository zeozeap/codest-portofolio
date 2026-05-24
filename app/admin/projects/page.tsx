"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toaster";

interface ProjectFormValues {
  title: string;
  description: string;
  longDescription?: string;
  technologies: string;
  imageUrl: string;
  imagePublicId: string;
  liveUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  featured: boolean;
  order: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [formData, setFormData] = useState<ProjectFormValues>({
    title: "",
    description: "",
    longDescription: "",
    technologies: "",
    imageUrl: "",
    imagePublicId: "",
    liveUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    featured: false,
    order: 0,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleTechnologyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      technologies: e.target.value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: "POST",
        body: formData,
        onProgress: (progressEvent: ProgressEvent) => {
          if (progressEvent.lengthComputable) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        },
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        imageUrl: data.url,
        imagePublicId: data.publicId,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const technologiesArray = formData.technologies
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const projectData = {
        ...formData,
        technologies: technologiesArray,
      };

      const endpoint = editingId
        ? `${process.env.NEXT_PUBLIC_API_URL}/projects/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/projects`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (!res.ok) throw new Error("Failed to save project");

      await res.json();
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        longDescription: "",
        technologies: "",
        imageUrl: "",
        imagePublicId: "",
        liveUrl: "",
        githubUrl: "",
        linkedinUrl: "",
        featured: false,
        order: 0,
      });
      await fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
    }
  };

  const handleEdit = (project: any) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      longDescription: project.longDescription || "",
      technologies: project.technologies.join(", "),
      imageUrl: project.imageUrl,
      imagePublicId: project.imagePublicId,
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      linkedinUrl: project.linkedinUrl || "",
      featured: project.featured,
      order: project.order,
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete project");

      await fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setEditingId(null)}>
          <Plus className="mr-2 h-4 w-4" />
          {editingId ? "Update Project" : "Add Project"}
        </Button>
      </div>

      {!editingId && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
            <CardDescription>
              Fill in the details below to add a new project to your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="block w-full rounded-md border-border p-2 bg-background text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="block w-full rounded-md border-border p-2 bg-background text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Long Description (optional)
                </label>
                <textarea
                  name="longDescription"
                  value={formData.longDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="block w-full rounded-md border-border p-2 bg-background text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleTechnologyChange}
                  required
                  className="block w-full rounded-md border-border p-2 bg-background text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="block w-full text-sm text-foreground file:cursor-pointer file:text-sm file:font-medium file:border-0 file:bg-transparent file:text-primary-foreground file:hover:file:text-primary-foreground/75 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {uploading && (
                  <div className="mt-2">
                    <progress
                      value={uploadProgress}
                      max="100"
                      className="w-full h-2 bg-background rounded-full"
                    >
                      {uploadProgress}%
                    </progress>
                  </div>
                )}
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="max-w-xs rounded-md border-border"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Live URL (optional)
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-border p-2 bg-background text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    GitHub URL (optional)
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-border p-2 bg-background text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-primary-foreground bg-background border-border focus:ring-primary-foreground"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="featured" className="font-medium text-foreground">
                    Featured Project
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Order
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-border p-2 bg-background text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <Button type="submit" className="w-full">
                {editingId ? "Update Project" : "Add Project"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Projects List</CardTitle>
          <CardDescription>
            Your portfolio projects will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p className="text-sm text-muted-foreground">No projects found.</p>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="p-4 border-border rounded-lg bg-background"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-foreground">{project.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {project.description}
                      </p>
                      {project.longDescription && (
                        <p className="mt-1 text-sm text-muted-foreground truncate">
                          {project.longDescription}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs rounded bg-primary/10 text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-2 flex space-x-2 text-sm text-muted-foreground">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4"
                          >
                            Live
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4"
                          >
                            GitHub
                          </a>
                        )}
                        {project.linkedinUrl && (
                          <a
                            href={project.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4"
                          >
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(project)}
                        aria-label="Edit project"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(project._id)}
                        aria-label="Delete project"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}