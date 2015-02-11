BigWander.Views.PanoItemShow = Backbone.CompositeView.extend({
  template: JST["pano-item-show"],
  className: "pano-item-show",

  events: {
    "click .delete-pano-item": "deletePanoItem",
    "click .edit-pano-item": "renderEditPanoForm",
    "click .close-pano-form": "closeEditPanoForm",
    "click .vote-pano-item": "votePanoItem",
  },

  initialize: function (options) {
    this.gallery = options.gallery;
    this.lat = Number(this.model.get("lat"));
    this.lng = Number(this.model.get("lng"));
    this.heading = Number(this.model.get("heading"));
    this.pitch = Number(this.model.get("pitch"));
    this.loc = new google.maps.LatLng(this.lat,this.lng);
    this.votesCount = this.model.get("votes_count");
  },

  render: function () {
    var content = this.template({
      panoItem: this.model,
      gallery: this.gallery,
    });
    this.$el.html(content);
    this.$('.view-full-size').tooltip();
    this.renderVotesCount();
    this.renderMap();

    return this;
  },

  renderMap: function () {
    //setting up
    var panoramaOptions = {
      position: this.loc,
      pov: {
        heading: this.heading,
        pitch: this.pitch,
      },
      visible: true,
      addressControl: false,
      scrollwheel: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
      panControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
    };
    // drawing the street view
    this.panorama = new google.maps.StreetViewPanorama(
      this.$(".large-panorama")[0], panoramaOptions
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

  renderEditPanoForm: function () {
    this.$(".edit-pano-item").removeClass("edit-pano-item").addClass("close-pano-form");
    var view = new BigWander.Views.PanoForm({
      model: this.model,
      superView: this,
    });
    this.addSubview(".edit-pano-item-form-wrapper", view);
  },

  closeEditPanoForm : function () {
    var subview = this.subviews(".edit-pano-item-form-wrapper")[0];
    this.removeSubview(".edit-pano-item-form-wrapper", subview);
    this.$(".close-pano-form").removeClass("close-pano-form").addClass("edit-pano-item");
  },

  deletePanoItem: function () {
    this.model.destroy();
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
            delete BigWander.currentUser.votes[that.model.id];
            that.votesCount === 1 ? that.votesCount -= 1 : that.votesCount = null;
            that.renderVotesCount();
          },
        });
      };
    } else {
      this.$('.vote-pano-item').tooltip('show');
    };

  },

})
