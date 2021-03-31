const Note = require("../models/Note.model");

// this implementation is due to react-admin pre-requisites.
// find the artcile here : https://medium.com/swlh/fullstack-crud-application-with-fastify-mongoose-and-react-admin-86d3e743dcdf
module.exports = (request, reply, done) => {
  Note.count({}, (err, count) => {
    if (err) {
      console.error(err);
      reply.code(500).send("Error!");
    }
    reply.header("Content-Range", `notes 0-10/${count}`);
    //here done() stands for next();
    done();
  });
};
