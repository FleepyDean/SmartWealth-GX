import React from 'react';

/**
 * Multi-segment ring chart for predicted spend.
 * `segments` = [{ key, value, color }]
 */
export default function BudgetDonut({
  segments,
  total,
  size = 200,
  stroke = 18,
  centerLabel = 'estimated total',
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const sum = segments.reduce((s, x) => s + x.value, 0) || 1;
  let offset = 0;

  // Scale the centered total to fit the ring size.
  const valueSize = Math.max(11, Math.round(size * 0.13));
  const labelSize = Math.max(9, Math.round(size * 0.055));

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
          fill="none"
        />
        {segments.map((seg) => {
          const len = (seg.value / sum) * c;
          const dasharray = `${len} ${c - len}`;
          const dashoffset = -offset;
          offset += len;
          return (
            <circle
              key={seg.key}
              cx={size / 2}
              cy={size / 2}
              r={r}
              stroke={seg.color}
              strokeWidth={stroke}
              strokeLinecap="butt"
              fill="none"
              strokeDasharray={dasharray}
              strokeDashoffset={dashoffset}
              style={{ transition: 'stroke-dasharray 400ms ease, stroke-dashoffset 400ms ease' }}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <p style={{ fontSize: valueSize }} className="font-bold tracking-tight">
          RM{total}
        </p>
        {centerLabel && (
          <p style={{ fontSize: labelSize }} className="text-text-muted mt-1">
            {centerLabel}
          </p>
        )}
      </div>
    </div>
  );
}
