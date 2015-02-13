BigWander.Views.FeaturedGalleries = Backbone.CompositeView.extend({
  template: JST["featured-galleries"],
  className: "featured-galleries",

  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.renderGalleries();
    _(this.subviews('.galleries-index')).each(function (galleryView) {
      _(galleryView.subviews('.pano-items-index')).each(function (view) {
        google.maps.event.trigger(view.panorama, 'resize');
      });
    });

    return this;
  },

  addGallery: function (gallery) {
    if (this.findSubview(gallery, ".galleries-index")) {
      this.removeGallery(gallery);
    };

    var view = new BigWander.Views.GalleryIndexItem({
      model: gallery,
    })

    this.addSubview(".galleries-index", view);
  },


  renderGalleries: function () {
    this.collection.each(this.addGallery.bind(this));
  },

  removeGallery: function (gallery) {
    var subview = this.findSubview(gallery, ".galleries-index");
    this.removeSubview(".galleries-index", subview);
  },

})
