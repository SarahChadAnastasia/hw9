var GUI = (function() { //IIFE for all Views

      var TaskView = Backbone.View.extend({
        // 	className: 'taskView',
        //     render: function () {
        //         var textVal = this.model.get("value");
        //         var btn = '<button>Clear</button>';
        //         var input = '<input type="text" value="' + textVal + '" />';
        //         this.$el.html("<div>" + input + btn + "</div>");
        //     },
        //     initialize: function () {
        //         this.model.on("change", this.render, this);
        //     },
        //     events : {
        //         "click button" : "clear",
        //         "keypress input" : "updateOnEnter"
        //     },
        //     replace : function () {
        //         var str = this.$el.find("input").val();
        //         this.model.replace(str);
        //     },
        //     clear: function () {
        //         this.model.replace("");
        //     },
        //     updateOnEnter: function (e){
        //         if(e.keyCode == 13) {
        //             this.replace();
        //         }
        //     }
        // });

      });

      var CreateTaskView = Backbone.View.extend(

  });

  var AppView = Backbone.View.extend({

      });

      var UnassignedTasksView = Backbone.View.extend({

      });

      var UserTasksView = Backbone.View.extend({

      });

      var UserView = Backbone.View.extend({
          className: 'userView',
          template: _.template($('<div class="userViewHeader"><span class="username">{{username}}</span>!<button id="logout">Log Out</button></div>' +
            '<div id="unassignedTasks"></div>' +
            '<div id="myTasks"></div>').html()),
          events: {
            'click #logout': 'logout'
          },

          initialize: function() {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);
          },
          render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.toggleClass("done", this.model.get("done"));
            this.input = this.$(".edit");
            return this;
          },
          logout: function() {
            app.navigate('login', {
              trigger: true
            });
          }):

        var LoginView = Backbone.View.extend({
          el: $("#taskUser"),

          initialize: function() {
            var that = this;
            this.usersForTasks = new IssueModel(); //listeClients
            this.usersTasks = new IssueModel(); //listClients
            this.usersForTasks.bind("add", function(model) { //listeClients
              that.addUser(model);
            });
            this.usersTasks.bind("add", function(model) {
              that.register(model);
            });
          },
          events: {
            'click #login': 'login'
          },

          addUser_Click: function() {
            var userForList = new User({
              name: $("#userLoginName").val(),
              // pwd: $("#userLoginPassword").val(),
            });

            this.usersForTasks.add(userForList);
          },

          login: function() {
            var userLogin = new User({
              name: $("#correctUser").val(),
              // pwd: $("#correctPword").val(),
            });

            this.usersTasks.add(userLogin);
            //new UserView - link to UserView View????
          },

          addUser: function(model) {
            name = model.get('name');
            // pass = model.get('pwd');
            $("#usersForTasks").html("<font size=5 color=green>You are Successfully Registered, Login PLease</font>");
          },

          register: function(model) {;
            if (model.get('name') == name && model.get('pwd') == pass) {
              $("#divUser").html("<font size=4 color=blue>Login sucessful</font>");
            } else {
              $("#listUsers").html("<font size=5 color=green>Failed Logged in, Please Re-enter</font>");
            }
          }
        });

        // generic ctor to represent interface:
        function GUI(users, tasks, el) {
          // users is collection of User models
          // tasks is collection of Task models
          // el is selector for where GUI connects in DOM

          //...
        }

        return GUI;
      }());