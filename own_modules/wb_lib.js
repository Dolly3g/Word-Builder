exports.isCreator = function(gameDetails){
	var isCreator;
	if(!gameDetails.numberOfPlayers)
		isCreator = true;
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
	var lastWord = words[words.length-1];
	var lastLetter = lastWord[lastWord.length - 1];
	if(lastLetter==word[0])
		return true;
	return false;
}

exports.filterOutUsers = function(users,currentUser){
	return users.filter(function(user){
		return user != currentUser; 
	});

}
