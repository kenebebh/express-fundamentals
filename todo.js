// 1. Import the Express library, which we installed with 'npm install express'.
const express = require("express");

// 2. Create an instance of an Express application.
const app = express();

// 3. Define the port our server will listen on.
const port = 3001;

app.set("view engine", "ejs");

// 4. Middleware to parse incoming JSON data.
// This is required so we can read data sent in the body of POST and PATCH requests.
app.use(express.json());

// 5. Our in-memory "database" for storing todo items.
// This is a simple JavaScript array that will hold our data.
let todos = [
  {
    id: 1,
    title: "Learn Express.js",
    body: "Hello worls *1",
    completed: false,
  },
  { id: 2, title: "Build a CRUD API", body: "Hello worls *2", completed: true },
  {
    id: 3,
    title: "Build an HTML ejs page",
    body: "Hello worls *3",
    completed: false,
  },
];

// 6. A simple counter to generate unique IDs for new todo items.
let nextId = 4;

// This route gets ALL todo items. It listens for GET requests to '/api/todos'.
app.get("/api/todos", (req, res) => {
  // Send the entire 'todos' array back as a JSON response.
  // res.json(todos);
  res.render("index", { todos: todos });
});

// -------------------------------------------------------------------------
// C - CREATE (using POST)
// -------------------------------------------------------------------------
// This route listens for POST requests to the '/api/todos' endpoint.
app.post("/api/todos", (req, res) => {
  // Get the 'title' from the data sent in the request body.
  const newTitle = req.body.title;
  const newBody = req.body.body;

  // Create a new todo object with a unique ID and the title.
  const newTodo = {
    id: nextId++,
    title: newTitle,
    body: newBody,
    completed: false, // New todos are not completed by default.
  };

  // Add the new todo to our 'database' array.
  todos.push(newTodo);

  // Send back the newly created todo with a status code of 201 (Created).
  res.status(201).json(todos);
});

// -------------------------------------------------------------------------
// R - READ (using GET)
// -------------------------------------------------------------------------

// This route gets a SINGLE todo item by its ID.
// The ':id' is a URL parameter that holds the specific ID we're looking for.
app.get("/api/todos/:id", (req, res) => {
  // Get the ID from the URL parameter and convert it to a number.
  const todoId = parseInt(req.params.id);

  // Find the todo in the array that matches the ID.
  const foundTodo = todos.find((t) => t.id === todoId);

  // If the todo isn't found, send a 404 (Not Found) status.
  if (!foundTodo) {
    return res.status(404).send("Todo not found!");
  }

  // If found, send the single todo object back as JSON.
  res.json(foundTodo);
});

// -------------------------------------------------------------------------
// U - UPDATE (using PATCH)
// -------------------------------------------------------------------------

// This route updates an existing todo item. It listens for PATCH requests to '/api/todos/:id'.
app.patch("/api/todos/:id", (req, res) => {
  const newTitle = req.body.title;
  const isCompleted = req.body.completed;

  // Get the ID from the URL and find the todo.
  const todoId = parseInt(req.params.id);
  const todoToUpdate = todos.find((t) => t.id === todoId);

  if (!todoToUpdate) {
    return res.status(404).send("Todo not found!");
  }

  // Check if the request body contains a new 'title' or 'completed' status.
  // if (req.body.title !== undefined) {
  if (newTitle !== undefined) {
    todoToUpdate.title = newTitle;
  }
  if (isCompleted !== undefined) {
    todoToUpdate.completed = isCompleted;
  }

  // Send back the updated todo object.
  res.json(todoToUpdate);
});

// -------------------------------------------------------------------------
// D - DELETE (using DELETE)
// -------------------------------------------------------------------------

// This route deletes a todo item. It listens for DELETE requests to '/api/todos/:id'.
app.delete("/api/todos/:id", (req, res) => {
  // Get the ID from the URL.
  const todoId = parseInt(req.params.id);

  // Find the index of the todo in the array.
  const todoIndex = todos.findIndex((t) => t.id === todoId);

  // If the todo is not found, send a 404 status.
  if (todoIndex === -1) {
    return res.status(404).send("Todo not found!");
  }

  // Remove the todo from the array using its index.
  todos.splice(todoIndex, 1);

  // Send a 204 (No Content) status, which is standard for a successful deletion.
  res.status(204).send({ message: "Todo deleted succesfully" });
});

// -------------------------------------------------------------------------
// Start the server
// -------------------------------------------------------------------------

// Make the Express app listen for incoming requests on our defined port.
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(
    "Use a tool like Postman or your browser to test these endpoints!"
  );
});
