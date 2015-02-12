BigWander.Views.PanoIndexItem = Backbone.CompositeView.extend({
  template: JST["pano-index-item"],
  className: "pano-index-item",
  tagName: "li",

  initialize: function (options) {
    this.lat = Number(this.model.get("lat"));
    this.lng = Number(this.model.get("lng"));
    this.heading = Number(this.model.get("heading"));
    this.pitch = Number(this.model.get("pitch"));
    this.loc = new google.maps.LatLng(this.lat,this.lng);
  },

  render: function () {
    var content = this.template({
      panoItem: this.model
    });
    this.$el.html(content);
    this.renderMap();

    return this;
  },

  renderMap: function () {
    var panoramaOptions = {
      position: this.loc,
      pov: {
        heading: this.heading,
        pitch: this.pitch,
      },
      visible: true,
      addressControl: false,
      scrollwheel: false,
      zoomControl: false,
      panControl: false,
    };
    this.panorama = new google.maps.StreetViewPanorama(
      this.$(".medium-panorama")[0], panoramaOptions
    );
  },

})
