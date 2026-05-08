import type {
  AidanExpressionTech,
  AidanFaceShape,
  AidanEyePosition,
  AidanEyeShape,
  AidanEyeSize,
  AidanLipSyncMode,
  AidanMouthShape,
  AidanNoseShape,
  AidanTheme,
} from "../types";

export type AidanDemoMode = "manual" | "interview" | "presentation";

type AvatarStateControlsProps = {
  demoMode: AidanDemoMode;
  theme: AidanTheme;
  speakingIntensity: number;
  expressionTech: AidanExpressionTech;
  expressionStrength: number;
  lipSyncMode: AidanLipSyncMode;
  eyeShape: AidanEyeShape;
  eyePosition: AidanEyePosition;
  eyeSize: AidanEyeSize;
  eyeColor: string;
  noseShape: AidanNoseShape;
  faceShape: AidanFaceShape;
  mouthShape: AidanMouthShape;
  showOrbit: boolean;
  showMotionTrace: boolean;
  onDemoModeChange: (mode: AidanDemoMode) => void;
  onThemeChange: (theme: AidanTheme) => void;
  onSpeakingIntensityChange: (intensity: number) => void;
  onExpressionTechChange: (tech: AidanExpressionTech) => void;
  onExpressionStrengthChange: (strength: number) => void;
  onLipSyncModeChange: (mode: AidanLipSyncMode) => void;
  onEyeShapeChange: (shape: AidanEyeShape) => void;
  onEyePositionChange: (position: AidanEyePosition) => void;
  onEyeSizeChange: (size: AidanEyeSize) => void;
  onEyeColorChange: (color: string) => void;
  onNoseShapeChange: (shape: AidanNoseShape) => void;
  onFaceShapeChange: (shape: AidanFaceShape) => void;
  onMouthShapeChange: (shape: AidanMouthShape) => void;
  onShowOrbitChange: (value: boolean) => void;
  onShowMotionTraceChange: (value: boolean) => void;
};

const demoModes: AidanDemoMode[] = ["manual", "interview", "presentation"];
const themes: AidanTheme[] = ["light", "dark"];
const expressionTechs: AidanExpressionTech[] = ["musetalk", "liveportrait", "sadtalker"];
const lipSyncModes: AidanLipSyncMode[] = ["soft", "viseme", "aperture", "minimal"];
const eyeShapes: AidanEyeShape[] = ["round", "square"];
const eyePositions: AidanEyePosition[] = ["high", "low", "close", "wide"];
const eyeSizes: AidanEyeSize[] = ["small", "large"];
const noseShapes: AidanNoseShape[] = ["round", "square", "none"];
const faceShapes: AidanFaceShape[] = ["rounded", "square", "shield"];
const mouthShapes: AidanMouthShape[] = ["smile", "flat", "round"];

function label(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function AvatarStateControls({
  demoMode,
  theme,
  speakingIntensity,
  expressionTech,
  expressionStrength,
  lipSyncMode,
  eyeShape,
  eyePosition,
  eyeSize,
  eyeColor,
  noseShape,
  faceShape,
  mouthShape,
  showOrbit,
  showMotionTrace,
  onDemoModeChange,
  onThemeChange,
  onSpeakingIntensityChange,
  onExpressionTechChange,
  onExpressionStrengthChange,
  onLipSyncModeChange,
  onEyeShapeChange,
  onEyePositionChange,
  onEyeSizeChange,
  onEyeColorChange,
  onNoseShapeChange,
  onFaceShapeChange,
  onMouthShapeChange,
  onShowOrbitChange,
  onShowMotionTraceChange,
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
        <span className="controlPanel__label">Eye shape</span>
        <select className="controlPanel__select" value={eyeShape} onChange={(event) => onEyeShapeChange(event.target.value as AidanEyeShape)}>
          {eyeShapes.map((shape) => (
            <option key={shape} value={shape}>
              {label(shape)}
            </option>
          ))}
        </select>
      </div>

      <div className="controlPanel__group">
        <span className="controlPanel__label">Eye position</span>
        <select className="controlPanel__select" value={eyePosition} onChange={(event) => onEyePositionChange(event.target.value as AidanEyePosition)}>
          {eyePositions.map((position) => (
            <option key={position} value={position}>
              {label(position)}
            </option>
          ))}
        </select>
      </div>

      <div className="controlPanel__group">
        <span className="controlPanel__label">Eye size</span>
        <select className="controlPanel__select" value={eyeSize} onChange={(event) => onEyeSizeChange(event.target.value as AidanEyeSize)}>
          {eyeSizes.map((size) => (
            <option key={size} value={size}>
              {label(size)}
            </option>
          ))}
        </select>
      </div>

      <div className="controlPanel__group">
        <span className="controlPanel__label">Eye color</span>
        <input className="controlPanel__color" type="color" aria-label="Eye color" value={eyeColor} onChange={(event) => onEyeColorChange(event.target.value)} />
      </div>

      <div className="controlPanel__group">
        <span className="controlPanel__label">Nose shape</span>
        <select className="controlPanel__select" value={noseShape} onChange={(event) => onNoseShapeChange(event.target.value as AidanNoseShape)}>
          {noseShapes.map((shape) => (
            <option key={shape} value={shape}>
              {label(shape)}
            </option>
          ))}
        </select>
      </div>

      <div className="controlPanel__group">
        <span className="controlPanel__label">Face shape</span>
        <select className="controlPanel__select" value={faceShape} onChange={(event) => onFaceShapeChange(event.target.value as AidanFaceShape)}>
          {faceShapes.map((shape) => (
            <option key={shape} value={shape}>
              {label(shape)}
            </option>
          ))}
        </select>
      </div>

      <div className="controlPanel__group">
        <span className="controlPanel__label">Mouth shape</span>
        <select className="controlPanel__select" value={mouthShape} onChange={(event) => onMouthShapeChange(event.target.value as AidanMouthShape)}>
          {mouthShapes.map((shape) => (
            <option key={shape} value={shape}>
              {label(shape)}
            </option>
          ))}
        </select>
      </div>

      <div className="controlPanel__group">
        <span className="controlPanel__label">Orbit dots</span>
        <select className="controlPanel__select" value={showOrbit ? "on" : "off"} onChange={(event) => onShowOrbitChange(event.target.value === "on")}>
          <option value="on">On</option>
          <option value="off">Off</option>
        </select>
      </div>

      <div className="controlPanel__group">
        <span className="controlPanel__label">Motion stroke</span>
        <select
          className="controlPanel__select"
          value={showMotionTrace ? "on" : "off"}
          onChange={(event) => onShowMotionTraceChange(event.target.value === "on")}
        >
          <option value="on">On</option>
          <option value="off">Off</option>
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
