
$(document).ready(function () {

    $("#questionsDropUp").click(function () {
        $("#questionsMenu").slideUp("slow");
    });

    $("#jottingsDropUp").click(function () {
        $("#jottingsMenu").slideUp("slow");
    });

    $("#notesDropUp").click(function () {
        $("#notesMenu").slideUp("slow");
    });

    $("#notesDropDown").click(function () {
        $("#notesMenu").slideDown("slow");
    });

    $("#jottingsDropDown").click(function () {
        $("#jottingsMenu").slideDown("slow");
    });

    $("#questionsDropDown").click(function () {
        $("#questionsMenu").slideDown("slow");
    });
});

angular.module('todoApp', [])
    .controller('TodoListController', function ($scope) {
        var counter = 0;
        var counter1 = 0;

        var todoList = this;
        var todoList1 = this;
        var todoList2 = this;
        console.log(todoList);
        todoList.todos = [];
        todoList1.todos1 = [];
        todoList2.todos2 = [];
        //  {text:'learn AngularJS', done:true},
        //  {text:'build an AngularJS app', done:false}];

        todoList.addTodo = function () {
            $scope.counter = counter++;
            todoList.todos.push({ text: todoList.todoText, done: false, counter: counter });
            console.log(todoList.todos)
            todoList.todoText = '';
        };

        todoList1.addTodo1 = function () {
            $scope.counter1 = counter1++;
            todoList1.todos1.push({ text: todoList1.todoText1, done: false, counter: counter1 });
            todoList1.todoText1 = '';
        };

        todoList2.addTodo2 = function () {
            todoList2.todos2.push({ text: todoList2.todoText2, done: false });
            todoList2.todoText2 = '';
        };

    });