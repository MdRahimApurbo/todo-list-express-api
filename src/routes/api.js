const express = require ('express');
const UserProfileController = require ('../controller/UserProfileController');
const ToDoListController = require ('../controller/ToDoListController');
const AuthVerifyMiddleware = require ('../middleware/AuthVerifyMiddleware');

const router = express.Router();

// Create User 

router.post('/CreateUser', UserProfileController.CreateUser);
router.post('/LoginProfile', UserProfileController.LoginProfile);

// User Profile View

router.get('/UsersProfile/', AuthVerifyMiddleware,UserProfileController.UsersProfile);
router.post('/UpdateProfile/', AuthVerifyMiddleware,UserProfileController.UpdateProfile);


// To Do List

router.post('/CreateTodoList/', AuthVerifyMiddleware,ToDoListController.CreateTodoList);
router.get('/SelectTodoList/', AuthVerifyMiddleware,ToDoListController.SelectTodoList);
router.post('/UpdateTodoList/', AuthVerifyMiddleware,ToDoListController.UpdateTodoList);
router.post('/UpdateStatusTodoList/', AuthVerifyMiddleware,ToDoListController.UpdateStatusTodoList);
router.post('/DeleteTodoList/', AuthVerifyMiddleware,ToDoListController.DeleteTodoList);
router.get('/FilterStatusTodoList/', AuthVerifyMiddleware,ToDoListController.FilterStatusTodoList);
router.get('/FilterDateTodoList/', AuthVerifyMiddleware,ToDoListController.FilterDateTodoList);


module.exports = router;
