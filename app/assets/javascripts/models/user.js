BigWander.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  galleries: function () {
    if (!this._galleries) {
      this._galleries = new BigWander.Collections.Galleries([], {
        user: this
      });
    }

    return this._galleries;
  },

  parse: function (payload) {
    if (payload.galleries) {
      this.galleries().set(payload.galleries, { parse: true });
      delete payload.galleries;
    }

    return payload;
  }
})
