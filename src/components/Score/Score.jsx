import React from "react";
import "./Score.css";

const Score = ({ redScore, blueScore }) => {
  return (
    <section className="score-container">
      <div className="score-box red">{redScore}</div>
      <div className="score-box blue">{blueScore}</div>
    </section>
  );
};

export default Score;
