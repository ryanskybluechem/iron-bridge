"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const fmtK = (n: number) => {
  if (Math.abs(n) >= 1_000_000) return "$" + (n / 1_000_000).toFixed(2) + "M";
  if (Math.abs(n) >= 1000) return "$" + (n / 1000).toFixed(1) + "k";
  return "$" + Math.round(n);
};

function CalcLabel({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  return (
    <div className="calc-row">
      <span className="calc-label">{children}</span>
      <span className="calc-value">{value}</span>
    </div>
  );
}

function CalcSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <input
      type="range"
      className="calc-slider"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
    />
  );
}

export function TaxProjectionCalc() {
  const [revenue, setRevenue] = useState(2_400_000);
  const [margin, setMargin] = useState(22);
  const [bracket, setBracket] = useState(35);
  const [planMonth, setPlanMonth] = useState(5);

  const profit = revenue * (margin / 100);
  const baseTax = profit * (bracket / 100);
  const savingsRate = Math.max(
    0,
    0.3 * Math.pow((12 - planMonth) / 11, 1.4)
  );
  const savings = baseTax * savingsRate;
  const netTax = baseTax - savings;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const areaPath = (() => {
    let d = "M 20 170";
    for (let i = 1; i <= 12; i++) {
      const x = 20 + ((i - 1) / 11) * 290;
      const sr = Math.max(0, 0.3 * Math.pow((12 - i) / 11, 1.4));
      const y = 170 - sr * 450;
      d += ` L ${x} ${y}`;
    }
    d += " L 310 170 Z";
    return d;
  })();

  const linePath = (() => {
    let d = "";
    for (let i = 1; i <= 12; i++) {
      const x = 20 + ((i - 1) / 11) * 290;
      const sr = Math.max(0, 0.3 * Math.pow((12 - i) / 11, 1.4));
      const y = 170 - sr * 450;
      d += i === 1 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }
    return d;
  })();

  const indicatorX = 20 + ((planMonth - 1) / 11) * 290;
  const indicatorSr = Math.max(
    0,
    0.3 * Math.pow((12 - planMonth) / 11, 1.4)
  );
  const indicatorY = 170 - indicatorSr * 450;

  return (
    <div className="calc-card calc-tax">
      <div className="calc-header">
        <div className="calc-eyebrow">Calculator 01</div>
        <h3 className="calc-title">Tax Projection Timeline</h3>
        <p className="calc-sub">
          When you project, not what you owe, determines what you save.
        </p>
      </div>

      <div className="calc-body">
        <div className="calc-controls">
          <CalcLabel value={fmtK(revenue)}>Annual revenue</CalcLabel>
          <CalcSlider
            value={revenue}
            onChange={setRevenue}
            min={250_000}
            max={25_000_000}
            step={50_000}
          />

          <CalcLabel value={margin + "%"}>Net margin</CalcLabel>
          <CalcSlider value={margin} onChange={setMargin} min={3} max={45} />

          <CalcLabel value={bracket + "%"}>Effective tax rate</CalcLabel>
          <CalcSlider
            value={bracket}
            onChange={setBracket}
            min={15}
            max={45}
          />

          <CalcLabel value={months[planMonth - 1]}>
            Month you start planning
          </CalcLabel>
          <CalcSlider
            value={planMonth}
            onChange={setPlanMonth}
            min={1}
            max={12}
          />
        </div>

        <div className="calc-viz">
          <svg viewBox="0 0 320 200" className="calc-svg">
            <line
              x1="20"
              y1="170"
              x2="310"
              y2="170"
              stroke="rgba(245,235,220,0.15)"
              strokeWidth="1"
            />
            {months.map((m, i) => {
              const x = 20 + (i / 11) * 290;
              const isActive = i + 1 === planMonth;
              return (
                <g key={m}>
                  <line
                    x1={x}
                    y1="170"
                    x2={x}
                    y2="174"
                    stroke="rgba(245,235,220,0.2)"
                  />
                  {(i % 2 === 0 || isActive) && (
                    <text
                      x={x}
                      y="186"
                      fill={isActive ? "#d97757" : "rgba(245,235,220,0.45)"}
                      fontSize="8"
                      textAnchor="middle"
                      fontFamily="ui-monospace, monospace"
                    >
                      {m.toUpperCase()}
                    </text>
                  )}
                </g>
              );
            })}

            <path d={areaPath} fill="url(#tax-grad)" opacity="0.5" />
            <path
              d={linePath}
              fill="none"
              stroke="#d97757"
              strokeWidth="1.5"
            />

            <g>
              <line
                x1={indicatorX}
                y1="20"
                x2={indicatorX}
                y2="170"
                stroke="rgba(217,119,87,0.3)"
                strokeDasharray="2 3"
              />
              <circle cx={indicatorX} cy={indicatorY} r="5" fill="#d97757" />
              <circle
                cx={indicatorX}
                cy={indicatorY}
                r="9"
                fill="none"
                stroke="#d97757"
                strokeOpacity="0.4"
              />
            </g>

            <defs>
              <linearGradient id="tax-grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#d97757" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#d97757" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="calc-readout">
            <div className="readout-row">
              <span>Projected liability</span>
              <span className="readout-strike">{fmt(baseTax)}</span>
            </div>
            <div className="readout-row readout-primary">
              <span>With strategy</span>
              <span>{fmt(netTax)}</span>
            </div>
            <div className="readout-savings">
              <span className="savings-label">You keep</span>
              <span className="savings-amt">{fmt(savings)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RunwayCalc() {
  const [cash, setCash] = useState(450_000);
  const [revenue, setRevenue] = useState(180_000);
  const [costs, setCosts] = useState(225_000);
  const [growth, setGrowth] = useState(4);

  const months = 24;
  const series = useMemo(() => {
    const out: { month: number; balance: number; revenue: number }[] = [];
    let bal = cash;
    let rev = revenue;
    for (let i = 0; i <= months; i++) {
      out.push({ month: i, balance: bal, revenue: rev });
      bal += rev - costs;
      rev *= 1 + growth / 100;
    }
    return out;
  }, [cash, revenue, costs, growth]);

  const breakEvenMonth = series.findIndex((s) => s.revenue >= costs);
  const zeroMonth = series.findIndex((s) => s.balance < 0);
  const runway = zeroMonth === -1 ? "24+" : zeroMonth;

  const maxBal = Math.max(...series.map((s) => s.balance), cash);
  const minBal = Math.min(...series.map((s) => s.balance), 0);
  const range = maxBal - minBal || 1;

  const W = 320;
  const H = 180;
  const PAD = 20;
  const xFor = (i: number) => PAD + (i / months) * (W - PAD * 2);
  const yFor = (v: number) =>
    H - PAD - ((v - minBal) / range) * (H - PAD * 2);
  const yZero = yFor(0);

  const balPath = series
    .map(
      (s, i) =>
        `${i === 0 ? "M" : "L"} ${xFor(i).toFixed(2)} ${yFor(s.balance).toFixed(
          2
        )}`
    )
    .join(" ");
  const balArea =
    balPath + ` L ${xFor(months)} ${yZero} L ${xFor(0)} ${yZero} Z`;

  return (
    <div className="calc-card calc-runway">
      <div className="calc-header">
        <div className="calc-eyebrow">Calculator 02</div>
        <h3 className="calc-title">Cash Flow Runway</h3>
        <p className="calc-sub">
          Project liquidity 24 months out before you need to raise, cut, or
          scale.
        </p>
      </div>

      <div className="calc-body">
        <div className="calc-controls">
          <CalcLabel value={fmtK(cash)}>Cash on hand</CalcLabel>
          <CalcSlider
            value={cash}
            onChange={setCash}
            min={50_000}
            max={5_000_000}
            step={10_000}
          />

          <CalcLabel value={fmtK(revenue) + "/mo"}>Monthly revenue</CalcLabel>
          <CalcSlider
            value={revenue}
            onChange={setRevenue}
            min={20_000}
            max={2_000_000}
            step={5_000}
          />

          <CalcLabel value={fmtK(costs) + "/mo"}>Monthly burn</CalcLabel>
          <CalcSlider
            value={costs}
            onChange={setCosts}
            min={20_000}
            max={2_500_000}
            step={5_000}
          />

          <CalcLabel value={growth + "%/mo"}>Revenue growth</CalcLabel>
          <CalcSlider
            value={growth}
            onChange={setGrowth}
            min={-5}
            max={20}
            step={0.5}
          />
        </div>

        <div className="calc-viz">
          <svg viewBox={`0 0 ${W} ${H}`} className="calc-svg">
            <defs>
              <linearGradient id="runway-pos" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#5b8def" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#5b8def" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="runway-neg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#d97757" stopOpacity="0" />
                <stop offset="100%" stopColor="#d97757" stopOpacity="0.4" />
              </linearGradient>
              <clipPath id="clip-pos">
                <rect x="0" y="0" width={W} height={yZero} />
              </clipPath>
              <clipPath id="clip-neg">
                <rect x="0" y={yZero} width={W} height={H} />
              </clipPath>
            </defs>

            <path
              d={balArea}
              fill="url(#runway-pos)"
              clipPath="url(#clip-pos)"
            />
            <path
              d={balArea}
              fill="url(#runway-neg)"
              clipPath="url(#clip-neg)"
            />

            <line
              x1={PAD}
              y1={yZero}
              x2={W - PAD}
              y2={yZero}
              stroke="rgba(245,235,220,0.2)"
              strokeDasharray="2 3"
            />

            <path
              d={balPath}
              fill="none"
              stroke="#5b8def"
              strokeWidth="1.75"
              clipPath="url(#clip-pos)"
            />
            <path
              d={balPath}
              fill="none"
              stroke="#d97757"
              strokeWidth="1.75"
              clipPath="url(#clip-neg)"
            />

            {breakEvenMonth > 0 && breakEvenMonth < months && (
              <g>
                <circle
                  cx={xFor(breakEvenMonth)}
                  cy={yFor(series[breakEvenMonth].balance)}
                  r="3"
                  fill="#f5ebdc"
                />
                <text
                  x={xFor(breakEvenMonth)}
                  y={yFor(series[breakEvenMonth].balance) - 8}
                  fill="#f5ebdc"
                  fontSize="8"
                  textAnchor="middle"
                  fontFamily="ui-monospace, monospace"
                >
                  BREAK-EVEN M{breakEvenMonth}
                </text>
              </g>
            )}

            {[0, 6, 12, 18, 24].map((m) => (
              <text
                key={m}
                x={xFor(m)}
                y={H - 4}
                fill="rgba(245,235,220,0.4)"
                fontSize="8"
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
              >
                M{m}
              </text>
            ))}
          </svg>

          <div className="calc-readout">
            <div className="readout-row">
              <span>Runway</span>
              <span className="readout-primary-inline">{runway} months</span>
            </div>
            <div className="readout-row">
              <span>Ending balance (M24)</span>
              <span>{fmtK(series[months].balance)}</span>
            </div>
            <div className="readout-row">
              <span>Break-even month</span>
              <span>
                {breakEvenMonth > 0
                  ? `M${breakEvenMonth}`
                  : series[months].revenue >= costs
                  ? `M${months}+`
                  : "Not reached"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EntityCalc() {
  const [profit, setProfit] = useState(380_000);
  const [salary, setSalary] = useState(120_000);
  const [stateRate, setStateRate] = useState(5);

  const fed = (income: number) => {
    const brackets: [number, number][] = [
      [11600, 0.1],
      [47150, 0.12],
      [100525, 0.22],
      [191950, 0.24],
      [243725, 0.32],
      [609350, 0.35],
      [Infinity, 0.37],
    ];
    let tax = 0;
    let prev = 0;
    for (const [cap, rate] of brackets) {
      if (income > cap) {
        tax += (cap - prev) * rate;
        prev = cap;
      } else {
        tax += (income - prev) * rate;
        break;
      }
    }
    return Math.max(0, tax);
  };

  const seTax =
    Math.min(profit, 168_600) * 0.153 +
    Math.max(0, profit - 168_600) * 0.029;
  const llcIncomeTax = fed(profit - seTax / 2) + profit * (stateRate / 100);
  const llcTotal = seTax + llcIncomeTax;

  const fica = Math.min(salary, 168_600) * 0.153;
  const sCorpIncome = profit - fica / 2;
  const sCorpTotal =
    fica + fed(sCorpIncome) + sCorpIncome * (stateRate / 100);

  const corpTax = profit * 0.21;
  const distributable = profit - corpTax;
  const dividendTax = distributable * 0.15;
  const cCorpTotal = corpTax + dividendTax + profit * (stateRate / 100) * 0.5;

  const max = Math.max(llcTotal, sCorpTotal, cCorpTotal);
  const min = Math.min(llcTotal, sCorpTotal, cCorpTotal);
  const winner = (
    [
      ["LLC", llcTotal],
      ["S-Corp", sCorpTotal],
      ["C-Corp", cCorpTotal],
    ] as [string, number][]
  ).sort((a, b) => a[1] - b[1])[0];

  const Bar = ({
    label,
    value,
    color,
  }: {
    label: string;
    value: number;
    color: string;
  }) => {
    const pct = (value / max) * 100;
    const isWinner = value === min;
    return (
      <div className={"entity-bar " + (isWinner ? "entity-winner" : "")}>
        <div className="entity-bar-head">
          <span className="entity-bar-label">{label}</span>
          <span className="entity-bar-amt">{fmtK(value)}</span>
        </div>
        <div className="entity-bar-track">
          <div
            className="entity-bar-fill"
            style={{ width: pct + "%", background: color }}
          />
        </div>
        <div className="entity-bar-take">
          Take-home: <strong>{fmtK(profit - value)}</strong>
        </div>
      </div>
    );
  };

  return (
    <div className="calc-card calc-entity">
      <div className="calc-header">
        <div className="calc-eyebrow">Calculator 03</div>
        <h3 className="calc-title">Entity Structure Comparator</h3>
        <p className="calc-sub">
          The same business, the same profit — three very different tax
          bills.
        </p>
      </div>

      <div className="calc-body">
        <div className="calc-controls">
          <CalcLabel value={fmtK(profit)}>Annual net profit</CalcLabel>
          <CalcSlider
            value={profit}
            onChange={setProfit}
            min={75_000}
            max={2_000_000}
            step={5_000}
          />

          <CalcLabel value={fmtK(salary)}>
            Reasonable salary (S-Corp)
          </CalcLabel>
          <CalcSlider
            value={salary}
            onChange={setSalary}
            min={50_000}
            max={Math.min(profit, 400_000)}
            step={5_000}
          />

          <CalcLabel value={stateRate + "%"}>State tax rate</CalcLabel>
          <CalcSlider
            value={stateRate}
            onChange={setStateRate}
            min={0}
            max={13}
            step={0.25}
          />
        </div>

        <div className="calc-viz entity-viz">
          <Bar label="Sole Proprietor / LLC" value={llcTotal} color="#7a8294" />
          <Bar label="S-Corporation" value={sCorpTotal} color="#5b8def" />
          <Bar label="C-Corporation" value={cCorpTotal} color="#d97757" />

          <div className="entity-winner-callout">
            <div className="winner-arrow">→</div>
            <div>
              <div className="winner-label">Optimal structure</div>
              <div className="winner-value">
                {winner[0]} · save {fmtK(max - min)}/yr
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
