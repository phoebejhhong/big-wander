BigWander.Views.GallerySearchShow = Backbone.CompositeView.extend({
  template: JST["gallery-search-show"],
  className: "gallery-search-show gallery-index-item",

  events: {
  },

  initialize: function (options) {
    this.collection = this.model.panoItems()
  },

  render: function () {
    var content = this.template({
      gallery: this.model,
      owner: this.model.get("owner"),
    });
    this.$el.html(content);
    this.renderPanoItems();

    return this;
  },

  addPanoItem: function (panoItem) {
    var view = new BigWander.Views.PanoIndexItem({
      model: panoItem,
    })
    this.addSubview(".pano-items-index", view);
  },

  renderPanoItems: function () {
    this.collection.each(this.addPanoItem.bind(this));
  },

  deleteGallery: function () {
    this.model.collection.remove(this.model);
    this.model.destroy();
  },

})
