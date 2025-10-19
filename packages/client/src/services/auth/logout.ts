import apiClient from "../apiClient";

export const logout = async () => {
  const response = await apiClient.get('/auth/logout');

  if (response.status !== 200) {
    throw new Error('Failed to logout');
  }

  return response;
}
