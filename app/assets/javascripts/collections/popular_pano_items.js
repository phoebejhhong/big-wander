BigWander.Collections.PopularPanoItems = Backbone.Collection.extend({
  url: function() {
    return '/api/pano_items?popular=' + this.num;
  },
  model: BigWander.Models.PanoItem,

  initialize: function (models, options) {
    this.num = options.num.toString();
  },
});
