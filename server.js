//create server
var http = require("http");
var fs = require("fs");
var path = require("path");
var server = http.createServer(requestListener);
server.listen((process.env.PORT || 5000), function() {
    console.log((process.env.PORT || 5000) + "番でサーバ起動");
});

//request server
function requestListener(req, res) {
    //request file
    var reqURL = req.url;
    //get expand
    var extensionName = path.extname(reqURL);
    //rooting of expand
    switch(extensionName){
        case ".html":
            readFileHandler(reqURL, "text/html", false, res);
            break;
        case ".css":
            readFileHandler(reqURL, "text/css", false, res);
            break;
        case ".js":
        case ".ts":
            readFileHandler(reqURL, "text/javascript", false, res);
            break;
        case ".png":
            readFileHandler(reqURL, "image/png", true, res);
            break;
        case ".jpg":
            readFileHandler(reqURL, "image/jpeg", true, res);
            break;
        case ".gif":
            readFileHandler(reqURL, "image/gif", true, res);
            break;
        default:
            //else
            readFileHandler("/index.html", "text/html", false, res);
            break;
    }
}

//read file
function readFileHandler(fileName, contentType, isBinary, response) {
    //encode setting
    var encoding = !isBinary ? "utf8" : "binary";
    var filePath = __dirname + fileName;

    fs.exists(filePath, function(exits) {
        if(exits) {
            fs.readFile(filePath, {encoding: encoding}, function (error, data) {
                if (error) {
                    response.statusCode = 500;
                    response.end("Internal Server Error");
                } else {
                    response.statusCode = 200;
                    response.setHeader("Content-Type", contentType);
                    if(!isBinary) {
                        response.end(data);
                    } else {
                        response.end(data, "binary");
                    }
                }
            });
        } else {
            //400 error
            response.statusCode = 400;
            response.end("400 Error");
        }
    });
}

//read socket.io
var socketIO = require("socket.io");

//avairable socket.io
var io = socketIO.listen(server);

//watching server
io.sockets.on("connection", function(socket) {
	//tap event
	socket.on("tapDown", function(data) {
		console.log("push");
		//socket.join("connect");
		//socket.emit("down", 1);
        //socket.to("index").broadcast.emit("down", 1);
        socket.broadcast.emit("down", 1);
    });
});

//connection error
io.sockets.on("connect_error", function(socket) {
	console.log("connection error!");
});

//disconnection
io.sockets.on("disconnect", function(socket) {
	socket.emit("disconnectEvent");
	console.log("disconnection");
});