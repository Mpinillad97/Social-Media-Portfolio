import Hero from './components/Hero.tsx'
import Navbar from './components/Navbar.tsx'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* Provisional empty space to review the checkerboard and the compact navbar; replace with real content. */}
        <div aria-hidden="true" className="h-svh" />
      </main>
    </>
  )
}

export default App
