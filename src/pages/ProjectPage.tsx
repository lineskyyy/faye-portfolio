import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import FloatingElements from "../components/FloatingElements";
import {
  ArrowLeft,
  Palette,
  Presentation,
  Briefcase,
  Layout,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { motion } from "framer-motion";
import DigitalIllustration from "../components/DigitalIllustration";
import Presentations from "../components/Presentations";
import Branding from "../components/Branding";
import GraphicDesign from "../components/GraphicDesign";
import CurtainTransition from "../components/CurtainTransition";

type TabKey = "branding" | "graphic-design" | "illustrations" | "presentations";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "branding", label: "Branding", icon: <Briefcase size={18} /> },
  {
    key: "graphic-design",
    label: "Graphic Design",
    icon: <Layout size={18} />,
  },
  {
    key: "illustrations",
    label: "Digital Illustration",
    icon: <Palette size={18} />,
  },
  {
    key: "presentations",
    label: "Presentations",
    icon: <Presentation size={18} />,
  },
];

export default function ProjectPage() {
  // const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState<TabKey>("branding");
  const [pendingTab, setPendingTab] = useState<TabKey | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // useEffect(() => {
  //   const handleScroll = () => setScrollY(window.scrollY);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    const tabParam = searchParams.get("tab") as TabKey | null;
    const validTab = TABS.some((t) => t.key === tabParam);
    if (tabParam && validTab && tabParam !== activeTab && !isTransitioning) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const handleTabChange = (key: TabKey) => {
    if (key === activeTab || isTransitioning) return;
    setPendingTab(key);
    setIsTransitioning(true);
  };

  const handleCovered = () => {
    if (pendingTab) {
      setActiveTab(pendingTab);
      setSearchParams({ tab: pendingTab }, { replace: false });
      setPendingTab(null);
    }
  };

  const transitionLabel = pendingTab
    ? (TABS.find((t) => t.key === pendingTab)?.label ?? "")
    : (TABS.find((t) => t.key === activeTab)?.label ?? "");

  // const currentTabLabel = TABS.find((t) => t.key === activeTab)?.label ?? "";

  const renderTabContent = () => {
    switch (activeTab) {
      case "branding":
        return <Branding />;
      case "graphic-design":
        return <GraphicDesign />;
      case "illustrations":
        return <DigitalIllustration />;
      case "presentations":
        return <Presentations />;
      default:
        return <Branding />;
    }
  };

  return (
    <div className="min-h-screen bg-beige text-foreground relative">
      <FloatingElements />
      <Navigation />

      {/* Curtain / Blinds Transition Overlay */}
      <CurtainTransition
        isTransitioning={isTransitioning}
        onCovered={handleCovered}
        onTransitionComplete={() => setIsTransitioning(false)}
        tabLabel={transitionLabel}
      />

      <main className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary mb-6 font-semibold hover:font-bold hover:underline smooth-transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </button>

          {/* Big Active Tab Header directly below Back to Home button */}
          {/* <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-sred uppercase tracking-tight">
              {currentTabLabel}
            </h1>
          </motion.div> */}
        </div>

        {/* Active Tab Content */}
        <div className="relative min-h-[400px]">{renderTabContent()}</div>

        {/* Sticky Tab Navigation Bar */}
        <div className="sticky bottom-6 z-40 mt-12 flex justify-center pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-1 md:gap-2 p-2 rounded-full bg-about-ink/60 backdrop-blur-md border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
            {TABS.map((tab) => {
              const isActive = (pendingTab ?? activeTab) === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`relative flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-sred text-white shadow-[0_0_20px_rgba(254,73,123,0.5)] scale-105"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
