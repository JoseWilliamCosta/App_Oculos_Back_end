/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('deteccao_proximidade', table => {
        table.increments('id_evento');
        table.integer('id_oculos')
            .unsigned()
            .notNullable()
            .references('id_oculos')
            .inTable('oculos')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.datetime('data_hora').notNullable();
        table.decimal('distancia_detectada_cm', 5, 2).notNullable();
        table.string('tipo_alerta_acionado', 50).notNullable();

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('deteccao');
};