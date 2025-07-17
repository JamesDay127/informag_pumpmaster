import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { PumpsPage } from './pages/pumps/pumps-page'
import { LoginPage } from './pages/login-page'
import { AuthProvider } from './contexts/AuthContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { DashboardPage } from './pages/dashboard-page'
import { Navbar } from './components/Navbar'
import { ReportsPage } from './pages/reports-page'
import { AlertsPage } from './pages/alerts-page'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Navigate to="/dashboard" replace />
                </>
              </ProtectedRoute>
            } 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <DashboardPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route 
            path="/pumps" 
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <PumpsPage />
                </>
              </ProtectedRoute>
            } 
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <ReportsPage />
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <AlertsPage />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
