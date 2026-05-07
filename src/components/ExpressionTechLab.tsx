import { AidanAvatar } from "./AidanAvatar";
import type { AidanExpressionTech, AidanFaceVariant, AidanLipSyncMode, AidanState, AidanTheme } from "../types";

type ExpressionTechLabProps = {
  selectedTech: AidanExpressionTech;
  state: AidanState;
  theme: AidanTheme;
  faceVariant: AidanFaceVariant;
  expressionStrength: number;
  onSelectedTechChange: (tech: AidanExpressionTech) => void;
  onExpressionStrengthChange: (strength: number) => void;
};

const technologies: Array<{
  id: AidanExpressionTech;
  name: string;
  role: string;
  note: string;
  example: string;
  sampleState: AidanState;
  lipSyncMode: AidanLipSyncMode;
  signals: string[];
}> = [
  {
    id: "musetalk",
    name: "MuseTalk",
    role: "Audio lip-sync layer",
    note: "Best represented here as tighter mouth aperture and amplitude-driven speech.",
    example: "Voice-led interview answer with visible mouth timing.",
    sampleState: "speaking",
    lipSyncMode: "viseme",
    signals: ["Audio amplitude", "Mouth shapes", "Low head motion"],
  },
  {
    id: "liveportrait",
    name: "LivePortrait",
    role: "Controllable expression layer",
    note: "Best represented here as subtle pose, brow, and gaze retargeting.",
    example: "Questioning a result with head tilt, gaze, and facial intent.",
    sampleState: "questioning",
    lipSyncMode: "minimal",
    signals: ["Pose control", "Gaze/attention", "Expression strength"],
  },
  {
    id: "sadtalker",
    name: "SadTalker",
    role: "Offline talking-head reference",
    note: "Best represented here as a composed video-like presenter cadence.",
    example: "Prepared campaign readout with presenter-like cadence.",
    sampleState: "speaking",
    lipSyncMode: "minimal",
    signals: ["Generated clip feel", "Presenter cadence", "Less live control"],
  },
];

export function ExpressionTechLab({
  selectedTech,
  state,
  theme,
  faceVariant,
  expressionStrength,
  onSelectedTechChange,
  onExpressionStrengthChange,
}: ExpressionTechLabProps) {
  return (
    <section className="demoSection expressionLab">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Expression experiments</p>
          <h2>Technology-inspired face behavior</h2>
        </div>
      </div>

      <div className="expressionLayout">
        <div className="expressionControls">
          <div className="controlPanel__group">
            <span className="controlPanel__label">Expression engine</span>
            <div className="segmentedGrid expressionTechGrid">
              {technologies.map((technology) => (
                <button
                  className="segmentedButton expressionTechButton"
                  data-active={technology.id === selectedTech}
                  key={technology.id}
                  onClick={() => onSelectedTechChange(technology.id)}
                  type="button"
                >
                  {technology.name}
                </button>
              ))}
            </div>
          </div>

          <label className="sliderControl">
            <span className="controlPanel__label">Expression strength</span>
            <input
              aria-label="Expression strength"
              max="1"
              min="0"
              onChange={(event) => onExpressionStrengthChange(Number(event.target.value))}
              step="0.01"
              type="range"
              value={expressionStrength}
            />
          </label>
        </div>

        <div className="technologyCards">
          {technologies.map((technology) => (
            <article className="technologyCard" data-active={technology.id === selectedTech} key={technology.id}>
              <div className="technologyCard__preview" data-tech={technology.id}>
                <AidanAvatar
                  expressionStrength={expressionStrength}
                  expressionTech={technology.id}
                  faceVariant={technology.id === "sadtalker" ? "haloFrame" : faceVariant}
                  lipSyncMode={technology.lipSyncMode}
                  size="medium"
                  speakingIntensity={0.78}
                  state={technology.id === selectedTech ? technology.sampleState : technology.sampleState}
                  theme={theme}
                />
              </div>
              <div>
                <h3>{technology.name}</h3>
                <span>{technology.role}</span>
                <p>{technology.note}</p>
              </div>
              <p className="technologyCard__example">{technology.example}</p>
              <div className="techSignalList">
                {technology.signals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
