BigWander.Views.SearchResult = Backbone.CompositeView.extend({
  template: JST["search-result"],
  className: "search-result",

  events: {
  },

  initialize: function (options) {
    this.galleries = options.galleries;
    this.panoItems = options.panoItems;
    this.listenTo(this.galleries, 'sync', this.renderGalleries);
    this.listenTo(this.panoItems, 'sync', this.renderPanoItems);
  },

  render: function () {
    var content = this.template({
    });
    this.$el.html(content);

    return this;
  },

  addGallery: function (gallery) {
    if (this.findSubview(gallery, ".galleries-search-result")) {
      this.removeGallery(gallery);
    };

    var view = new BigWander.Views.GallerySearchShow({
      model: gallery,
    })

    this.addSubview(".galleries-search-result", view);
    _(view.subviews('.pano-items-index')).each(function (subview) {
      google.maps.event.trigger(subview.panorama, 'resize');
    });
  },

  removeGallery: function (gallery) {
    var subview = this.findSubview(gallery, ".galleries-search-result");
    this.removeSubview(".galleries-search-result", subview);
  },

  renderGalleries: function () {
    if (this.galleries.length === 0) {
      this.$(".galleries-search-result").append("No Gallery Found");
    } else {
      this.galleries.each(this.addGallery.bind(this));
    };
  },

  addPanoItem: function (panoItem) {
    if (this.findSubview(panoItem, ".pano-items-search-result")) {
      this.removePanoItem(panoItem);
    };

    var view = new BigWander.Views.PanoItemSearchShow({
      model: panoItem,
    });
    this.addSubview(".pano-items-search-result", view);
    google.maps.event.trigger(view.panorama, 'resize')
  },

  removePanoItem: function (panoItem) {
    var subview = this.findSubview(panoItem, ".pano-items-search-result");
    this.removeSubview(".pano-items-search-result", subview);
  },

  renderPanoItems: function () {
    if (this.panoItems.length === 0) {
      this.$(".pano-items-search-result").append("No Street View Found");
    } else {
      this.panoItems.each(this.addPanoItem.bind(this));
    };
  },

})
