BigWander.Views.StreetViewPanoramaShow = Backbone.CompositeView.extend({
  template: JST["street-view-panorama-show"],
  className: "street-view-panorama-show",

  events: {
    "click .show-form": "renderSavePanoForm",
    "click .close-form": "closeSavePanoForm",
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
      this.$("#full-panorama")[0], panoramaOptions
      );
  },

  renderAddress: function () {
    var that = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': this.loc}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          window.$(".address").append(results[1].formatted_address);
        }
      }
    });
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
    this.$(".show-form").removeClass("show-form").addClass("close-form").html("Close");
    if (BigWander.currentUser) {
      // get current user's gallery lists
      BigWander.currentUser.fetch({
        success: function () {
          var view = new BigWander.Views.PanoForm({
            values: that.getCurrentValues(),
            model: new BigWander.Models.PanoItem,
            gallery: null,
          });

          that.addSubview(".save-pano-form-wrapper", view);
        },
      });
    } else {
      // TODO: sign in required!
    };
  },

  closeSavePanoForm: function () {
    var subview = this.subviews(".save-pano-form-wrapper")[0];
    this.removeSubview(".save-pano-form-wrapper", subview);
    this.$(".close-form").removeClass("close-form").addClass("show-form").html("Save this view");
  },

})
