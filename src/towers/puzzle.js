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

  	this.iterationKey = null;
  	this.loopCount = 0;
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
		const values = this.getLineCells(cell, line)
			.map(c => c.possibleValues);
		const zeroInd = sumArraysValues(values)
			.findIndex(v => v === 0);
		return zeroInd !== -1 ? cell.possibleValues[zeroInd] : null;  
	}

	getNextCellValues(cell, line) {
		const { rowKey, colKey, r, c } = cell;
		return line === 'r'
			? this.lookupTable.findPossibleValues(rowKey, c, this.result.getRow(r))
			: this.lookupTable.findPossibleValues(colKey, r, this.result.getCol(c))
	}

	resolveCell(cell, ind) {
		this.result.setValue(cell.r, cell.c, cell.result);    
		this.cells.splice(ind, 1);
	}

	iterate(cell, i) {
		cell.calc( this.getNextCellValues(cell, 'r') );
		cell.calc( this.getNextCellValues(cell, 'c') );

		if (cell.result) {
			this.resolveCell(cell, i);
			this.excludePossibleValueFromAdjacentCells(cell);
		} else {

			let value = this.calcCellValueFromLineCells(cell, 'r');
			if (!value) value = this.calcCellValueFromLineCells(cell, 'c');
			if (value) {
				cell.result = value;
				this.resolveCell(cell, i);
				this.excludePossibleValueFromAdjacentCells(cell);
			}
		}
	}

	iterateFurther() {
		for (let i = 0; i < this.cells.length; i += 1) {
			const cell = this.cells[i];
			const nonZeroValues = cell.possibleValues.filter(c => !!c);
			if (nonZeroValues.length) {
				cell.result = nonZeroValues[0];
				this.resolveCell(cell, i);
				this.excludePossibleValueFromAdjacentCells(cell);
				break;
			}
		}
	}

	countIdenticalLoops() {
		const iterationKey = cellsDataToStr(this.cells);
		if (iterationKey === this.iterationKey) {
			this.loopCount += 1;
		} else {
			this.loopCount = 0;
		}
		this.iterationKey = iterationKey;
	}


	solve() {
		let counter = 0;
		while (this.cells.length) {
			counter++;

			for (let i = 0; i < this.cells.length; i += 1) {
				this.iterate(this.cells[i], i);

				if (i === this.cells.length - 1) {
					if (this.loopCount > 0) {
						// There are no more solutions - INFINITE LOOP!
						this.iterateFurther();
					}
				}
			}

			if (counter >= 10) {
				console.log('INFINITE LOOP!', counter);
				return;
			}

			this.countIdenticalLoops();
		}
	}
}


function cellsDataToStr(cells) {
	let result = '';
	const values = [];
	for (let c of cells) {
		result += c.name;
		values.push(c.possibleValues);
	}
	if (values.length) {
		result += sumArraysValues(values).join('');
	}

	return result;
}