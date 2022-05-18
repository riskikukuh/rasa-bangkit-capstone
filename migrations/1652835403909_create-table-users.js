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
    });
};

exports.down = (pgm) => {
    pgm.dropTable("users");
};
