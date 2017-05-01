const express = require('express'),
      displayRoutes = require('express-routemap'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      hbs = require('hbs');

var port = process.env.PORT || 3000;

var app = express();

var http = require("https");

var options = {
  "method": "GET",
  "hostname": "api.schiphol.nl",
  "port": null,
  "path": "/public-flights/flights?app_id=d8b87e8f&app_key=3baf6f9ea7f335c93063339d99472aa3",
  "headers": {
    "resourceversion": "v3"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });
  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});
req.end();

app.set('view engine', 'hbs');

app.use(morgan('dev'));

app.use(express.static('public', {
  maxAge: '1y'
}));

app.use(bodyParser.urlencoded({ extended: false }));


// landing page //

app.get("/", (req, res) => {
  res.render("index");
});

// server //

app.listen(port, () => {
  console.log("server now running on " + port);
  displayRoutes(app);
});
