document.body.innerHTML = `<pre>${(function () {
	let str = '';
	const list = makeLookupList(1, 4);
	for (let count in list) {
		str += `${count}:\n`
		str += '-------\n';
		str += list[count].join('\n');
		str += '\n\n';
	}
	return str;
})()}</pre>`;



// make list of number of towers
function makeLookupList(n, m) {
	const list = {};
	const variants = generateArrays(n, m);
	variants.forEach(arr => {
		const count = [calcTowers(arr), calcTowers([...arr].reverse())];
		if (list[count]) {
			list[count].push(arr);
		} else {
			list[count] = [arr];
		}
	});
	return list;
}

// calculate visible towers count
function calcTowers(arr) {
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