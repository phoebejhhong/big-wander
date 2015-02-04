BigWander.Views.GalleryIndexItem = Backbone.CompositeView.extend({
  template: JST["gallery-index-item"],
  className: "gallery-index-item",

  initialize: function (options) {
    this.collection = this.model.panoItems();
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
    this.collection.each(this.addPanoItem.bind(this));
  },

})
