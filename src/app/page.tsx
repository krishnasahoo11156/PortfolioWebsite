import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Achievements from "@/components/sections/Achievements";
import HorizontalProjects from "@/components/sections/HorizontalProjects";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import AIShowcase from "@/components/sections/AIShowcase";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import HeartCounter from "@/components/ui/HeartCounter";
import DevConsole from "@/components/ui/DevConsole";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Achievements />
        <HorizontalProjects />
        <Skills />
        <Timeline />
        <AIShowcase />
        <Contact />
      </main>
      <Footer />
      <HeartCounter />
      <DevConsole />
    </>
  );
}
