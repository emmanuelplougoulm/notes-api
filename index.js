require("dotenv").config();
//import fastify & mongoose
const fastify = require("fastify");
const mongoose = require("mongoose");
const notesRoutes = require("./src/routes/noteRoutes");
const contentRangeHook = require("./src/hooks/contentRangeHook");

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

async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_PATH, options);
    console.log("Successfully connected to DB");
  } catch (err) {
    console.error(err);
    console.log("Failed connecting to DB");
  }
}

connectDb();

app.get("/", (request, reply) => {
  try {
    reply.send("Hello world");
  } catch (error) {
    console.error(error);
  }
});

app.addHook("preHandler", contentRangeHook);
notesRoutes(app);

app.listen(5000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});
