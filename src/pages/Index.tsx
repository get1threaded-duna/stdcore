import NavigationHeader from "@/components/NavigationHeader";
import HeroSection from "@/components/HeroSection";
import ProofSection from "@/components/ProofSection";
import MechanismSection from "@/components/MechanismSection";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <NavigationHeader />
      <div className="pt-16"> {/* Offset for fixed header */}
        <HeroSection />
        <ProofSection />
        <MechanismSection />
        <ArchitectureDiagram />
      </div>
    </main>
  );
};

export default Index;
