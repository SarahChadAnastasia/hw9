var GUI = (function() { //IIFE for all Views

      var TaskView = Backbone.View.extend({
        render : function () {
          var title = this.model.get("title");
          var desc = this.model.get("description");
          var creator = this.model.get("creator");
          var assignee = this.model.get("assignee");
          var status = this.model.get("status");
          var taskEl = '<h2>' + title + '</h2><br><p>' + desc + '</p><br>';
          var assignedEl = '<p>' + assignee + '</p>';
          var statusEl = '<select name="status"><option value="unassigned">Unassigned</option><option value="assigned">Assigned</option><option value="inProgress">In Progress</option><option value="done">Done</option></select>';
          var creatorEl = '<p>' + creator + '</p>';
          this.$el.html(taskEl + assignedEl + statusEl + creatorEl);
        },
      });

      var CreateTaskView = Backbone.View.extend(
        
      );

      var AppView = Backbone.View.extend({
        
      });

      var UnassignedTasksView = Backbone.View.extend({
        $el: $('#unassignedTasks'),
        render : function() {
          var label = '<h5>Unassigned Tasks</h5>';
          this.$el.html(label);
        },
      });

      var UserTasksView = Backbone.View.extend({
        $el: $('#myTasks'),
        render : function() {
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
          var buttons = '<button id="createTask">Create Task</button><button id="logout">Logout</button>';
          var closeDiv = '</div>';
          this.$el.html(userViewContainer + userHeader + unassignedTasks + myTasks + buttons + closeDiv);
        },

        events: {
          "click #logout": "logout",
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
        },

      });

      var LoginView = Backbone.View.extend({
        render : function () {
          var loginViewContainer = '<div id="loginViewContainer">';
          var label = '<h2>Team SAC Issue Tracker</h2><h3>Please choose your name below to log in...</h3>';
          var dropDown = '<select id = "dropDown"><option value=""></option><option value="Chad">'+app.users.at(2).get("username")+'</option><option value="Sarah">'+app.users.at(1).get("username")+'</option><option value="Anastasia">'+app.users.at(0).get("username")+'</option></select>';
          this.$el.html(loginViewContainer + label + dropDown);
        },

        // initialize : function () {
        // },
        events : {
          "change #dropDown" : "login"
        },

        login : function () {
          var user = $("#dropDown").val();
          var userModel = app.users.findWhere({username: user});
          var userTasksModel = app.users.where({assignee: user});
          //returns the first model that it matches
          var newUserView = new UserView({model: userModel});
          var newUnassignedTaskView = new UnassignedTasksView();
          var newUserTasksView = new UserTasksView();
          var newUnassignedTaskList = new TaskView();
          var newUserTaskList = new TaskView({model: userTasksModel});
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

      // generic ctor to represent interface:
      function GUI(users, tasks, el) {
        var firstView = new LoginView();
        firstView.render();
        $("#app").append(firstView.$el);
        
        // users is collection of User models
        // tasks is collection of Task models
        // el is selector for where GUI connects in DOM

        //...
      }

      return GUI;
}());
