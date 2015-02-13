BigWander.Views.PanoForm = Backbone.CompositeView.extend({
  template: JST["pano-form"],
  className: "pano-form",
  tagName: "form",

  initialize: function (options) {
    this.collection = this.model.collection;
    this.values = options.values;
    this.superView = options.superView;
    this.listenTo(BigWander.currentUser.galleries(), "add", this.render);
  },

  events: {
    "submit": "savePanorama",
    "change .choose-gallery": "renderGalleryForm",
  },

  render: function () {
    var content = this.template({
      panoItem: this.model,
    });
    this.$el.html(content);

    return this;
  },

  renderGalleryForm: function (event) {
    if ($(event.currentTarget).find("option:selected").val() === "new") {
      var view = new BigWander.Views.GalleryForm({
        model: new BigWander.Models.Gallery(),
        collection: BigWander.currentUser.galleries(),
      });
      $(".gallery-form-modal").html(view.render().$el);

      $("#new-gallery-modal").modal();
    };
  },

  savePanorama: function (event) {
    var that = this;
    event.preventDefault();
    if (!this.model.isNew()) {
      var currentGallery = this.model.collection.gallery.id
    }
    var params = $(event.currentTarget).serializeJSON();
    if (params["gallery_id"] === "choose" || "new") {
      that.$(".choose-gallery").addClass("input-error");
      return;
    } else {
      that.$(".choose-gallery").removeClass("input-error");
    };
    this.values ? $.extend(params, this.values) : false;
    this.model.save(params, {
      success: function () {
        // remove from collection if reassigned to another gallery
        if (currentGallery && that.model.get("gallery_id") !== currentGallery) {
          that.collection.remove(that.model);
        };

        if (that.superView.closeSavePanoForm) {
          that.superView.closeSavePanoForm();
        } else {
          that.superView.closeEditPanoForm();
        };
        var panorama = new BigWander.Models.Panorama(that.values);
        panorama.save();
      },
      error: function () {
        that.$(".title-input").addClass("input-error");
      }
    });
  },
})
