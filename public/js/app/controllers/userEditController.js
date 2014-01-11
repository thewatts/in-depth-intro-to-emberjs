App.UserEditController = Ember.ObjectController.extend({
  actions: {
    save: function(){
      user = this.get('model');
      // this will tell EmberData to save/persist the new record
      user.save();
      // then transition to your current user
      this.transitionToRoute('user', user);
    }
  }
});
