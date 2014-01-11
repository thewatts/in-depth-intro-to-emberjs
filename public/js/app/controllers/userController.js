App.UserController = Ember.ObjectController.extend({
  deleteMode: false,

  actions: {
    edit: function() {
      this.transitionToRoute('user.edit');
    },
    delete: function() {
      // our delete action will toggle the prompt
      this.toggleProperty('deleteMode');
    },
    cancelDelete: function() {
      this.set('deleteMode', false);
    },
    confirmDelete: function() {
      // this tells EmberData to delete the current User
      this.get('model').deleteRecord();
      this.get('model').save
      // and then go to the users route
      this.transitionToRoute('users');
      // set deleteMode back to false, yo!
      this.set('deleteMode', false);
    }
  }
});
