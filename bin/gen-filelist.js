/*
 * get the structure of the directory src/examples/**.ejs;
*/
var path = require('path');
var fs = require('fs');
var root = process.cwd();
var source = path.resolve(root, 'src/examples');

var files = fs.readdirSync(source);
files = files.filter(file => fs.statSync(path.resolve(source, file)).isDirectory());
files = files.sort((f1, f2) => {
	const regex = /^\d{3}/g;
	let squen1 = parseInt(f1.match(regex)[0]);
	let squen2 = parseInt(f2.match(regex)[0]);
	return squen1 - squen2;
});

fs.writeFileSync(path.resolve(root, './Files.json'), JSON.stringify(files, null, '\t'));