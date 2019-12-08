const db = require("../data/dbConfig");

const add = (data, tableName) => {
  return db(tableName)
    .insert(data)
    .returning("*");
};

const findBy = (filter, tableName = "users") => {
  return db(tableName)
    .where(filter)
    .then(data => data[0]);
};

const findById = id => {
  return db("classes")
    .where({ id })
    .then(data => data[0]);
};

const editClass = async (id, changes) => {
  const userId = await db("classes")
    .where(id)
    .update(changes)
    .returning("*");

  return userId;
};

const getClass = () => {
  return db("classes")
    .select("*")
    .returning("*");
};

const deleteClass = id => {
  return db("classes")
    .where({ id })
    .del()
    .returning("*");
};

const addReservation = (reservation, id) => {
  return db("reservations")
    .insert(reservation)
    .then(() => {
      return findById(id);
    });
};

module.exports = {
  editClass,
  add,
  findById,
  findBy,
  deleteClass,
  getClass,
  addReservation
};
