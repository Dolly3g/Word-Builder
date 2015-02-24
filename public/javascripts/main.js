var socket = io();
var WORD_DIV = "<div class = words onclick = displayWordMeaning('NEWWORD')>USERNAME NEWWORD</div>";

var sendWordToServer = function(){
	var newWord = $('#input_word').val();
	$('#input_word').val("");
	var username = $('#hidden_username').val();
	socket.emit('newWord',{newWord:newWord,username:username});
}

var getWordDiv = function(data) {
	return WORD_DIV.replace(/NEWWORD/g, data.newWord).replace(/USERNAME/g, data.username);
}

var broadcastNewWord = function(data){
	var newWordHTML = getWordDiv(data)
	var previousWords = $('#div_words').html();
	$('#div_words').html(previousWords + " " + newWordHTML);
}

var onPageLoad = function(){
	$('#btn_send').click(sendWordToServer);
	$('#word').click(showMeaning);
	socket.on('newWord',broadcastNewWord);
}

var displayWordMeaning = function() {
	alert("Hello");
}

$(onPageLoad);
