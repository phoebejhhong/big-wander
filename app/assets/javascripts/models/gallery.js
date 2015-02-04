BigWander.Models.Gallery = Backbone.Model.extend({
  urlRoot: 'api/galleries',

  // galleries: function () {
  //   if (!this._galleries) {
  //     this._galleries = {};
  //   }
  //
  //   return this._galleries;
  // },
  //
  // parse: function (payload) {
  //   if (payload.galleries) {
  //     this.galleries().set(payload.galleries);
  //     delete payload.galleries();
  //   }
  //
  //   return payload;
  // }
})
