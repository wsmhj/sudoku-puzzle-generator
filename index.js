/**
 * sudoku-puzzle-generator
 * Generate and solve Sudoku puzzles
 * Live demo: https://sudokuprintable.me
 */

'use strict';

function isValid(grid, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (grid[i][j] === num) return false;
    }
  }
  return true;
}

function solvePuzzle(grid) {
  const board = grid.map(row => [...row]);
  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
          for (const num of nums) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve()) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  if (solve()) return board;
  return null;
}

function generatePuzzle(difficulty = 'medium') {
  const clues = { easy: 40, medium: 32, hard: 26, expert: 20 };
  const numClues = clues[difficulty] || 32;
  const empty = Array.from({ length: 9 }, () => Array(9).fill(0));
  const solved = solvePuzzle(empty);
  const puzzle = solved.map(row => [...row]);
  let removed = 0;
  const toRemove = 81 - numClues;
  while (removed < toRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  return { grid: puzzle, solution: solved, difficulty, clues: numClues };
}

function validatePuzzle(grid) {
  for (let i = 0; i < 9; i++) {
    const row = new Set(grid[i].filter(n => n > 0));
    const col = new Set(grid.map(r => r[i]).filter(n => n > 0));
    if (row.size !== 9 || col.size !== 9) return false;
    const boxRow = Math.floor(i / 3) * 3;
    const boxCol = (i % 3) * 3;
    const box = new Set();
    for (let r = boxRow; r < boxRow + 3; r++) {
      for (let c = boxCol; c < boxCol + 3; c++) {
        box.add(grid[r][c]);
      }
    }
    if (box.size !== 9) return false;
  }
  return true;
}

module.exports = { generatePuzzle, solvePuzzle, validatePuzzle };
