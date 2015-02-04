BigWander.Collections.PanoItems = Backbone.Collection.extend({
  url: 'api/pano_items',
  model: BigWander.Models.PanoItem,

  initialize: function (options) {
    this.gallery = options.gallery;
  },

  getOrFetch: function (id) {
    var that = this;
    var panoItem = this.get(id);

    if(!panoItem) {
      panoItem = new BigWander.Models.PanoItem({ id: id });
      panoItem.fetch({
        success: function () {
          that.add(panoItem);
        }
      });
    } else {
      panoItem.fetch();
    }

    return panoItem;
  }
});
