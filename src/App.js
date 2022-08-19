import { useState, useEffect } from "react";
import Timer from "./components/Timer";
import Validator from "./components/Validator";
import Score from "./components/Score";
import "./App.scss";

const App = () => {
  const [startGame, setStartGame] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(localStorage.getItem("bestScore"));
  const [historyScore, setHistoryScore] = useState(
    localStorage.getItem("historyScore")
  );

  const handleStartClick = () => {
    setStartGame(true);
    setShowGameOver(false);
  };

  const handleStopTimer = () => {
    setStartGame(false);
    setShowGameOver(true);
  };

  useEffect(() => {
    if (historyScore)
      localStorage.setItem(
        "bestScore",
        JSON.stringify(Math.max.apply(Math, JSON.parse(historyScore)))
      );
    if (showGameOver) {
      setBestScore(localStorage.getItem("bestScore"));
      setHistoryScore(localStorage.getItem("historyScore"));
    }
  }, [historyScore, showGameOver]);

  return (
    <section className="app">
      <h1 className="title">Palindrome game</h1>
      <div className="main-container">
        <div className="game-container">
          <Timer startGame={startGame} handleStopTimer={handleStopTimer} />
          {showGameOver && <p className="game-over">GAME OVER</p>}
          <Validator
            startGame={startGame}
            showGameOver={showGameOver}
            handleStartClick={handleStartClick}
          />
        </div>        
        <div className="score-container">
          <Score type="best" title="Best score">
            <span>{bestScore || "No best score."}</span>
          </Score>
          <Score type="history" title="History score">
            <ul>
              {historyScore
                ? JSON.parse(historyScore).map((score, index) => {
                    return <li key={index}>{score}</li>;
                  })
                : "No history score."}
            </ul>
          </Score>
        </div>
      </div>
    </section>
  );
};

export default App;
