BigWander.Collections.Votes = Backbone.Collection.extend({
  url: '/api/votes',
  model: BigWander.Models.Vote,

  panoItemIds: function () {
    if (!this._panoItemIds) {
      this._panoItemIds = [];
      this.each(function (vote) {
        this._panoItemIds.push(vote.get("pano_item_id"));
      });
    };

    return this._panoItemIds
  },
});
