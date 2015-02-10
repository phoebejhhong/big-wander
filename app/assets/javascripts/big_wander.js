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

BigWander.headerHandler = function () {
  // about modal
  $(".about").on("click", function () {
    $("#about-modal").modal();
  })
},

BigWander.searchHandler = function () {
  $(".search-form").on("submit", function(event) {
    event.preventDefault();
    $input = $(event.currentTarget).find(".search-query");
    var query = $input.val();
    $input.val("");
    Backbone.history.navigate("/search/" + query, {trigger: true});
  });
};

BigWander.slideMenu = function () {
  $(".menu-toggle").on("click", function (event) {
    if (BigWander.menuClose) {
      BigWander.menuClose = false;
      $(".menu-to-hide").removeClass("hidden-menu");
      var arrows = $(".glyphicon-chevron-right").removeClass("glyphicon-chevron-right");
      arrows.addClass("glyphicon-chevron-left");
      google.maps.event.trigger(window.map, 'resize');
    } else {
      BigWander.menuClose = true;
      $(".menu-to-hide").addClass("hidden-menu").html;
      var arrows = $(".glyphicon-chevron-left").removeClass("glyphicon-chevron-left");
      arrows.addClass("glyphicon-chevron-right");
    }
  });
};

$(function () {
  if (window.location.hash.indexOf('!') > -1) {
    return BigWander.redirectHashBang();
  };

  $(document).on("click", "a[href^='/']", function(event) {
    var href = $(event.currentTarget).attr('href')
    var passThrough = href.indexOf('session') >= 0

    if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault();
      var url = href.replace(/^\//,'').replace('\#\!\/','');
      BigWander.router.navigate(url, { trigger: true });

      return false
    }
  });
});
