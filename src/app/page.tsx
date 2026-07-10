import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { Benefits } from "@/components/Benefits";
import { Pricing } from "@/components/Pricing";
import { GoogleReviews } from "@/components/GoogleReviews";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Location />
      <Benefits />
      <Pricing />
      <GoogleReviews />
      <Footer />
    </main>
  );
}
