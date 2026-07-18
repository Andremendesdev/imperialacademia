import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { Benefits } from "@/components/Benefits";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Pricing } from "@/components/Pricing";
import { GoogleReviews } from "@/components/GoogleReviews";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <LoadingScreen />
      <Navbar />
      <Hero />
      <Benefits />
      <Location />
      <BeforeAfter />
      <Pricing />
      <GoogleReviews />
      <Footer />
    </main>
  );
}
