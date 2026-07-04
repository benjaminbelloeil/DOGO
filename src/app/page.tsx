import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { LiveSocial } from "@/components/site/live-social";
import { HowItWorks } from "@/components/site/how-it-works";
import { Features } from "@/components/site/features";
import { Testimonials } from "@/components/site/testimonials";
import { Blogs } from "@/components/site/blogs";
import { Studio } from "@/components/site/studio";
import { Faq } from "@/components/site/faq";
import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";
import { RadioPlayer } from "@/components/site/radio-player";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-900">
      <Navbar />
      <main className="bg-neutral-100 pb-12">
        <Hero />
        <LiveSocial />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Blogs />
        <Studio />
        <Cta />
        <Faq />
      </main>
      <Footer />
      <RadioPlayer />
    </div>
  );
}
