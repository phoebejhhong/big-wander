BigWander.Views.Root = Backbone.CompositeView.extend({
  template: JST["root"],
  className: "root",

  LIST: [
  [],
  [],
  ],

  events: {
    "click .show-form": "renderSavePanoForm",
    "click .close-form": "closeSavePanoForm",
  },

  initialize: function (options) {

  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    // this.renderStreetView();
    // this.renderMap();
    // this.renderAddress();
    return this;
  },

  renderMap : function () {
    var mapOptions = {
      center: this.loc,
      zoom: 3,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false,
    };

    this.map = new google.maps.Map(
      this.$(".world-map-view")[0],mapOptions
      );

    this.marker = new google.maps.Marker({
      position: this.loc,
      map: this.map,
      title: "Current Location",
    });

    this.marker.setMap(this.map);
  },

  renderStreetView: function () {
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
      this.$("#half-full-panorama")[0], panoramaOptions
      );
  },



  // reflecting user's interaction with street view
  getCurrentValues: function () {
    var lat = this.panorama.getPosition().k;
    var lng = this.panorama.getPosition().D;
    var heading = this.panorama.getPov().heading;
    var pitch = this.panorama.getPov().pitch;

    return {
      lat: lat, lng: lng, heading: heading, pitch: pitch
    }
  },

  renderSavePanoForm: function () {
    var that = this;
    if (BigWander.currentUser) {
      this.$(".show-form").removeClass("show-form").addClass("close-form").html("Close");
      var view = new BigWander.Views.PanoForm({
        values: that.getCurrentValues(),
        model: new BigWander.Models.PanoItem,
        superView: that,
        gallery: null,
      });

      that.addSubview(".save-pano-form-wrapper", view);
    } else {
      $("#login-modal").modal();
    };
  },

  closeSavePanoForm: function () {
    var subview = this.subviews(".save-pano-form-wrapper")[0];
    this.removeSubview(".save-pano-form-wrapper", subview);
    this.$(".close-form").removeClass("close-form").addClass("show-form").html("Save this view");
  },

})
