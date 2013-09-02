Todos.Router.map(function () {
  this.resource('todos', { path: '/' }, function () {
    this.route('active');
    this.route('completed');
  });
});

Todos.TodosRoute = Ember.Route.extend({
  model: function () {
    return Todos.Todo.find();
  },
  activate: function() {
    this.get('sails').subscribe('todo');
  },
  deactivate: function() {
    this.get('sails').unsuscribe('todo');
  },

  actions: {
    update: function (message) {
      Todos.Todo.find(message.data.id).setProperties({
        title: message.data.title,
        isCompleted: message.data.isCompleted
      });
    },
    create: function (message) {
      var saving = Ember.get(Todos, 'savingTodo');
      console.log(saving);
      if (!saving || !Ember.get(saving, 'isSaving')) {
        console.log('doing a lookup for ' + message.id);
        Todos.Todo.find(message.id);
      }
    },
    destroy: function (message) {
      Todos.Todo.find(message.id).didDeleteRecord();
    }
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
