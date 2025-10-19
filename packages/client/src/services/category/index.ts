import apiClient from "../apiClient";

export interface Category {
  _id: string;
  name: string;
  blog: string;
  slug: string;
}

export interface CreateCategoryInput {
  name: string;
  blog: string;
}

export interface UpdateCategoryInput {
  name: string;
  blog: string;
}

export const createCategory = async (data: CreateCategoryInput) => {
  const response = await apiClient.post<Category>("/category", data);
  return response.data;
};

export const getCategories = async (blog?: string) => {
  const response = await apiClient.get<Category[]>("/category", {
    params: blog ? { blog } : {},
  });
  return response.data;
};

export const getCategoryById = async (id: string) => {
  const response = await apiClient.get<Category>(`/category/${id}`);
  return response.data;
};

export const updateCategory = async (id: string, data: UpdateCategoryInput) => {
  const response = await apiClient.put<Category>(`/category/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await apiClient.delete<{ message: string }>(`/category/${id}`);
  return response.data;
};
