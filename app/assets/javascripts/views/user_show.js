BigWander.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["user-show"],
  className: "user-show",

  initialize: function (options) {
    this.collection = this.model.galleries();
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.renderGalleries();

    return this;
  },

  addGallery: function (gallery) {
    var view = new BigWander.Views.GalleryIndexItem({
      model: gallery
    })
    this.addSubview(".galleries-index", view);
  },

  renderGalleries: function () {
    this.collection.each(this.addGallery.bind(this));
  },

})
