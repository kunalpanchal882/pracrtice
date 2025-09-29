require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const genrateText = require("./src/services/ai.service");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

const chatHistory = [ ];

io.on("connection", (socket) => {
  // ...
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user discnnected");
  });

  socket.on("ai-message", async (data) => {

    chatHistory.push({
      role: "user",
      parts: [{ text: data }],
    });
    // ai response
    const response = await genrateText(chatHistory);

    chatHistory.push({
      role:"model",
      parts: [{ text: response }],
    })

    socket.emit("ai-message-response", { response });

  });
});

httpServer.listen(3000, () => {
  console.log("server is runing on port 3000");
});
