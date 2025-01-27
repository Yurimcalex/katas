import LookupTable from './lookupTable.js';
import PuzzleResult from './puzzleResult.js';
import PuzzleCell from './puzzleCell.js';

class Puzzle {
	constructor(n, clues) {
  	this.result = new PuzzleResult(n);
  	this.lookupTable = new LookupTable(n);
  	this.cells = [];
  	this.couner = n * n;
  	this.solvedCells = [];
  	this.init(n, clues);
	}

	getInitialCellVariants(n) {
		const result = [];
		for (let i = 0; i < n; i += 1) {
			result.push(i + 1);
		}
		return result;
	}

	init(n, clues) {
		let r = 0, c = 0;
		for (let i = 0; i < clues.length; i += 1) {
			const cell = new PuzzleCell(
				clues[n * n - 1 - r],
				clues[n + r],
				clues[c],
				clues[n * (n - 1) - 1 - c],
				r,
				c,
				this.getInitialCellVariants(n)
			);
			this.cells.push(cell);
			c += 1;
			if (c === n) {
				c = 0;
				r += 1;
			}
		}
	}
}


const clues = [0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0];
const puzzle = new Puzzle(4, clues);
console.log(puzzle);


// const table = new LookupTable(1, 4);
// const variants = table.findVariants('00', 0, [0, 0, 0, 0]);
// console.log(variants);

// const result = new PuzzleResult(1, 4);
// result.setValue(1, 1, 4);
// console.log(result);

// const cell = new PuzzleCell(0, 0, 0, 0, 0, 0, [1, 2, 3, 4]);
// cell.exclude([3, 4]);
// console.log(cell);