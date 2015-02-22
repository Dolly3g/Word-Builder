var lib = require("../own_modules/wb_lib.js");
var assert = require('chai').assert;
var dbFileData = fs.readFileSync('tests/data/wb.db.backup');
var sqlite3 = require("sqlite3").verbose();
var TEST_DB_PATH='tests/data/wb.db';

var wb_lib;
describe('wb_records',function(){
	beforeEach(function(){
		fs.writeFileSync(TEST_DB_PATH,dbFileData);
		wb_lib = lib.init(TEST_DB_PATH);

	});
});
