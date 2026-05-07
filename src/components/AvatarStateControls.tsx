import type { AidanSize, AidanState, AidanTheme } from "../types";

type AvatarStateControlsProps = {
  state: AidanState;
  size: AidanSize;
  theme: AidanTheme;
  speakingIntensity: number;
  onStateChange: (state: AidanState) => void;
  onSizeChange: (size: AidanSize) => void;
  onThemeChange: (theme: AidanTheme) => void;
  onSpeakingIntensityChange: (intensity: number) => void;
};

const states: AidanState[] = [
  "idle",
  "listening",
  "questioning",
  "thinking",
  "speaking",
  "acknowledging",
  "complete",
  "caution",
];

const sizes: AidanSize[] = ["small", "medium", "large"];
const themes: AidanTheme[] = ["light", "dark"];

function label(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function AvatarStateControls({
  state,
  size,
  theme,
  speakingIntensity,
  onStateChange,
  onSizeChange,
  onThemeChange,
  onSpeakingIntensityChange,
}: AvatarStateControlsProps) {
  return (
    <div className="controlPanel" aria-label="Aidan controls">
      <div className="controlPanel__group">
        <span className="controlPanel__label">State</span>
        <div className="segmentedGrid">
          {states.map((stateOption) => (
            <button
              className="segmentedButton"
              data-active={stateOption === state}
              key={stateOption}
              onClick={() => onStateChange(stateOption)}
              type="button"
            >
              {label(stateOption)}
            </button>
          ))}
        </div>
      </div>

      <div className="controlPanel__row">
        <div className="controlPanel__group">
          <span className="controlPanel__label">Size</span>
          <div className="segmentedControl">
            {sizes.map((sizeOption) => (
              <button
                className="segmentedButton"
                data-active={sizeOption === size}
                key={sizeOption}
                onClick={() => onSizeChange(sizeOption)}
                type="button"
              >
                {label(sizeOption)}
              </button>
            ))}
          </div>
        </div>

        <div className="controlPanel__group">
          <span className="controlPanel__label">Theme</span>
          <div className="segmentedControl">
            {themes.map((themeOption) => (
              <button
                className="segmentedButton"
                data-active={themeOption === theme}
                key={themeOption}
                onClick={() => onThemeChange(themeOption)}
                type="button"
              >
                {label(themeOption)}
              </button>
            ))}
          </div>
        </div>
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
    </div>
  );
}
