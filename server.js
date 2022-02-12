const server = require("express")();
const apiRouter = require("./routes/api");

const { handleErrors } = require("./errors/index");

//server.use(express.json());

server.get("/", (req, res, next) => {
  res.status(200).send({ msg: "welcome to Lizzo’s Juicy Juice Bar" });
});
server.use("/api", apiRouter);

server.get("/*", (req, res, next) => {
  res.status(404).send({ msg: "Endpoint not found" });
});

server.use(handleErrors);

module.exports = server;
