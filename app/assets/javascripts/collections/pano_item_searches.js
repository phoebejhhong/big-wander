BigWander.Collections.PanoItemSearches = Backbone.Collection.extend({
  url: function() {
    return '/api/pano_items?query=' + this.query;
  },
  model: BigWander.Models.PanoItem,

  initialize: function (models, options) {
    this.query = options.query;
  },
});
