BigWander.Views.GalleryIndexItem = Backbone.CompositeView.extend({
  template: JST["gallery-index-item"],
  className: "gallery-index-item",

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render());
  },

  render: function () {
    var content = this.template({
      gallery: this.model
    });
    this.$el.html(content);

    return this;
  }

})
