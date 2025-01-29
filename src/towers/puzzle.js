import LookupTable from './lookupTable.js';
import PuzzleResult from './puzzleResult.js';
import PuzzleCell from './puzzleCell.js';
import { sumArraysValues } from './utils.js';


export default class Puzzle {
	constructor(size, clues) {
  	this.result = new PuzzleResult(size);
  	this.lookupTable = new LookupTable(size);
  	this.cells = [];
  	this.init(size, clues);
	}

	init(size, clues) {
		let r = 0, c = 0;
		for (let i = 0; i < size * size; i += 1) {
			const cell = new PuzzleCell(
				clues[size * 4 - r - 1],
				clues[size + r],
				clues[c],
				clues[size * 3 - c - 1],
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

	excludePossibleValueFromAdjacentCells(cell) {
		const adjacentCells = this.getAdjacentCells(cell);
		for (let c of adjacentCells) {
			c.excludeV(cell.result - 1);
		}
	}

	calcCellValueFromLineCells(cell, line) {
		const values = this.getLineCells(cell, line).map(c => c.possibleValues);
		const zeroInd = sumArraysValues(values).findIndex(v => v === 0);
		return zeroInd !== -1 ? cell.possibleValues[zeroInd] : null;  
	}

	getNext

	solve() {
		let counter = 0;
		while (this.cells.length) {
			counter++;
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
					this.excludePossibleValueFromAdjacentCells(cell);

				} else {
					let value = this.calcCellValueFromLineCells(cell, 'r');
					if (!value) value = this.calcCellValueFromLineCells(cell, 'c');

					if (value) {
						cell.result = value;
						this.result.setValue(r, c, cell.result);
						this.cells.splice(i, 1);
						this.excludePossibleValueFromAdjacentCells(cell);
					}
				}
			}
			if (counter >= 1000) {
				console.log('COUNTER!');
				return;
			}
		}
	}
}