const net = require("net");
const readline = require("readline");

// HOST AND PORT OF THE SERVER
const host = "localhost";
const port = 8080;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//client socket
const client = new net.Socket();

client.setEncoding('utf-8');

rl.question("Write your username: \n", (username) => {
  client.connect(port, host, () => {
    console.log(`connected to server on ${host}:${port}`);
  });
  client.write(username);
});

client.on("data", (data) => {
  //data is sent in bytes, therefore is needed the toString method
  console.log(data.toString());
});

client.on("error", (error) => {
  throw error;
});

rl.on("line", (input) => {
  client.write(input);
  if (input === "END") {
    client.end();
  }
  
});

client.on("close", () => {
  process.exit(0);
});
