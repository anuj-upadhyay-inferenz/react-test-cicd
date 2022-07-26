'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('pets', {
    id: { type: 'int', primaryKey: true },
    name: 'string'
  })
  .then(
    function(result) {
      db.insert('pets', { id: 1, name: 'Percy'
      });
    },
    function(err) {
      return;
    }
  );
};

exports.down = function (db) {
  return db.dropTable('pets')
    .then(
      function(result) {
        db.dropTable('owners');
      },
      function(err) {
        return;
      }
    );
};

exports._meta = {
  "version": 1
};