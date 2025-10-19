import { Post } from "@/types/post";
import apiClient from "../apiClient";

export const createPost = async (post: Post) => {
  const response = await apiClient.post('/post/create', post);
  if (response.status === 200) return response.data;
  throw new Error(`Error fetching posts: ${response.statusText}`);
}

export const getPostsByEndpoint = async (endpoint: string) => {
  const response = await apiClient.get('/post?endpoint=' + endpoint);
  if (response.status === 200) return response.data;
  throw new Error(`Error fetching posts: ${response.statusText}`);
}

export const getPostsByEndpointWithParams = async (endpoint: string, params: any) => {
  const response = await apiClient.get(endpoint, { params });
  if (response.status === 200) return response.data;
  throw new Error(`Error fetching posts: ${response.statusText}`);
}

export const editPost = async (id: string, updatedPost: Partial<Post>) => {
  const response = await apiClient.put(`/post/${id}`, updatedPost);
  if (response.status === 200) return response.data;
  throw new Error(`Error editing post: ${response.statusText}`);
};

export const deletePost = async (id: string) => {
  const response = await apiClient.delete(`/post/${id}`);
  if (response.status === 200) return response.data;
  throw new Error(`Error deleting post: ${response.statusText}`);
};

export const getPostById = async (id: string) => {
  const response = await apiClient.get(`/post/${id}`);
  if (response.status === 200) return response.data;
  throw new Error(`Error fetching post: ${response.statusText}`);
};

export const changePostStatus = async (id: string, status: "draft" | "published" | "archived") => {
  const response = await apiClient.patch(`/post/status/${id}`, { status });
  if (response.status === 200) return response.data;
  throw new Error(`Error changing post status: ${response.statusText}`);
};