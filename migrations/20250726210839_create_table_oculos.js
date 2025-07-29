/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('oculos', table => {
        table.increments('id_oculos');
        table.string('modelo').notNullable();
        table.string('status').defaultTo('ativo');
        table.string('firmware_version').defaultTo('1.0.0');
        table.string('modo_feedback').defaultTo('som'); // <-- Novo campo

        table.integer('idusuario')
            .unsigned()
            .notNullable()
            .references('idusuario')
            .inTable('usuarios')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('oculos');
};