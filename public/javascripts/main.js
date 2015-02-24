var socket = io();
var WORD_DIV = "<div class = words onclick = displayWordMeaning('NEWWORD')>USERNAME NEWWORD</div>";
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
	return results.map(function(obj) {
		return  obj.senses[0].definition;
	})
}

var displayWordMeaning = function(newWord) {
	var url = DIC_URL.replace(/WORD/, newWord);
	$.getJSON(url, function(dicJSON){
		var meaning = getMeanings(dicJSON.results)[0];
		$('#div_wordMeaning').html(meaning);
	});
}

$(onPageLoad);
