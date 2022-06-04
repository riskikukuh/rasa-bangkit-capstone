
exports.up = pgm => {
    pgm.createType("analyze_result_status", [
        'obtained', 'not_found', 'error'
    ]);

    pgm.createTable('history', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        user_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        food_id: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        image: {
            type: 'TEXT',
            notNull: true,
        },
        status: {
            type: 'analyze_result_status',
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
    pgm.createIndex('history', 'user_id');
    pgm.createIndex('history', 'food_id');
    pgm.createConstraint('history', 'fk.history_user_id_users_id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
    pgm.createConstraint('history', 'fk.history_food_id_foods_id', 'FOREIGN KEY(food_id) REFERENCES foods(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    pgm.dropIndex('history', 'user_id');
    pgm.dropIndex('history', 'food_id');
    pgm.dropConstraint('history', 'fk.history_user_id_users_id');
    pgm.dropConstraint('history', 'fk.history_food_id_foods_id');
    pgm.dropTable('history');
    pgm.dropType('analyze_result_status');
};
