const https = require("https");
const env = require("dotenv");
const chalk = require("chalk");

const log = console.log;
env.config();

const totalCliArguments = process.argv.length;
const cliArguments = process.argv.slice(2, totalCliArguments);
const location = cliArguments[0];
const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${process.env.APIKEY}`;

const renderOnConsole = data => {
  if (data.cod == "404") {
    return log(chalk.bgRed.black("Please enter correct city name."));
  }
  log(
    chalk.bgYellow.black(
      `Its ${chalk.bgBlue.black(data.main.temp)}°C and ${chalk.bgCyan.black(
        data.weather[0].main
      )} in ${chalk.bgGreen.black(data.name)}, ${chalk.bgMagenta.black(
        data.sys.country
      )}`
    )
  );
};

https
  .get(endpoint, res => {
    let data = "";
    res.on("data", chunk => {
      data += chunk;
    });

    res.on("end", () => {
      renderOnConsole(JSON.parse(data));
    });
  })
  .on("error", err => {
    log(chalk.red(err));
  });
