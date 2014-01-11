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
