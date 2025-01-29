import { getRange } from './utils.js';
 
export default class PuzzleCell {
	constructor(rowLeftTops, rowRightTops, colLeftTops, colRightTops, rowIndex, colIndex, lineSize) {
		this.name = `${rowIndex + 1}${colIndex + 1}`;
		this.r = rowIndex;
		this.c = colIndex;
		this.rowKey = `${rowLeftTops}${rowRightTops}`;
		this.colKey = `${colLeftTops}${colRightTops}`;
		this.lineSize = lineSize;
		this.possibleValues = getRange(lineSize);
		this.result = null;
	}

	excludeValues(updatedValues) {
		if (updatedValues.length === this.lineSize) return;
		this.possibleValues = this.possibleValues.map(v => updatedValues.includes(v) ? v : 0);
	}

	calculateResult() {
		const values = this.possibleValues.filter(v => !!v);
		if (values.length === 1) this.result = values[0];
	}

	excludeV(ind) {
		this.possibleValues[ind] = 0;
	}

	calc(updatedValues) {
		if (!updatedValues.length) return;
		this.excludeValues(updatedValues);
		this.calculateResult();	
	}
}