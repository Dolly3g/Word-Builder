exports.isCreator = function(users){
	var isCreator = false;
	users.length==0 && (isCreator = true);
	return isCreator;
}

exports.isWordAlreadyExist = function(words,word){
	if(words.indexOf(word)!=-1)
		return true;
	return false;
}

exports.isUserExist = function(users,user){
	if(users.indexOf(user)!=-1)
		return true;
	return false;
}

exports.isWordStartWithPreviousLetter = function(words,word){
	console.log(words,word);
	var lastWord = words[words.length-1];
	var lastLetter = lastWord[lastWord.length - 1];
	if(lastLetter==word[0])
		return false;
	return true;
}

