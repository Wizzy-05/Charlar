const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  socket.join(userId);

  socket.on("send-message", ({ receivers, text }) => {
    receivers.forEach((receiver) => {
      const newReceivers = receivers.filter((r) => r !== receiver);
      newReceivers.push(userId);
      socket.broadcast.to(receiver).emit("receive-message", {
        receivers: newReceivers,
        sender: userId,
        text,
      });
    });
  });
});
