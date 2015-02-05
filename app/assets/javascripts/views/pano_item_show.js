BigWander.Views.PanoItemShow = Backbone.CompositeView.extend({
  template: JST["pano-item-show"],
  className: "pano-item-show",

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      panoItem: this.model
    });
    this.$el.html(content);

    return this;
  }

})
