exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          firstName: "Tola",
          lastName: "Ade",
          email: "toly@yahoo.com",
          password: "Sweet",
          role: "instructor"
        },
        {
          id: 2,
          firstName: "Tolu",
          lastName: "Bola",
          email: "bol@yahoo.com",
          password: "Sweet",
          role: "user"
        },

        {
          id: 3,
          firstName: "Adam",
          lastName: "Peter",
          email: "Pdam@yahoo.com",
          password: "Sweet",
          role: "instructor"
        }
      ]);
    });
};
