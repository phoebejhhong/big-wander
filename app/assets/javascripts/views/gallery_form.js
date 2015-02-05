BigWander.Views.GalleryForm = Backbone.CompositeView.extend({
  template: JST["gallery-form"],
  className: "gallery-form",
  tagName: "form",

  initialize: function (options) {
  },

  events: {
    "submit": "saveGallery",
    "click .close-gallery-form": "closeForm",
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  saveGallery: function (event) {
    var that = this;
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON();
    params.gallery.owner_id = BigWander.currentUserId;
    this.model.save(params["gallery"], {
      success: function () {
        that.collection.add(that.model);
        that.remove();
      },
      error: function () {
        that.$(".title-input").addClass("input-error");
      }
    });
  },

  closeForm: function () {
    this.remove();
  },

})
