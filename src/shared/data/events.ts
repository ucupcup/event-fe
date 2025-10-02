export type TicketType = {
  id: string;
  name: string;
  price: number; // in IDR
};

export type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  image?: string;
  ticketTypes: TicketType[];
};

export const events: EventItem[] = [
  {
    id: 'esports',
    title: 'Esports Arena Championship',
    date: '6–8 Jun 2026',
    location: 'Mall of Indonesia',
    category: 'Esports',
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1200&auto=format&fit=crop',
    ticketTypes: [
      { id: 'ga', name: 'General', price: 90000 },
      { id: 'vip', name: 'VIP', price: 250000 },
    ],
  },
  {
    id: 'wefest',
    title: 'WeFest Music Festival',
    date: '12–14 Jul 2025',
    location: 'Jakarta International Expo',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1200&auto=format&fit=crop',
    ticketTypes: [
      { id: 'ga', name: 'General', price: 250000 },
      { id: 'vip', name: 'VIP', price: 600000 },
      { id: 'vvip', name: 'VVIP', price: 1200000 },
    ],
  },
  {
    id: 'devcon',
    title: 'DevCon Asia 2025',
    date: '23–25 Agu 2025',
    location: 'ICE BSD, Tangerang',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop',
    ticketTypes: [
      { id: 'conf', name: 'Conference', price: 300000 },
      { id: 'work', name: 'Workshop', price: 500000 },
    ],
  },
  {
    id: 'artx',
    title: 'ArtX Contemporary',
    date: '5–9 Sep 2025',
    location: 'Bandung Convention Center',
    category: 'Art',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    ticketTypes: [
      { id: 'day', name: 'Day Pass', price: 120000 },
      { id: 'all', name: 'All Days', price: 400000 },
    ],
  },
  {
    id: 'marathon',
    title: 'Jakarta Night Run',
    date: '18 Okt 2025',
    location: 'Gelora Bung Karno',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop',
    ticketTypes: [
      { id: '5k', name: '5K', price: 180000 },
      { id: '10k', name: '10K', price: 220000 },
    ],
  },
  {
    id: 'lattefest',
    title: 'Latte & Food Fest',
    date: '2–4 Nov 2025',
    location: 'Trans Studio Mall, Bandung',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=1200&auto=format&fit=crop',
    ticketTypes: [
      { id: 'entry', name: 'Entry', price: 50000 },
      { id: 'bundle', name: 'Food Bundle', price: 140000 },
    ],
  },
  {
    id: 'stageplay',
    title: 'Romeo & Juliet — Live',
    date: '20–21 Des 2025',
    location: 'Taman Ismail Marzuki',
    category: 'Theater',
    image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1200&auto=format&fit=crop',
    ticketTypes: [
      { id: 'reg', name: 'Regular', price: 220000 },
      { id: 'front', name: 'Front Row', price: 350000 },
    ],
  },
  {
    id: 'kpop',
    title: 'K‑Pop Night Jakarta',
    date: '22 Apr 2026',
    location: 'Istora Senayan',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1521337586141-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop',
    ticketTypes: [
      { id: 'ga', name: 'General', price: 450000 },
      { id: 'vip', name: 'VIP', price: 900000 },
    ],
  },
  {
    id: 'vrexpo',
    title: 'VR / AR Expo',
    date: '18 Nov 2026',
    location: 'Tech Park Jakarta',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=1200&auto=format&fit=crop',
    ticketTypes: [
      { id: 'entry', name: 'Entry', price: 210000 },
      { id: 'pro', name: 'Pro Access', price: 480000 },
    ],
  },
];

export function getEventById(id: string) {
  return events.find((e) => e.id === id);
}

export function formatIDR(amount: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
}

export function cheapestPrice(e: EventItem) {
  const min = Math.min(...e.ticketTypes.map((t) => t.price));
  return { value: min, label: formatIDR(min) };
}
