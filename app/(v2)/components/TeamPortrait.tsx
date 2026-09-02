/** Placeholder portrait plate: monogram over a tinted field with the brand
 *  arc. Swap for real headshots when we have them. */
export default function TeamPortrait({
  initials,
  tone,
}: {
  initials: string;
  tone: "copper" | "steel";
}) {
  const c = tone === "copper" ? "217,119,87" : "91,141,239";
  return (
    <div className={`team-portrait team-portrait--${tone}`}>
      <span className="team-monogram">{initials}</span>
      <svg
        className="team-arc"
        viewBox="0 0 320 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 78 Q160 6 320 78"
          fill="none"
          stroke={`rgba(${c},0.45)`}
          strokeWidth="1"
        />
        <path
          d="M0 78 L320 78"
          fill="none"
          stroke={`rgba(${c},0.28)`}
          strokeWidth="1"
        />
        {[60, 110, 160, 210, 260].map((x, i) => {
          const t = x / 320;
          const y = 78 - 4 * 78 * t * (1 - t) * 0.92 - 6;
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2={x}
              y2="78"
              stroke={`rgba(${c},0.3)`}
              strokeWidth="0.8"
            />
          );
        })}
      </svg>
    </div>
  );
}
