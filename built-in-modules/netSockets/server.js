const net = require("net");

const host = "localhost";
const port = 8080;

// using a Map object to save usernames for a every socket
// socket -> username
let users = new Map();

// server socket
const server = net.createServer();

server.listen(port, host, () => {
  console.log(`server listening on ${host}:${port}`);
});

server.on("connection", (socket) => {
  // set encoding to avoid using the toSring method
  socket.setEncoding("utf-8");

  socket.on("data", (message) => {
    if (!users.has(socket)) {
      users.set(socket, message);
      console.log(
        `SERVER: Hello ${socket.remoteAddress}:${socket.remotePort} with username ${users.get(socket)}, connection stablished`
      );
    } else if (message === "END") {
      socket.end();
    } else {
      //send to all users except the socket that sends the message
      broadcast(message, socket);
      console.log(`${users.get(socket)}: ${message}`);
    }
  });

  socket.on("close", () => {
    console.log(
      `connection with user ${socket.remoteAddress}:${
        socket.remotePort
      } with username ${users.get(socket)} closed`
    );
    users.delete(socket);
  });

  socket.on("error", (error) => {
    throw error.message;
  });
});

server.on("error", (error) => {
  throw error.message;
});

const broadcast = (message, socket) => {
  users.forEach((userName, userSocket) => {
    if (socket !== userSocket) {
      userSocket.write(`${users.get(socket)}: ${message}`);
    }
  });
};
