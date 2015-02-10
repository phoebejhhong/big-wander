BigWander.Views.PanoItemSearchShow = Backbone.CompositeView.extend({
  template: JST["pano-item-search-show"],
  className: "pano-item-search-show clearfix",

  events: {
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.lat = Number(this.model.get("lat"));
    this.lng = Number(this.model.get("lng"));
    this.heading = Number(this.model.get("heading"));
    this.pitch = Number(this.model.get("pitch"));
    this.loc = new google.maps.LatLng(this.lat,this.lng);
    this.gallery = this.model.get("gallery");
    this.owner = this.model.get("gallery")["owner"];
  },

  render: function () {
    var content = this.template({
      panoItem: this.model,
      gallery: this.gallery,
      owner: this.owner,
    });
    this.$el.html(content);
    this.$('.view-full-size').tooltip();
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
      scrollwheel: false,
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
