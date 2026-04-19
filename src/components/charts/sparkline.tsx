"use client";

export function Sparkline({
  values,
  color,
  filled,
}: {
  values: number[];
  color: string;
  filled?: boolean;
}) {
  const width = 300;
  const height = 34;
  if (values.length === 0) return null;
  const stepX = width / (values.length - 1 || 1);
  const points = values.map((v, i) => `${i * stepX},${v}`).join(" L");
  const path = `M${points}`;
  const closed = `${path} L${width},${height} L0,${height}Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="block h-full w-full"
    >
      {filled ? <path d={closed} fill={color} opacity={0.1} /> : null}
      <path d={path} fill="none" stroke={color} strokeWidth={1.5} />
    </svg>
  );
}
