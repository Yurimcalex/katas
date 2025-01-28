import { generateArrays, calcVisibleTops, getRange } from './utils.js';


export default class LookupTable {
	constructor(n) {
		this.makeList(n);
		this.n = n;
	}
	
	makeList(n) {
		const list = {};
		const variants = generateArrays(1, n);
		variants.forEach(arr => {
			const leftTops = calcVisibleTops(arr);
			const rightTops = calcVisibleTops([...arr].reverse());
			const key = [leftTops, rightTops].join('');
			if (list[key]) {
				list[key].push(arr);
			} else {
				list[key] = [arr];
			}
		});
		this.list = list;
	}

	getListItemsByKey(key) {
		const items = [];
		for (let item in this.list) {
			if ( (key[0] === '0' && item[1] === key[1]) ||
					(key[1] === '0' && item[0] === key[0]) ||
					 key === item ) {
				items.push(...this.list[item]);
			}
		}
		return items;
	}

	filterItems(items, template) {
		if (this.isEmptyTemplate(template)) return items;
		const result = [];
		items.forEach(item => {
			for (let i = 0; i < template.length; i += 1) {
				if (!template[i]) continue;
				if (template[i] === item[i]) {
					result.push(item);
					break;
				}
			}
		});
		return result;
	}

	isEmptyTemplate(template) {
		return !template.reduce((acc, v) => acc + v, 0);
	}

	findPossibleValues(key, ind, template) {
		if (key === '00') return getRange(this.n);
		const items = this.getListItemsByKey(key);
		const filteredItems = this.filterItems(items, template)
		const values = filteredItems.map((item) => item[ind]);
		return Array.from(new Set(values));
	}
}


// const table = new LookupTable(4);
// console.time('time 1');
// for (let i = 0; i < 10000; i += 1) {
// 	table.findPossibleValues('00', 1, [4, 0, 0, 0])
// }
// console.timeEnd('time 1');