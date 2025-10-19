import { createContext, useContext, ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProviderContext = createContext({});

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Ensure the HTML root always has the light class
  if (typeof window !== "undefined") {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  }

  return (
    <ThemeProviderContext.Provider value={{}}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Hook (optional) if you want to consume it later
export const useTheme = () => useContext(ThemeProviderContext);
