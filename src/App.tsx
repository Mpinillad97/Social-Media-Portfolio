import About from './components/About.tsx'
import ClosingBand from './components/ClosingBand.tsx'
import Contact from './components/Contact.tsx'
import Faq from './components/Faq.tsx'
import Footer from './components/Footer.tsx'
import Hero from './components/Hero.tsx'
import HowIWork from './components/HowIWork.tsx'
import Navbar from './components/Navbar.tsx'
import Portfolio from './components/Portfolio.tsx'
import WhatIBring from './components/WhatIBring.tsx'
import WhatIDo from './components/WhatIDo.tsx'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        {/* One continuous white panel over the checkerboard; all portfolio sections live inside it. */}
        <div className="content-panel">
          <About />
          <hr className="section-divider" />
          <Portfolio />
          <hr className="section-divider" />
          <WhatIDo />
          <hr className="section-divider" />
          <WhatIBring />
          <hr className="section-divider" />
          <HowIWork />
        </div>
        {/* New stage: a full-width warm surface after the checkerboard margin. */}
        <div className="closing">
          <ClosingBand />
          <Faq />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
