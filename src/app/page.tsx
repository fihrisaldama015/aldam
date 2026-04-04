"use client";
import Contact from "@/components/Contact";
import ExperienceTimeline from "@/components/Experience";
import Hero from "@/components/Hero";
import Highlight from "@/components/Highlight";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <main className="bg-[#0f172a] min-h-screen">
      <Navbar sections={SECTIONS} />
      <ScrollProgress />
      <Hero />
      <Highlight />
      <Projects />
      <ExperienceTimeline />
      <Contact />
    </main>
  );
}
