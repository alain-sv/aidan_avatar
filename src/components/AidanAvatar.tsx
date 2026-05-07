import type { CSSProperties } from "react";
import type {
  AidanExpressionTech,
  AidanFaceVariant,
  AidanLipSyncMode,
  AidanSize,
  AidanState,
  AidanTheme,
} from "../types";

type AidanAvatarProps = {
  state: AidanState;
  size?: AidanSize;
  theme?: AidanTheme;
  speakingIntensity?: number;
  expressionTech?: AidanExpressionTech;
  expressionStrength?: number;
  faceVariant?: AidanFaceVariant;
  lipSyncMode?: AidanLipSyncMode;
  className?: string;
};

const sizePixels: Record<AidanSize, number> = {
  small: 112,
  medium: 180,
  large: 256,
};

export function AidanAvatar({
  state,
  size = "medium",
  theme = "light",
  speakingIntensity = 0.45,
  expressionTech = "liveportrait",
  expressionStrength = 0.5,
  faceVariant = "roundedWave",
  lipSyncMode = "soft",
  className = "",
}: AidanAvatarProps) {
  const clampedIntensity = Math.min(1, Math.max(0, speakingIntensity));
  const clampedExpression = Math.min(1, Math.max(0, expressionStrength));
  const style = {
    "--aidan-size": `${sizePixels[size]}px`,
    "--speech-intensity": clampedIntensity,
    "--expression-strength": clampedExpression,
    "--expression-lip-opacity": 0.35 + clampedExpression * 0.45,
    "--expression-cheek-opacity": 0.22 + clampedExpression * 0.34,
    "--expression-motion-opacity": 0.08 + clampedExpression * 0.16,
    "--expression-gaze": `${clampedExpression * 1.8}px`,
    "--expression-raise": `${clampedExpression * -2}px`,
    "--expression-tilt": `${clampedExpression * 1.2}deg`,
    "--expression-counter-tilt": `${clampedExpression * -0.8}deg`,
    "--expression-shift": `${clampedExpression * 2}px`,
    "--expression-counter-shift": `${clampedExpression * -1}px`,
    "--expression-mouth-scale": 1 + clampedExpression * 0.08,
  } as CSSProperties;

  return (
    <figure
      className={`aidanAvatar aidanAvatar--${state} aidanAvatar--${theme} aidanAvatar--tech-${expressionTech} aidanAvatar--face-${faceVariant} aidanAvatar--lip-${lipSyncMode} ${className}`}
      style={style}
      aria-label={`Aidan avatar, ${state}, ${faceVariant} face, ${expressionTech} expression experiment`}
    >
      <svg className="aidanAvatar__svg" viewBox="0 0 240 240" role="img">
        <defs>
          <filter id="aidanSoftShadow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="rgba(0,0,0,0.18)" />
          </filter>
          <linearGradient id="aidanCoreGradient" x1="44" y1="42" x2="190" y2="197" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#41e33b" />
            <stop offset="1" stopColor="#26b827" />
          </linearGradient>
          <linearGradient id="aidanDarkGradient" x1="64" y1="60" x2="176" y2="178" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#092409" />
            <stop offset="1" stopColor="#0d170f" />
          </linearGradient>
        </defs>

        <path className="aidanAvatar__haloFrame" d="M45 177c-15-24-17-55-6-82 13-32 44-53 80-53 48 0 87 39 87 87 0 18-5 34-14 48" />
        <circle className="aidanAvatar__ambientRing" cx="120" cy="120" r="98" />
        <circle className="aidanAvatar__listeningRing" cx="120" cy="120" r="98" />

        <g className="aidanAvatar__orbit">
          <circle className="aidanAvatar__orbitDot aidanAvatar__orbitDot--one" cx="120" cy="24" r="4" />
          <circle className="aidanAvatar__orbitDot aidanAvatar__orbitDot--two" cx="216" cy="120" r="3" />
          <circle className="aidanAvatar__orbitDot aidanAvatar__orbitDot--three" cx="120" cy="216" r="3.5" />
        </g>

        <g className="aidanAvatar__body" filter="url(#aidanSoftShadow)">
          <image
            className="aidanAvatar__referenceModel"
            href="/aidan-reference-model.png"
            x="34"
            y="26"
            width="176"
            height="168"
            preserveAspectRatio="xMidYMid meet"
          />
          <rect className="aidanAvatar__field" x="48" y="45" width="145" height="136" rx="28" />
          <path
            className="aidanAvatar__shellShape"
            d="M68 97c18 0 21-14 34-14 9 0 13-7 15-16 2-7 7-12 14-12 8 0 13 6 13 14v2c0 8 6 14 14 14h24"
          />
          <path className="aidanAvatar__bottomBand" d="M75 150h91c8 0 14 6 14 14s-6 14-14 14H75c-8 0-14-6-14-14s6-14 14-14Z" />
          <path className="aidanAvatar__sidePad aidanAvatar__sidePad--left" d="M57 91c-10 0-18 8-18 18v37c0 11 9 20 20 20h17V91H57Z" />
          <path className="aidanAvatar__sidePad aidanAvatar__sidePad--right" d="M165 91h18c10 0 18 8 18 18v37c0 11-9 20-20 20h-16V91Z" />
          <path
            className="aidanAvatar__faceBlock"
            d="M159 82c7 0 13 6 13 13v46c0 8-6 14-14 14H82c-8 0-14-6-14-14v-37c0-8 6-14 14-14h9c8 0 15-5 18-13 2-5 6-8 11-8s9-4 11-9l2-5c2-5 6-8 12-8 7 0 12 5 12 12v4c0 8 6 15 14 16l8 1Z"
          />

          <g className="aidanAvatar__realisticPlane">
            <path d="M91 93c7-8 18-12 29-12s22 4 29 12c8 9 12 21 11 35-1 18-9 31-23 39-6 3-12 5-18 5-7 0-13-2-19-5-13-8-21-21-22-39-1-14 3-26 13-35Z" />
            <path className="aidanAvatar__noseBridge" d="M121 115c-2 8-3 15-3 22 3 2 7 2 11 0" />
          </g>

          <g className="aidanAvatar__logoNotches">
            <path d="M103 77c3-10 8-15 17-15h17c8 0 13 5 15 13" />
            <path d="M71 95c7 0 13-1 19-5" />
            <path d="M150 78c4 7 9 11 17 11" />
          </g>

          <g className="aidanAvatar__eyes">
            <ellipse className="aidanAvatar__eye aidanAvatar__eye--left" cx="101" cy="120" rx="8" ry="8" />
            <ellipse className="aidanAvatar__eye aidanAvatar__eye--right" cx="140" cy="120" rx="8" ry="8" />
            <path className="aidanAvatar__eyelid aidanAvatar__eyelid--left" d="M91 115c6-6 15-6 22 0" />
            <path className="aidanAvatar__eyelid aidanAvatar__eyelid--right" d="M130 115c6-6 15-6 22 0" />
          </g>

          <g className="aidanAvatar__brows">
            <path className="aidanAvatar__brow aidanAvatar__brow--left" d="M90 101c7-4 17-4 24 0" />
            <path className="aidanAvatar__brow aidanAvatar__brow--right" d="M128 101c7-4 17-4 24 0" />
          </g>

          <g className="aidanAvatar__mouth">
            <rect className="aidanAvatar__mouthMask" x="96" y="122" width="50" height="28" rx="14" />
            <path className="aidanAvatar__mouthLine" d="M104 135c9 8 25 8 34 0" />
            <path className="aidanAvatar__mouthRealistic" d="M104 135c9 8 25 8 34 0" />
            <path className="aidanAvatar__mouthCavity" d="M104 133h34c-1 11-8 18-17 18s-16-7-17-18Z" />
            <path className="aidanAvatar__speechLip" d="M106 133c8-4 22-4 30 0" />
            <path className="aidanAvatar__speechLowerLip" d="M108 141c8 5 18 5 26 0" />
            <g className="aidanAvatar__visemeSet">
              <path className="aidanAvatar__viseme aidanAvatar__viseme--wide" d="M103 135h35c-2 10-9 15-18 15s-15-5-17-15Z" />
              <ellipse className="aidanAvatar__viseme aidanAvatar__viseme--round" cx="121" cy="139" rx="9" ry="10" />
              <ellipse className="aidanAvatar__viseme aidanAvatar__viseme--small" cx="121" cy="139" rx="6" ry="6" />
              <rect className="aidanAvatar__viseme aidanAvatar__viseme--closed" x="106" y="135" width="30" height="6" rx="3" />
            </g>
          </g>

          <g className="aidanAvatar__cheeks">
            <path d="M83 135c7 4 15 4 22 0" />
            <path d="M136 135c7 4 15 4 22 0" />
          </g>

          <g className="aidanAvatar__processingDots">
            <circle cx="96" cy="193" r="4" />
            <circle cx="120" cy="193" r="4" />
            <circle cx="144" cy="193" r="4" />
          </g>
        </g>

        <path className="aidanAvatar__cautionMark" d="M120 30 132 52h-24l12-22Z" />
        <path className="aidanAvatar__checkMark" d="m91 193 17 17 42-42" />
        <path className="aidanAvatar__motionTrace" d="M64 74c-13 16-20 36-20 59 0 19 5 36 15 51" />
        <g className="aidanAvatar__questionMarks" aria-hidden="true">
          <text x="174" y="56">?</text>
          <text x="196" y="85">?</text>
        </g>
      </svg>
    </figure>
  );
}
