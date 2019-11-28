const db = require("../data/dbConfig");

module.exports = {
  addUser: async function(user) {
    const [id] = await db("users").insert(user);

    return findById(id);
  },

  findUserBy: function(filter) {
    return db("users")
      .where(filter)
      .first();
  },
  findById: function(id) {
    return db("users")
      .where({ id })
      .first();
  }
};
