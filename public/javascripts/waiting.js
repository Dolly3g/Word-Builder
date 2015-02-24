var socket = io();

var onPageLoad = function(){
	var numberOfPlayers = $('#numberOfPlayers').val();
	socket.emit("numberOfPlayers",{numberOfPlayers:numberOfPlayers});
	socket.on()
}

$(onPageLoad);