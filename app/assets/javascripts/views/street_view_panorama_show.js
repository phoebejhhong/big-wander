BigWander.Views.StreetViewPanoramaShow = Backbone.CompositeView.extend({
  template: JST["street-view-panorama-show"],
  className: "street-view-panorama-show",

  events: {
    "click .save-view": "saveView",
  },

  initialize: function (options) {
    this.lat = Number(options.lat);
    this.lng = Number(options.lng);
    this.heading = Number(options.heading);
    this.pitch = Number(options.pitch);
    this.loc = new google.maps.LatLng(this.lat,this.lng);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.renderMap();
    this.renderAddress();
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
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
      panControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
    };
    window.panorama = this.panorama = new google.maps.StreetViewPanorama(this.$("#big-panorama")[0], panoramaOptions);

  },

  renderAddress: function () {
    var that = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': this.loc}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          that.$(".address").append(results[1].formatted_address);
        }
      }
    });
  },

  saveView: function () {
    var panoItem = new BigWander.Models.PanoItem({
      
    })
  },
})
