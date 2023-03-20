const handle500Statuses = (error, request, response, next) => {
  console.log(error);
  response.status(500).send({ msg: "Server Error" });
};

const handle400Statuses = (error, request, response, next) => {
  response.status(400).send({ msg: "Invalid Data" });
};

const handle404Statuses = (error, request, response, next) => {
  response.status(404).send({ msg: "Invalid Path" });
};

module.exports = { handle500Statuses, handle400Statuses, handle404Statuses };
