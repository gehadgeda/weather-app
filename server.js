const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
///////
const cors = require("cors");
app.use(cors());
///////
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
///////
const publicDirectoryPath = path.join(__dirname, "./website");
///////
projectData = {};
const apiKey = "7e23a689eae29ab7e9138a4f9794eb02&units=imperial";
/////////////////////
app.get("/primo", (req, res) => {
  res.send("/primo/(provide zip code here)");
});
/////////////////////
app.get("/primo/:zip", (req, res) => {
  const request = require("request");
  let zip = req.params.zip;
  request(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${apiKey}`,
    (error, response, body) => {
      let data = JSON.parse(body);
      if (response.statusCode === 200) {
        projectData = {
          city: data.name,
          temp: data.main.temp,
          country: data.sys.country,
          description: data.weather[0].description,
          date: new Date().toDateString(),
        };
        res.send(projectData);
      } else {
        res.send(data.message);
      }
    }
  );
});
///////////////////
app.post("/dod", (req, res) => {
  console.log(projectData);
  res.status(201).send(projectData);
});
//////////
app.listen(1350, () => console.log("server is running"));
app.use(express.static(publicDirectoryPath));
