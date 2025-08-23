const express = require("express");
const path = require("path");

// express app
const app = express();

// listen for requests
app.listen(3000);

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});

// redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile("./views/notFound.html", { root: __dirname });
  //Another way of writing it would be
  // res.status(404).sendFile(path.join(__dirname, "views", "notFound.html"));
});
