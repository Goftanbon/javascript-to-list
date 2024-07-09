
const { render } = require('ejs');
const Task = require('../models/task');

exports.postNewTask = (req, res, next) => {
  console.log('Received POST request:', req.body);
  const mainTask = req.body.task;

  if (!mainTask) {
    console.error('Task description is missing in request body');
    return res.status(400).send('Task description is required');
  }
  const task = new Task({
    description: mainTask,
    isActive: true,
  }); 
  task
    .save()
    .then((result) => {
      console.log("Created Task");
      res.redirect("/");
    })
    .catch((err) => {
      const error = new Error(err);
      return next(error);
    });
};

//get All task
exports.getTasks = (req, res, next) => {
  Task.find()
    .then((tasks) => {
      res.render('index', {
        tasks: tasks
      });
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


// Method to update task status
exports.updateTaskStatus = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then(task => {
      if (!task) {
        const error = new Error('Task not found');
        error.httpStatusCode = 404;
        throw error;
      }
      task.isActive = !task.isActive;
      return task.save();
    })
    .then(result => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(500).json({ success: false, error: err.message });
    });
};

// Method to delete a task
exports.deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findByIdAndDelete(taskId)
    .then(result => {
      if (!result) {
        const error = new Error('Task not found');
        error.httpStatusCode = 404;
        throw error;
      }
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(500).json({ success: false, error: err.message });
    });
};

// Get all tasks
exports.getAllTasks = (req, res, next) => {
 res.redirect('/')
};

// Get active tasks
exports.getActiveTasks = (req, res, next) => {
  Task.find({ isActive: true })
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};



// Get completed tasks
exports.getCompletedTasks = (req, res, next) => {
  Task.find({ isActive: false })
    .then(tasks => {
      res.status(200).json(tasks);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};

// Clear completed tasks
exports.clearCompletedTasks = (req, res, next) => {
  Task.deleteMany({ isActive: false })
    .then(result => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
};
