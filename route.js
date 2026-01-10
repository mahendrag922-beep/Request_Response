const fs = require("fs");
function requestHandler(req,res){
// 👉 SHOW FORM + MESSAGES
  if (req.method === "GET" && req.url === "/") {

    fs.readFile("messages.txt", "utf8", (err, data) => {
      let messages = "";

      if (!err && data) {
        // Split lines, reverse to show latest first
        messages = data
          .trim()
          .split("\n")
          .reverse()
          .map(msg => `<li>${msg}</li>`)
          .join("");
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`
        <h2>Messages</h2>
        <ul>${messages}</ul>

        <h3>Add Message</h3>
        <form method="POST" action="/submit">
          <input name="message" placeholder="Enter message" required />
          <br><br>
          <button type="submit">Send</button>
        </form>
      `);
    });
  }

  // 👉 HANDLE FORM SUBMISSION
  else if (req.method === "POST" && req.url === "/submit") {

    let body = "";

    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const message = body.split("=")[1].replace(/\+/g, " ");

      fs.appendFile("messages.txt", message + "\n", err => {
        if (err) {
          res.writeHead(500);
          return res.end("Error saving message");
        }

        // Redirect back to homepage
        res.writeHead(302, { Location: "/" });
        res.end();
      });
    });
  }

  // 👉 FALLBACK
  else {
    res.writeHead(404);
    res.end("Not Found");
  }
};

module.exports={
    requestHandler
}