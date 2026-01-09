// 1. Import http module
const http = require("http");

// 2. Create server
const server = http.createServer((req, res) => {

  // 3. Set response header
  res.writeHead(200, { "Content-Type": "text/plain" });

  // 4. Send response body
  res.write("Hello World from Node.js Server");

  // 5. End response
  res.end();
});

// 6. Start server on port 3000
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
