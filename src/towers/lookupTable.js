import { generateArrays, calcVisibleTops } from './utils.js';


export default class LookupTable {
	constructor(n) {
		this.makeList(n);
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
			if ( key === '00' || 
					(key[0] === '0' && item[1] === key[1]) ||
					(key[1] === '0' && item[0] === key[0]) ||
					 key === item ) {
				items.push(...this.list[item]);
			}
		}
		return items;
	}

	filterItems(items, template) {
		if (!template.reduce((acc, v) => acc + v, 0)) return items;
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

	findPossibleValues(key, ind, template) {
		const items = this.getListItemsByKey(key);
		const filteredItems = this.filterItems(items, template);
		const values = filteredItems.map((item) => item[ind]);
		return Array.from(new Set(values));
	}
}