import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Methodology from "@/components/Methodology";
import Navbar from "@/components/Navbar";
import Philosophy from "@/components/Philosophy";
import Recovery from "@/components/Recovery";
import Services from "@/components/Services";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Philosophy />
      <About />
      <Services />
      <Methodology />
      <Recovery />
      <Testimonial />
      <Contact />
      <Footer />
    </>
  );
}
