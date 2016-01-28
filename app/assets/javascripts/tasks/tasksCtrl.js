angular.module('textUp')
.controller('TasksCtrl', [
  '$scope',
  '$state',
  '$translate',
  'Task',
  'Comment',
  'tasks',
  'notifications',

  function($scope, $state, $translate, Task, Comment, tasks, notifications){
    $scope.tasks = tasks.tasks;
    $scope.task = tasks.task;
    $scope.customer = $scope.task ? $scope.task.customer : tasks.customer;
    $scope.projects = tasks.projects;
    $scope.project = tasks.project || ($scope.task ? $scope.task.project : null);
    $scope.statuses = tasks.statuses;
    $scope.customers = tasks.customers;
    $scope.user = tasks.user;
    $scope.sortType = 'title';
    $scope.sortReverse = false;
    var allProjects = [];
    angular.copy(tasks.projects, allProjects);

    $scope.rowClick = function(task){
      $state.go("show_task", {task_id: task.id});
    };

    if (tasks.statuses) {
      tasks.statuses.$promise.then(function(statuses) {
        $scope.status = statuses[0];
      });
    };

    $scope.changeCustomer = function(customer){
      if (customer){
        $scope.projects = customer.projects;
      } else {
        $scope.projects = allProjects;
      }
    };

    $scope.changeProject = function(project){
      if (project){
        $scope.customer = project.customer ? project.customer : $scope.customer;
      }
    };

    $scope.destroyTask = function(task, redirectState) {
      $translate(['confirm_delete', 'task', 'deleted_success']).then(
        function(translations){
          if (confirm(translations.confirm_delete)) {
            Task.remove({user_id: $scope.user.id, id: task.id}, function() {
              $scope.tasks.splice($scope.tasks.indexOf(task), 1);
              var message = translations.task + " '" +
                task.title + "' " + translations.deleted_success;
              notifications.addNotification(message, "success");
              if (redirectState) {
                $state.go(redirectState);
              };
            });
          };
        }
      );
    };

    $scope.destroyComment = function(comment) {
      $translate(['confirm_delete', 'comment', 'deleted_success']).then(
        function(translations){
          if (confirm(translations.confirm_delete)) {
            Comment.remove({user_id: $scope.user.id, task_id: comment.task_id, id: comment.id},
              function() {
                $scope.task.comments.splice($scope.task.comments.indexOf(comment), 1);
                var message = translations.comment + " " + translations.deleted_success;
                notifications.addNotification(message, "success");
              }
            );
          };
        }
      );
    };

    $scope.addComment = function() {
      if($scope.newComment === '') { return; };
      var comment = new Comment({
        task_id: $scope.task.id,
        message: $scope.newComment
      });
      comment.$save({user_id: $scope.user.id, task_id: $scope.task.id}).then(function(comment){
        $scope.newComment = '';
        $scope.task.comments.push(comment);
        $translate(['comment', 'added_success']).then(
          function(translations){
            var message = translations.comment + " "
              + translations.added_success;
            notifications.addNotification(message, "success");
          }
        );
      });
    };

    $scope.updateComment = function(comment) {
      if(comment.message === '') { return; };
      Comment.update({
        user_id: $scope.user.id,
        task_id: $scope.task.id,
        id: comment.id
      }, comment)
        .$promise.then(
          function(comment){
            $translate(['comment', 'updated_success']).then(
              function(translations){
                var message = translations.comment +
                  " " + translations.updated_success;
                notifications.addNotification(message, "success");
              }
            );
          }
        );
    };

    $scope.addTask = function(redirectState) {
      if($scope.newTaskTitle === '') { return; };
      if(!$scope.customer) { return; };
      var task = new Task({
        user_id: $scope.user.id,
        project_id: ($scope.project ? $scope.project.id : null),
        customer_id: ($scope.customer ? $scope.customer.id : null),
        status_id: $scope.status.id,
        title: $scope.newTaskTitle,
        description: $scope.newTaskDescription,
        started_at: $scope.startDateTime,
        estimated_finish: $scope.estimatedFinishDateTime,
      });
      task.$save().then(function(task){
        $scope.newTaskTitle = '';
        $scope.newTaskDescription = '';
        $scope.startDateTime = undefined;
        $scope.estimatedFinishDateTime = undefined;
        $translate(['task', 'added_success']).then(
          function(translations){
            var message = translations.task + " '" +
              task.title + "' " + translations.added_success;
            notifications.addNotification(message, "success");
          }
        );
        if (redirectState) {
          $state.go(redirectState);
        } else {
          if ($scope.project) {
            $state.go('show_project', { project_id: $scope.project.id });
          } else {
            $state.go('tasks');
          };
        };
      });
    };

    $scope.updateTask = function() {
      if($scope.task.title === '') { return; };
      $scope.task.project_id = ($scope.project ? $scope.project.id : null);
      $scope.task.status_id = $scope.task.status.id;
      $scope.task.customer_id = ($scope.customer ? $scope.customer.id : null);
      Task.update({ id: $scope.task.id }, $scope.task)
        .$promise.then(
          function(task){
            $translate(['task', 'updated_success']).then(
              function(translations){
                var message = translations.task + " '" +
                  task.title + "' " + translations.updated_success;
                notifications.addNotification(message, "success");
              }
            );
            $state.go('show_task', { task_id: task.id });
          }
        );
    };

  }
])