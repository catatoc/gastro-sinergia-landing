"use client";

/* eslint-disable @next/next/no-img-element */

import { LOGO_URL } from "@/lib/logo";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-orbs">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
      </div>
      <div className="deco-line deco-line-1" />
      <div className="deco-line deco-line-2" />

      <div className="hero-inner">
        <div className="logo-container">
          <img
            src={LOGO_URL}
            alt="Gastro Sinergia — Centro de Estudios Gastronómicos"
          />
        </div>

        <h1 className="hero-headline">
          Diseñamos
          <br />
          <span className="accent">experiencias</span> que transforman
        </h1>

        <p className="hero-p">
          La cocina como medio para desarrollar criterio, confianza y cultura
          gastronómica. Desde niños hasta adultos.
        </p>

        <div className="chips">
          <span className="chip">Criterio</span>
          <span className="chip">Confianza</span>
          <span className="chip">Cultura</span>
        </div>

        <div className="location-tag">
          <svg
            width="13"
            height="13"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          Caracas, Venezuela
        </div>

        <div className="hero-cta">
          <a href="#sorteo" className="btn-primary">
            Participa en el sorteo
            <svg
              className="icon-arrow"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
          <a
            href="/nosotros"
            className="link-secondary"
          >
            Conoce nuestra propuesta
          </a>
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-line" />
      </div>
    </section>
  );
}
