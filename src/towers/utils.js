// generate all possible arrays of combinations of n, m numbers, each of length m
export function generateArrays(n, m) {
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


export function calcVisibleTops(arr) {
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


export function sumArraysValues(arrs) {
	let result = [...arrs[0]];
	arrs.shift();
	for (let arr of arrs) {
		for (let i = 0; i < arr.length; i += 1) {
			result[i] += arr[i];
		}
	}
	return result;
}


export function getRange(n) {
	const result = [];
	for (let i = 0; i < n; i += 1) {
		result.push(i + 1);
	}
	return result;
}