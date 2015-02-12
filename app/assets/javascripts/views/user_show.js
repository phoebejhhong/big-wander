BigWander.Views.UserShow = Backbone.CompositeView.extend({
  template: JST["user-show"],
  className: "user-show",

  events: {
    "click .new-gallery": "renderNewGalleryForm",
  },

  initialize: function (options) {
    this.collection = this.model.galleries();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addGallery);
    this.listenTo(this.collection, 'change', this.render);
    this.listenTo(this.collection, 'remove', this.removeGallery);
  },

  render: function () {
    var content = this.template({
      user: this.model
    });
    this.$el.html(content);
    this.$('.new-gallery').tooltip();
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

  removeGallery: function (gallery) {
    var subview = this.findSubview(gallery, ".galleries-index");
    this.removeSubview(".galleries-index", subview);
  },

  renderGalleries: function () {
    this.collection.each(this.addGallery.bind(this));
  },

  renderNewGalleryForm: function () {
    var view = new BigWander.Views.GalleryForm({
      model: new BigWander.Models.Gallery(),
      collection: this.collection,
    });
    this.$(".gallery-form-modal").html(view.render().$el);

    this.$("#new-gallery-modal").modal();
  },


})
