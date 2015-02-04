BigWander.Views.StreetViewPanoramaShow = Backbone.CompositeView.extend({
  template: JST["street-view-panorama-show"],
  className: "street-view-panorama-show",

  initialize: function (options) {
    this.lat = Number(options.lat);
    this.lng = Number(options.lng);
    this.heading = Number(options.heading);
    this.pitch = Number(options.pitch);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.renderMap();
    return this;
  },

  renderMap: function () {
    var loc = new google.maps.LatLng(this.lat,this.lng);
    var panoramaOptions = {
      position: loc,
      pov: {
        heading: this.heading,
        pitch: this.pitch,
      },
      visible: true,
      addressControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
      panControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
    };
    BigWander.panorama =new google.maps.StreetViewPanorama(this.$("#big-panorama")[0], panoramaOptions);
  },
})
