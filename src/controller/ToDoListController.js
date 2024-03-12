const ToDoListModel = require('../models/todoListModel')

exports.CreateTodoList = async (req, res) => {

    try {

        let reqbody = req.body;

        let TodoSubject = reqbody['ToDosubject'];
        let TodoDescription = reqbody['ToDoDescription'];
        let UserName = req.headers['UserName'];
        let ToDoStatus = 'New';
        let ToDoCreateDate = Date.now();
        let ToDoUpdateDate = Date.now();

        let PostBody = {

            UserName: UserName,
            TodoSubject: TodoSubject,
            TodoDescription: TodoDescription,
            TodoStatus: ToDoStatus,
            TodoCreateDate: ToDoCreateDate,
            ToDoUpdateDate: ToDoUpdateDate

        };

        let todolist = await ToDoListModel.create(PostBody);
        res.status(200).json({ status: 'Success', message: 'To Do List Created Successfully', todolist: todolist });

    } catch (err) {

        res.status(401).json({ status: 'Not Success', message: err });

    }
}


exports.SelectTodoList = async (req, res) => {
    try {

        let UserName = req.headers['UserName'];

        let todoLists = await ToDoListModel.find({ UserName: UserName });

        if (todoLists && todoLists.length > 0) {
            res.status(200).json({ status: 'Success', message: 'To Do Lists', Todo: todoLists });
        } else {
            res.status(404).json({ status: 'Failure', message: 'No todo lists found for the user' });
        }

    } catch (err) {
        res.status(500).json({ status: 'Error', message: err.message });
    }
}

exports.UpdateTodoList = async (req, res) => {
    try {

        let _id = req.body['_id'];
        let TodoSubject = req.body['ToDosubject'];
        let ToDoDescription = req.body['ToDoDescription'];
        let ToDoUpdateDate = Date.now();

        let updatedTodo = {
            TodoSubject: TodoSubject,
            TodoDescription: ToDoDescription,
            ToDoUpdateDate: ToDoUpdateDate
        };

        let todoLists = await ToDoListModel.findOneAndUpdate({ _id: _id }, updatedTodo, {upsert: true, new: true });

        if (todoLists) {
            res.status(200).json({ status: 'Success', message: 'To Do Updated Successfully', Todo: todoLists });
        } else {
            res.status(404).json({ status: 'Failure', message: 'No todo list found with the given ID' });
        }
    } catch (err) {
        res.status(500).json({ status: 'Error', message: err.message });
    }
}

exports.UpdateStatusTodoList = async (req, res) => {
    try {

        let _id = req.body['_id'];
        let TodoStatus = req.body['TodoStatus'];
        let ToDoUpdateDate = Date.now();

        let updatedTodo = {
            TodoStatus: TodoStatus,
            ToDoUpdateDate: ToDoUpdateDate
        };

        let todoLists = await ToDoListModel.findOneAndUpdate({ _id: _id }, updatedTodo, {upsert: true, new: true });

        if (todoLists) {
            res.status(200).json({ status: 'Success', message: 'To Do Updated Successfully', Todo: todoLists });
        } else {
            res.status(404).json({ status: 'Failure', message: 'No todo list found with the given ID' });
        }
    } catch (err) {
        res.status(500).json({ status: 'Error', message: err.message });
    }
}


exports.DeleteTodoList = async (req, res) => {
    try {
        let _id = req.body['_id'];

        let deletedTodo = await ToDoListModel.findOneAndDelete({ _id: _id });

        if (deletedTodo) {
            res.status(200).json({ status: 'Success', message: 'To Do Deleted Successfully', Todo: deletedTodo });
        } else {
            res.status(404).json({ status: 'Failure', message: 'No todo list found with the given ID' });
        }
    } catch (err) {
        res.status(500).json({ status: 'Error', message: err.message });
    }
}


exports.FilterStatusTodoList = async (req, res) => {
    try {

        let UserName = req.headers['UserName'];
        let TodoStatus = req.body['TodoStatus'];

        let todoLists = await ToDoListModel.find({ UserName: UserName , TodoStatus: TodoStatus });

        if (todoLists && todoLists.length > 0) {
            res.status(200).json({ status: 'Success', message: 'To Do Lists', Todo: todoLists });
        } else {
            res.status(404).json({ status: 'Failure', message: 'No todo lists found for the user' });
        }

    } catch (err) {
        res.status(500).json({ status: 'Error', message: err.message });
    }
}

exports.FilterDateTodoList = async (req, res) => {
    try {

        let UserName = req.headers['UserName'];
        let StartDate = req.body['StartDate'];
        let EndDate = req.body['EndDate'];

        let todoLists = await ToDoListModel.find({ UserName: UserName , TodoCreateDate:{$gte:new Date(StartDate),$lte:new Date(EndDate)}});

        if (todoLists && todoLists.length > 0) {
            res.status(200).json({ status: 'Success', message: 'To Do Lists', Todo: todoLists });
        } else {
            res.status(404).json({ status: 'Failure', message: 'No todo lists found for the user' });
        }

    } catch (err) {
        res.status(500).json({ status: 'Error', message: err.message });
    }
}