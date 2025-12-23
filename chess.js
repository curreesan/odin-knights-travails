// Helper to stringify [x,y] to "x,y" for sets and maps
function stringify(pos) {
  return `${pos[0]},${pos[1]}`;
}

// Helper to parse "x,y" back to [x,y]
function parse(str) {
  return str.split(",").map(Number);
}

// Get all valid knight moves from a position
function getKnightMoves([x, y]) {
  const deltas = [
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
  ];
  const moves = [];
  for (const [dx, dy] of deltas) {
    const newX = x + dx;
    const newY = y + dy;
    if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7) {
      moves.push([newX, newY]);
    }
  }
  return moves;
}

// Reconstruct the path from cameFrom map
function reconstructPath(cameFrom, start, end) {
  const path = [];
  let current = stringify(end);
  const startStr = stringify(start);
  while (current !== startStr) {
    path.push(parse(current));
    current = cameFrom[current];
    if (!current) {
      return null; // No path, but shouldn't happen
    }
  }
  path.push(start);
  return path.reverse();
}

// BFS to find shortest path
function bfs(start, end) {
  const queue = [];
  queue.push(start);
  const visited = new Set();
  visited.add(stringify(start));
  const cameFrom = {};

  while (queue.length > 0) {
    const current = queue.shift();
    if (current[0] === end[0] && current[1] === end[1]) {
      return reconstructPath(cameFrom, start, end);
    }

    const neighbors = getKnightMoves(current);
    for (const neighbor of neighbors) {
      const neighStr = stringify(neighbor);
      if (!visited.has(neighStr)) {
        visited.add(neighStr);
        cameFrom[neighStr] = stringify(current);
        queue.push(neighbor);
      }
    }
  }
  return null; // No path found
}

// Main function
function knightMoves(start, end) {
  // Basic validation (optional)
  if (
    !Array.isArray(start) ||
    !Array.isArray(end) ||
    start.length !== 2 ||
    end.length !== 2 ||
    start[0] < 0 ||
    start[0] > 7 ||
    start[1] < 0 ||
    start[1] > 7 ||
    end[0] < 0 ||
    end[0] > 7 ||
    end[1] < 0 ||
    end[1] > 7
  ) {
    throw new Error("Invalid positions: Must be [x,y] where x,y are 0-7");
  }

  const path = bfs(start, end);
  if (!path) {
    console.log("No path found!");
    return null;
  }

  const moves = path.length - 1;
  console.log(
    `You made it in ${moves} ${
      moves === 1 ? "move" : "moves"
    }! Here's your path:`
  );
  for (const pos of path) {
    console.log(`[ ${pos[0]}, ${pos[1]} ]`); // Formatted as per project
  }

  return path;
}

// Test examples
knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [3, 3]);
knightMoves([0, 0], [7, 7]);
