BigWander.Collections.PanoItems = Backbone.Collection.extend({
  url: '/api/pano_items',
  model: BigWander.Models.PanoItem,

  initialize: function (models, options) {
    this.gallery = options.gallery;

    if (options.num) {
      // if paginated
      this.num = options.num.toString();
      this.pageNum = options.pageNum.toString();
    }
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
  },

  parse: function(payload) {
    if (payload.page) {
      // if paginated
      this.page = payload.page;
      this.totalPages = payload.total_pages;
      return payload.pano_items;
    } else {
      return payload;
    }
  },
});
