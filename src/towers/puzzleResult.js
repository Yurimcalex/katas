export default class PuzzleResult {
	constructor(n) {
		this.create(n);
	}

	setValue(r, c, value) {
	 this.table[r][c] = value; 
	}
	
	getRow(r) {
		return [...this.table[r]]; 
	}
	
	getCol(c) {
		let result = [];
		for (let row of this.table) {
			result.push(row[c]);
		}
		return result;
	}

	create(n) {
		const table = [];
		for (let i = 0; i < n; i += 1) {
			table.push(new Array(n).fill(0));
		}
		this.table = table;
	}
}