window.BigWander = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    new BigWander.Routers.Router
    Backbone.history.start();
  }
};
