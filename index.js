require("dotenv").config();
//import fastify & mongoose
const fastify = require("fastify");
const mongoose = require("mongoose");

const app = fastify();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  // autoIndex: false, // Don't build indexes
  // poolSize: 10, // Maintain up to 10 socket connections
  // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4 // Use IPv4, skip trying IPv6
};

try {
  mongoose.connect(process.env.DB_PATH, options);
} catch (e) {
  console.error(e);
}

app.get("/", (request, reply) => {
  try {
    reply.send("Hello world");
  } catch (error) {
    console.error(error);
  }
});

app.listen(5000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});
