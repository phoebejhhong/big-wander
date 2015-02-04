BigWander.Models.PanoItem = Backbone.Model.extend({
  urlRoot: 'api/pano_items',

  initialize: function () {
    this.getImageUrl();
  },

  getImageUrl: function () {
    var url = "https://maps.googleapis.com/maps/api/streetview?size=400x400";
    url += "&location=" + this.get("lat") + "," + this.get("lng");
    url += "&heading=" + this.get("heading");
    url += "&pitch=" + this.get("pitch");
    this.imageUrl = url;
  },

})
