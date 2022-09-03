const express = require("express");

const hostname= '0.0.0.0';
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server);

const PORT= 5000;
app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function(socket){
	socket.on("newuser",function(username){
		socket.broadcast.emit("update", username + " joined the conversation");
	});
	socket.on("exituser",function(username){
		socket.broadcast.emit("update", username + " left the conversation");
	});
	socket.on("chat",function(message){
		socket.broadcast.emit("chat", message);
	});
});

//server.listen(5000);

//const PORT=5000;
server.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
