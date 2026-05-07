import { useState } from "react";
import { AidanAvatar } from "./components/AidanAvatar";
import { AvatarStateControls } from "./components/AvatarStateControls";
import { ExpressionTechLab } from "./components/ExpressionTechLab";
import { FaceVariationLab } from "./components/FaceVariationLab";
import { InterviewDemo } from "./components/InterviewDemo";
import { LipSyncLab } from "./components/LipSyncLab";
import { PresentationDemo } from "./components/PresentationDemo";
import type { AidanExpressionTech, AidanFaceVariant, AidanSize, AidanState, AidanTheme } from "./types";

export default function App() {
  const [state, setState] = useState<AidanState>("idle");
  const [size, setSize] = useState<AidanSize>("large");
  const [theme, setTheme] = useState<AidanTheme>("light");
  const [speakingIntensity, setSpeakingIntensity] = useState(0.55);
  const [expressionTech, setExpressionTech] = useState<AidanExpressionTech>("liveportrait");
  const [expressionStrength, setExpressionStrength] = useState(0.55);
  const [faceVariant, setFaceVariant] = useState<AidanFaceVariant>("roundedWave");

  return (
    <main className="appShell" data-theme={theme}>
      <section className="heroBand">
        <div className="brandStrip">
          <img alt="Runwaize" src="/runwaize.svg" />
          <span>Aidan</span>
        </div>
        <div className="heroCopy">
          <p className="eyebrow">Runwaize AI coach</p>
          <h1>A branded operational presence for interviews and campaign readouts.</h1>
        </div>
      </section>

      <section className="labSection">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Avatar lab</p>
            <h2>State controls</h2>
          </div>
        </div>

        <div className="labLayout">
          <div className="avatarStage" data-theme={theme}>
            <AidanAvatar
              expressionStrength={expressionStrength}
              expressionTech={expressionTech}
              faceVariant={faceVariant}
              size={size}
              speakingIntensity={speakingIntensity}
              state={state}
              theme={theme}
            />
            <div className="stateBadge">{state}</div>
          </div>

          <AvatarStateControls
            onSizeChange={setSize}
            onSpeakingIntensityChange={setSpeakingIntensity}
            onStateChange={setState}
            onThemeChange={setTheme}
            size={size}
            speakingIntensity={speakingIntensity}
            state={state}
            theme={theme}
          />
        </div>
      </section>

      <ExpressionTechLab
        expressionStrength={expressionStrength}
        onExpressionStrengthChange={setExpressionStrength}
        onSelectedTechChange={setExpressionTech}
        faceVariant={faceVariant}
        selectedTech={expressionTech}
        state={state}
        theme={theme}
      />
      <LipSyncLab faceVariant={faceVariant} speakingIntensity={speakingIntensity} theme={theme} />
      <FaceVariationLab
        expressionStrength={expressionStrength}
        expressionTech={expressionTech}
        onSelectedVariantChange={setFaceVariant}
        selectedVariant={faceVariant}
        state={state}
        theme={theme}
      />
      <InterviewDemo
        expressionStrength={expressionStrength}
        expressionTech={expressionTech}
        faceVariant={faceVariant}
        theme={theme}
      />
      <PresentationDemo
        expressionStrength={expressionStrength}
        expressionTech={expressionTech}
        faceVariant={faceVariant}
        theme={theme}
      />
    </main>
  );
}
