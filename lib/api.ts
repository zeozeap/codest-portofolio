import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("admin_token");
        window.location.href = "/auth/login";
      }
    }
    return Promise.reject(error);
  }
);

export interface Project {
  _id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl: string;
  imagePublicId: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  reply?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  admin: Admin;
}

export const authApi = {
  login: (email: string, password: string) =>
    api.post<AuthResponse>("/auth/login", { email, password }),
  me: () => api.get<Admin>("/auth/me"),
};

export const projectsApi = {
  getAll: () => api.get<Project[]>("/projects"),
  getFeatured: () => api.get<Project[]>("/projects/featured"),
  getById: (id: string) => api.get<Project>(`/projects/${id}`),
  create: (data: Partial<Project>) => api.post<Project>("/projects", data),
  update: (id: string, data: Partial<Project>) =>
    api.put<Project>(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
};

export const contactApi = {
  submit: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => api.post("/contact", data),
  getAll: () => api.get<Contact[]>("/contact"),
  getUnreadCount: () => api.get<{ count: number }>("/contact/unread-count"),
  markAsRead: (id: string) => api.patch<Contact>(`/contact/${id}/read`),
  reply: (id: string, reply: string) => api.post(`/contact/${id}/reply`, { reply }),
  delete: (id: string) => api.delete(`/contact/${id}`),
};

export const uploadApi = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post<{ url: string; publicId: string }>("/upload/image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
