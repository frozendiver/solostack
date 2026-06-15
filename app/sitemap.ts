import type { MetadataRoute } from "next";
import toolsData from "@/content/tools.json";
import categoriesData from "@/content/categories.json";
import workflowsData from "@/content/workflows.json";
import type { Tool, Category, Workflow } from "@/types";

const BASE = "https://solostack.co";

const tools = toolsData as Tool[];
const categories = categoriesData as Category[];
const workflows = workflowsData as Workflow[];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/submit`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/advertise`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const workflowPages: MetadataRoute.Sitemap = workflows.map((w) => ({
    url: `${BASE}/workflow/${w.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const toolPages: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${BASE}/tools/${t.slug}`,
    lastModified: new Date(t.dateAdded),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...workflowPages, ...toolPages];
}
