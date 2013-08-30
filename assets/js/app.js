window.Todos = Ember.Application.create();

Todos.Sails = Ember.Object.extend({
  channel: null,

  init: function () {
    var self = this, io = window.io || {};

    if (typeof io.connect === 'function') {
      this.socket = io.connect();
      this.socket.on('message', function (message) {
        self.handleMessage(message);
      });
    }
  },

  subscribe: function (channel) {
    this.channel = channel;
    if (this.socket) {
      this.socket.request('/' + channel);
    }
  },

  unsubscribe: function (channel) {
    this.channel = null;
  },

  handleMessage: function (message) {
    if (message.model !== this.channel) return;

    var router = this.get('container').lookup('router:main');
    try {
      router.send(message.verb, message);
    } catch (e) {
      throw e;
    }
  }
});

Ember.Application.initializer({
  name: 'sails',
  initialize: function(container, application) {
    container.optionsForType('sails', { singleton: true });
    container.register('sails:main', Todos.Sails);
    container.typeInjection('route', 'sails', 'sails:main');
  }
});
