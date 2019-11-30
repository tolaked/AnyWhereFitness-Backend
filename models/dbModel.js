const db = require("../data/dbConfig");

module.exports = {
  addUser(user) {
    return db("users")
      .insert(user)
      .returning("*");
  },

  findUserBy(filter) {
    return db("users")
      .where(filter)
      .first();
  },
  findById(id) {
    return db("users")
      .where({ id })
      .first();
  },
  addClass(newClass) {
    return db("classes")
      .insert(newClass)
      .returning("*");
  }
};
