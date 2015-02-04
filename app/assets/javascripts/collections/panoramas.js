BigWander.Collections.Panoramas = Backbone.Collection.extend({
  url: 'api/panoramas',
  model: BigWander.Models.Panorama,

  getOrFetch: function (id) {
    var that = this;
    var panorama = this.get(id);

    if(!panorama) {
      panorama = new BigWander.Models.Panorama({ id: id });
      panorama.fetch({
        success: function () {
          that.add(panorama);
        }
      });
    } else {
      panorama.fetch();
    }

    return panorama;
  }
})

BigWander.panoramas = new BigWander.Collections.Panoramas
