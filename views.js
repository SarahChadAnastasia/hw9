var GUI = (function() { //IIFE for all Views

  var TaskView = Backbone.View.extend({
    render: function() {
      var title = app.tasks.get("title");
      var desc = app.tasks.get("description");
      var creator = app.tasks.get("creator");
      var assignee = app.tasks.get("assignee");
      var status = app.tasks.get("status");
      var taskEl = '<h3>' + title + '</h3><br><p>' + desc + '</p><br>';
      var assignedEl = '<p>' + assignee + '</p>';
      var creatorEl = '<p>' + creator + '</p>';
      var save = '<button id="save">Save</button>';
      var statusEl = '<select id="taskstatus" name="status"><option value="unassigned">Unassigned</option><option value="assigned">Assigned</option><option value="inProgress">In Progress</option><option value="done">Done</option></select>';
      this.$el.html("<div><h4>" + title + "</h4>" + "Description: " + desc + "<br> Added By: " + creator + "<br>Assigned To: " + assignee + "<br>Status: " + status + "</div>" + statusEl + save );
    },

    initialize: function() {
      console.log("initialize TaskView", this.model);
      this.listenTo(this.collection, 'update', this.render());
    },

  });

  var CreateTaskView = Backbone.View.extend({
    render: function() {
      var titleInput;
      var dropDown = '<select id = "dropDown"><option value=""></option><option value="Chad">' + app.users.at(2).get("username") + '</option><option value="Sarah">' + app.users.at(1).get("username") + '</option><option value="Anastasia">' + app.users.at(0).get("username") + '</option></select>';
      this.$el.html("Task Title" + "<div>" + titleInput + "</div>" +
        "Description" + "<br><div>" + descrInput + "</div>" +
        "<br><div>" + saveBtn);
    },
    initialize: function() {

    },
    events: {

    },

  });

  var AppView = Backbone.View.extend({

  });

  var UnassignedTasksView = Backbone.View.extend({
    $el: $('#unassignedTasks'),
    render: function() {
      var label = '<h5>Unassigned Tasks</h5>';
      console.log(app.tasks.at(0).get("title"));
      this.$el.html(label);
    },
  });

  var UserTasksView = Backbone.View.extend({
    $el: $('#myTasks'),
    render: function() {
      var label = '<h5>My Tasks</h5>';
      this.$el.html(label);
    },
  });

  var UserView = Backbone.View.extend({
    render: function(user) {
      var userViewContainer = '<div id="userViewContainer">';
      var userHeader = '<h2>Team SAC Issue Tracker</h2><h3>User: ' + user + '</h3>';
      var unassignedTasks = '<div id="unassignedTasks"></div>';
      var myTasks = '<div id="myTasks"></div>';
      var buttons = '<button id="logout">Logout</button>';
      var createTask = '<button id="createTask">Create Task</button>';
      var closeDiv = '</div>';
      titleInput = '<input id= "title" type="text" value="" />';//text box
      var descrInput = '<textarea id="description"></textarea>';//text area
      var statusEl = '<select id="taskstatus" name="status"><option value="unassigned">Unassigned</option><option value="assigned">Assigned</option><option value="inProgress">In Progress</option><option value="done">Done</option></select>';
      var assignedTo = '<select id = "dropDown"><option value=""></option><option value="Chad">' + app.users.at(2).get("username") + '</option><option value="Sarah">' + app.users.at(1).get("username") + '</option><option value="Anastasia">' + app.users.at(0).get("username") + '</option></select>';
      this.$el.html(userViewContainer + userHeader + unassignedTasks + myTasks + buttons + "Task Title" + "<div>" + titleInput + "</div>" +
        "Description" + "<br><div>" + descrInput + "</div>" + "<br><div>" + "</div>" +
          "Assigned To" + "<br><div>" + assignedTo + "</div>" + "<br><div>" + createTask + "</div>" +  closeDiv);
    },

    events: {
      "click #logout": "logout",
      "change #title": "createTask",
      "change #description": "createTask",
      "change #assignedTo": "createTask",
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
      var titleText = $(this.el).find('input#title').val();
    this.model.set({'title': titleText});
    console.log(titleText);
    var descriptionText = $(this.el).find('input#description').val();
    this.model.set({'title': description});
    console.log(descriptionText);
      var descrStr = this.$el.find("#description").val();
      var assignedTo = this.
      this.collection.add({
        title: titleInfo,
        description: descrInfo
      });
    }
  });

  var LoginView = Backbone.View.extend({
    render: function() {
      var loginViewContainer = '<div id="loginViewContainer">';
      var label = '<h2>Team SAC Issue Tracker</h2><h3>Please choose your name below to log in...</h3>';
      var dropDown = '<select id = "dropDown"><option value=""></option><option value="Chad">' + app.users.at(2).get("username") + '</option><option value="Sarah">' + app.users.at(1).get("username") + '</option><option value="Anastasia">' + app.users.at(0).get("username") + '</option></select>';
      this.$el.html(loginViewContainer + label + dropDown);
    },

    // initialize : function () {
    // },
    events: {
      "change #dropDown": "login"
    },

    login: function() {
      var user = $("#dropDown").val();
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
      var newUnassignedTaskList = new TaskView();
      var newUserTaskList = new TaskView({
        'model': app.tasks
      });
      newUserView.render(user);
      newUnassignedTaskView.render();
      newUserTasksView.render();
      $("#app").empty();
      $("#app").append(newUserView.$el);
      $("#unassignedTasks").append(newUnassignedTaskView.$el);
      $("#myTasks").append(newUserTasksView.$el);
      $("#unassignedTasks").append(newUnassignedTaskList.$el);
      $("#myTasks").append(newUserTaskList.$el);
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

createTaskView = new CreateTaskView({collection: app.tasks});
createTaskView.render();

$(el).append(createTaskView.$el);
unassignedTasksView = new UnassignedTasksView({collection: app.tasks});
unassignedTasksView.render();
$(el).append(unassignedTasksView.$el);

  }

  return GUI;
}());
