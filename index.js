// index.js
// where your node app starts

// .env dependency
require("dotenv").config();

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
const req = require("express/lib/request");
const res = require("express/lib/response");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  const reqDate = req.params.date;

  // convert requested date to A Date object
  const date = new Date(
    reqDate === undefined ? Date.now() : isNaN(reqDate) ? reqDate : reqDate * 1
  );

  // return error if Invalid Date
  if (date == "Invalid Date") return res.json({ error: "Invalid Date" });

  const unix = date.getTime();
  let utc = "";

  const weekday = date.toLocaleDateString("GMT", {
    weekday: "short",
  });

  const day = date.getDate();

  const monthName = date.toLocaleDateString("en-us", { month: "short" });

  const year = date.getFullYear();

  const time = date.toTimeString().split("+")[0];
  utc = `${weekday}, ${day} ${monthName} ${year} ${time}`;

  res.json({
    unix,
    utc,
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
