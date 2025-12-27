import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import ProofSection from "@/components/ProofSection";
import MechanismSection from "@/components/MechanismSection";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="pt-16">
        <HeroSection />
        <ProofSection />
        <MechanismSection />
        <ArchitectureDiagram />
        <DemoSection />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
