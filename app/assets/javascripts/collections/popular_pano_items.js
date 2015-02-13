BigWander.Collections.PopularPanoItems = Backbone.Collection.extend({
  url: function() {
    var url = '/api/pano_items?popular=' + this.num;
    url += '&page=' + this.pageNum;
    return  url;
  },
  model: BigWander.Models.PanoItem,

  initialize: function (models, options) {
    this.num = options.num.toString();
    this.pageNum = options.pageNum.toString();
  },
});
