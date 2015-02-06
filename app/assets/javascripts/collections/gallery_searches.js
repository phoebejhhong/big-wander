BigWander.Collections.GallerySearches = Backbone.Collection.extend({
  url: function() {
    return '/api/galleries?query=' + this.query;
  },
  model: BigWander.Models.Gallery,

  initialize: function (models, options) {
    this.query = options.query;
  },
});
