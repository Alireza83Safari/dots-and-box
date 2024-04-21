import React, { useEffect, useState } from "react";
import { checkSquareCompleted } from "../../utils/checkSquareCompleted";
import "./Board.css";
import Score from "../Score/Score";

const Board = () => {
  const players = { blue: "blue", red: "red" };
  const [activePlayer, setActivePlayer] = useState(players["blue"]);
  const rowsAndCols = 5;
  const [selectedLines, setSelectedLines] = useState([
    { line: "", selectedBy: "" },
  ]);

  const [score, setScore] = useState({ red: 0, blue: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [squares, setSquares] = useState([]);

  const handleSelectLine = (event) => {
    const selectLine = event.target;
    const lineId = selectLine.id;

    if (selectedLines.some((line) => line.line === lineId)) {
      alert("Line was already selected");
      return;
    }

    setSelectedLines((prevSelectedLines) => [
      ...prevSelectedLines,
      { line: lineId, selectedBy: activePlayer },
    ]);

    const completedBox = checkSquareCompleted(
      lineId,
      selectedLines,
      activePlayer
    );

    if (completedBox) {
      const newScore = { ...score };
      newScore[completedBox.owner]++;
      setScore(newScore);

      // Store the square
      const updatedSquares = [...squares, completedBox];
      setSquares(updatedSquares);

      // Save the coordinates of the completed square
      const { coordinates } = completedBox;

      // Change the color of the created square
      const [boxRow, boxCol] = coordinates[0];
      const boxElement = document.getElementById(`box-${boxRow}-${boxCol}`);
      boxElement.classList.add(completedBox.owner);

      // Check if the game is over
      if (isGameOver()) {
        setGameOver(true);
      } else {
        // Change the turn
        setActivePlayer(
          activePlayer === players.blue ? players.red : players.blue
        );
      }
    } else {
      // Change the turn
      setActivePlayer(
        activePlayer === players.blue ? players.red : players.blue
      );
    }
  };

  const isGameOver = () => {
    return selectedLines.length === 2 * rowsAndCols * (rowsAndCols - 1);
  };

  useEffect(() => {
    if (isGameOver()) {
      setGameOver(true);
    }
  }, [selectedLines]);

  const rows = Array.from({ length: rowsAndCols }, (_, i) => i + 1);
  const cols = Array.from({ length: rowsAndCols }, (_, i) => i + 1);

  return (
    <section>
      <Score blueScore={score?.blue} redScore={score?.red} />
      <div className="container">
        {rows.map((row) => (
          <React.Fragment key={row}>
            {cols.map((col) => (
              <React.Fragment key={col}>
                <div className="dot"></div>

                {col < rowsAndCols && (
                  <div
                    className={`line-horizontal  ${
                      selectedLines.some((line) => {
                        return (
                          line.line === `h-${row}-${col}` &&
                          line.selectedBy === players.blue
                        );
                      })
                        ? "blue"
                        : selectedLines.some((line) => {
                            return (
                              line.line === `h-${row}-${col}` &&
                              line.selectedBy === players.red
                            );
                          })
                        ? "red"
                        : ""
                    }`}
                    id={`h-${row}-${col}`}
                    onClick={handleSelectLine}
                  ></div>
                )}
              </React.Fragment>
            ))}

            {row < rowsAndCols &&
              cols.map((col) => (
                <React.Fragment key={col}>
                  <div
                    className={`line-vertical  ${
                      selectedLines.some((line) => {
                        return (
                          line.line === `v-${row}-${col}` &&
                          line.selectedBy === players.blue
                        );
                      })
                        ? "blue"
                        : selectedLines.some((line) => {
                            return (
                              line.line === `v-${row}-${col}` &&
                              line.selectedBy === players.red
                            );
                          })
                        ? "red"
                        : ""
                    }`}
                    id={`v-${row}-${col}`}
                    onClick={handleSelectLine}
                  ></div>

                  {col < rowsAndCols && (
                    <div className="box" id={`box-${row}-${col}`}>
                      {squares.some(
                        (square) =>
                          square.coordinates[0][0] === row - 1 &&
                          square.coordinates[0][1] === col - 1
                      ) && (
                        <div
                          className={`box-inner ${
                            squares.find(
                              (square) =>
                                square.coordinates[0][0] === row - 1 &&
                                square.coordinates[0][1] === col - 1
                            ).owner === "red"
                              ? "red"
                              : "blue"
                          }`}
                        ></div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
      </div>
      {gameOver ? (
        <div id="game-status">
          Game over!{" "}
          {score.red === score.blue
            ? "It's a tie!"
            : `Won ${score.red > score.blue ? "Red" : "Blue"}`}
        </div>
      ) : (
        <div id="game-status">
          It's{" "}
          <span
            style={{
              color: activePlayer === players.blue ? "blue" : "red",
              fontWeight: 700,
            }}
          >
            {activePlayer === players.red ? "Red" : "Blue"}
          </span>
          's turn
        </div>
      )}
    </section>
  );
};

export default Board;
