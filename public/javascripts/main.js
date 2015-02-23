var socket = io();

var sendWordToServer = function(){
	var newWord = $('#input_word').val();
	$('#input_word').val("");
	socket.emit('newWord',{newWord:newWord});
}

var broadcastNewWord = function(newWord){
	var newWordHTML = "<div>"+'<a href="" id = "word">'+newWord.newWord+"</a>"+"</div>";
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