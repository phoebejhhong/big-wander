BigWander.Routers.Router = Backbone.Router.extend({
  routes: {
    "": "root",
    "random": "randomPanorama",
    "p/:lat/:lgn/:heading/:pitch": "streetViewPanoramaShow",
    "p/:lat/:lgn": "streetViewPanoramaShow",
    "users/new": "",
    "users/:id": "userShow",
    "galleries/:id": "galleryShow",
    "search/:query": "searchQuery",
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  root: function () {
    // TODO: shouldn't fetch here...
    BigWander.panoramas.fetch({
      success: function () {
        Backbone.history.navigate("/random", {trigger: true});
      }
    });

  },

  randomPanorama: function () {
    // old slow pure way of picking random coordiates used to be like...
    // BigWander.goToRandomPanorama(BigWander.createRandomLat(), BigWander.createRandomLng());

    // instead I decided to keep database
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
    var currCenter = view.map.getCenter();
    google.maps.event.trigger(view.map, 'resize');
    view.map.setCenter(currCenter);
  },

  userShow: function (id) {
    var user = new BigWander.Models.User({
      id: id
    });
    user.fetch();
    var view = new BigWander.Views.UserShow({
      model: user
    });

    this._swapView(view);
  },

  galleryShow: function (id) {
    var gallery = new BigWander.Models.Gallery({
      id: id
    });
    gallery.fetch();
    var view = new BigWander.Views.GalleryShow({
      model: gallery
    });

    this._swapView(view);
  },

  searchQuery: function (query) {
    var galleries = new BigWander.Collections.GallerySearches([], {
      query: query
    });
    galleries.fetch();

    var panoItems = new BigWander.Collections.PanoItemSearches([], {
      query: query
    });
    panoItems.fetch();

    var view = new BigWander.Views.SearchResult({
      galleries: galleries,
      panoItems: panoItems,
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

})
