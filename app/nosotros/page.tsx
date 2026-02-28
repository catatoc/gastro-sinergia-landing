"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { LOGO_URL } from "@/lib/logo";

const PDF_URL = "/Gastro Sinergia CEG.pdf";

export default function Nosotros() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.innerWidth < 640;
    setIsMobile(mobile);
    if (mobile) {
      window.location.href = PDF_URL;
    }
  }, []);

  if (isMobile) return null;

  return (
    <div className="nosotros">
      <nav className="nosotros-nav">
        <a href="/" className="nosotros-nav-logo">
          <img src={LOGO_URL} alt="Gastro Sinergia" />
        </a>
        <a href="/" className="nosotros-nav-link">
          Inicio
        </a>
      </nav>

      <header className="nosotros-header">
        <h1 className="nosotros-title">Nuestra propuesta</h1>
        <p className="nosotros-subtitle">
          Centro de Estudios Gastronómicos · Caracas, Venezuela
        </p>
      </header>

      <div className="nosotros-pdf-container">
        <object
          data={PDF_URL}
          type="application/pdf"
          className="nosotros-pdf"
        >
          <div className="nosotros-fallback">
            <p>
              Para ver nuestra presentación, descarga el PDF directamente.
            </p>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Ver presentación
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M7 17l9.2-9.2M7 7h10v10" />
              </svg>
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}
