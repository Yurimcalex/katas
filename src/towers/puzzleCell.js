export default class PuzzleCell {
	constructor(rowLeftTops, rowRightTops, colLeftTops, colRightTops, rowIndex, colIndex, lineSize) {
		this.name = `${rowIndex}${colIndex}`;
		this.r = rowIndex;
		this.c = colIndex;
		this.rowKey = `${rowLeftTops}${rowRightTops}`;
		this.colKey = `${colLeftTops}${colRightTops}`;
		this.possibleValues = this.getInitialValues(lineSize);
		this.result = null;
	}

	getInitialValues(n) {
		const result = [];
		for (let i = 0; i < n; i += 1) {
			result.push(i + 1);
		}
		return result;
	}

	excludeValues(updatedValues) {
		this.possibleValues = this.possibleValues.map(v => updatedValues.includes(v) ? v : 0);
	}

	calculateResult() {
		const values = this.possibleValues.filter(v => !!v);
		if (values.length === 1) this.result = values[0];
	}

	calc(updatedValues) {
		if (!updatedValues.length) return;
		this.excludeValues(updatedValues);
		this.calculateResult();		
	}
}