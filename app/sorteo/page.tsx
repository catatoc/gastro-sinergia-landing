/* eslint-disable @next/next/no-img-element */

import { LOGO_URL } from "@/lib/logo";
import { RaffleMachine } from "@/components/sorteo/raffle-machine";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sorteo - Taller de Panaderia | Gastro Sinergia",
  description:
    "Sorteo en vivo de 24 cupos gratuitos para el Taller de Panaderia de Gastro Sinergia.",
};

export default function SorteoPage() {
  return (
    <div className="raffle-page">
      <header className="raffle-header">
        <div className="raffle-header-inner">
          <div className="badge">
            <span className="badge-dot" />
            Sorteo en vivo
          </div>
          <h1 className="raffle-header-title">
            Taller de <span>Panaderia</span>
          </h1>
          <p className="raffle-header-desc">
            24 ganadores seran seleccionados al azar para participar en
            nuestros 2 talleres de panaderia completamente gratuitos.
          </p>
          <div className="stats-row">
            <div className="stat">
              <div className="stat-number">60+</div>
              <div className="stat-label">Participantes</div>
            </div>
            <div className="stat">
              <div className="stat-number">24</div>
              <div className="stat-label">Ganadores</div>
            </div>
            <div className="stat">
              <div className="stat-number">100%</div>
              <div className="stat-label">Gratis</div>
            </div>
          </div>
        </div>
      </header>

      <main className="raffle-main">
        <RaffleMachine />
      </main>

      <div className="raffle-footer-logo">
        <img src={LOGO_URL} alt="Gastro Sinergia" />
      </div>
    </div>
  );
}
