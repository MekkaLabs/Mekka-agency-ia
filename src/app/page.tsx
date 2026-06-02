import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { TrustStrip } from "@/components/site/trust-strip";
import { Products } from "@/components/site/products";
import { Process } from "@/components/site/process";
import { Outcomes } from "@/components/site/outcomes";
import { Proof } from "@/components/site/proof";
import { CTA } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="relative z-10">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Products />
        <Process />
        <Outcomes />
        <Proof />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
