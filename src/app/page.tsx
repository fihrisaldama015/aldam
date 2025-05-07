"use client"
import ExperienceTimeline from "@/components/Experience";
import Hero from "@/components/Hero";
import Highlight from "@/components/Highlight";
import Navbar from "@/components/Navbar";
import Sertif from "@/components/Sertif";
import { useRef } from "react";

export default function Home() {
  // Create refs for each section
  const heroRef = useRef(null);
  const highlightRef = useRef(null);
  const experienceRef = useRef(null);
  const sertifRef = useRef(null);
  
  // Define sections with their refs and ids for the navbar
  const sections = [
    { id: "home", ref: heroRef, label: "Home" },
    { id: "highlights", ref: highlightRef, label: "Highlights" },
    { id: "experience", ref: experienceRef, label: "Experience" },
    { id: "certifications", ref: sertifRef, label: "Certifications" }
  ];
  
  // Function to handle scrolling to a section
  const scrollToSection = (ref: any) => {
    ref.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };
  return (
    <main className="bg-[#fafafa] p-6">
      <Navbar sections={sections} scrollToSection={scrollToSection} />
      <div ref={heroRef} id="home">
        <Hero />
      </div>
      
      <div ref={highlightRef} id="highlights">
        <Highlight />
      </div>
      
      <div ref={experienceRef} id="experience">
        <ExperienceTimeline />
      </div>
      
      <div ref={sertifRef} id="certifications">
        <Sertif />
      </div>
    </main>
  );
}
