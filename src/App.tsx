import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Footer from './components/Footer.tsx'
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'
import ProjectDetail from './pages/ProjectDetail.tsx'

// New pages start at the top; in-page anchors (e.g. /#portafolio) scroll to their target.
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

function App() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
