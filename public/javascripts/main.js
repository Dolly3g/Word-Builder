var socket = io();

var sendWordToServer = function(){
	var users = $('#hidden_users').val();
	var currentUser = $('#hidden_currentUser').val();
	var newWord = $('#input_word').val();
	$('#input_word').val("");
	var ownerOfWord = $('#hidden_username').val();
	socket.emit('newWord',{newWord:newWord,ownerOfWord:ownerOfWord,users:users,currentUser:currentUser});
}

var broadcastNewWord = function(data){
	var isInputBoxDisabled;
	var username = $('#hidden_username').val();
	$('#hidden_currentUser').val(data.currentUser);
	isInputBoxDisabled = (data.currentUser != username) ? true : false;
	$('#input_word').prop('disabled',isInputBoxDisabled);

	var newWordHTML = "<div>" + data.ownerOfWord + " : <a href=''>" + data.newWord + "</a></div>";
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