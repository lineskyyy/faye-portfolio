import { useEffect, useState } from "react";

type StoreItem = {
  id: string;
  category: string;
  title: string;
  image: string;
  description: string;
  author: string;
  darkText?: boolean;
};

const items: StoreItem[] = [
  {
    id: "travel",
    category: "Travel",
    title: "5 Inspiring Apps for Your Next Trip",
    image: "/projects/illustrations/ALUCARD SHATTERED.jpg",
    description:
      "A hand-picked collection of apps for planning, navigating and remembering your next adventure.",
    author: "Motion Editorial",
  },
  {
    id: "meaning",
    category: "How to",
    title: "Contemplate the Meaning of Life Twice a Day",
    image: "/projects/presentations/presentation1/p4.png",
    description:
      "Small rituals and thoughtful prompts for making a little more room for reflection every day.",
    author: "Motion Editorial",
  },
  {
    id: "urban",
    category: "Steps",
    title: "Urban Exploration Apps for the Vertically-Inclined",
    image: "/projects/branding/p5.jpg",
    description:
      "Discover routes, stairways and overlooked corners of the city with these useful companions.",
    author: "Motion Editorial",
    darkText: true,
  },
  {
    id: "hats",
    category: "Hats",
    title: "Take Control of Your Hat Life With This Stunning New App",
    image: "/projects/graphicd/p9.jpg",
    description:
      "Organise your collection, discover new styles and find the right hat for every occasion.",
    author: "Motion Editorial",
  },
];

export default function AppStore() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem = items.find((item) => item.id === selectedId);

  useEffect(() => {
    document.body.style.overflow = selectedItem ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  return (
    <main className="min-h-screen bg-[#f5f6f7] px-4 py-8 text-[#08090a] sm:px-8">
      <div className="mx-auto max-w-[960px]">
        <section aria-label="Featured apps" className="flex flex-col gap-5">
          {/* Top Row */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1.2fr_1.05fr]">
            <StoreCard item={items[0]} onClick={() => setSelectedId(items[0].id)} />
            <StoreCard item={items[1]} onClick={() => setSelectedId(items[1].id)} />
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1.05fr_1.2fr]">
            <StoreCard item={items[2]} onClick={() => setSelectedId(items[2].id)} />
            <StoreCard item={items[3]} onClick={() => setSelectedId(items[3].id)} />
          </div>
        </section>
      </div>

      {/* Modal / Expanded View */}
      <ExpandedItem item={selectedItem} onClose={() => setSelectedId(null)} />
    </main>
  );
}

function StoreCard({
  item,
  onClick,
}: {
  item: StoreItem;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex h-[380px] w-full flex-col justify-start overflow-hidden rounded-[24px] text-left shadow-sm outline-none transition-transform duration-300 ease-out hover:scale-[1.01] active:scale-[0.98]"
    >
      <img
        src={item.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />
      {!item.darkText && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
      )}
      <div className="relative z-10 p-6">
        <p
          className={`text-[12px] font-semibold uppercase tracking-wider ${
            item.darkText ? "text-slate-800" : "text-white/80"
          }`}
        >
          {item.category}
        </p>
        <h2
          className={`mt-1 max-w-[280px] text-[22px] font-semibold leading-[1.2] tracking-tight ${
            item.darkText ? "text-slate-900" : "text-white"
          }`}
        >
          {item.title}
        </h2>
      </div>
    </button>
  );
}

function ExpandedItem({
  item,
  onClose,
}: {
  item: StoreItem | undefined;
  onClose: () => void;
}) {
  const isOpen = Boolean(item);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Card Content */}
      {item && (
        <article
          className={`relative max-h-[min(760px,calc(100vh-32px))] w-full max-w-[600px] overflow-auto rounded-[28px] bg-white shadow-2xl transition-all duration-300 ease-out ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-[320px] w-full">
            <img
              src={item.image}
              alt=""
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              aria-label="Close article"
              onClick={onClose}
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
            >
              ✕
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {item.category}
            </p>
            <h2 className="text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
              {item.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {item.description}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-xs font-medium text-slate-400">
              <span>{item.author}</span>
              <span>Read story</span>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}