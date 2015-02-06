BigWander.Views.SearchResult = Backbone.CompositeView.extend({
  template: JST["search-result"],
  className: "search-result",

  events: {
  },

  initialize: function (options) {
    this.galleries = options.galleries;
    // this.pano_items = options.pano_items;
    this.listenTo(this.galleries, 'sync', this.render);
    // this.listenTo(this.pano_items), 'sync', this.render);
    // this.listenTo(this.collection, 'add', this.addGallery);
    // this.listenTo(this.collection, 'change', this.render);
    // this.listenTo(this.collection, 'remove', this.removeGallery);
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
    if (this.findSubview(gallery, ".galleries-index")) {
      this.removeGallery(gallery);
    };

    var view = new BigWander.Views.GalleryIndexItem({
      model: gallery,
    })

    this.addSubview(".galleries-index", view);
  },

  removeGallery: function (gallery) {
    var subview = this.findSubview(gallery, ".galleries-index");
    this.removeSubview(".galleries-index", subview);
  },

  renderGalleries: function () {
    this.galleries.each(this.addGallery.bind(this));
  },


})
