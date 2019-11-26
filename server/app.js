const express = require("express");
const fs = require("fs");
const app = express();

let csvToJson = require("convert-csv-to-json");

app.use((req, res, next) => {
  // write your logging code here

  const agent = req.header("User-Agent");
  const method = req.method;
  const time = new Date();
  const resource = req.path;
  const version = "HTTP/" + req.httpVersion;
  const status = res.statusCode;

  fs.appendFile(
    "log.csv",
    `${agent},${time.toISOString()},${method},${resource},${version},${status}\n`,
    err => {
      if (err) throw err;
    }
  );

  console.log(
    `${agent},${time.toISOString()},${method},${resource},${version},${status}\n`
  );

  next();
});

app.get("/", (req, res) => {
  // write your code to respond "ok" here
  res.status(200).send("ok");
});

app.get("/logs", (req, res) => {
  // write your code to return a json object containing the log data here
  let json = csvToJson.fieldDelimiter(",").getJsonFromCsv("log.csv");
  res.send(json);
});

module.exports = app;
