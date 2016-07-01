Meteor.startup(function() {
  Collection.find().observe({
    added(doc) {
      console.log('added', doc.index);
    },
    changed(doc, oldDoc) {
      console.log('changed', doc.index);
    },
    removed(doc) { 
    },
  });

  Meteor.subscribe('main');

  Meteor.call('insert');
});
