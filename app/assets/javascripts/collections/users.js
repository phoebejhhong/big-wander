BigWander.Collections.Users = Backbone.Collection.extend({
  url: '/api/users',
  model: BigWander.Models.User,

  getOrFetch: function (id) {
    var that = this;
    var user = this.get(id);

    if(!user) {
      user = new BigWander.Models.User({ id: id });
      user.fetch({
        success: function () {
          that.add(user);
        }
      });
    } else {
      user.fetch();
    }

    return user;
  }
});
