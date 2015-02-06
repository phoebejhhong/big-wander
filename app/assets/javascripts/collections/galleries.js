BigWander.Collections.Galleries = Backbone.Collection.extend({
  url: 'api/galleries',
  model: BigWander.Models.Gallery,

  initialize: function (models, options) {
    this.user = options.user;
    this.query = options.query;
  },

  getOrFetch: function (id) {
    var that = this;
    var gallery = this.get(id);

    if(!gallery) {
      gallery = new BigWander.Models.Gallery({ id: id });
      gallery.fetch({
        success: function () {
          that.add(gallery);
        }
      });
    } else {
      gallery.fetch();
    }

    return gallery;
  }
});
