import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/HomePage'
import LawPage from './pages/LawPage'
import CompletionPage from './pages/CompletionPage'
import IntroPage from './pages/IntroPage'

export default function App() {
  const location = useLocation()
  return (
    <Layout>
      <ErrorBoundary key={location.pathname}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/laws/:slug" element={<LawPage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/complete" element={<CompletionPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </Layout>
  )
}
