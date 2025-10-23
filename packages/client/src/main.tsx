import { createRoot } from 'react-dom/client'
import './index.css'
import { TooltipProvider } from "@/components/ui/tooltip"

import App from './App'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <TooltipProvider>
      <App />
      <Toaster
        position="top-right"
      />
    </TooltipProvider>
  </ThemeProvider>,
)
