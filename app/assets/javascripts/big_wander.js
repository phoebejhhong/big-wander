window.BigWander = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Utils: {},
  redirectHashBang: function () {
    window.location = window.location.hash.substring(2)
  },

  initialize: function() {
    BigWander.router = new BigWander.Routers.Router({
      $rootEl: $(".main")
    });
    Backbone.history.start({ pushState: true });
  }
};

$(function () {
  if (window.location.hash.indexOf('!') > -1) {
    return BigWander.redirectHashBang();
  };

  $(document).on("click", "a[href^='/']", function(event) {
    var href = $(event.currentTarget).attr('href')
    var passThrough = href.indexOf('sign_out') >= 0

    if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault();
      var url = href.replace(/^\//,'').replace('\#\!\/','');
      BigWander.router.navigate(url, { trigger: true });

      return false
    }
  });
});
