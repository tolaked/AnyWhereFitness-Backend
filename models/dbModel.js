const db = require("../data/dbConfig");

const addUser = user => {
  return db("users")
    .insert(user)
    .returning("*");
};

const findUserBy = filter => {
  return db("users")
    .where(filter)
    .first();
};

const findById = (id, tableName) => {
  return db(tableName)
    .where({ id })
    .first();
};

const addClass = newClass => {
  return db("classes")
    .insert(newClass)
    .returning("*");
};

const editClass = async (id, changes) => {
  const userId = await db("classes")
    .where({ id })
    .update(changes)
    .returning("*");

  return userId;
};

module.exports = {
  editClass,
  addClass,
  findById,
  findUserBy,
  addUser
};
