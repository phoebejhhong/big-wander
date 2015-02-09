BigWander.Views.PanoForm = Backbone.CompositeView.extend({
  template: JST["pano-form"],
  className: "pano-form",
  tagName: "form",

  initialize: function (options) {
    this.collection = this.model.collection;
    this.values = options.values;
    this.superView = options.superView;
  },

  events: {
    "submit": "savePanorama",
  },

  render: function () {
    var content = this.template({
      panoItem: this.model,
    });
    this.$el.html(content);

    return this;
  },

  savePanorama: function (event) {
    var that = this;
    event.preventDefault();
    if (!this.model.isNew()) {
      var currentGallery = this.model.collection.gallery.id
    }

    var params = $(event.currentTarget).serializeJSON();
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
        panorama.save({}, {
          success: function () {
            console.log("suc");
          },
          error: function () {
            console.log("err");
          }
        });
      },
      error: function () {
        that.$(".title-input").addClass("input-error");
      }
    });
  },
})
