
exports.up = function(knex) {
    return knex.schema
    .createTable("instructor", tbl => {
        tbl.increments();

        tbl.string("username", 64)
          .notNullable()
          .unique();

        tbl.string("password", 64)
          .notNullable();

        tbl.string("email", 128)
          .notNullable()
      })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('instructor')
};
