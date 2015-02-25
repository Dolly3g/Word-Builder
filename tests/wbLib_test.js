var wb_lib = require("../own_modules/wb_lib.js");
var assert = require('chai').assert;

var wb_lib;



// describe('#getStudentsByGrade',function(){
// 		it('retrieves the students in the 2 grades',function(done){
// 			school_records.getStudentsByGrade(function(err,grades){
// 				assert.lengthOf(grades,2);
// 				assert.lengthOf(grades[0].students,4);
// 				assert.lengthOf(grades[1].students,3);
// 				done();
// 			})
// 		})
// 	})


describe('#isUserExist',function(){
	it('user is exist or not',function(done){
		var users = ["pooja"];
		var userName = "sayli";
		assert.equal(wb_lib.isUserExist(users,userName),false);
		done();
	})
})

describe('#isUserExist',function(){
	it('user is exist or not',function(done){
		var users = [];
		var userName = "sayli";
		assert.equal(wb_lib.isUserExist(users,userName),true);
		done();
	})
})

describe("#isWordAlreadyExist",function(){
	it("word is Already exist",function(done){
		var word = "apple";
		var words = ["apple","banana","orange"];
		assert.equal(wb_lib.isWordAlreadyExist(words,word),true);
		done();
	})
})

describe("#isWordStartWithPreviousLetter",function(){
	it("word is start with previous letter",function(done){
		var word = "egg";
		var words = ["banana","orange"];
		assert.equal(wb_lib.isWordStartWithPreviousLetter(words,word),true);
		done();
	})
})

describe("#isWordStartWithPreviousLetter",function(){
	it("word is start with previous letter",function(done){
		var word = "ogg";
		var words = ["banana","orange"];
		assert.equal(wb_lib.isWordStartWithPreviousLetter(words,word),false);
		done();
	})
})