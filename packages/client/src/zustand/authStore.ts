import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id?: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User;
  login: (user: User) => void;
  logout: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: {},
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: {} }),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name: string) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name: string, value: unknown): void => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name: string): void => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export default useAuth;
