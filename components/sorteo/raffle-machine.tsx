"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useConfetti } from "@/components/confetti";
import {
  getUniqueParticipants,
  selectRiggedWinners,
  type Participant,
} from "@/lib/participants";

const BAKERY_EMOJIS = [
  "\u{1F35E}", "\u{1F950}", "\u{1F956}", "\u{1F9C1}",
  "\u{1F382}", "\u{1F370}", "\u{1F967}", "\u{1F33E}",
  "\u{1F35E}", "\u{1F950}", "\u{1F956}", "\u{1F9C1}",
  "\u{1F382}", "\u{1F370}", "\u{1F967}", "\u{1F33E}",
  "\u{1F35E}", "\u{1F950}", "\u{1F956}", "\u{1F9C1}",
  "\u{1F382}", "\u{1F370}", "\u{1F967}", "\u{1F33E}",
];

const SLOT_COUNT = 5;
const SHUFFLE_DURATION = 3000;
const REVEAL_INTERVAL = 1500;
const WINNERS_PER_ROUND = 12;
const TOTAL_WINNERS = 24;

type Phase = "idle" | "shuffling" | "revealing" | "round1_complete" | "complete";

export function RaffleMachine() {
  const participants = useRef(getUniqueParticipants());
  const [phase, setPhase] = useState<Phase>("idle");
  const [allWinners, setAllWinners] = useState<Participant[]>([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [revealedCount, setRevealedCount] = useState(0);
  const [slotNames, setSlotNames] = useState<string[]>(() =>
    getRandomNames(participants.current, SLOT_COUNT)
  );
  const [lockedIndex, setLockedIndex] = useState<number | null>(null);
  const [sendingEmails, setSendingEmails] = useState(false);
  const [emailsSent, setEmailsSent] = useState<Record<number, { sent: number; failed: number } | null>>({});

  const shuffleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const revealRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const allWinnersRef = useRef<Participant[]>([]);
  const revealedRef = useRef(0);
  const currentRoundRef = useRef(1);

  const confetti = useConfetti();

  const clearTimers = useCallback(() => {
    if (shuffleRef.current) clearInterval(shuffleRef.current);
    if (revealRef.current) clearTimeout(revealRef.current);
    shuffleRef.current = null;
    revealRef.current = null;
  }, []);

  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  const startShuffle = useCallback(() => {
    shuffleRef.current = setInterval(() => {
      setSlotNames(getRandomNames(participants.current, SLOT_COUNT));
    }, 80);
  }, []);

  const roundWinners = useCallback(() => {
    const round = currentRoundRef.current;
    const start = (round - 1) * WINNERS_PER_ROUND;
    const end = round * WINNERS_PER_ROUND;
    return allWinnersRef.current.slice(start, end);
  }, []);

  const revealNext = useCallback(() => {
    const idx = revealedRef.current;
    const winners = roundWinners();

    if (idx >= WINNERS_PER_ROUND) {
      clearTimers();
      const round = currentRoundRef.current;
      if (round === 1) {
        setPhase("round1_complete");
        phaseRef.current = "round1_complete";
        confetti();
        setTimeout(() => confetti(), 400);
      } else {
        setPhase("complete");
        phaseRef.current = "complete";
        confetti();
        setTimeout(() => confetti(), 400);
        setTimeout(() => confetti(), 800);
      }
      setLockedIndex(null);
      return;
    }

    if (shuffleRef.current) clearInterval(shuffleRef.current);

    const winner = winners[idx];
    let slowdown = 100;
    const slowShuffle = () => {
      shuffleRef.current = setTimeout(() => {
        const names = getRandomNames(participants.current, SLOT_COUNT);
        names[2] = winner.nombre;
        setSlotNames(names);
        slowdown += 60;

        if (slowdown < 400) {
          slowShuffle();
        } else {
          setLockedIndex(2);
          setSlotNames((prev) => {
            const next = [...prev];
            next[2] = winner.nombre;
            return next;
          });

          setTimeout(() => {
            revealedRef.current = idx + 1;
            setRevealedCount(idx + 1);
            setLockedIndex(null);

            if (idx + 1 < WINNERS_PER_ROUND) {
              startShuffle();
              revealRef.current = setTimeout(revealNext, REVEAL_INTERVAL);
            } else {
              revealNext();
            }
          }, 600);
        }
      }, slowdown) as unknown as ReturnType<typeof setTimeout>;
    };

    slowShuffle();
  }, [clearTimers, confetti, startShuffle, roundWinners]);

  const startRound = useCallback(() => {
    revealedRef.current = 0;
    setRevealedCount(0);
    setLockedIndex(null);
    setPhase("shuffling");
    phaseRef.current = "shuffling";

    startShuffle();

    setTimeout(() => {
      setPhase("revealing");
      phaseRef.current = "revealing";
      revealNext();
    }, SHUFFLE_DURATION);
  }, [startShuffle, revealNext]);

  const handleStart = useCallback(() => {
    const selected = selectRiggedWinners(participants.current, TOTAL_WINNERS);
    allWinnersRef.current = selected;
    currentRoundRef.current = 1;

    setAllWinners(selected);
    setCurrentRound(1);
    startRound();
  }, [startRound]);

  const handleStartRound2 = useCallback(() => {
    currentRoundRef.current = 2;
    setCurrentRound(2);
    startRound();
  }, [startRound]);

  const handleReset = useCallback(() => {
    clearTimers();
    setPhase("idle");
    phaseRef.current = "idle";
    setAllWinners([]);
    setCurrentRound(1);
    currentRoundRef.current = 1;
    setRevealedCount(0);
    setLockedIndex(null);
    setEmailsSent({});
    setSlotNames(getRandomNames(participants.current, SLOT_COUNT));
  }, [clearTimers]);

  const handleSendEmails = useCallback(async (taller: 1 | 2) => {
    const start = (taller - 1) * WINNERS_PER_ROUND;
    const end = taller * WINNERS_PER_ROUND;
    const winners = allWinnersRef.current.slice(start, end);
    if (winners.length === 0) return;

    setSendingEmails(true);
    try {
      const res = await fetch("/api/send-winners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          winners: winners.map((w) => ({ nombre: w.nombre, email: w.email })),
          taller,
        }),
      });
      const data = await res.json();
      setEmailsSent((prev) => ({ ...prev, [taller]: data }));
    } catch {
      setEmailsSent((prev) => ({ ...prev, [taller]: { sent: 0, failed: winners.length } }));
    } finally {
      setSendingEmails(false);
    }
  }, []);

  const round1Winners = allWinners.slice(0, WINNERS_PER_ROUND);
  const round2Winners = allWinners.slice(WINNERS_PER_ROUND, TOTAL_WINNERS);

  const showingSlots = phase === "idle" || phase === "shuffling" || phase === "revealing";
  const currentWinners = currentRound === 1 ? round1Winners : round2Winners;
  const visibleCount = (phase === "shuffling" || phase === "revealing")
    ? revealedCount
    : (phase === "round1_complete" || phase === "complete")
      ? WINNERS_PER_ROUND
      : revealedCount;

  return (
    <div className={`raffle-machine raffle-phase-${phase}`}>
      {/* Floating bakery decorations */}
      <div className="bakery-decorations">
        {["\u{1F35E}", "\u{1F950}", "\u{1F956}", "\u{1F9C1}", "\u{1F33E}", "\u{1F382}"].map(
          (emoji, i) => (
            <span
              key={i}
              className={`bakery-float bakery-float-${i + 1}`}
            >
              {emoji}
            </span>
          )
        )}
      </div>

      {/* Slot machine display — hidden when round complete */}
      {showingSlots && (
        <div className="raffle-slot-section">
          <div className="slot-display">
            {slotNames.map((name, i) => (
              <div
                key={i}
                className={`slot-item${
                  phase === "shuffling" || (phase === "revealing" && lockedIndex !== i)
                    ? " shuffling"
                    : ""
                }${lockedIndex === i ? " locked" : ""}`}
              >
                {name}
              </div>
            ))}
          </div>

          {phase === "idle" && (
            <button className="raffle-start-btn" onClick={handleStart}>
              <span className="raffle-btn-emoji">{"\u{1F35E}"}</span>
              Iniciar Sorteo
              <span className="raffle-btn-emoji">{"\u{1F950}"}</span>
            </button>
          )}

          {(phase === "shuffling" || phase === "revealing") && (
            <div className="raffle-status">
              <span className="raffle-status-dot" />
              {phase === "shuffling"
                ? "Mezclando participantes..."
                : `Taller ${currentRound} - Revelando ganador ${revealedCount + 1} de ${WINNERS_PER_ROUND}...`}
            </div>
          )}
        </div>
      )}

      {/* Round 1 winners */}
      {(visibleCount > 0 && currentRound === 1 && phase !== "complete") && (
        <div className="raffle-winners-section">
          <h3 className="raffle-winners-title">
            {"\u{1F33E}"} Taller de Panaderia 1 {"\u{1F33E}"}
          </h3>
          <div className="winners-grid">
            {round1Winners.slice(0, visibleCount).map((winner, i) => (
              <div
                key={`${winner.id}-${i}`}
                className="winner-card entering"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="winner-emoji">{BAKERY_EMOJIS[i]}</span>
                <span className="winner-number">{i + 1}</span>
                <span className="winner-name">{winner.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Round 2 winners (during revealing) */}
      {(currentRound === 2 && revealedCount > 0 && phase !== "complete") && (
        <div className="raffle-winners-section">
          <h3 className="raffle-winners-title">
            {"\u{1F33E}"} Taller de Panaderia 2 {"\u{1F33E}"}
          </h3>
          <div className="winners-grid">
            {round2Winners.slice(0, revealedCount).map((winner, i) => (
              <div
                key={`${winner.id}-r2-${i}`}
                className="winner-card entering"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="winner-emoji">{BAKERY_EMOJIS[i + WINNERS_PER_ROUND]}</span>
                <span className="winner-number">{i + 1 + WINNERS_PER_ROUND}</span>
                <span className="winner-name">{winner.nombre}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Round 1 complete — show send emails + start round 2 */}
      {phase === "round1_complete" && (
        <div className="raffle-complete">
          <div className="raffle-complete-message">
            <h3>
              {"\u{1F389}"} Taller 1 completo! {"\u{1F389}"}
            </h3>
            <p>12 ganadores seleccionados. Continuemos con el Taller 2.</p>
          </div>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {!emailsSent[1] ? (
              <button
                className="raffle-reset-btn"
                onClick={() => handleSendEmails(1)}
                disabled={sendingEmails}
              >
                {sendingEmails ? "Enviando..." : "Enviar Golden Tickets - Taller 1"}
              </button>
            ) : (
              <div style={{ fontSize: "14px", color: emailsSent[1].failed > 0 ? "#e5651c" : "#2d9e90", fontWeight: 600 }}>
                {emailsSent[1].sent} enviados{emailsSent[1].failed > 0 ? `, ${emailsSent[1].failed} fallidos` : ""}
              </div>
            )}
            <button className="raffle-start-btn" onClick={handleStartRound2}>
              <span className="raffle-btn-emoji">{"\u{1F956}"}</span>
              Iniciar Taller 2
              <span className="raffle-btn-emoji">{"\u{1F9C1}"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Final complete state — show all 24 winners */}
      {phase === "complete" && (
        <>
          <div className="raffle-winners-section">
            <h3 className="raffle-winners-title">
              {"\u{1F33E}"} Taller de Panaderia 1 {"\u{1F33E}"}
            </h3>
            <div className="winners-grid">
              {round1Winners.map((winner, i) => (
                <div
                  key={`${winner.id}-final1-${i}`}
                  className="winner-card entering"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <span className="winner-emoji">{BAKERY_EMOJIS[i]}</span>
                  <span className="winner-number">{i + 1}</span>
                  <span className="winner-name">{winner.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="raffle-winners-section">
            <h3 className="raffle-winners-title">
              {"\u{1F33E}"} Taller de Panaderia 2 {"\u{1F33E}"}
            </h3>
            <div className="winners-grid">
              {round2Winners.map((winner, i) => (
                <div
                  key={`${winner.id}-final2-${i}`}
                  className="winner-card entering"
                  style={{ animationDelay: `${(i + WINNERS_PER_ROUND) * 0.05}s` }}
                >
                  <span className="winner-emoji">{BAKERY_EMOJIS[i + WINNERS_PER_ROUND]}</span>
                  <span className="winner-number">{i + 1 + WINNERS_PER_ROUND}</span>
                  <span className="winner-name">{winner.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="raffle-complete">
            <div className="raffle-complete-message">
              <h3>
                {"\u{1F389}"} Felicidades a los {TOTAL_WINNERS} ganadores! {"\u{1F389}"}
              </h3>
              <p>
                Taller de Panaderia &mdash; totalmente <strong>gratuito</strong>
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap", marginBottom: "16px" }}>
              {!emailsSent[1] ? (
                <button
                  className="raffle-reset-btn"
                  onClick={() => handleSendEmails(1)}
                  disabled={sendingEmails}
                >
                  {sendingEmails ? "Enviando..." : "Enviar Golden Tickets - Taller 1"}
                </button>
              ) : (
                <div style={{ fontSize: "14px", color: emailsSent[1].failed > 0 ? "#e5651c" : "#2d9e90", fontWeight: 600, padding: "8px" }}>
                  Taller 1: {emailsSent[1].sent} enviados{emailsSent[1].failed > 0 ? `, ${emailsSent[1].failed} fallidos` : ""}
                </div>
              )}
              {!emailsSent[2] ? (
                <button
                  className="raffle-reset-btn"
                  onClick={() => handleSendEmails(2)}
                  disabled={sendingEmails}
                >
                  {sendingEmails ? "Enviando..." : "Enviar Golden Tickets - Taller 2"}
                </button>
              ) : (
                <div style={{ fontSize: "14px", color: emailsSent[2].failed > 0 ? "#e5651c" : "#2d9e90", fontWeight: 600, padding: "8px" }}>
                  Taller 2: {emailsSent[2].sent} enviados{emailsSent[2].failed > 0 ? `, ${emailsSent[2].failed} fallidos` : ""}
                </div>
              )}
            </div>
            <button className="raffle-reset-btn" onClick={handleReset}>
              Sortear de nuevo
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function getRandomNames(participants: Participant[], count: number): string[] {
  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    names.push(
      participants[Math.floor(Math.random() * participants.length)].nombre
    );
  }
  return names;
}
