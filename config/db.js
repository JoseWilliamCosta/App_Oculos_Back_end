const config = require('../knexfile.js')
const knex = require('knex')(config)

knex.migrate.latest([config])

knex.raw("SELECT 1").then(() => {
    console.log("MySQL connected");
})
.catch((e) => {
    console.log("MySQL not connected");
    console.error(e);
});

module.exports = knex