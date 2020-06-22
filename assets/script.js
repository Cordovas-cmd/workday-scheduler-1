// set the date at the top of the page
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

// tasks object to store in localStorage
var tasks = {
    date: today
};

// add tasks to localStorage
var setTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// load the tasks from localStorage and create tasks in the right row
var getTasks = function() {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    $.each(tasks, function(key, value) {
        var hourDiv = $("#" + key);
        createTask(value, hourDiv);
    })
}

var createTask = function(taskText, hourDiv) {
    var taskDiv = hourDiv.find(".task");
    // create the task element
    var taskP = $("<p>")
        .addClass("task-text")
        .text(taskText)
    taskDiv.html(taskP);
}

// task click handler
$(".task").on("click", function() {
    // get the current text value
    var text = $(this).text();
    // create a textInput element
    var textInput = $("<textarea>")
        .addClass("form-control")
        .val(text);
    // add the textInput element to the parent div
    $(this).html(textInput);
    // put it into focus
    textInput.trigger("focus");
})

// save button click handler
$(".save").on("click", function() {
    // get the necessary elements
    var taskInfo = $(this).closest(".task-info");
    var textArea = taskInfo.find("textarea");
    // get the time
    var time = taskInfo.attr("id");
    // get the task text
    var text = textArea.val().trim();
    // add the task to tasks object
    tasks[time] = text;
    // persist tasks
    setTasks();
    // add a p element for the task
    createTask(text, taskInfo);
})

getTasks();