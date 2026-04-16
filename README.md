# sudoku-puzzle-generator

Generate printable Sudoku puzzles with multiple difficulty levels in JavaScript.

[Live Demo → Sudoku Printable](https://sudokuprintable.me)

## Features

- Generate valid Sudoku puzzles (9x9)
- Multiple difficulty levels: Easy, Medium, Hard, Expert
- Puzzle validation and solving
- SVG/HTML output for printing
- Unique solutions guaranteed
- Batch puzzle generation

## Installation

```bash
npm install sudoku-puzzle-generator
```

## Usage

```javascript
const { generatePuzzle, solvePuzzle, validatePuzzle } = require('sudoku-puzzle-generator');

// Generate an easy puzzle
const puzzle = generatePuzzle('easy');
console.log(puzzle.grid); // 9x9 array (0 = empty)

// Solve a puzzle
const solution = solvePuzzle(puzzle.grid);
console.log(solution); // Solved 9x9 array

// Validate a completed puzzle
const isValid = validatePuzzle(solution);
console.log(isValid); // true
```

## Live Demo

Try the full-featured [Sudoku Printable](https://sudokuprintable.me) generator online.

## License

MIT
