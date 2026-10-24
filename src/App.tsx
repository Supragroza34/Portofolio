import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { AuthProvider } from './context/AuthContext'
import { BlogHome } from './pages/BlogHome'
import { BlogPost } from './pages/BlogPost'
import { About } from './pages/About'
import { CV } from './pages/CV'
import { Projects } from './pages/Projects'
import { AdminLogin } from './pages/admin/Login'
import { AdminDashboard } from './pages/admin/Dashboard'
import { ProtectedRoute } from './pages/admin/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-copper focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/about" replace />} />
              <Route path="/blog" element={<BlogHome />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/about" element={<About />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  )
}

export default App
