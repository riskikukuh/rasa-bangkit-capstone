const TimeUtil = require('../src/utils/TimeUtil');

exports.up = (pgm) => {
    pgm.createTable("foods", {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        name: {
            type: 'TEXT',
            notNull: true,
        },
        description: {
            type: 'TEXT',
            notNull: true,
        },
        origin: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        province: {
            type: 'VARCHAR(100)',
            notNull: true,
        },
        image: {
            type: 'TEXT',
            notNull: true,
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
        }
    });

    pgm.sql(`INSERT INTO foods VALUES ('food-nnKC5j02dhKLqYd7', 'Gudeg', 'Gudeg dari Yogyakarta', 'Yogyakarta', 'Daerah Istimewa Yogyakarta', '', ${TimeUtil.getDateNow()})`);
};

exports.down = (pgm) => {
    pgm.dropTable("foods");
};
