export type AidanState =
  | "idle"
  | "listening"
  | "questioning"
  | "thinking"
  | "speaking"
  | "acknowledging"
  | "complete"
  | "caution";

export type AidanSize = "small" | "medium" | "large";
export type AidanTheme = "light" | "dark";
export type AidanExpressionTech = "musetalk" | "liveportrait" | "sadtalker";
export type AidanFaceVariant =
  | "roundedWave"
  | "orbit"
  | "haloFrame"
  | "logoStudy"
  | "smallScale"
  | "darkMode";
export type AidanLipSyncMode = "soft" | "viseme" | "aperture" | "minimal";
