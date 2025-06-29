'use client';
import { useState } from "react";

export default function RateRecommender() {
  const [baseRate, setBaseRate] = useState(99.50);
  const [volatility, setVolatility] = useState(0.03);
  const [marketShift, setMarketShift] = useState("stable");
  const [alertEvent, setAlertEvent] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const generateRates = () => {
    const adj =
      alertEvent && marketShift === "low"
        ? -0.15
        : alertEvent && marketShift === "high"
        ? 0.10
        : 0.00;

    const rates = Array.from({ length: 5 }, () => {
      const jitter = Math.random() * 2 * volatility - volatility;
      return (baseRate + adj + jitter).toFixed(3);
    });
    setRecommendations(rates);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">입찰 사정률 추천기</h2>

      <div className="space-y-2">
        <label className="block font-medium">기준 사정률 (%)</label>
        <input
          type="number"
          value={baseRate}
          onChange={(e) => setBaseRate(parseFloat(e.target.value))}
          step="0.001"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">변동성 (±%)</label>
        <input
          type="number"
          value={volatility}
          onChange={(e) => setVolatility(parseFloat(e.target.value))}
          step="0.001"
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">시장 변화</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={marketShift}
          onChange={(e) => setMarketShift(e.target.value)}
        >
          <option value="stable">안정적</option>
          <option value="low">낮아지는 추세</option>
          <option value="high">높아지는 추세</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={alertEvent}
          onChange={() => setAlertEvent(!alertEvent)}
        />
        <label>시장 급변 감지</label>
      </div>

      <button
        onClick={generateRates}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        추천 사정률 계산
      </button>

      {recommendations.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold">추천 사정률 리스트:</p>
          <ul className="list-disc list-inside mt-2">
            {recommendations.map((rate, idx) => (
              <li key={idx}>{rate} %</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
