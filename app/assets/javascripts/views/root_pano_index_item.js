BigWander.Views.RootPanoIndexItem = Backbone.CompositeView.extend({
  template: JST["root-pano-index-item"],
  className: "root-pano-index-item",

  initialize: function (options) {
  },

  render: function () {
    var content = this.template({
      panoItem: this.model
    });
    this.$el.html(content);

    return this;
  },

})
