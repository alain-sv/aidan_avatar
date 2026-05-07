import { useMemo, useState } from "react";
import { AidanAvatar } from "./AidanAvatar";
import type { AidanFaceVariant, AidanLipSyncMode, AidanTheme } from "../types";

type LipSyncLabProps = {
  faceVariant: AidanFaceVariant;
  theme: AidanTheme;
  speakingIntensity: number;
};

const alternatives: Array<{
  id: AidanLipSyncMode;
  name: string;
  role: string;
  note: string;
}> = [
  {
    id: "soft",
    name: "Soft Smile",
    role: "Current direction",
    note: "Keeps the friendly smile language and opens it gently while speaking.",
  },
  {
    id: "viseme",
    name: "Viseme Morph",
    role: "Most phonetic",
    note: "Cycles through wide, round, small, and closed mouth shapes.",
  },
  {
    id: "aperture",
    name: "Aperture Pulse",
    role: "Most audio-reactive",
    note: "Uses one clean mouth opening driven by amplitude-like motion.",
  },
  {
    id: "minimal",
    name: "Minimal Presenter",
    role: "Most restrained",
    note: "Small mouth movement for serious readouts and enterprise UI moments.",
  },
];

const phrases = [
  {
    text: "Here is the campaign readiness summary.",
    visemes: ["H", "E", "R", "I", "S", "TH", "A", "U", "M"],
  },
  {
    text: "Most participants use AI regularly.",
    visemes: ["M", "O", "S", "P", "A", "I", "U", "L", "Y"],
  },
  {
    text: "The main risk is operating discipline.",
    visemes: ["TH", "A", "M", "R", "I", "S", "O", "D", "N"],
  },
  {
    text: "I recommend targeted coaching sessions.",
    visemes: ["I", "R", "E", "K", "O", "M", "T", "CH", "N"],
  },
];

const mouthShapes = [
  { label: "A/E/I", description: "Wide vowel", className: "mouthShape--wide" },
  { label: "O", description: "Rounded vowel", className: "mouthShape--round" },
  { label: "U", description: "Small rounded", className: "mouthShape--small" },
  { label: "B/P/M", description: "Closed contact", className: "mouthShape--closed" },
  { label: "L", description: "Tongue touch", className: "mouthShape--tongue" },
  { label: "Rest", description: "Default smile", className: "mouthShape--rest" },
];

function MouthShapePreview({ className }: { className: string }) {
  return (
    <svg className={`mouthShape ${className}`} viewBox="0 0 92 70" aria-hidden="true">
      <rect className="mouthShape__face" x="8" y="8" width="76" height="54" rx="12" />
      <path className="mouthShape__smile" d="M31 35c7 8 23 8 30 0" />
      <path className="mouthShape__wide" d="M28 32h36c-2 13-10 20-18 20s-16-7-18-20Z" />
      <ellipse className="mouthShape__round" cx="46" cy="39" rx="11" ry="13" />
      <ellipse className="mouthShape__small" cx="46" cy="39" rx="7" ry="7" />
      <rect className="mouthShape__closed" x="29" y="35" width="34" height="7" rx="3.5" />
      <path className="mouthShape__tongue" d="M31 34c7 5 23 5 30 0" />
      <path className="mouthShape__tongueMark" d="M44 36c0 5 1 8 5 10" />
    </svg>
  );
}

export function LipSyncLab({ faceVariant, theme, speakingIntensity }: LipSyncLabProps) {
  const [selectedMode, setSelectedMode] = useState<AidanLipSyncMode>("viseme");
  const [selectedPhrase, setSelectedPhrase] = useState(0);

  const activePhrase = phrases[selectedPhrase];
  const selectedAlternative = useMemo(
    () => alternatives.find((alternative) => alternative.id === selectedMode) ?? alternatives[0],
    [selectedMode],
  );

  return (
    <section className="demoSection lipSyncLab">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Lip sync lab</p>
          <h2>Mouth movement alternatives</h2>
        </div>
      </div>

      <div className="lipSyncLayout">
        <div className="lipSyncStage" data-theme={theme}>
          <AidanAvatar
            faceVariant={faceVariant}
            lipSyncMode={selectedMode}
            size="large"
            speakingIntensity={speakingIntensity}
            state="speaking"
            theme={theme}
          />
          <div className="lipSyncStage__caption">
            <span>{selectedAlternative.name}</span>
            <p>{activePhrase.text}</p>
          </div>
        </div>

        <div className="lipSyncOptions">
          {alternatives.map((alternative) => (
            <button
              className="lipSyncOption"
              data-active={alternative.id === selectedMode}
              key={alternative.id}
              onClick={() => setSelectedMode(alternative.id)}
              type="button"
            >
              <AidanAvatar
                faceVariant={faceVariant}
                lipSyncMode={alternative.id}
                size="small"
                speakingIntensity={speakingIntensity}
                state="speaking"
                theme={theme}
              />
              <strong>{alternative.name}</strong>
              <span>{alternative.role}</span>
              <p>{alternative.note}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="phraseGrid">
        {phrases.map((phrase, index) => (
          <button
            className="phraseCard"
            data-active={index === selectedPhrase}
            key={phrase.text}
            onClick={() => setSelectedPhrase(index)}
            type="button"
          >
            <p>{phrase.text}</p>
            <div className="visemeTimeline" aria-label="Approximate viseme sequence">
              {phrase.visemes.map((viseme, visemeIndex) => (
                <span key={`${viseme}-${visemeIndex}`}>{viseme}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="mouthShapeStudy">
        <div>
          <p className="eyebrow">Mouth shape study</p>
          <h3>Shape vocabulary for Aidan</h3>
        </div>
        <div className="mouthShapeGrid">
          {mouthShapes.map((shape) => (
            <article className="mouthShapeCard" key={shape.label}>
              <MouthShapePreview className={shape.className} />
              <strong>{shape.label}</strong>
              <span>{shape.description}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
