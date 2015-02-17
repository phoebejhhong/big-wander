BigWander.Views.GalleryShow = Backbone.CompositeView.extend({
  template: JST["gallery-show"],
  className: "gallery-show",

  initialize: function (options) {
    this.pageNum = 1;

    this.collection = this.model.panoItems();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add change', this.addPanoItem);
    this.listenTo(this.collection, 'remove', this.removePanoItem);
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
    if (this.findSubview(panoItem, ".pano-items-index")) {
      this.removePanoItem(panoItem);
    };

    var view = new BigWander.Views.PanoItemShow({
      model: panoItem,
      gallery: this.model,
    });

    this.addSubview(".pano-items-index", view);

    // compute height size for each panorama
    var width = this.$(".large-panorama").width();
    this.$(".large-panorama").css({'height': width * 0.67 + 'px'});

    google.maps.event.trigger(view.panorama, 'resize')
  },

  removePanoItem: function (panoItem) {
    var subview = this.findSubview(panoItem, ".pano-items-index");
    this.removeSubview(".pano-items-index", subview);
  },

  renderPanoItems: function () {
    this.collection.each(this.addPanoItem.bind(this));
  },

})
