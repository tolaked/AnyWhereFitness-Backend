const db = require("../data/dbConfig");

const addUser = user => {
  return db("users")
    .insert(user)
    .returning("*");
};

const findUserBy = (filter, tableName = "users") => {
  return db(tableName)
    .where(filter)
    .then(data => data[0]);
};

const findById = id => {
  return db("classes")
    .where({ id })
    .then(data => data[0]);
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

const deleteClass = id => {
  return db("classes")
    .where({ id })
    .del()
    .returning("*");
};

module.exports = {
  editClass,
  addClass,
  findById,
  findUserBy,
  addUser,
  deleteClass
};
