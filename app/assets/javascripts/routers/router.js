BigWander.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "root",
    "random": "randomPanorama",
    "p/:lat/:lgn/:heading/:pitch": "streetViewPanoramaShow",
    "p/:lat/:lgn": "streetViewPanoramaShow",
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  root: function () {
    BigWander.goToRandomPanorama(BigWander.createRandomLat(), BigWander.createRandomLng());
  },

  randomPanorama: function () {

  },

  streetViewPanoramaShow: function (lat, lgn, heading, pitch) {
    var view = new BigWander.Views.StreetViewPanoramaShow({
      lat: lat,
      lng: lgn,
      heading: heading || "0",
      pitch: pitch || "0",
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

})
