BigWander.Views.PanoItemShow = Backbone.CompositeView.extend({
  template: JST["pano-item-show"],
  className: "pano-item-show",

  events: {
    "click .delete-pano-item": "deletePanoItem",
    "click .edit-pano-item": "renderEditPanoForm",
    "click .close-pano-form": "closeEditPanoForm",
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.gallery = options.gallery;
    this.lat = Number(this.model.get("lat"));
    this.lng = Number(this.model.get("lng"));
    this.heading = Number(this.model.get("heading"));
    this.pitch = Number(this.model.get("pitch"));
    this.loc = new google.maps.LatLng(this.lat,this.lng);
  },

  render: function () {
    var content = this.template({
      panoItem: this.model,
      gallery: this.gallery,
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
      this.$(".large-panorama")[0], panoramaOptions
    );
  },

  renderEditPanoForm: function () {
    this.$(".edit-pano-item").removeClass("edit-pano-item").addClass("close-pano-form");
    var view = new BigWander.Views.PanoForm({
      model: this.model,
      superView: this,
    });
    this.addSubview(".edit-pano-item-form-wrapper", view);
  },

  closeEditPanoForm : function () {
    var subview = this.subviews(".edit-pano-item-form-wrapper")[0];
    this.removeSubview(".edit-pano-item-form-wrapper", subview);
    this.$(".close-pano-form").removeClass("close-pano-form").addClass("edit-pano-item");
  },

  deletePanoItem: function () {
    this.model.destroy();
  },

})
