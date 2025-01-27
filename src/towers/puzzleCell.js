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

	check(variants) {
		const result = variants.filter(v => !!v);
		if (result.length === 1) return result[0];
		return 0;
	}

	calc(variants) {
		if (!variants.length) return;
		const newVariants = this.variants.map(v => variants.includes(v) ? v : 0);
		const result = this.check(newVariants);
		if (result) this.result = result;
		this.variants = newVariants;
	}
}