import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Sertif from "@/components/Sertif";

export default function Home() {
  return (
    <main className="bg-[#fafafa] p-6">
      <Navbar />
      <Hero />
      <Sertif />
    </main>
  );
}
