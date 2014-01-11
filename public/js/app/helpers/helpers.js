Ember.Handlebars.helper('formatDate', function(date){
  return moment(date).fromNow();
});
