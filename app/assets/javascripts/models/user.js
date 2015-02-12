BigWander.Models.User = Backbone.Model.extend({
  urlRoot: '/api/users',

  initialize: function () {
  },

  galleries: function () {
    if (!this._galleries) {
      this._galleries = new BigWander.Collections.Galleries([], {
        user: this
      });
    };

    return this._galleries;
  },

  parse: function (payload) {
    if (payload.galleries) {
      this.galleries().set(payload.galleries, { parse: true });
      delete payload.galleries;
    }
    if (payload.votes) {
      var that = this;
      this.votes = {};
      payload.votes.forEach(function (vote) {
        // store pano items as keys and vote ids as values...
        that.votes[vote["pano_item_id"]] = Number(vote["id"]);
      });
      delete payload.votes;
    }

    return payload;
  },

})
