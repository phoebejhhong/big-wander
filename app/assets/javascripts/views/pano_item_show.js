BigWander.Views.PanoItemShow = Backbone.CompositeView.extend({
  template: JST["pano-item-show"],
  className: "pano-item-show",

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
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
    //setting up
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
    // drawing the street view
    this.panorama = new google.maps.StreetViewPanorama(
      this.$(".medium-panorama")[0], panoramaOptions
    );
  },

})
