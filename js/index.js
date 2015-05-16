//connect socket
var socket = io.connect(location.origin);

//controller event
var str = "い";
window.onload = function(){
	socket.on("down",function(data){
		console.log("hoge");
		str = str + "い"
		$("#main").html(str);
	});
};