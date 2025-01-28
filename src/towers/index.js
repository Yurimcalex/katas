import LookupTable from './lookupTable.js';
import PuzzleResult from './puzzleResult.js';
import PuzzleCell from './puzzleCell.js';
import { sumArraysValues } from './utils.js';

class Puzzle {
	constructor(size, clues) {
  	this.result = new PuzzleResult(size);
  	this.lookupTable = new LookupTable(size);
  	this.cells = [];
  	this.init(size, clues);
	}

	init(size, clues) {
		let r = 0, c = 0;
		for (let i = 0; i < clues.length; i += 1) {
			const cell = new PuzzleCell(
				clues[size * size - 1 - r],
				clues[size + r],
				clues[c],
				clues[size * (size - 1) - 1 - c],
				r,
				c,
				size
			);
			this.cells.push(cell);
			c += 1;
			if (c === size) {
				c = 0;
				r += 1;
			}
		}
	}

	getAdjacentCells(cell) {
		return this.cells.filter(c => c !== cell && cell.r === c.r || cell.c === c.c);
	}

	getLineCells(cell, line) {
		return this.cells.filter(c => c !== cell && cell[line] === c[line]); 
	}

	excludeCellPossibleValue(cell) {
		const adjacentCells = this.getAdjacentCells(cell);
		for (let c of adjacentCells) {
			c.possibleValues[cell.result - 1] = 0;
		}
	}

	getOnlyPossibleValue(cell) {
		const rowValues = this.getLineCells(cell, 'r').map(c => c.possibleValues);
		const rowInd = sumArraysValues(rowValues).findIndex(v => v === 0);
		if (rowInd !== -1) return cell.possibleValues[rowInd];
		const colValues = this.getLineCells(cell, 'c').map(c => c.possibleValues);
		const colInd = sumArraysValues(colValues).findIndex(v => v === 0);
		if (colInd !== -1) return cell.possibleValues[colInd];
	}

	solve() {
		while (this.cells.length) {
			for (let i = 0; i < this.cells.length; i += 1) {
				let cell = this.cells[i];
				const { rowKey, colKey, r, c } = cell;
				
				const rowValues = this.lookupTable.findPossibleValues(rowKey, c, this.result.getRow(r));
				const colValues = this.lookupTable.findPossibleValues(colKey, r, this.result.getCol(c));
				cell.calc(rowValues);
				cell.calc(colValues);

				if (cell.result) {
					this.result.setValue(r, c, cell.result);
					this.cells.splice(i, 1);
					this.excludeCellPossibleValue(cell);

				} else {
					const result = this.getOnlyPossibleValue(cell);
					if (result) {
						cell.result = result;
						this.result.setValue(r, c, cell.result);
						this.cells.splice(i, 1);
						this.excludeCellPossibleValue(cell);
					}
				}
			}
		}
	}
}

console.time('start');
//for (let i = 0; i < 1000; i += 1) {
	const clues = [0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0];
	const puzzle = new Puzzle(4, clues);
	puzzle.solve();
//}
console.timeEnd('start');
puzzle.result.table.forEach(line => console.log(line));
