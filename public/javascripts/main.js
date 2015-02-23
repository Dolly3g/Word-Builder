var socket = io();

var sendWordToServer = function(){
	var users = $('#hidden_users').val();
	var currentUser = $('#hidden_currentUser').val();
	var newWord = $('#input_word').val();
	$('#input_word').val("");
	var username = $('#hidden_username').val();
	socket.emit('newWord',{newWord:newWord,username:username,users:users,currentUser:currentUser});
}

var broadcastNewWord = function(data){
	console.log("data=",data);
	if(data.currentUser != data.username){
		$('#input_word').prop('disabled',true);
	}
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