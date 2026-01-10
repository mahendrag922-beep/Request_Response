const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

  // 👉 Show form
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <h2>User Form</h2>
      <form method="POST" action="/submit">
        <input name="name" placeholder="Enter name" required />
        <br><br>
        <button type="submit">Submit</button>
      </form>
    `);
  }

  // 👉 Handle form submission
  else if (req.method === "POST" && req.url === "/submit") {

    let body = "";

    // Read data in chunks
    req.on("data", chunk => {
      body += chunk.toString();
    });

    // When all data is received
    req.on("end", () => {

      // Save to file
      fs.appendFile("users.txt", body + "\n", err => {
        if (err) {
          res.writeHead(500);
          return res.end("Error saving data");
        }

        // Redirect back to form
        res.writeHead(302, { Location: "/" });
        res.end();
      });
    });
  }

  // 👉 Fallback
  else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
