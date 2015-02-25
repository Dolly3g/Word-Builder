var socket = io();
var WORD_DIV = "<p style=display:inline-block;>OWNEROFWORD: </p> <u><p style=cursor:pointer;color:blue;display:inline-block;text-decoration:underline; class = words onclick = displayWordMeaning('NEWWORD') id='NEWWORD'>NEWWORD</p><br/>";
var DIC_URL = "https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=WORD&apikey=A8x5Zdl19xkxlgaUuErOQc9aufyv5WEH"; 

var sendWordToServer = function(){
	var users = $('#hidden_users').val();
	var currentUser = $('#hidden_currentUser').val();
	var newWord = $('#input_word').val();
	
	$('#input_word').val("");
	var ownerOfWord = $('#hidden_username').val();
	socket.emit('newWord',{newWord:newWord,ownerOfWord:ownerOfWord,users:users,currentUser:currentUser});
}

var getWordDiv = function(data) {
	return WORD_DIV.replace(/NEWWORD/g, data.newWord).replace(/OWNEROFWORD/g, data.ownerOfWord);
}

var broadcastNewWord = function(data){
	var isInputBoxDisabled;
	var username = $('#hidden_username').val();
	$('#hidden_currentUser').val(data.currentUser);
	isInputBoxDisabled = (data.currentUser != username) ? true : false;
	$('#input_word').prop('disabled',isInputBoxDisabled);
	var newWordHTML = getWordDiv(data);
	if(data.errorOfCurrentUser){
		if(data.outUser==username ){
			$('#err_msg').text(data.errorOfCurrentUser);
		}
	}
	else{
		var previousWords = $('#div_words').html();
		$('#div_words').html(previousWords + " " + newWordHTML);
		$('#'+data.newWord).click();		
	}
	var usersHTML = generateHTMLOfUsers(data.users,data.currentUser);
	$('#div_users').html(usersHTML);
	(JSON.parse(data.users).length==1)	&& $('#winner').text("WINNER > "+data.winner) &&
	$('#input_word').prop('disabled',true);
}

var generateHTMLOfUsers = function(users, currentUser){
	users = JSON.parse(users);
	if(!currentUser){
		currentUser = users[0];
	}
	var usersHTML = users.reduce(function(pv,user){
		var colorAttrib = 'style="color:black;"';
		if(currentUser == user)
			colorAttrib = 'style="color:red;"';
		return pv += "<li " + colorAttrib + ">" + user + "</li>";

	},"<ol>");
	usersHTML += '</ol>';

	return usersHTML;
}

var onPageLoad = function(){
	var users = $('#hidden_users').val();
	var usersHTML = generateHTMLOfUsers(users);
	$('#div_users').html(usersHTML);
	$('#btn_send').click(sendWordToServer);
	socket.on('newWord',broadcastNewWord);
}

var getMeanings = function(results, newWord) {
	var filteredOnHeadWord = results.filter(function(obj){
		return (obj.headword== newWord.trim().toLowerCase());
	});

	if(filteredOnHeadWord.length==0)
		return null;

	var filteredOnSenses = filteredOnHeadWord.filter(function(word){
		return word.senses != null;
	});

	return (filteredOnSenses[0].senses[0].definition);
}

var displayWordMeaning = function(newWord) {
	var url = DIC_URL.replace(/WORD/, newWord);
	$.getJSON(url, function(dicJSON){
		var meaning = getMeanings(dicJSON.results, newWord);
		if(meaning)
			$('#div_wordMeaning').html(meaning);
		else
			$('#err_msg').html("Not a valid Word");
	});
}

$(onPageLoad);
