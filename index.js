const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";

const socketIO = require("socket.io");
const express = require("express");
const server = express()
	.get("/", (req, res) => res.sendFile(INDEX, { root: __dirname }))
	.use("/static", express.static("static"))
	.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

const io = socketIO(server);
io.on("connection", (socket) => {
	console.log("Client connected");
	socket.on("disconnect", () => console.log("Client disconnected"));
});
