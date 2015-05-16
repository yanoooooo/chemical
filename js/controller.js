//connect socket
var socket = io.connect(location.origin);

$(function(){
	$("#main").click(function(){
		//send server
		socket.emit("tapDown", 1);
	});
});