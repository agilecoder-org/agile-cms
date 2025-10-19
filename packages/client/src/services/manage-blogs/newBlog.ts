import apiClient from "../apiClient";
import { BlogSite } from "@/types/blogSite";

export const createBlogSite = async (blogData: Partial<BlogSite>) => {
  const response = await apiClient.post("/blog/create", blogData);
  return response.data;
};

export const getBlogSites = async () => {
  const response = await apiClient.get("/blog");
  return response.data;
};

export const getBlogSiteById = async (id: string) => {
  const response = await apiClient.get(`/blog/${id}`);
  return response.data;
};
