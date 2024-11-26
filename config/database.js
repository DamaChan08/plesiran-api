"use strict";

const knexfile = require("../knexfile");
const knex = require("knex").knex(knexfile);

module.exports = { knex };
