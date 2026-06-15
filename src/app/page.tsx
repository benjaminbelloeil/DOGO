import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { LogoCloud } from "@/components/site/logo-cloud";
import { HowItWorks } from "@/components/site/how-it-works";
import { Features } from "@/components/site/features";
import { Testimonials } from "@/components/site/testimonials";
import { Blogs } from "@/components/site/blogs";
import { Faq } from "@/components/site/faq";
import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-900">
      <Navbar />
      <main className="bg-neutral-100 pb-12">
        <Hero />
        <LogoCloud />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Blogs />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
