BigWander.Views.RootPanoIndexItem = Backbone.CompositeView.extend({
  template: JST["root-pano-index-item"],
  className: "root-pano-index-item",

  events: {
    "click .vote-pano-item": "votePanoItem",
  },

  initialize: function (options) {
    this.lat = Number(this.model.get("lat"));
    this.lng = Number(this.model.get("lng"));
    this.heading = Number(this.model.get("heading"));
    this.pitch = Number(this.model.get("pitch"));
    this.loc = new google.maps.LatLng(this.lat,this.lng);

    this.votesCount = this.model.get("votes_count");
    this.gallery = this.model.get("gallery");
    this.owner = this.model.get("gallery")["owner"];
    if (BigWander.currentUser) {
      this.listenTo(BigWander.currentUser, 'sync', this.renderVotesCount);
    };
  },

  render: function () {
    var content = this.template({
      panoItem: this.model,
      gallery: this.gallery,
      owner: this.owner,
    });
    this.$el.html(content);
    this.renderStreetView();
    this.$('.view-full-size').tooltip();
    this.renderVotesCount();

    return this;
  },

  renderStreetView: function () {
    var panoramaOptions = {
      position: this.loc,
      pov: {
        heading: this.heading,
        pitch: this.pitch,
      },
      visible: true,
      clickToGo: false,
      addressControl: false,
      scrollwheel: false,
      zoomControl: false,
      panControl: false,
      linksControl: false,
    };
    this.panorama = new google.maps.StreetViewPanorama(
      this.$(".small-panorama")[0], panoramaOptions
    );
  },

  renderVotesCount: function () {
    if (BigWander.currentUser && BigWander.currentUser.votes) {
      if (Object.keys(BigWander.currentUser.votes).indexOf(this.model.id.toString()) !== -1) {
        this.$(".vote-pano-item").addClass("voted");
      } else {
        this.$(".vote-pano-item").removeClass("voted");
      };
    };

    var $count = this.$(".votes-count")
    if (this.votesCount) {
      $count.html(this.votesCount + " Votes");
    } else {
      $count.html("No Vote Yet");
    };
  },

  votePanoItem: function () {
    var that = this;
    // check if singedi n
    if (BigWander.currentUser) {
      // check if not voted yet
      if (Object.keys(BigWander.currentUser.votes).indexOf(this.model.id.toString()) === -1) {
        // upvote
        var vote = new BigWander.Models.Vote({
          voter_id: BigWander.currentUserId,
          pano_item_id: this.model.id
        });
        vote.save({}, {
          success: function (model) {
            BigWander.currentUser.votes[that.model.id] = model.id;
            that.votesCount ? that.votesCount += 1 : that.votesCount = 1;
            that.renderVotesCount();
          },
        })
      } else {
        //  unvote
        var voteId = BigWander.currentUser.votes[that.model.id];
        var vote = new BigWander.Models.Vote({
          id: voteId
        });
        vote.destroy({
          success: function () {
            debugger
            delete BigWander.currentUser.votes[that.model.id];
            that.votesCount === 1 ? that.votesCount = null : that.votesCount -= 1;
            that.renderVotesCount();
          },
        });
      };
    } else {
      this.$('.vote-pano-item').tooltip('show');
    };

  },


})
