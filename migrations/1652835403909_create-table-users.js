const TimeUtil = require('../src/utils/TimeUtil');
const GuestUtil = require('../src/utils/GuestUtil');

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

  pgm.sql(`INSERT INTO users VALUES ('${GuestUtil.guest().id}', '${GuestUtil.guest().username}', '${GuestUtil.guest().password}', '${GuestUtil.guest().email}', '${GuestUtil.guest().firstname}', '${GuestUtil.guest().lastname}', ${GuestUtil.guest().created_at})`);
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
