import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Catalog } from "@/components/Catalog";
import { Subscription } from "@/components/Subscription";
import { Delivery } from "@/components/Delivery";
import { LeadForm } from "@/components/LeadForm";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Story />
        <Catalog />
        <Subscription />
        <Delivery />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
