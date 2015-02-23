var socket = io();

var sendWordToServer = function(){
	var newWord = $('#input_word').val();
	$('#input_word').val("");
	var username = $('#hidden_username').val();
	socket.emit('newWord',{newWord:newWord,username:username});
}

var broadcastNewWord = function(data){
	var newWordHTML = "<div>" + data.username + " : <a href=''>" + data.newWord + "</a></div>";
	var previousWords = $('#div_words').html();
	$('#div_words').html(previousWords + " " + newWordHTML);
}

var onPageLoad = function(){
	$('#btn_send').click(sendWordToServer);
	$('#word').click(showMeaning);
	socket.on('newWord',broadcastNewWord);
}

var showMeaning = function() {
	$('#wordMeaning').html("Hello World");
}

$(onPageLoad);