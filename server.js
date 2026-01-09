const http = require("http");

const server = http.createServer((req, res) => {

  if (req.url === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
        <body>
          <h1>Welcome home</h1>
        </body>
      </html>
    `);

  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
        <body>
          <h1>Welcome to About Us</h1>
        </body>
      </html>
    `);

  } else if (req.url === "/node") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
        <body>
          <h1>Welcome to my Node Js project</h1>
        </body>
      </html>
    `);

  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(`
      <html>
        <body>
          <h1>Page Not Found</h1>
        </body>
      </html>
    `);
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
