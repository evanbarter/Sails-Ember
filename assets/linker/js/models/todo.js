Todos.Todo = Ember.Model.extend({
  id: Ember.attr(),
  title: Ember.attr(),
  isCompleted: Ember.attr(),
});

Todos.Todo.url = "/todo";
Todos.Todo.adapter = Ember.RESTAdapter.create({
  ajaxSettings: function(url, method) {
    url = url.replace('.json', '');
    return {
      url: url,
      type: method,
      dataType: "json"
    };
  }
});
