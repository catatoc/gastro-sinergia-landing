"use client";

import { useRef, useState, type FormEvent } from "react";
import { useConfetti } from "./confetti";

const COUNTRY_CODES = [
  { value: "+58", label: "\u{1F1FB}\u{1F1EA} +58" },
  { value: "+1", label: "\u{1F1FA}\u{1F1F8} +1" },
  { value: "+57", label: "\u{1F1E8}\u{1F1F4} +57" },
  { value: "+34", label: "\u{1F1EA}\u{1F1F8} +34" },
  { value: "+55", label: "\u{1F1E7}\u{1F1F7} +55" },
  { value: "+52", label: "\u{1F1F2}\u{1F1FD} +52" },
  { value: "+56", label: "\u{1F1E8}\u{1F1F1} +56" },
  { value: "+54", label: "\u{1F1E6}\u{1F1F7} +54" },
  { value: "+51", label: "\u{1F1F5}\u{1F1EA} +51" },
  { value: "+507", label: "\u{1F1F5}\u{1F1E6} +507" },
  { value: "+593", label: "\u{1F1EA}\u{1F1E8} +593" },
  { value: "+591", label: "\u{1F1E7}\u{1F1F4} +591" },
  { value: "+598", label: "\u{1F1FA}\u{1F1FE} +598" },
  { value: "+506", label: "\u{1F1E8}\u{1F1F7} +506" },
  { value: "+502", label: "\u{1F1EC}\u{1F1F9} +502" },
  { value: "+503", label: "\u{1F1F8}\u{1F1FB} +503" },
  { value: "+504", label: "\u{1F1ED}\u{1F1F3} +504" },
  { value: "+505", label: "\u{1F1F3}\u{1F1EE} +505" },
  { value: "+595", label: "\u{1F1F5}\u{1F1FE} +595" },
  { value: "+39", label: "\u{1F1EE}\u{1F1F9} +39" },
  { value: "+33", label: "\u{1F1EB}\u{1F1F7} +33" },
  { value: "+49", label: "\u{1F1E9}\u{1F1EA} +49" },
  { value: "+44", label: "\u{1F1EC}\u{1F1E7} +44" },
  { value: "+351", label: "\u{1F1F5}\u{1F1F9} +351" },
];

function isValidEmail(v: string) {
  return /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(v.trim());
}

function isValidPhone(v: string) {
  const digits = v.replace(/\D/g, "");
  return digits.length === 10;
}

export function RegistrationForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+58");
  const [telefono, setTelefono] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successName, setSuccessName] = useState("");
  const [submitError, setSubmitError] = useState("");
  const formCardRef = useRef<HTMLDivElement>(null);
  const spawnConfetti = useConfetti();

  function clearError(field: string) {
    setErrors((prev) => ({ ...prev, [field]: false }));
  }

  function toggleError(field: string, show: boolean) {
    setErrors((prev) => ({ ...prev, [field]: show }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError("");

    let ok = true;
    if (!nombre.trim()) { toggleError("nombre", true); ok = false; }
    if (!isValidEmail(email)) { toggleError("email", true); ok = false; }
    if (!isValidPhone(telefono)) { toggleError("telefono", true); ok = false; }
    if (!ok) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: nombre.trim(),
          email: email.trim(),
          telefono: `${countryCode} ${telefono.trim()}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al registrar");
      }

      setSuccessName(nombre.trim().split(" ")[0]);
      setIsSuccess(true);
      spawnConfetti();
      formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Error al registrar. Intenta de nuevo."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="form-card" ref={formCardRef}>
      {!isSuccess ? (
        <div id="form-view">
          <div className="form-header">
            <h3>Regístrate para participar</h3>
            <p>Solo necesitamos tus datos y ya estás dentro</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Nombre */}
            <div className="input-group">
              <label>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Nombre
              </label>
              <div className="input-wrap">
                <input
                  type="text"
                  className={errors.nombre ? "error" : ""}
                  placeholder="Tu nombre completo"
                  autoComplete="name"
                  value={nombre}
                  onChange={(e) => { setNombre(e.target.value); clearError("nombre"); }}
                />
              </div>
              <div className={`field-error ${errors.nombre ? "show" : ""}`}>
                Ingresa tu nombre para participar
              </div>
            </div>

            {/* Email */}
            <div className="input-group">
              <label>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 4l-10 8L2 4" />
                </svg>
                Correo electrónico
              </label>
              <div className="input-wrap">
                <input
                  type="email"
                  className={errors.email ? "error" : ""}
                  placeholder="tu@correo.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                />
              </div>
              <div className={`field-error ${errors.email ? "show" : ""}`}>
                Ingresa un correo válido — lo necesitamos para contactarte
              </div>
            </div>

            {/* Teléfono */}
            <div className="input-group">
              <label>
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                Teléfono
              </label>
              <div className="phone-row">
                <div className="country-select-wrap">
                  <select
                    className="country-select"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    aria-label="Código de país"
                  >
                    {COUNTRY_CODES.map((cc) => (
                      <option key={cc.value} value={cc.value}>
                        {cc.label}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="tel"
                  className={errors.telefono ? "error" : ""}
                  placeholder="4141181358"
                  autoComplete="tel"
                  maxLength={10}
                  inputMode="numeric"
                  value={telefono}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setTelefono(digits);
                    clearError("telefono");
                  }}
                />
              </div>
              <div className={`field-error ${errors.telefono ? "show" : ""}`}>
                Ingresa un número válido de 10 dígitos
              </div>
            </div>

            {submitError && (
              <div style={{ fontSize: "0.82rem", color: "#d94444", textAlign: "center", marginBottom: "0.75rem", fontWeight: 500 }}>
                {submitError}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "¡Quiero participar!"}
            </button>
          </form>

          <div className="form-trust">
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            Tus datos están seguros. Solo los usaremos para el sorteo.
          </div>
        </div>
      ) : (
        <div className="success-view active">
          <div className="success-icon-wrap">
            <div className="success-ring" />
            <div className="success-circle">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <h3>
            ¡Estás dentro, <span>{successName}</span>!
          </h3>
          <p>
            Ya participas en el sorteo de los{" "}
            <strong>12 cupos gratuitos</strong>. Te contactaremos pronto con los
            resultados.
          </p>
        </div>
      )}
    </div>
  );
}
