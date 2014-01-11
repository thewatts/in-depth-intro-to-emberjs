window.App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

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

App.UsersCreateController = Ember.ObjectController.extend({
  actions: {
    save: function(){
      // just before saving, we set the creationDate
      this.get('model').set('creationDate', new Date());

      // create a record and save it to the store!
      var newUser = this.store.createRecord('user', this.get('model'));
      newUser.save();

      // redirect the User to itself
      transitionToRoute('user', newUser);
    }
  }
});

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

App.UsersController = Ember.ArrayController.extend({
  sortProperties: ['name'],
  sortAscending: true,
  usersCount: function(){
    return this.get('model.length');
  }.property('@each')
});

Ember.Handlebars.helper('formatDate', function(date){
  return moment(date).fromNow();
});

App.User = DS.Model.extend({
  name         : DS.attr(),
  email        : DS.attr(),
  bio          : DS.attr(),
  avatarUrl    : DS.attr(),
  creationDate : DS.attr()
});

App.User.FIXTURES = [
  {
    id: 1,
    name: 'Tyler Long',
    email: 'tdubs@example.com',
    bio: 'The Coolest Cast EVA',
    avatarUrl: 'https://2.gravatar.com/avatar/4164b853dcf6cad5fae8af49de2e12b5?x&s=400',
    creationDate: 'Mon, 26 Aug 2013 2013 20:23:43 GMT'
  },
  {
    id: 2,
    name: 'Nathaniel Watts',
    email: 'natedawg@example.com',
    bio: 'The Coolest DAWG EVA',
    avatarUrl: 'https://1.gravatar.com/avatar/c12d3710dada4fe5f9abfe4c783ff636?x&s=400',
    creationDate: 'Mon, 07 Aug 2013 2013 10:23:43 GMT'
  }
];

App.Router.map(function(){
  this.resource('users', function(){
    this.resource('user', { path: '/:user_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('users');
  }
});

App.UserEditRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('user');
  }
});

App.UserRoute = Ember.Route.extend({
  model: function(params){
    return this.store.find('user', params.user_id);
  }
});

App.UsersCreateRoute = Ember.Route.extend({
  model: function() {
    // the model for this route is the new empty Ember.Object
    return Em.Object.create({});
  },

  // in this case (the create route), we can reuse the user/edit template
  // associated with the usersCreateController
  renderTemplate: function(){
    this.render('user.edit', {
      controller: 'usersCreate'
    });
  },
});

App.UsersRoute = Ember.Route.extend({
  model: function(){
    return this.store.find('user');
  }
});

App.ApplicationAdapter = DS.FixtureAdapter;
