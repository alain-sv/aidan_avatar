import { AidanAvatar } from "./AidanAvatar";
import type { AidanExpressionTech, AidanFaceVariant, AidanState, AidanTheme } from "../types";

type FaceVariationLabProps = {
  selectedVariant: AidanFaceVariant;
  state: AidanState;
  theme: AidanTheme;
  expressionTech: AidanExpressionTech;
  expressionStrength: number;
  onSelectedVariantChange: (variant: AidanFaceVariant) => void;
};

const faceVariations: Array<{
  id: AidanFaceVariant;
  name: string;
  range: string;
  note: string;
}> = [
  {
    id: "roundedWave",
    name: "Rounded Wave",
    range: "Proposal 1",
    note: "Clean and minimal. Friendly and approachable for everyday interactions.",
  },
  {
    id: "orbit",
    name: "Orbit",
    range: "Proposal 2",
    note: "Dynamic and forward-looking. Conveys thinking and motion.",
  },
  {
    id: "haloFrame",
    name: "Halo Frame",
    range: "Proposal 3",
    note: "Framed and focused. Strong presence for stage and key moments.",
  },
  {
    id: "logoStudy",
    name: "Logo Study",
    range: "Closest to source",
    note: "Keeps the Runwaize logo DNA visible in the top wave and stable base.",
  },
  {
    id: "smallScale",
    name: "Small Scale",
    range: "UI icon",
    note: "Simplified details for compact product surfaces and status moments.",
  },
  {
    id: "darkMode",
    name: "Dark Mode",
    range: "Presentation card",
    note: "White logo-like form tuned for dark backgrounds and presenter cards.",
  },
];

export function FaceVariationLab({
  selectedVariant,
  state,
  theme,
  expressionTech,
  expressionStrength,
  onSelectedVariantChange,
}: FaceVariationLabProps) {
  return (
    <section className="demoSection faceVariationLab">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Face variations</p>
          <h2>Proposal directions</h2>
        </div>
      </div>

      <div className="faceVariantGrid">
        {faceVariations.map((variation) => (
          <button
            className="faceVariantCard"
            data-active={variation.id === selectedVariant}
            key={variation.id}
            onClick={() => onSelectedVariantChange(variation.id)}
            type="button"
          >
            <AidanAvatar
              expressionStrength={expressionStrength}
              expressionTech={expressionTech}
              faceVariant={variation.id}
              size="small"
              speakingIntensity={0.58}
              state={state === "idle" ? "speaking" : state}
              theme={theme}
            />
            <span className="faceVariantCard__range">{variation.range}</span>
            <strong>{variation.name}</strong>
            <p>{variation.note}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
