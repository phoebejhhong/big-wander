BigWander.Views.Root = Backbone.CompositeView.extend({
  template: JST["root"],
  className: "root",

  events: {
    "click .root-pano-item-anchor": "getNewValues",
    "click .show-form": "renderSavePanoForm",
    "click .close-form": "closeSavePanoForm",
},

  initialize: function (options) {
    this.collection = new BigWander.Collections.PopularPanoItems([], {
      num: 5,
    });
  },

  render: function () {
    var that = this;

    var content = this.template();
    this.$el.html(content);
    this.collection.fetch({
      success: that.renderPanoItems.bind(this),
    });

    return this;
  },

  renderPanoItems: function () {
    this.collection.each(this.addPanoItem.bind(this));
    // set initial values
    this.setValues(this.collection.first());
  },

  addPanoItem: function (panoItem) {
    var view = new BigWander.Views.RootPanoIndexItem({
      model: panoItem,
    });

    this.addSubview(".pano-items-index", view);
  },

  setValues: function (panoItem) {
    this.lat = Number(panoItem.get("lat"));
    this.lng = Number(panoItem.get("lng"));
    this.heading = Number(panoItem.get("heading"));
    this.pitch = Number(panoItem.get("pitch"));
    this.loc = new google.maps.LatLng(this.lat,this.lng);

    this.renderStreetView();
    this.renderMap();
    this.renderAddress();
  },

  getNewValues: function (event) {
    var panoId = $(event.currentTarget).data("id");
    var panoItem = this.collection.get(panoId);
    this.setValues(panoItem);
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

    window.map = this.map = new google.maps.Map(
      this.$(".world-map-view")[0], mapOptions
      );

    this.marker = new google.maps.Marker({
      position: this.loc,
      map: this.map,
      title: "Current Location",
    });

    this.marker.setMap(this.map);
  },

  renderStreetView: function () {
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
    this.panorama = new google.maps.StreetViewPanorama(
      this.$("#half-full-panorama")[0], panoramaOptions
      );
  },

  renderAddress: function () {
    var that = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': this.loc}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          window.$(".address").find("span").html(results[1].formatted_address);
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

  resizeMap: function () {
    alert("yesss");
  },

})
