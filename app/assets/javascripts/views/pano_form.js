BigWander.Views.PanoForm = Backbone.CompositeView.extend({
  template: JST["pano-form"],
  className: "pano-form",
  tagName: "form",

  initialize: function (options) {
    this.collection = this.model.collection;
    this.values = options.values;
  },

  events: {
    "submit": "savePanorama",
    "click .close-save-form": "closeForm",
  },

  render: function () {
    var content = this.template({
      panoItem: this.model,
    });
    this.$el.html(content);

    return this;
  },

  savePanorama: function (event) {
    var that = this;
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    this.values ? $.extend(params, this.values) : false;
    this.model.save(params, {
      success: function () {
        // TODO: remove from collection if reassigned to another gallery
        that.remove();
      },
      error: function () {
        that.$(".title-input").addClass("input-error");
      }
    });
  },

  closeForm: function () {
    this.remove();
  },

})
