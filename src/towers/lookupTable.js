export default class LookupTable {
	constructor(n) {
		this.make(n);
	}

	calcVisibleTops(arr) {
		let count = 0;
		let max = 0;
		for (let t of arr) {
			if (t - max > 0) {
				count += 1;
				max = t;
			}
		}
		return count;
	}

	make(n) {
		const list = {};
		const variants = generateArrays(1, n);
		variants.forEach(arr => {
			const leftTops = this.calcVisibleTops(arr);
			const rightTops = this.calcVisibleTops([...arr].reverse());
			const key = [leftTops, rightTops].join('');
			if (list[key]) {
				list[key].push(arr);
			} else {
				list[key] = [arr];
			}
		});
		this.list = list;
	}

	getItems(key) {
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

	findVariants(key, ind, template) {
		const items = this.getItems(key);
		const filteredItems = this.filterItems(items, template);
		const variants = filteredItems.map((item) => item[ind]);
		return Array.from(new Set(variants));
	}
}


// generate all possible arrays of combinations of n, m numbers, each of length m
function generateArrays(n, m) {
	const list = [];
	const startArr = [];
	for (let i = n; i <= m; i += 1) startArr.push(i);
	function generate(item, arr) {
		if (!arr.length) list.push(item);
		for (let i = 0; i < arr.length; i += 1) {
			const nextItem = [...item];
			const nextArr = [...arr];
			nextItem.push(arr[i]);
			nextArr.splice(i, 1);
			generate(nextItem, nextArr);
		}
	}
	generate([], startArr);
	return list;
}


// document.body.innerHTML = `<pre>${(function () {
// 	let str = '';
// 	const list = (new LookupTable(1, 4)).list;
// 	console.log(list);
// 	for (let count in list) {
// 		str += `${count}:\n`
// 		str += '-------\n';
// 		str += list[count].join('\n');
// 		str += '\n\n';
// 	}
// 	return str;
// })()}</pre>`;