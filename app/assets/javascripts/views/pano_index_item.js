BigWander.Views.PanoIndexItem = Backbone.CompositeView.extend({
  template: JST["pano-index-item"],
  className: "pano-index-item",
  tagName: "li",

  initialize: function (options) {
    // this.listenTo(this.model, 'sync', this.render());
  },

  render: function () {
    var content = this.template({
      panoItem: this.model
    });
    this.$el.html(content);

    return this;
  }

})
