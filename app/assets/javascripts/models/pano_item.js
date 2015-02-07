BigWander.Models.PanoItem = Backbone.Model.extend({
  urlRoot: '/api/pano_items',

  initialize: function () {
  },

  getImageUrl: function () {
    var url = "https://maps.googleapis.com/maps/api/streetview?size=600x400";
    url += "&location=" + this.get("lat") + "," + this.get("lng");
    url += "&heading=" + this.get("heading");
    url += "&pitch=" + this.get("pitch");
    return url;
  },

  getPanoramaViewUrl: function () {
    var url = "/p/" + this.get("lat") + "/" + this.get("lng") + "/"
    url += this.get("heading") +"/" + this.get("pitch")
    return url;
  }

})
