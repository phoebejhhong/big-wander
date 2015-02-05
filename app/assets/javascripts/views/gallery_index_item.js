BigWander.Views.GalleryIndexItem = Backbone.CompositeView.extend({
  template: JST["gallery-index-item"],
  className: "gallery-index-item",

  events: {
    "click .delete-gallery": "deleteGallery",
  },

  initialize: function (options) {
    // display only the first two items
    this.collection = this.model.panoItems().slice(0, 2)
  },

  render: function () {
    var content = this.template({
      gallery: this.model
    });
    this.$el.html(content);
    this.renderPanoItems();

    return this;
  },

  addPanoItem: function (panoItem) {
    var view = new BigWander.Views.PanoIndexItem({
      model: panoItem
    })
    this.addSubview(".pano-items-index", view);
  },

  renderPanoItems: function () {
    _(this.collection).each(this.addPanoItem.bind(this));
  },

  deleteGallery: function () {
    this.model.collection.remove(this.model);
    this.model.destroy();
  },

})
