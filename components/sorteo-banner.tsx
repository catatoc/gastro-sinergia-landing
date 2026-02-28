"use client";

export function SorteoBanner() {
  return (
    <div className="sorteo-banner">
      <div className="badge">
        <span className="badge-dot" />
        Sorteo activo
      </div>

      <h2 className="sorteo-title">
        Gana un cupo <span>gratuito</span> para nuestros talleres
      </h2>

      <p className="sorteo-desc">
        Una oportunidad única para vivir la experiencia Gastro Sinergia sin
        costo. Déjanos tus datos y entras automáticamente.
      </p>

      <div className="stats-row">
        <div className="stat">
          <div className="stat-number">12</div>
          <div className="stat-label">Cupos</div>
        </div>
        <div className="stat">
          <div className="stat-number">100%</div>
          <div className="stat-label">Gratis</div>
        </div>
        <div className="stat">
          <div className="stat-number">&infin;</div>
          <div className="stat-label">Sabor</div>
        </div>
      </div>
    </div>
  );
}
