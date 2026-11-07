import About from "./components/About";
import BackToTop from "./components/BackToTop";
import CaseStudy from "./components/CaseStudy";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Services from "./components/Services";
import { getCaseStudy } from "./data/caseStudies";
import { useReveal } from "./hooks/useReveal";
import { useRoute } from "./hooks/useRoute";

export default function App() {
  const slug = useRoute();
  const study = slug ? getCaseStudy(slug) : undefined;
  useReveal(study?.slug);

  return (
    <>
      <Navbar />
      <main>
        {study ? (
          <CaseStudy study={study} />
        ) : (
          <>
            <Hero />
            <About />
            <Experience />
            <Services />
            <Projects />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
