require("dotenv").config();
const express = require("express");
const request = require("request");
const queryString = require("query-string");
const { Client, Status } = require("@googlemaps/google-maps-services-js");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const client = new Client({});

function findSeries() {
  var x = 3;
  var serie = [];
  serie.push(x);
  for (i = 0; i < 6; i++) {
    serie.push(seq(i, serie));
  }
  console.log(
    "answer x= %d,y=%d,z=%d",
    serie[0],
    serie[1],
    serie[serie.length - 1]
  );
  return serie;
}
function seq(i, s) {
  return s[s.length - 1] + 2 * i;
}

function findValue() {
  var A = 21;
  var B = 0,
    C = 0;

  if (A == 21) {
    B = 23 - A;
    C = -21 - A;
    console.log("answer B is %d and C is %d", B, C);
    return true;
  } else {
    return false;
  }
}

app.get("/google-api", function(req, res) {
      var dataApi = {
          origin: req.query.origin,
          destination: req.query.destination,
          key: process.env.GOOGLE_API_KEY
        };
        var qs = queryString.stringify(dataApi);

    request(
      {
        url: "https://maps.googleapis.com/maps/api/directions/json?"+qs,
        method: "GET"
      },
      (err, result, body) => {
          var response=JSON.parse(result.body);

          res.json({routes:response.routes});
      });
});

function lineNotify() {
  var dataApi = {
    message: "please answer customer"
  };
  var qs = queryString.stringify(dataApi);
  request(
    {
      url: "https://notify-api.line.me/api/notify",
      method: "POST",
      headers: {
        Authorization: process.env.Authorization,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: qs
    },
    (err, result, body) => {
      var response = JSON.parse(result.body);
      return response.message;
    }
  );
}

findSeries();
findValue();
setTimeout(lineNotify, 10000);

app.listen(port, () => console.log(`listening on port ${port}!`));
