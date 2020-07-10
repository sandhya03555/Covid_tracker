const express = require("express");
var events=require("events");
var eventEmitter =new events.EventEmitter();

const app = express();
const novelCovid = require("novelcovid");
const handlebars = require("express-handlebars");

app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  handlebars({
    defaultView: "home",
    layoutsDir: __dirname + "/views/layouts",
  })
);

novelCovid.countries().then((response) => {
  console.log(response);
  
});

app.get("/", function (req, res) {
  novelCovid.countries().then((response) => {

    //console.log(response);
    res.render("home", {info: response });
  }).catch(error=> console.log("error occured"));
});

app.listen(3000, () => {
  console.log("Listening to Port 3000");
});