const TimeUtil = require('../src/utils/TimeUtil');

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    email: {
      type: 'TEXT',
      notNull: true,
      unique: true,
    },
    firstname: {
      type: 'TEXT',
      notNull: true,
    },
    lastname: {
      type: 'TEXT',
      notNull: false,
    },
    created_at: {
      type: 'BIGINT',
      notNull: true,
    },
    updated_at: {
      type: 'BIGINT',
    },
    deleted_at: {
      type: 'BIGINT',
    },
  });

  pgm.sql(`INSERT INTO users VALUES ('user-tJzCzhjIfSDPpWco', 'guest', '$2b$10$hUs4Kh4COscJc2JeSH7oE.IDAld1Fz9jXrFLBut57aRip49C8oco2', 'guest@tradifood.id', 'guest', '', ${TimeUtil.getDateNow()})`);
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
