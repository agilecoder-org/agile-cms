import { BrowserRouter, Route, Routes } from "react-router-dom"

// Module Imports
import Dashboard from "./modules/dashboard/analytics/Dashboard"
import Blog from "./modules/dashboard/blog"
import RegisterNewBlog from "./modules/dashboard/manage-blogs/RegisterNewBlog"
import ApiSettings from "./modules/dashboard/manage-blogs/ApiSettings"
import Permissions from "./modules/dashboard/manage-blogs/Permissions"
import LandingPage from "./modules/landing-page"
import Authentication from "./modules/authentication"
import Reports from "./modules/dashboard/analytics/Reports"
import Settings from "./modules/dashboard/analytics/Settings"
import PostForm from "./modules/dashboard/blog/pages/PostForm"

// Component Imports
import ProtectedRoute from "./components/layouts/ProtectedRoute"
import { ThemeProvider } from "./components/theme-provider"
import PrivacyPolicy from "./modules/compliance/privacy-policy"
import TermsOfService from "./modules/compliance/terms-of-service"

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/analytics">
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="/manage-blogs">
              <Route path="new-blog" element={<RegisterNewBlog />} />
              <Route path="api-settings" element={<ApiSettings />} />
              <Route path="permissions" element={<Permissions />} />
            </Route>

            <Route path="/blog/:endpoint/post/new" element={<PostForm />} />
            <Route path="/blog/:endpoint/post/edit/:id" element={<PostForm />} />
            <Route path="/blog/:endpoint/posts" element={<Blog />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
