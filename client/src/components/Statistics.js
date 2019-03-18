import React, { useEffect, useState } from "react";
import Api from "../Api";
import "./Statistics.css";

export default function Statistics({ playerId }) {
  const [stats, setStats] = useState({
    games: 0,
    name: "",
    rating: 0,
    wins: 0
  });

  useEffect(() => {
    Api.getPlayerStatistics(playerId).then(statistics => setStats(statistics));
  }, []);

  const winRatioPercent = () => {
    const winRatio = stats.wins / Math.max(stats.games, 1);
    return Number(winRatio * 100).toFixed(1);
  };

  return (
    <section className="statistics">
      <h2>{stats.name}</h2>
      <ul className="statistics__list">
        <li>Rating: {stats.rating}</li>
        <li>Games played: {stats.games}</li>
        <li>Win percentage: {winRatioPercent()}%</li>
      </ul>
    </section>
  );
}
