import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { ThemeContextProvider } from './contexts/ThemeContext'
import MainLayout from './layouts/MainLayout'
import LandingPage from './pages/LandingPage'
import IndividualClient from './pages/IndividualClient'
import BusinessClient from './pages/BusinessClient'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="individual" element={<IndividualClient />} />
            <Route path="business" element={<BusinessClient />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeContextProvider>
  )
}

export default App
