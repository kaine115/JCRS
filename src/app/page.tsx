import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import GlobalReach from "@/components/home/GlobalReach";
import BentoServices from "@/components/home/BentoServices";
import LiveJobs from "@/components/home/LiveJobs";
import AboutSection from "@/components/home/AboutSection";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main className="relative bg-white">
      <Navbar />
      
      {/* Cinematic Entry */}
      <Hero />
      
      {/* Content flow with depth */}
      <div className="relative z-10">
        <StatsBar />
        <AboutSection />
        
        {/* The New Surgical Quadrant */}
        <GlobalReach />
        
        {/* The Expandable Service Engine */}
        <BentoServices />
        
        <LiveJobs />
        
        {/* The Brand Vault CTA */}
        <FinalCTA />
      </div>
      
      <Footer />
    </main>
  );
}