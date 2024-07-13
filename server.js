const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

let todos = [];

// Create a new todo
app.post("/todos", (req, res) => {
  const { text } = req.body;
  const newTodo = { id: Date.now(), text };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Update a todo
app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const todo = todos.find((t) => t.id == id);
  if (todo) {
    todo.text = text;
    res.json(todo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((t) => t.id == id);
  if (index !== -1) {
    const deletedTodo = todos.splice(index, 1);
    res.json(deletedTodo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
