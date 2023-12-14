import Hero from "@/components/Hero";
import Highlight from "@/components/Highlight";
import Navbar from "@/components/Navbar";
import Sertif from "@/components/Sertif";

export default function Home() {
  return (
    <main className="bg-[#fafafa] p-6">
      <Navbar />
      <Hero />
      <Highlight />
      <Sertif />
    </main>
  );
}
