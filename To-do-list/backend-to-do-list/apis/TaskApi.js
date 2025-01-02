const exp = require('express');
const taskApi = exp.Router();
const getTaskModel = require('../models/TasksModel');

// Body parser middleware
taskApi.use(exp.json()); 

let tasksModel;

taskApi.get('/tasks', async (req, res) => {
    const userId = req.query.id;
    tasksModel = getTaskModel(userId);
    try {
        const tasks = await tasksModel.find();
        res.send({ message: "Tasks:", payload: tasks });
    } catch (err) {
        res.send({ message: "Error:", error: err.message });
    }
});

taskApi.post('/insert', async (req, res) => {
    const userId = req.body.id;
    tasksModel = getTaskModel(userId);  
    try {
        const data = req.body;
        const dataToSave = new tasksModel(data);
        await dataToSave.save();
        res.send({ message: "Task is saved", payload: dataToSave });
    } catch (err) {
        res.send({ message: "Error:", error: err.message });
    }
});

taskApi.put('/update', async (req, res) => {
    const userId = req.body.id;
    tasksModel = getTaskModel(userId);
    try {
        const updateTask = req.body;
        const filter = { name: updateTask.name };
        const update = { $set: { status: updateTask.status } };
        const updatedTask = await tasksModel.findOneAndUpdate(filter, update, { new: true });

        if (updatedTask) {
            res.send({ message: "Task updated successfully", task: updatedTask });
        } else {
            res.send({ message: "No task found to update" });
        }
    } catch (err) {
        res.send({ message: "Error updating task", error: err.message });
    }
});

taskApi.delete('/delete', async (req, res) => {
    const userId = req.body.id;
    const taskName = req.body.name;
    tasksModel = getTaskModel(userId);
    try {
        const result = await tasksModel.deleteOne({ name: taskName });
        if (result.deletedCount === 0) {
            res.send({ message: "Task not found" });
        } else {
            res.send({ message: "Task deleted", payload: taskName });
        }
    } catch (err) {
        res.send({ message: "Cannot delete task", error: err.message });
    }
});

module.exports = taskApi;
