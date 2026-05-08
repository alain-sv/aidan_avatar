import type {
  AidanExpressionTech,
  AidanFaceVariant,
  AidanLipSyncMode,
  AidanTheme,
} from "../types";

export type AidanDemoMode = "manual" | "interview" | "presentation";

type AvatarStateControlsProps = {
  demoMode: AidanDemoMode;
  theme: AidanTheme;
  speakingIntensity: number;
  expressionTech: AidanExpressionTech;
  expressionStrength: number;
  faceVariant: AidanFaceVariant;
  lipSyncMode: AidanLipSyncMode;
  onDemoModeChange: (mode: AidanDemoMode) => void;
  onThemeChange: (theme: AidanTheme) => void;
  onSpeakingIntensityChange: (intensity: number) => void;
  onExpressionTechChange: (tech: AidanExpressionTech) => void;
  onExpressionStrengthChange: (strength: number) => void;
  onFaceVariantChange: (variant: AidanFaceVariant) => void;
  onLipSyncModeChange: (mode: AidanLipSyncMode) => void;
};

const demoModes: AidanDemoMode[] = ["manual", "interview", "presentation"];
const themes: AidanTheme[] = ["light", "dark"];
const expressionTechs: AidanExpressionTech[] = ["musetalk", "liveportrait", "sadtalker"];
const faceVariants: AidanFaceVariant[] = ["roundedWave", "orbit", "haloFrame", "logoStudy", "smallScale", "darkMode"];
const lipSyncModes: AidanLipSyncMode[] = ["soft", "viseme", "aperture", "minimal"];

function label(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function AvatarStateControls({
  demoMode,
  theme,
  speakingIntensity,
  expressionTech,
  expressionStrength,
  faceVariant,
  lipSyncMode,
  onDemoModeChange,
  onThemeChange,
  onSpeakingIntensityChange,
  onExpressionTechChange,
  onExpressionStrengthChange,
  onFaceVariantChange,
  onLipSyncModeChange,
}: AvatarStateControlsProps) {
  return (
    <div className="controlPanel" aria-label="Aidan controls">
      <div className="controlPanel__group">
        <span className="controlPanel__label">Demo mode</span>
        <select className="controlPanel__select" value={demoMode} onChange={(event) => onDemoModeChange(event.target.value as AidanDemoMode)}>
          {demoModes.map((mode) => (
            <option key={mode} value={mode}>
              {label(mode)}
            </option>
          ))}
        </select>
      </div>

      <label className="sliderControl">
        <span className="controlPanel__label">Speaking intensity</span>
        <input
          aria-label="Speaking intensity"
          max="1"
          min="0"
          onChange={(event) => onSpeakingIntensityChange(Number(event.target.value))}
          step="0.01"
          type="range"
          value={speakingIntensity}
        />
      </label>

      <div className="controlPanel__group">
        <span className="controlPanel__label">Lip sync mode</span>
        <select className="controlPanel__select" value={lipSyncMode} onChange={(event) => onLipSyncModeChange(event.target.value as AidanLipSyncMode)}>
          {lipSyncModes.map((mode) => (
            <option key={mode} value={mode}>
              {label(mode)}
            </option>
          ))}
        </select>
      </div>

      <div className="controlPanel__group">
        <span className="controlPanel__label">Expression engine</span>
        <select className="controlPanel__select" value={expressionTech} onChange={(event) => onExpressionTechChange(event.target.value as AidanExpressionTech)}>
          {expressionTechs.map((tech) => (
            <option key={tech} value={tech}>
              {label(tech)}
            </option>
          ))}
        </select>
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

      <div className="controlPanel__group">
        <span className="controlPanel__label">Face variant</span>
        <select className="controlPanel__select" value={faceVariant} onChange={(event) => onFaceVariantChange(event.target.value as AidanFaceVariant)}>
          {faceVariants.map((variant) => (
            <option key={variant} value={variant}>
              {label(variant)}
            </option>
          ))}
        </select>
      </div>

      <div className="controlPanel__group">
        <span className="controlPanel__label">Theme</span>
        <select className="controlPanel__select" value={theme} onChange={(event) => onThemeChange(event.target.value as AidanTheme)}>
          {themes.map((themeOption) => (
            <option key={themeOption} value={themeOption}>
              {label(themeOption)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
