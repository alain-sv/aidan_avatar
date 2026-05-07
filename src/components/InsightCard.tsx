type InsightCardProps = {
  eyebrow: string;
  insight: string;
  active?: boolean;
};

export function InsightCard({ eyebrow, insight, active = false }: InsightCardProps) {
  return (
    <article className="insightCard" data-active={active}>
      <span className="insightCard__eyebrow">{eyebrow}</span>
      <p>{insight}</p>
    </article>
  );
}
