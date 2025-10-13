import HomeContent from "./content";

export const metadata = {
  title: "The Balance Keepers - Professional Accounting Services",
  description: "Expert bookkeeping and accounting services for businesses and individuals. Trust The Balance Keepers for accurate financial management.",
  keywords: "accounting, bookkeeping, financial services, business accounting, personal accounting, financial consulting",
  openGraph: {
    title: "The Balance Keepers - Professional Accounting Services",
    description: "Expert bookkeeping and accounting services for businesses and individuals. Trust The Balance Keepers for accurate financial management.",
    type: "website",
  },
};

export default function Home() {
  return <HomeContent />;
}
