var GUI = (function() { //IIFE for all Views

  //TO-DO LIST:
  //Get text entered into "Task Title" textbox to display

  //////////////////////////////////////////////////////////////////////////////
  //NOTES FOR TaskView:
  // -This view sets displays the object of each task
  // -When app.tasks 'update', this view renders and displays/does not display the
  // changed objbect
  //////////////////////////////////////////////////////////////////////////////

  var TaskView = Backbone.View.extend({

    render: function() {

      var title = this.model.get("title");
      var description = this.model.get("description");
      var creator = this.model.get("creator");
      var assignee = this.model.get("assignee");
      var status = this.model.get("status");
      this.$el.html('<b>' + "Title: " + '</b>' + title  + '<br>' + '<b>' + "Description: " + '</b>' + description + '<br>' + "Creator: " + '</b>' + creator  + '<br>' +  "Assignee: " + '</b>' + assignee + '<br>' + 'Status: ' + status + " " + '<br></br>' );
    },

    initialize: function() {
      this.listenTo(app.tasks, 'update', this.render);
      this.render();
    },

    listener : function() {
      console.log("task view is listening");
    }

  });

  //////////////////////////////////////////////////////////////////////////////
  //NOTES FOR CreateTaskView:
  // -Not using currently
  //////////////////////////////////////////////////////////////////////////////

  var CreateTaskView = Backbone.View.extend({
    
    render: function(user) {
      var createTaskViewContainer = '<div id="createTaskViewContainer">';
      var titleInput = '<input id= "newTaskTitle" type="text" value="" />';//text box
      var descrInput = '<textarea id="description"></textarea>';//text area
      var statusEl = '<select id="taskstatus" name="status"><option value="unassigned">Unassigned</option><option value="assigned">Assigned</option><option value="inProgress">In Progress</option><option value="done">Done</option></select>';
      var assignedTo = '<select id = "dropDown"><option value=""></option><option value="Chad">' + app.users.at(2).get("username") + '</option><option value="Sarah">' + app.users.at(1).get("username") + '</option><option value="Anastasia">' + app.users.at(0).get("username") + '</option></select>';
      var saveTask = '<button id="saveTask">Save Task</button>';
      var closeDiv = '</div>';
      this.$el.html(createTaskViewContainer  + "Task Title" + "<div>" + titleInput + "</div>" +
        "Description" + "<br><div>" + descrInput + "</div>" + "<br><div>" + "</div>" +
          "Assigned To" + "<br><div>" + assignedTo + "</div>" + "<br><div>" + saveTask + "</div>" +  closeDiv);
    },
    
    events: {
      "click #saveTask": "save",

    },
    
    save: function() {
      console.log('click heard on saveTask button : ' + app.currentUser);
      var task = new IssueModel();
      var newTitle =  $("#newTaskTitle").val();
      var newDesc =  $("#description").val();
      var newAssignee =  $("#dropDown").val();
      app.tasks.add({username: app.currentUser, creator: app.currentUser, title: newTitle, description: newDesc, assignee: newAssignee});
      console.log(app.tasks.at(5));
    },

  });

  //////////////////////////////////////////////////////////////////////////////
  //NOTES FOR UnassignedTasksView:
  // -This is where the tasks display that have the status 'unassigned'
  // -A for loop goes through app.tasks.length and looks for whether or not
  // 'status' is === 'unassigned'. If it is, the task that is 'unassigned' displays
  //in the UnassignedTasksView
  //////////////////////////////////////////////////////////////////////////////

  var UnassignedTasksView = Backbone.View.extend({
    className: 'unassignedTasksView',

    initalize: function (){
      this.listenTo(app.tasks, 'change', this.render);
      this.listenTo(app.tasks, 'update', this.render);

    },

    testFunction: function () {
       console.log("testFunction is running");
    },

    render: function() {
      var label = '<h2>Unassigned Tasks</h2>';
      console.log("render is listening");
      this.$el.html(label);
      for(var i = 0; i<app.tasks.length; i++){
          if(app.tasks.at(i).get("status") === 'unassigned'){
          var taskView1 = new TaskView({"model": app.tasks.at(i), "index": 0});
          this.$el.append(taskView1.$el.html());
        }
      }
    },
  });

  //////////////////////////////////////////////////////////////////////////////
  //NOTES FOR UserTasksView:
  // -This is where the tasks display that are assigned to the person that is logged in
  // -A for loop goes through app.tasks.length (main.js) and looks for whether or not
  // 'assignee' is === 'app.currentUser' (user currently logged in) .
  //If it is, the task that has an 'assignee' displays in their UserTasksView
  //////////////////////////////////////////////////////////////////////////////

  var UserTasksView = Backbone.View.extend({
    className: 'myTasks',
    initalize: function() {
      this.listenTo(app.tasks, 'update', this.render);
    },

    render: function() {
      var label = '<h2>My Tasks</h2>';
      this.$el.html(label);
      for(var i = 0; i<app.tasks.length; i++){
          if(app.tasks.at(i).get("assignee") === app.currentUser){
            var taskView2 = new TaskView({"model": app.tasks.at(i), "index": 0});
            this.$el.append(taskView2.$el.html());
          }
      }
    },
  });

  //////////////////////////////////////////////////////////////////////////////
  ////NOTES FOR UserTasksView:
  // -This is the view that holds the 'UserTasksView', 'UserTasksView',the display
  //where you create your task, the logout button and it shouws you who is logged in
  //-When you click 'logout', the view changes back to the 'loginView'
  //-RIGHT NOW - When you enter text into the textbox titled "Task Title", I am able
  //to see that app.tasks is now longer then the test info that we have in main.js,
  //but for some reason it's not displaying in 'UnassignedTasksView'
  //////////////////////////////////////////////////////////////////////////////

  var UserView = Backbone.View.extend({
    render: function(user) {
      var userViewContainer = '<div id="userViewContainer">';
      var userHeader = '<h2>Team SAC Issue Tracker</h2><h3>User: ' + user + '</h3>';
      var unassignedTasks = '<div id="unassignedTasks"></div>';
      var myTasks = '<div id="myTasks"></div>';
      var buttons = '<button id="createTask">Create Task</button><button id="logout">Logout</button>';
      //var createTask = '<button id="createTask">Create Task</button>';
      var closeDiv = '</div>';
//      var titleInput = '<input id= "newTaskTitle" type="text" value="" />';//text box
//      var descrInput = '<textarea id="description"></textarea>';//text area
//      var statusEl = '<select id="taskstatus" name="status"><option value="unassigned">Unassigned</option><option value="assigned">Assigned</option><option value="inProgress">In Progress</option><option value="done">Done</option></select>';
//      var assignedTo = '<select id = "dropDown"><option value=""></option><option value="Chad">' + app.users.at(2).get("username") + '</option><option value="Sarah">' + app.users.at(1).get("username") + '</option><option value="Anastasia">' + app.users.at(0).get("username") + '</option></select>';
      this.$el.html(userViewContainer + userHeader + unassignedTasks + myTasks + buttons  +  closeDiv);
    },

    events: {
      "click #logout": "logout",
      "change #newTaskTitle": "createTask",
      "click #createTask": "createTask"

    },

    initialize: function() {

    },

    logout: function() {
      console.log('click heard on logout button');
      var loginView = new LoginView();
      loginView.render();
      $("#app").empty();
      $("#app").append(loginView.$el);
    },


    createTask: function() {
      console.log('click heard on createTask button');
      var createTaskView = new CreateTaskView();
      createTaskView.render();
      //$("#app").empty();
      $("#app").append(createTaskView.$el);
//      var task = new IssueModel();
//      app.tasks.add(task);
//      console.log("createTask is running:", task);
//      console.log('here is a task ' + app.tasks.get(4));
    // this.model.set({'title': titleText});
    // app.tasks.push({"title": titleText});
    // var descriptionText = $(this.el).find('input#description').val();
    // this.model.set({'title': description});
    //   var descrStr = this.$el.find("#description").val();

    },
  });

  //////////////////////////////////////////////////////////////////////////////
  ////NOTES FOR LoginView:
  // -This is where the magic happens. This is the first view you see in the app
  //when you select a name from the dropdown menu, this is the event that logs you
  //into the app.  It's also the event that does the following:
  //*Creates UserView
  //*Creates UnassignedTasksView
  //*Creates UserTasksView
  //*Tells the app that the name selected upon log-in is the name associated with the
  //tasks in UserTasksView
  //*Tells the app that the name selected upon log-in is the name displaying at the
  //top of UserTasksView


  //////////////////////////////////////////////////////////////////////////////

  var LoginView = Backbone.View.extend({
    id: "loginViewContainer",
    render: function() {
      var label = '<h2>Team SAC Issue Tracker</h2><h3>Please choose your name below to log in...</h3>';
      var dropDown = '<select id = "dropDown"><option value=""></option><option value="Chad">' + app.users.at(2).get("username") + '</option><option value="Sarah">' + app.users.at(1).get("username") + '</option><option value="Anastasia">' + app.users.at(0).get("username") + '</option></select>';
      this.$el.html(label + dropDown);
    },

    initialize : function () {
      this.listenTo(app.tasks, 'update', this.render);

    },
    events: {
      "change #dropDown": "login"
    },

    login: function() {
      var user = $("#dropDown").val();
      app.currentUser = user;
      var userModel = app.users.findWhere({
        username: user
      });

      var userTasksModel = app.users.where({
        assignee: user
      });
      //returns the first model that it matches
      var newUserView = new UserView({
        model: userModel
      });
      var newUnassignedTaskView = new UnassignedTasksView();
      var newUserTasksView = new UserTasksView();
      // var newUnassignedTaskList = new TaskView();
      // var newUserTaskList = new TaskView({
      //   'model': app.tasks
      // });
      newUserView.render(user);
      newUnassignedTaskView.render();
      newUserTasksView.render();
      $("#app").empty();
      $("#app").append(newUserView.$el);
      $("#unassignedTasks").append(newUnassignedTaskView.$el);
      $("#myTasks").append(newUserTasksView.$el);
      // $("#unassignedTasks").append(newUnassignedTaskList.$el);
      // $("#myTasks").append(newUserTaskList.$el);
    }
  });

  var person_view = Backbone.View.extend({
    initialize: function() {
        this.model = new person();
    },
    output: function(){
        console.log(app.tasks('username'));
    }
});

  // generic ctor to represent interface:
  function GUI(users, tasks, el) {
    var firstView = new LoginView();
    firstView.render();
    $("#app").append(firstView.$el);
  }

  return GUI;
}());
