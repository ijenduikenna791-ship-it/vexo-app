import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GetStartedPanel from "./components/GetStartedPanel";
import PriceTicker from "./components/PriceTicker";
import SupportedNetworks from "./components/SupportedNetworks";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import MarketsTable from "./components/MarketsTable";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <GetStartedPanel />
      <PriceTicker />
      <SupportedNetworks />
      <Features />
      <Testimonials />
      <MarketsTable />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
