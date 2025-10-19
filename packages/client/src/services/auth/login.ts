import apiClient from "../apiClient";

export const login = async (login_id: string, password: string) => {
  const response = await apiClient.post('/auth/login', {
    login_id,
    password,
  });

  if (response.status !== 200) {
    throw new Error('Failed to register');
  }

  return response;
}
