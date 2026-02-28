import { Hero } from "@/components/hero";
import { SorteoBanner } from "@/components/sorteo-banner";
import { RegistrationForm } from "@/components/registration-form";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { LOGO_URL } from "@/lib/logo";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="sorteo" id="sorteo">
        <RevealOnScroll className="sorteo-wrapper">
          <SorteoBanner />
          <RegistrationForm />
        </RevealOnScroll>
      </section>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <footer>
        <img
          className="footer-logo"
          src={LOGO_URL}
          alt="Gastro Sinergia"
          style={{ display: "inline-block" }}
        />
        <p>Gastro Sinergia · Centro de Estudios Gastronómicos · Caracas</p>
        <p className="footer-tagline">Porque la cocina no solo se enseña. Se vive, se piensa y se comparte.</p>
        <a href="/nosotros" className="footer-link">Conoce nuestra propuesta</a>
      </footer>
    </>
  );
}
