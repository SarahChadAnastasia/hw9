var GUI = (function() { //IIFE for all Views

      var TaskView = Backbone.View.extend({
      });

      var CreateTaskView = Backbone.View.extend({
      });

      var AppView = Backbone.View.extend({

      });

      var UnassignedTasksView = Backbone.View.extend({

      });

      var UserTasksView = Backbone.View.extend({

      });

      var UserView = Backbone.View.extend({
        render: function() {
          var usernameForTaskView = '<div class="userViewHeader">"username">{{username}}</div>';
          var logoutBtn = '<button id="logout">Log Out</button></div>';
          var createTask = '<button id="create task">Create Task</button></div>';
          var userUnassignedTask = '<div id="userUnassignedTask"></div>';
          var myTasks = '<div id="myTasks"></div>';
        this.el.html(usernameTask + logoutBtn + createTask + userUnassignedTask + myTasks);
          },

          events: {
            'click #logout': 'logout',
            'click #createTask': 'create'
          },

          initialize: function() {
            // this.$el.appendTo('#app');
		        // this.render();
          },

          logout: function() {
            var memberBye = $("logoutBtn").val();
           var view = new UserView({model: userModel});
           view.render();
           this.$("#app").append(view.$el);
          },

          create: function() {

          },

          });


var LoginView = Backbone.View.extend({
  render : function () {

  var dropDown = '<select id = "dropDown"><option value="chad">'+app.users.at(2).get("username")+'</option><option value="sarah">'+app.users.at(1).get("username")+'</option><option value="Anastasia">'+app.users.at(0).get("username")+'</option></select>';
  //  var btn = '<button id="loginbutton">Login</button>';
  //  var taskListLogIn = '<input type="text" id="taskUser" placeholder="Username">';
    this.$el.html(dropDown);
    },

  // initialize : function () {
  // },
    events : {
        "change #dropDown" : "login"
    },

  login : function () {
    var member = $("dropDown").val();
    console.log(member);
  //  $("#dropDown option[value='" + selectValue + "']").attr("selected", "selected");
   var userModel = app.users.findWhere({username: member});
   //returns the first model that it matches
   var view = new UserView({model: userModel});
   view.render();
   this.$("#app").append(view.$el);
 }
});


        // generic ctor to represent interface:
        function GUI(users, tasks, el) {
        var firstview = new LoginView();
        firstview.render();
        $("#app").append(firstview.$el);
        }

        return GUI;
      }());
