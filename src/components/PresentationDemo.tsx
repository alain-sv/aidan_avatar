import { useMemo, useState } from "react";
import type { AidanExpressionTech, AidanFaceVariant, AidanState, AidanTheme } from "../types";
import { AidanAvatar } from "./AidanAvatar";
import { InsightCard } from "./InsightCard";

type PresentationDemoProps = {
  theme: AidanTheme;
  expressionTech: AidanExpressionTech;
  expressionStrength: number;
  faceVariant: AidanFaceVariant;
};

const insights = [
  "Most participants use AI regularly, but usage remains uneven across teams.",
  "The main operational risk is not lack of tools. It is lack of shared operating discipline.",
  "Recommended next step: segment users by maturity and run targeted coaching sessions.",
];

const stateByInsight: AidanState[] = ["speaking", "questioning", "complete"];

export function PresentationDemo({ theme, expressionTech, expressionStrength, faceVariant }: PresentationDemoProps) {
  const [activeInsight, setActiveInsight] = useState(0);

  const activeState = stateByInsight[activeInsight] ?? "speaking";
  const presenterLine = useMemo(() => {
    if (activeInsight === 1) {
      return "The risk is operational drift. The system should make review habits visible before scale increases.";
    }

    if (activeInsight === 2) {
      return "The clean next move is segmented coaching, starting with teams that already have weekly usage.";
    }

    return "The campaign shows real usage, but adoption is not yet evenly governed across teams.";
  }, [activeInsight]);

  function nextInsight() {
    setActiveInsight((current) => (current + 1) % insights.length);
  }

  return (
    <section className="demoSection presentationSection">
      <div className="sectionHeader">
        <div>
          <p className="eyebrow">Presentation demo</p>
          <h2>Campaign Readiness Summary</h2>
        </div>
        <button className="secondaryButton" onClick={nextInsight} type="button">
          Next insight
        </button>
      </div>

      <div className="presentationLayout">
        <aside className="presenterRail" data-theme={theme}>
          <AidanAvatar
            expressionStrength={expressionStrength}
            expressionTech={expressionTech}
            faceVariant={faceVariant}
            size="medium"
            state={activeState}
            theme={theme}
            speakingIntensity={0.42}
          />
          <p>{presenterLine}</p>
        </aside>

        <div className="insightGrid">
          {insights.map((insight, index) => (
            <InsightCard
              active={index === activeInsight}
              eyebrow={`Insight ${index + 1}`}
              insight={insight}
              key={insight}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
