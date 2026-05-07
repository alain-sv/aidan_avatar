import { useEffect, useMemo, useRef, useState } from "react";
import type { AidanExpressionTech, AidanFaceVariant, AidanState, AidanTheme } from "../types";
import { AidanAvatar } from "./AidanAvatar";

type InterviewDemoProps = {
  theme: AidanTheme;
  expressionTech: AidanExpressionTech;
  expressionStrength: number;
  faceVariant: AidanFaceVariant;
};

type InterviewStep = {
  state: AidanState;
  speaker: "Aidan" | "Participant" | "System";
  text: string;
};

const steps: InterviewStep[] = [
  {
    state: "speaking",
    speaker: "Aidan",
    text: "Welcome. I will keep this focused. First, how often does your team use AI in live work?",
  },
  {
    state: "listening",
    speaker: "System",
    text: "Aidan is listening for the participant answer.",
  },
  {
    state: "thinking",
    speaker: "Participant",
    text: "Most of the team uses AI weekly, but only a few people have stable review routines.",
  },
  {
    state: "questioning",
    speaker: "Aidan",
    text: "That points to uneven operating discipline. Where does review usually break down?",
  },
  {
    state: "acknowledging",
    speaker: "Aidan",
    text: "Understood. I will separate tool adoption from supervision maturity in the summary.",
  },
];

export function InterviewDemo({ theme, expressionTech, expressionStrength, faceVariant }: InterviewDemoProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleMessages = useMemo(() => steps.slice(0, activeStep + 1), [activeStep]);
  const currentState = steps[activeStep]?.state ?? "idle";

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    if (activeStep >= steps.length - 1) {
      timerRef.current = setTimeout(() => setIsRunning(false), 900);
      return;
    }

    timerRef.current = setTimeout(() => {
      setActiveStep((step) => step + 1);
    }, currentState === "listening" ? 1500 : 1800);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [activeStep, currentState, isRunning]);

  function runDemo() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setActiveStep(0);
    setIsRunning(true);
  }

  return (
    <section className="demoSection">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Interview demo</p>
          <h2>Guided operational interview</h2>
        </div>
        <button className="primaryButton" onClick={runDemo} type="button">
          Run demo
        </button>
      </div>

      <div className="interviewLayout">
        <div className="interviewAvatarSurface" data-theme={theme}>
          <AidanAvatar
            expressionStrength={expressionStrength}
            expressionTech={expressionTech}
            faceVariant={faceVariant}
            size="large"
            state={isRunning ? currentState : "idle"}
            theme={theme}
            speakingIntensity={0.58}
          />
          <div className="stateBadge">{isRunning ? currentState : "idle"}</div>
        </div>

        <div className="transcriptPanel">
          {visibleMessages.map((message, index) => (
            <div className="messageRow" data-speaker={message.speaker} key={`${message.speaker}-${index}`}>
              <span>{message.speaker}</span>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
