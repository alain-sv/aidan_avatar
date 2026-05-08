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
export type AidanLipSyncMode = "soft" | "viseme" | "aperture" | "minimal";
export type AidanFaceVariant =
  | "roundedWave"
  | "orbit"
  | "haloFrame"
  | "logoStudy"
  | "smallScale"
  | "darkMode";
export type AidanEyeShape = "round" | "square";
export type AidanEyePosition = "high" | "low" | "close" | "wide";
export type AidanEyeSize = "small" | "large";
export type AidanNoseShape = "round" | "square" | "none";
export type AidanFaceShape = "rounded" | "square" | "shield";
export type AidanMouthShape = "smile" | "flat" | "round";
