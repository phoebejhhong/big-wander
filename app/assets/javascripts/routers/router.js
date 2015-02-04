BigWander.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "root",
    "p/:lat/:lgn/:heading/:pitch": "streetViewPanoramaShow",
    "p/:lat/:lgn": "streetViewPanoramaShow",
    "users/:id": "userShow",
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  root: function () {
    BigWander.panoramas.fetch({
      success: this.randomPanorama
    });
  },

  randomPanorama: function () {
    // BigWander.goToRandomPanorama(BigWander.createRandomLat(), BigWander.createRandomLng());
    var random_idx = Math.floor(Math.random() * BigWander.panoramas.length);
    var panorama = BigWander.panoramas.models[random_idx];
    var url = "p/" + panorama.get("lat") +"/" + panorama.get("lng") +
      "/" + panorama.get("heading") +"/" + panorama.get("pitch")
    Backbone.history.navigate(url, {trigger: true});
  },

  streetViewPanoramaShow: function (lat, lgn, heading, pitch) {
    var view = new BigWander.Views.StreetViewPanoramaShow({
      lat: lat,
      lng: lgn,
      heading: heading || "0",
      pitch: pitch || "0",
    });

    this._swapView(view);
    google.maps.event.trigger(view.panorama, 'resize')
  },

  userShow: function (id) {
    var user = new BigWander.Models.User({
      id: id
    });
    user.fetch();
    var view = new BigWander.Views.UserShow({
      model: user
    })
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

})
