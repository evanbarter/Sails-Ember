Todos.TodosController = Ember.ArrayController.extend({
  createTodo: function () {
    // Get the todo title set by the "New Todo" text field
    var title = this.get('newTitle');
    if (!title.trim()) { return; }

    // Create the new Todo model
    var todo = Todos.Todo.create({
      title: title,
      isCompleted: false
    });

    // Clear the "New Todo" text field
    this.set('newTitle', '');

    // Save the new model
    todo.save();
  },

  remaining: function () {
    return this.filterProperty('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function () {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'todo' : 'todos';
  }.property('remaining'),

  hasCompleted: function () {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function () {
    return this.filterProperty('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

  clearCompleted: function () {
    var completed = this.filterProperty('isCompleted', true);
    completed.invoke('deleteRecord');

    this.get('store').commit();
  },

  allAreDone: function (key, value) {
    if (value === undefined) {
      return !!this.get('length') && this.everyProperty('isCompleted', true);
    } else {
      this.setEach('isCompleted', value);
      this.get('store').save();
      return value;
    }
  }.property('@each.isCompleted')
});