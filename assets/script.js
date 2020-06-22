// set the date at the top of the page
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

// tasks object to store in localStorage.
var tasks = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": []
};

// add tasks to localStorage
var setTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// load the tasks from localStorage and create tasks in the right row
var getTasks = function() {
    // get the tasks from localStorage
    var loadedTasks = JSON.parse(localStorage.getItem("tasks"));
    // for each key/value pair in tasks, create a task
    $.each(loadedTasks, function(hour, task) {
        var hourDiv = $("#" + hour);
        createTask(task, hourDiv);
    })
    // make sure the past/current/future time is reflected
    auditTasks()
}

// create a task in the row that corresponds to the specified hour
var createTask = function(taskText, hourDiv) {
    var taskDiv = hourDiv.find(".task");
    // create the task element
    var taskP = $("<p>")
        .addClass("description")
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
$(".saveBtn").on("click", function() {
    // get the necessary elements
    var taskInfo = $(this).closest(".task-info");
    var textArea = taskInfo.find("textarea");
    // get the time
    var time = taskInfo.attr("id");
    // get the task text
    var text = textArea.val().trim();
    // persist the data if there is any
    if (text){
        // add the task to tasks object
        tasks[time] = [text];  // setting to a one item list since there's only one task for now
        // persist tasks
        setTasks();
    };
    // replace the textarea element with a p element
    createTask(text, taskInfo);
})

var auditTasks = function() {
    // get the current hour and convert it to an int for comparison
    // var currentHour = parseInt(moment().format("H"));
    var currentHour = parseInt("12");
    // update tasks based on their time
    $(".task-info").each( function() {
        // get the hour of this row and convert it to an int for comparison
        var elementHour = parseInt($(this).attr("id"));
        // handle hours that have passed
        if ( elementHour < currentHour ) {
            $(this).removeClass(["present", "future"]).addClass("past");
        }
        // handle the current hour
        else if ( elementHour === currentHour ) {
            $(this).removeClass(["past", "future"]).addClass("present");
        }
        // handle the future
        else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
    })
}

getTasks();