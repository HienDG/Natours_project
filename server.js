/* eslint-disable no-console */
const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./index");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("useUnifiedTopology", true);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port: http://localhost:${port}/`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
