import apiClient from "../apiClient";

export const register = async (email: string, password: string, username: string) => {
  const response = await apiClient.post('/auth/register', {
    email_address: email,
    password,
    username,
  });

  if (response.status !== 200) {
    throw new Error('Failed to register');
  }

  return response;
}
