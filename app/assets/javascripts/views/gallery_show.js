BigWander.Views.GalleryShow = Backbone.CompositeView.extend({
  template: JST["gallery-show"],
  className: "gallery-show",

  initialize: function (options) {
    this.collection = this.model.panoItems();
    this.listenTo(this.model, 'sync', this.render);
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
    var view = new BigWander.Views.PanoItemShow({
      model: panoItem
    });

    this.addSubview(".pano-items-index", view);
    google.maps.event.trigger(view.panorama, 'resize')
  },

  renderPanoItems: function () {
    this.collection.each(this.addPanoItem.bind(this));
  },

})
