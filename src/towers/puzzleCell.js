export default class PuzzleCell {
	constructor(leftCount, rightCount, topCount, bottomCount, r, c, initialVariants) {
		this.name = r + '' + c;
		this.r = r;
		this.c = c;
		this.rowKey = String(leftCount) + String(rightCount);
		this.colKey = String(topCount) + String(bottomCount);
		this.variants = initialVariants;
		this.result = null;
	}

	exclude(variants) {
		this.variants = this.variants.map(v => variants.includes(v) ? v : 0)
	}
}