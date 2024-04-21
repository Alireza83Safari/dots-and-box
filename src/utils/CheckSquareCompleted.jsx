export const checkSquareCompleted = (lineId, selectedLines, activePlayer) => {
  const parts = lineId.split("-");
  const align = parts[0];
  const row = parseInt(parts[1]);
  const col = parseInt(parts[2]);
  const selectedLinesCopy = [...selectedLines];

  let completedBox = null;

  // Check the top line
  if (
    align === "h" &&
    ((selectedLinesCopy.some((line) => line.line === `h-${row - 1}-${col}`) &&
      selectedLinesCopy.some((line) => line.line === `v-${row - 1}-${col}`)) ||
      (selectedLinesCopy.some((line) => line.line === `h-${row - 1}-${col}`) &&
        selectedLinesCopy.some(
          (line) => line.line === `v-${row - 1}-${col + 1}`
        )))
  ) {
    completedBox = {
      owner: activePlayer,
      coordinates: [
        [row - 1, col],
        [row - 1, col + 1],
        [row, col],
        [row, col + 1],
      ],
    };
  }

  // Check the bottom line
  if (
    align === "h" &&
    ((selectedLinesCopy.some((line) => line.line === `h-${row}-${col}`) &&
      selectedLinesCopy.some((line) => line.line === `v-${row}-${col}`) &&
      selectedLinesCopy.some((line) => line.line === `v-${row}-${col + 1}`)) ||
      (selectedLinesCopy.some((line) => line.line === `h-${row}-${col}`) &&
        selectedLinesCopy.some((line) => line.line === `v-${row}-${col + 1}`) &&
        selectedLinesCopy.some(
          (line) => line.line === `h-${row - 1}-${col + 1}`
        )))
  ) {
    completedBox = {
      owner: activePlayer,
      coordinates: [
        [row, col],
        [row, col + 1],
        [row + 1, col],
        [row + 1, col + 1],
      ],
    };
  }

  // Check the left line
  if (
    align === "v" &&
    ((selectedLinesCopy.some((line) => line.line === `v-${row}-${col - 1}`) &&
      selectedLinesCopy.some(
        (line) => line.line === `h-${row - 1}-${col - 1}`
      ) &&
      selectedLinesCopy.some((line) => line.line === `h-${row}-${col - 1}`)) ||
      (selectedLinesCopy.some((line) => line.line === `v-${row}-${col}`) &&
        selectedLinesCopy.some((line) => line.line === `h-${row - 1}-${col}`) &&
        selectedLinesCopy.some((line) => line.line === `h-${row}-${col - 1}`)))
  ) {
    completedBox = {
      owner: activePlayer,
      coordinates: [
        [row, col - 1],
        [row, col],
        [row - 1, col - 1],
        [row - 1, col],
      ],
    };
  }

  // Check the right line
  if (
    align === "v" &&
    ((selectedLinesCopy.some((line) => line.line === `v-${row}-${col}`) &&
      selectedLinesCopy.some((line) => line.line === `h-${row - 1}-${col}`) &&
      selectedLinesCopy.some((line) => line.line === `h-${row}-${col + 1}`)) ||
      (selectedLinesCopy.some((line) => line.line === `v-${row}-${col}`) &&
        selectedLinesCopy.some((line) => line.line === `h-${row}-${col}`) &&
        selectedLinesCopy.some(
          (line) => line.line === `h-${row - 1}-${col + 1}`
        )))
  ) {
    completedBox = {
      owner: activePlayer,
      coordinates: [
        [row, col],
        [row, col + 1],
        [row - 1, col],
        [row - 1, col + 1],
      ],
    };
  }

  return completedBox;
};
