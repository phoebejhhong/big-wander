BigWander.Routers.Router = Backbone.Router.extend({
  routes: {
    "p/:lat/:lgn/:heading/:pitch": "streetViewPanoramaShow",
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  streetViewPanoramaShow: function (lat, lgn, heading, pitch) {
    this.$rootEl.html("lat:" + lat + "<br> lgn:" + lgn + "<br> heading:" + heading + "<br> pitch:" + pitch);
  },



})
