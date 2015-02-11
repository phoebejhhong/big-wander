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

  // votes: function () {
  //   if (!this._votes) {
  //     this._votes = new BigWander.Collections.Votes([], {
  //       user: this
  //     });
  //   };
  //
  //   return this._votes;
  // },

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

  // parse: function (payload) {
  //   if (payload.galleries) {
  //     this.galleries().set(payload.galleries, { parse: true });
  //     delete payload.galleries;
  //   }
  //   if (payload.votes) {
  //     this.votes().set(payload.votes);
  //     delete payload.votes;
  //   }
  //
  //   return payload;
  // }
})
