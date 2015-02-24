var socket = io();
var WORD_DIV = "<p style=display:inline-block;>USERNAME: </p> <u><p style=cursor:pointer;color:blue;display:inline-block;text-decoration:underline; class = words onclick = displayWordMeaning('NEWWORD')>NEWWORD</p><br/>";
var DIC_URL = "https://api.pearson.com/v2/dictionaries/ldoce5/entries?headword=WORD&apikey=A8x5Zdl19xkxlgaUuErOQc9aufyv5WEH"; 

var sendWordToServer = function(){
	var users = $('#hidden_users').val();
	var currentUser = $('#hidden_currentUser').val();
	var newWord = $('#input_word').val();
	//meaning
	$('#input_word').val("");
	var ownerOfWord = $('#hidden_username').val();
	socket.emit('newWord',{newWord:newWord,ownerOfWord:ownerOfWord,users:users,currentUser:currentUser});
}

var getWordDiv = function(data) {
	return WORD_DIV.replace(/NEWWORD/g, data.newWord).replace(/USERNAME/g, data.ownerOfWord);
}

var broadcastNewWord = function(data){
	var isInputBoxDisabled;
	var username = $('#hidden_username').val();
	$('#hidden_currentUser').val(data.currentUser);
	isInputBoxDisabled = (data.currentUser != username) ? true : false;
	$('#input_word').prop('disabled',isInputBoxDisabled);
	var newWordHTML = getWordDiv(data)
	var previousWords = $('#div_words').html();
	$('#div_words').html(previousWords + " " + newWordHTML);
}

var onPageLoad = function(){
	$('#btn_send').click(sendWordToServer);
	socket.on('newWord',broadcastNewWord);
}

var getMeanings = function(results) {
	var meanings = results.reduce(function(pv, cv) {
		var definition = cv.senses[0].definition;
		return  pv + "<li>" + definition + "</li>";
	}, "");
	return "<ul>" + meanings + "</ul>";

}

var displayWordMeaning = function(newWord) {
	var url = DIC_URL.replace(/WORD/, newWord);
	$.getJSON(url, function(dicJSON){
		var meaning = getMeanings(dicJSON.results);
		$('#div_wordMeaning').html(meaning);
	});
}

$(onPageLoad);
