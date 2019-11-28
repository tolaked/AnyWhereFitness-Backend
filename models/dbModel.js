const db = require("../data/dbConfig");

module.exports = {
  addUser: function(user) {
    return db("users")
      .insert(user)
      .returning("id")
      .then(([id]) => {
        return findUserBy({ id });
      });
  },
  findUserBy: function(filter) {
    return db("users")
      .where(filter)
      .first();
  }
};
