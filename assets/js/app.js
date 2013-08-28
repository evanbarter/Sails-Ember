window.Todos = Ember.Application.create();

(function (io) {
  var socket = io.connect();

  socket.on('connect', function () {
    // This is necessary to listen for comet messages.
    socket.request('/todo');

    socket.on('message', function (message) {
      if (message.model !== 'todo') return;

      switch (message.verb) {
        case 'update':
          var local = Todos.Todo.find(message.id).setProperties({
            title: message.data.title,
            isCompleted: message.data.isCompleted
          });
          break;
        case 'destroy':
          Todos.Todo.find(message.id).didDeleteRecord();
          break;
        case 'create':
          var saving = Ember.get(Todos, 'savingTodo');
          if (!saving || !Ember.get(saving, 'isSaving')) {
            Todos.Todo.find(message.id);
          }
          break;
      }
    });

  });

  window.socket = socket;
})(window.io);