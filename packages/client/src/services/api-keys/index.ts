import apiClient from "../apiClient";

export const createApiKey = async (name: string, endpoint: string, origin: string) => {
  const response = await apiClient.post("/api-key", { name, endpoint, origin });
  if (response.status === 201) return response.data;
  throw new Error(`Error creating API key: ${response.statusText}`);
};

export const getApiKeysByBlog = async (endpoint: string) => {
  const response = await apiClient.get(`/api-key?endpoint=${endpoint}`);
  if (response.status === 200) return response.data;
  throw new Error(`Error fetching API keys: ${response.statusText}`);
};

export const deleteApiKey = async (id: string) => {
  const response = await apiClient.delete(`/api-key/${id}`);
  if (response.status === 200) return response.data;
  throw new Error(`Error deleting API key: ${response.statusText}`);
};
