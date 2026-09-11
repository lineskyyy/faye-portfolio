import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AboutMePage from "./pages/AboutMePage"
import ProjectPage from "./pages/ProjectPage"
import ScrollToTop from "./components/ScrolltoTop"
import Footer from "./pages/Footer"

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutMePage />} />
        <Route path="/work" element={<ProjectPage />} />
      </Routes>
      <Footer /> {/* 2. Place it here after Routes */}
    </Router>
  )
}

export default App