// Generates all possible arrays of combinations of n, m numbers, each of length m
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


const variants = generateArrays(1, 4);
document.body.innerHTML = variants.join('<br/>');