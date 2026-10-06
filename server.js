require("dotenv").config();

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3700;
const APP_TITLE = process.env.APP_TITLE || "Cloud Appp";

app.use(express.json());
app.use(express.static("public"));

let tasks = [
    {
        id: 1,
        title: "Learn Node.js",
        completed: false
    }
];


app.get("/api/config", (req, res) => {
    res.json({
        title: APP_TITLE
    });
});


app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// POST new task
app.post("/api/tasks", (req, res) => {

    const newTask = {
        id: Date.now(),
        title: req.body.title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// DELETE task
app.delete("/api/tasks/:id", (req, res) => {

    const id = Number(req.params.id);

    tasks = tasks.filter(task => task.id !== id);

    res.json({
        message: "Task deleted"
    });
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = { app, PORT };
