// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  let time = new Date().getTime();
  let date = new Date(parseInt(time));
  res.json({
    "unix": parseInt(time),
    "utc": date.toGMTString()
  })
});

app.get("/api/:time", (req, res) => {
  let time = req.params.time;
  if (new Date(time) == "Invalid Date" && new Date(parseInt(time)) == "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }
  if (parseInt(time) <= 3000) {
    let date = new Date(time);
    res.json({
      "unix": date.getTime(),
      "utc": date.toGMTString()
    });
  }
  else {
    let date = new Date(parseInt(time));
    res.json({
      "unix": parseInt(time),
      "utc": date.toGMTString()
    });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
