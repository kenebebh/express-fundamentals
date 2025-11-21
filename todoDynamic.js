// This file, 'app.js', contains all the code for our full CRUD
// Todo List web application using Express.js and EJS.

// 1. Import Express and other necessary modules.
const express = require("express");
const app = express();
const port = 3001;

// 2. Set up EJS as the template engine. Express will look for .ejs files
//    in a 'views' directory by default.
app.set("view engine", "ejs");

// 3. Middleware for handling static files (CSS, etc.).
//    This line tells Express to serve files from the 'public' directory.
app.use(express.static("public"));

// 4. Middleware for parsing incoming request bodies.
//    'express.json()' handles JSON data from APIs.
//    'express.urlencoded()' handles data from standard HTML forms.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. Our in-memory "database" for storing todo items.
let todos = [
  { id: 1, title: "Learn Express.js", completed: false },
  { id: 2, title: "Build a CRUD app", completed: false },
  { id: 3, title: "Teach a class", completed: true },
];

let nextId = 4; // Simple counter for new todo IDs.

// -------------------------------------------------------------------------
// R - READ (Display the Todo List)
// -------------------------------------------------------------------------
// This route handles GET requests to the root URL ('/').
// It will render our main page showing all todos.
app.get("/api/todos", (req, res) => {
  // Render the 'index.ejs' view and pass the 'todos' array to it.
  // The EJS file will use this data to build the HTML list.
  res.render("index", { todos: todos });
});

// -------------------------------------------------------------------------
// C - CREATE (Add a New Todo)
// -------------------------------------------------------------------------
// This route handles POST requests from the "add todo" form.
app.post("/api/todos", (req, res) => {
  console.log(req.body);
  // Get the todo title from the form data (req.body).
  const newTitle = req.body.title;
  const newBody = req.body.body;

  if (newTitle) {
    // Create a new todo object and add it to our array.
    const newTodo = {
      id: nextId++,
      title: newTitle,
      body: newBody,
      completed: false,
    };
    todos.push(newTodo);
  }
  res.redirect("/api/todos");
});

// -------------------------------------------------------------------------
// U - UPDATE (Mark a Todo as Completed)
// -------------------------------------------------------------------------
// This route handles PATCH requests to update a todo's status.
app.post("/api/todos/complete/:id", (req, res) => {
  // Get the todo ID from the URL parameters.
  console.log(req.url);
  console.log(req.method);
  const todoId = parseInt(req.params.id);

  // Find the todo in our array.
  const todoToUpdate = todos.find((todo) => todo.id === todoId);

  if (!todoToUpdate) {
    res.send("Todo not found");
  }

  todoToUpdate.completed = true;

  res.redirect("/api/todos");
});

// -------------------------------------------------------------------------
// D - DELETE (Delete a Todo)
// -------------------------------------------------------------------------
// This route handles POST requests to delete a todo.
// We use a POST request here because HTML forms do not support DELETE, PATCH, or PUT.
app.post("/api/todos/delete/:id", (req, res) => {
  // Get the todo ID from the URL parameters.
  const todoId = parseInt(req.params.id);

  // Use filter() to create a new array that excludes the todo with the matching ID.
  todos = todos.filter((t) => t.id !== todoId);
  res.redirect("/api/todos");
});

// -------------------------------------------------------------------------
// Start the server
// -------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
