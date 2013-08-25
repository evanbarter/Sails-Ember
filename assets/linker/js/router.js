Todos.Router.map(function () {
  this.resource('todos', { path: '/' }, function () {
    this.route('active');
    this.route('completed');
  });
});

Todos.TodosRoute = Ember.Route.extend({
  model: function () {
    return Todos.Todo.find();
  }
});

Todos.TodosIndexRoute = Ember.Route.extend({
  model: function () {
    return Todos.Todo.find();
  }
});

Todos.TodosActiveRoute = Ember.Route.extend({
  model: function() {
    return Ember.FilteredRecordArray.create({
      modelClass: Todos.Todo,
      filterFunction: function (todo) {
        return !todo.get('isCompleted');
      },
      filterProperties: ['isCompleted']
    });
  },
  renderTemplate: function(controller){
    this.render('todos/index', {controller: controller});
  }
});

Todos.TodosCompletedRoute = Ember.Route.extend({
  model: function() {
    return Ember.FilteredRecordArray.create({
      modelClass: Todos.Todo,
      filterFunction: function (todo) {
        return !!todo.get('isCompleted');
      },
      filterProperties: ['isCompleted']
    });
  },
  renderTemplate: function(controller){
    this.render('todos/index', {controller: controller});
  }
});
