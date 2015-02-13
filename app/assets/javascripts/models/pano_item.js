BigWander.Models.PanoItem = Backbone.Model.extend({
  urlRoot: '/api/pano_items',

  initialize: function () {
  },

  getPanoramaViewUrl: function () {
    var url = "/p/" + this.get("lat") + "/" + this.get("lng") + "/"
    url += this.get("heading") +"/" + this.get("pitch")
    return url;
  },
});
