window.BigWander = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  initialize: function() {
    new BigWander.Routers.Router({
      $rootEl: $(".main")
    });
    Backbone.history.start();
  }
};
