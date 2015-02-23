
exports.isUserExist = function(users,username){
	var isCreator = false;
	if(users.length==0){
		isCreator = true;
	}
	users.push(username);
	return isCreator;
}

// exports.isWordExistInDictionary = function(word,strkey){
// 	var url = strkey.append(word);
// 	var obj;
// 	$.getJSON(url,function(data){
// 		data = obj;
// 	});

// }

exports.isWordAlreadyExist = function(words,word){
	if(words.indexOf(word)!=-1)
		return true;
	return false;
}

exports.isWordStartWithPreviousLetter = function(words,word){
	var lastWord = words[words.length-1];
	var lastLetter = lastWord[lastWord.length-1];
	if(lastLetter==word[0])
		return true;
	return false;
}

