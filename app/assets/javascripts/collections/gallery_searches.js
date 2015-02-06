BigWander.Collections.GallerySearches = Backbone.Collection.extend({
  url: function() {
    return '/api/galleries?query=' + this.query;
  },
  model: BigWander.Models.Gallery,

  initialize: function (models, options) {
    this.query = options.query;
  },

  parse: function (payload) {
    if (payload.pano_items) {
      this.panoItems().set(payload.pano_items);
      delete payload.pano_items;
    }

    return payload;
  },

  panoItems: function () {
    if (!this._panoItems) {
      this._panoItems = new BigWander.Collections.PanoItems([], {
        gallery: this
      });;
    };

    return this._panoItems;
  },
});
