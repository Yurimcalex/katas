import LookupTable from './lookupTable.js';
import PuzzleResult from './puzzleResult.js';
import PuzzleCell from './puzzleCell.js';

class Puzzle {
	constructor(n, clues) {
  	this.result = new PuzzleResult(n);
  	this.lookupTable = new LookupTable(n);
  	this.cells = [];
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

	excludeVariant(cell) {
		const cells = this.cells.filter(c => c !== cell && cell.r === c.r || cell.c === c.c);
		cells.forEach(c => {
			const ind = c.variants.findIndex(v => v === cell.result);
			if (ind !== -1) c.variants[ind] = 0;
		});
	}

	checkVariant(cell) {
		const rowCells = this.cells.filter(c => c !== cell && cell.r === c.r).map(c => c.variants);
		const colCells =  this.cells.filter(c => c !== cell && cell.c === c.c).map(c => c.variants);
		
		let result = getInd(rowCells);
		if (result) return result;
		result = getInd(colCells);
		if (result) return result;
		
		function getInd(arrs) {
			let result = [...arrs[0]];
			arrs.shift();
			for (let arr of arrs) {
				for (let i = 0; i < arr.length; i += 1) {
					result[i] += arr[i];
				}
			}
			for (let i = 0; i < result.length; i += 1) {
				if (result[i] === 0) {
					return cell.variants[i]; 
				};
			}
			return 0;
		}
	}

	solve() {
		while (this.cells.length) {
			for (let i = 0; i < this.cells.length; i += 1) {
				let cell = this.cells[i];

				const { rowKey, colKey, r, c } = cell;
				const rowVariants = this.lookupTable.findVariants(rowKey, c, this.result.getRow(r));
				const colVariants = this.lookupTable.findVariants(colKey, r, this.result.getCol(c));
				cell.calc(rowVariants);
				cell.calc(colVariants);

				if (cell.result) {
					this.result.setValue(r, c, cell.result);
					this.cells.splice(i, 1);
					this.excludeVariant(cell);
				} else {
	
					const result = this.checkVariant(cell);
					if (result) {
						cell.result = result;
						this.result.setValue(r, c, cell.result);
						this.cells.splice(i, 1);
						this.excludeVariant(cell);
					}
				}
			}
		}
	}
}

console.time('start');
const clues = [0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0];
const puzzle = new Puzzle(4, clues);
puzzle.solve();
puzzle.result.table.forEach(line => console.log(line));
console.timeEnd('start');

// const table = new LookupTable(4);
// const variants = table.findVariants('00', 2, [0, 0, 0, 0]);
// console.log(variants);

// const result = new PuzzleResult(1, 4);
// result.setValue(1, 1, 4);
// console.log(result);

// const cell = new PuzzleCell(0, 0, 0, 0, 0, 0, [1, 2, 3, 4]);
// cell.exclude([3, 4]);
// console.log(cell);

// function calc(arrs) {
// 	let result = arrs[0];
// 	arrs.shift();
// 	for (let arr of arrs) {
// 		for (let i = 0; i < arr.length; i += 1) {
// 			result[i] += arr[i];
// 		}
// 	}
	
// 	for (let i = 0; i < result.length; i += 1) {
// 		if (result[i] === 0) return i;
// 	}
// 	return -1;
// }

// console.log(calc([[1, 1, 2, 0], [0, 0, 2, 0], [0, 0, 2, 0]]));