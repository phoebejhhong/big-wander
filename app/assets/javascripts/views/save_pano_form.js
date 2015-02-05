BigWander.Views.SavePanoForm = Backbone.CompositeView.extend({
  template: JST["save-pano-form"],
  className: "save-pano-form",
  tagName: "form",

  initialize: function (options) {
    this.values = options.values;
  },

  events: {
    "submit": "savePanorama",
    "click .close-save-form": "closeForm",
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);

    return this;
  },

  savePanorama: function (event) {
    var that = this;
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var panoItem = new BigWander.Models.PanoItem(params["pano_item"]);
    panoItem.save(this.values, {
      success: function () {
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
