import Puzzle from './puzzle.js';


console.time('start');
//test_size4_number1_times1();
//test_size4_number1_times1000();
//test_size4_number11_times1();
//test_size4_number1_times1_multiple();
test_size6_number1_times1();
console.timeEnd('start');


function test_size4_number1_times1() {
	const clues = [0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0];
	const puzzle = new Puzzle(4, clues);
	puzzle.solve();
	puzzle.result.table.forEach(line => console.log(line));
	console.log(puzzle);
}


function test_size4_number1_times1000() {
	for (let i = 0; i < 1000; i += 1) {
		const clues = [0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0];
		const puzzle = new Puzzle(4, clues);
		puzzle.solve();
	}
}


function test_size4_number11_times1() {
	const data = [
		[ 2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3 ],
		[ 1, 2, 4, 2, 2, 1, 3, 2, 3, 1, 2, 3, 3, 2, 2, 1 ],
		[ 3, 2, 2, 1, 1, 2, 4, 2, 2, 1, 3, 2, 3, 1, 2, 3 ],
		[ 0, 0, 1, 2, 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0 ],
		[ 3, 2, 2, 1, 1, 2, 4, 2, 2, 1, 3, 2, 3, 1, 2, 3 ],
		[ 2, 1, 3, 2, 3, 1, 2, 3, 3, 2, 2, 1, 1, 2, 4, 2 ],
		[ 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3, 2, 2, 1, 3 ],
		[ 3, 1, 2, 3, 3, 2, 2, 1, 1, 2, 4, 2, 2, 1, 3, 2 ],
		[ 1, 2, 2, 3, 3, 2, 1, 3, 2, 2, 1, 3, 2, 2, 3, 1 ],
		[ 3, 1, 2, 3, 3, 2, 2, 1, 1, 2, 4, 2, 2, 1, 3, 2 ],
		[ 0, 2, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 1, 2 ]
	];
	for (let d of data) {
		const puzzle = new Puzzle(4, d);
		puzzle.solve();
		puzzle.result.table.forEach(line => console.log(line));
		console.log(JSON.stringify(d));
		console.log(puzzle);
		console.log('-------------------------------------------------');
	}
}


function test_size4_number1_times1_multiple() {
	const d = [0,2,0,0,0,3,0,0,0,1,0,0,0,0,1,2];
	const puzzle = new Puzzle(4, d);
	puzzle.solve();
	puzzle.result.table.forEach(line => console.log(line));
	console.log(puzzle);
	console.log(d.join(''));
	displayData('puzzle cells', puzzle.cells.map(c => ({name: c.name, values: c.possibleValues})));
}


function test_size6_number1_times1() {
	const d = [0, 0, 0 , 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0];
	const puzzle = new Puzzle(6, d);
	puzzle.solve();
	puzzle.result.table.forEach(line => console.log(line));
	console.log(puzzle)
	//puzzle.cells.forEach(c => console.log(c.name, JSON.stringify(c.possibleValues)));
}


function displayData(description, data) {
	document.body.innerHTML += `
		<div>
			<h3>${description}</h3>
			${data.map(d => `<div>${JSON.stringify(d)}</div><br/>`).join('')}
		</div>
	`;
}