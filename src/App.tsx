import { useEffect, useMemo, useRef, useState } from "react";
import { AidanAvatar } from "./components/AidanAvatar";
import { AvatarStateControls, type AidanDemoMode } from "./components/AvatarStateControls";
import { InsightCard } from "./components/InsightCard";
import type {
  AidanExpressionTech,
  AidanFaceVariant,
  AidanLipSyncMode,
  AidanState,
  AidanTheme,
} from "./types";

type InterviewStep = {
  state: AidanState;
  speaker: "Aidan" | "Participant" | "System";
  text: string;
};

const interviewSteps: InterviewStep[] = [
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

const presentationInsights = [
  "Most participants use AI regularly, but usage remains uneven across teams.",
  "The main operational risk is not lack of tools. It is lack of shared operating discipline.",
  "Recommended next step: segment users by maturity and run targeted coaching sessions.",
];

const presentationStateByInsight: AidanState[] = ["speaking", "questioning", "complete"];
const manualStates: AidanState[] = [
  "idle",
  "listening",
  "questioning",
  "thinking",
  "speaking",
  "acknowledging",
  "complete",
  "caution",
];

function label(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function App() {
  const [state, setState] = useState<AidanState>("idle");
  const [theme, setTheme] = useState<AidanTheme>("dark");
  const [speakingIntensity, setSpeakingIntensity] = useState(0.55);
  const [expressionTech, setExpressionTech] = useState<AidanExpressionTech>("liveportrait");
  const [expressionStrength, setExpressionStrength] = useState(0.55);
  const [faceVariant, setFaceVariant] = useState<AidanFaceVariant>("roundedWave");
  const [lipSyncMode, setLipSyncMode] = useState<AidanLipSyncMode>("soft");
  const [demoMode, setDemoMode] = useState<AidanDemoMode>("manual");
  const [activeInterviewStep, setActiveInterviewStep] = useState(0);
  const [isInterviewRunning, setIsInterviewRunning] = useState(false);
  const [activeInsight, setActiveInsight] = useState(0);
  const interviewTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleInterviewMessages = useMemo(() => interviewSteps.slice(0, activeInterviewStep + 1), [activeInterviewStep]);
  const interviewState = interviewSteps[activeInterviewStep]?.state ?? "idle";
  const presentationState = presentationStateByInsight[activeInsight] ?? "speaking";

  const presenterLine = useMemo(() => {
    if (activeInsight === 1) {
      return "The risk is operational drift. The system should make review habits visible before scale increases.";
    }
    if (activeInsight === 2) {
      return "The clean next move is segmented coaching, starting with teams that already have weekly usage.";
    }
    return "The campaign shows real usage, but adoption is not yet evenly governed across teams.";
  }, [activeInsight]);

  const effectiveState =
    demoMode === "interview" ? (isInterviewRunning ? interviewState : "idle") : demoMode === "presentation" ? presentationState : state;
  const effectiveSpeakingIntensity = demoMode === "manual" ? speakingIntensity : demoMode === "interview" ? 0.58 : 0.42;

  useEffect(() => {
    if (demoMode !== "interview") {
      setIsInterviewRunning(false);
      if (interviewTimerRef.current) {
        clearTimeout(interviewTimerRef.current);
      }
      return;
    }

    if (!isInterviewRunning) {
      return;
    }

    if (activeInterviewStep >= interviewSteps.length - 1) {
      interviewTimerRef.current = setTimeout(() => setIsInterviewRunning(false), 900);
      return;
    }

    interviewTimerRef.current = setTimeout(() => {
      setActiveInterviewStep((current) => current + 1);
    }, interviewState === "listening" ? 1500 : 1800);

    return () => {
      if (interviewTimerRef.current) {
        clearTimeout(interviewTimerRef.current);
      }
    };
  }, [activeInterviewStep, demoMode, interviewState, isInterviewRunning]);

  function runInterviewDemo() {
    if (interviewTimerRef.current) {
      clearTimeout(interviewTimerRef.current);
    }
    setActiveInterviewStep(0);
    setIsInterviewRunning(true);
  }

  function nextPresentationInsight() {
    setActiveInsight((current) => (current + 1) % presentationInsights.length);
  }

  return (
    <main className="appShell" data-theme={theme}>
      <section className="heroBand">
        <div className="brandStrip">
          <img alt="Runwaize" src="/runwaize.svg" />
          <span>Aidan</span>
        </div>
      </section>

      <section className="labSection">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Avatar lab</p>
          </div>
        </div>

        <div className="labLayout">
          <AvatarStateControls
            demoMode={demoMode}
            expressionStrength={expressionStrength}
            expressionTech={expressionTech}
            faceVariant={faceVariant}
            lipSyncMode={lipSyncMode}
            onDemoModeChange={setDemoMode}
            onExpressionStrengthChange={setExpressionStrength}
            onExpressionTechChange={setExpressionTech}
            onFaceVariantChange={setFaceVariant}
            onLipSyncModeChange={setLipSyncMode}
            onSpeakingIntensityChange={setSpeakingIntensity}
            onThemeChange={setTheme}
            speakingIntensity={speakingIntensity}
            theme={theme}
          />

          <div className="avatarStage" data-theme={theme}>
            <AidanAvatar
              lipSyncMode={lipSyncMode}
              expressionStrength={expressionStrength}
              expressionTech={expressionTech}
              faceVariant={faceVariant}
              size="large"
              speakingIntensity={effectiveSpeakingIntensity}
              state={effectiveState}
              theme={theme}
            />
            <div className="stateBadge stateBadge--select">
              {demoMode === "manual" ? (
                <select
                  className="controlPanel__select"
                  aria-label="State"
                  value={state}
                  onChange={(event) => setState(event.target.value as AidanState)}
                >
                  {manualStates.map((stateOption) => (
                    <option key={stateOption} value={stateOption}>
                      {label(stateOption)}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="controlPanel__select stateBadge__static">{label(effectiveState)}</div>
              )}
            </div>
            {demoMode === "interview" && !isInterviewRunning ? (
              <button className="demoPlayButton demoPlayButton--stage" onClick={runInterviewDemo} type="button" aria-label="Run interview demo">
                ▶
              </button>
            ) : null}
          </div>

          <div className={`modePanel modePanel--${demoMode}`}>
            {demoMode === "interview" ? (
              <>
                <div className="sectionHeader">
                  <div>
                    <p className="eyebrow">Interview demo</p>
                  </div>
                </div>
                <div className="transcriptPanel">
                  {visibleInterviewMessages.map((message, index) => (
                    <div className="messageRow" data-speaker={message.speaker} key={`${message.speaker}-${index}`}>
                      <span>{message.speaker}</span>
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {demoMode === "presentation" ? (
              <>
                <aside className="presenterRail" data-theme={theme}>
                  <p>{presenterLine}</p>
                  <button className="secondaryButton" onClick={nextPresentationInsight} type="button">
                    Next insight
                  </button>
                </aside>
                <div className="insightGrid">
                  {presentationInsights.map((insight, index) => (
                    <InsightCard
                      active={index === activeInsight}
                      eyebrow={`Insight ${index + 1}`}
                      insight={insight}
                      key={insight}
                    />
                  ))}
                </div>
              </>
            ) : null}

            {demoMode === "manual" ? (
              <div className="modePanel__empty">
                <p className="eyebrow">Manual mode</p>
                <p>No additional panel needed.</p>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
