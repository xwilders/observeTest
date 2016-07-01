Meteor.methods({
  insert() {
    Collection.remove({});

    for (let i = 0; i < 30; i++) {
      const time = i * 10;
      Meteor.setTimeout(() => {
        Collection.insert({ index: i, insertedAt: time });
      }, time);
    }
  }
});

Meteor.publish('main', function () {
  const self = this;

  const handle = Collection.find({}, {
    sort: { insertedAt: -1 },
    limit: 1,
  }).observe({
    added(doc) {
      self.added('Collection', doc._id, doc);
    },
    changed(doc, oldDoc) {
      self.changed('Collection', doc._id, doc);
    },
    removed(doc) { 
      self.removed('Collection', doc._id);
    },
  });

  self.ready();
  self.onStop(function () {
    if (handle) handle.stop();
  });
});
