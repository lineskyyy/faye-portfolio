import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import FloatingElements from "../components/FloatingElements";
import { ArrowLeft, Palette, Presentation, Briefcase, Layout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DigitalIllustration from "../components/DigitalIllustration";
import Presentations from "../components/Presentations";
import Branding from "../components/Branding";
import GraphicDesign from "../components/GraphicDesign";

// 1. Update TabKey type to include all active tabs
type TabKey = "illustrations" | "presentations" | "branding" | "graphic-design";

// 2. Assign unique icons and keys to each tab
const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "illustrations", label: "Digital Illustration", icon: <Palette size={18} /> },
  { key: "presentations", label: "Presentations", icon: <Presentation size={18} /> },
  { key: "branding", label: "Branding", icon: <Briefcase size={18} /> },
  { key: "graphic-design", label: "Graphic Design", icon: <Layout size={18} /> },
];

export default function ProjectPage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("illustrations");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to render component based on activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case "illustrations":
        return <DigitalIllustration />;
      case "presentations":
        return <Presentations />;
      case "branding":
        return <Branding />;
      case "graphic-design":
        return <GraphicDesign />;
      default:
        return <DigitalIllustration />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <FloatingElements scrollY={scrollY} />
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6 mb-12">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-secondary hover:text-primary smooth-transition mb-8 font-semibold"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-tred">Projects</span>
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-sred to-accent rounded-full"></div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-3 mb-10">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold border-2 smooth-transition transition-all duration-300 hover:scale-105 ${
                  activeTab === tab.key
                    ? "bg-sred text-primary-secondary border-sred shadow-[0_0_20px_rgba(254,73,123,0.4)]"
                    : "bg-secondary/10 text-secondary border-secondary/30 hover:bg-tred/20 hover:text-tred"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Tab Content */}
        <div key={activeTab} className="fade-up">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}