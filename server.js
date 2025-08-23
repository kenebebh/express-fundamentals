const express = require("express");
const app = express();
const port = 8080;

// app.use("/", (req, res, next) => {
//   console.log("get from the app.use ", req.method, req.url);
// });

//HTTP METHODS
// GET, POST, DELETE, PATCH

// Respond to GET request on the root route
app.get("/sponsored-products", (req, res) => {
  console.log("from the get request on home page", req.url);
  res.send("all sponsored-products");
});

// // Respond to POST request on the root route
app.post("/sponsored-products", (req, res) => {
  console.log(req.body);
  res.send("ponsored product created");
});

// Respond to a PATCH request on the todos route ('/').
// uer-profile/1500
app.patch("/product/:id", (req, res) => {
  res.send("This is a PATCH request to update the product.");
});

// Respond to a DELETE request on the todos route ('/').
app.delete("/product/:id", (req, res) => {
  res.send("This is to DELETE a product");
});

// Respond to GET request on the /about route
// app.get("/about", (req, res) => {
//   res.send("About page");
// });

// Catch all other routes
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
