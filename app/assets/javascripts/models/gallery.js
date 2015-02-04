BigWander.Models.Gallery = Backbone.Model.extend({
  urlRoot: 'api/galleries',

  panoItems: function () {
    if (!this._panoItems) {
      this._panoItems = new BigWander.Collections.PanoItems([], {
        gallery: this
      });;
    }

    return this._panoItems;
  },

  parse: function (payload) {
    if (payload.pano_items) {
      this.panoItems().set(payload.pano_items);
      delete payload.pano_items;
    }

    return payload;
  }
})
