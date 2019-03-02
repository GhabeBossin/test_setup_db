const PORT        = process.env.PORT || 8080;

const express     = require("express");
const bodyParser  = require("body-parser");
const morgan      = require('morgan');
const pg          = require('pg')
const app         = express();

require('dotenv').config();

var config = {
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME,
  port     : process.env.DB_PORT,
  max      : 10
}

let pool = new pg.Pool(config)

pool.connect(function(err, db, done) {
  if(err) {
    return console.log(err)
  } else {
    db.query('SELECT * FROM makers;', (err, table) => {
      if(err) {
        return console.log(err)
      }
      console.log(table)
    })
  }
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
