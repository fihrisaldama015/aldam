"use client";
import Contact from "@/components/Contact";
import ExperienceTimeline from "@/components/Experience";
import Hero from "@/components/Hero";
import Highlight from "@/components/Highlight";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollSection from "@/components/ScrollSection";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <main className="bg-[#0f172a] relative">
      <Navbar sections={SECTIONS} />
      <ScrollProgress />
      <ScrollSection id="home" index={0}><Hero /></ScrollSection>
      <ScrollSection id="skills" index={1}><Highlight /></ScrollSection>
      <ScrollSection id="projects" index={2}><Projects /></ScrollSection>
      <ScrollSection id="experience" index={3} noDwell><ExperienceTimeline /></ScrollSection>
      <ScrollSection id="contact" index={4}><Contact /></ScrollSection>
    </main>
  );
}
