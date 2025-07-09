const chalk = require("chalk");
const Reception = require("./models/Reception");

async function addReception(name, phone, problem) {
  await Reception.create({ name, phone, problem });

  console.log(chalk.bgGreen("Reception was added!"));
}

async function getReceptions() {
  const receptions = await Reception.find();

  return receptions;
}

module.exports = {
  addReception,
  getReceptions,
};
