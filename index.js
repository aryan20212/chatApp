const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";

// ----------------Server Management Related-----------------------
const socketIO = require("socket.io");
const express = require("express");
const server = express()
	.get("/", (req, res) => res.sendFile(INDEX, { root: __dirname }))
	.use("/static", express.static("static"))
	.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

// ----------------------Important-------------------------

const users = {};

const io = socketIO(server);

io.on("connection", (socket) => {
	socket.on("disconnect", () => {
		socket.broadcast.emit("user-left", users[socket.id]);
		console.log("User disconnected");
	});

	socket.on("new-user-joined", (nameOfUser) => {
		users[socket.id] = nameOfUser;
		socket.broadcast.emit("user-joined", nameOfUser);
		console.log("User Joined");
	});

	socket.on("chat-message", (msg) => {
		console.log(msg);
		socket.broadcast.emit("chat-message", {
			message: msg,
			name: users[socket.id],
		});
	});
});
