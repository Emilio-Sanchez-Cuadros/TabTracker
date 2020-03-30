const express = require('express')
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");
const cors = require('cors')
const config = require('../../server/src/config/config')
const morgan = require('morgan')
const mysql = require("mysql");
const sha1 = require("sha1");
const myKey = "tabtrackerkey";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "tabtracker"
});

connection.connect(function (error) {
  if (error) {
    throw error;
  } else {
    console.log("conexión con db correcta");
  }
});

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/status', (req, res) => {
  res.send('Hola qué tal')
})

app.post('/register', (req, res) => {
  let email = req.body.email;
  let password = sha1(req.body.password);
  connection.query(
    "INSERT INTO users SET?",
    {
      email,
      password
    },
    (err, results) => {
      if (err && err.code === 'ER_DUP_ENTRY') {
        res.status(400).send(err);
        console.log(err.code, "Este email ya existe")
      } else {
        connection.query(
          `SELECT user_id, email FROM users WHERE email = '${email}'`,
          (err, results) => {
            res.send(results[0]);
          }
        );
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  connection.query(
    `SELECT *
        FROM users
        WHERE email = '${email}'
        AND password = sha1('${password}');`,
    function (error, results) {
      if (error) console.log(error);
      else if (results.length) {
        const { user_id, email } = results[0]
        const token = jwt.sign({ user_id, email }, myKey);
        res.send({
          token,
          results
        })
        console.log(results)
          ;
      } else {
        res.sendStatus(400);
      }
    }
  );
});

app.get("/users", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { email } = jwt.verify(token, myKey);
    let sql = "SELECT user_id, email FROM users";
    if (email) {
      connection.query(sql, (error, results) => {
        if (error) console.log(error);
        res.send(results);
      });
    }

  } catch {
    res.sendStatus(401);
  }
});

app.get("/songs", (req, res) => {
  try {
    let sql = "SELECT * from songs";
    connection.query(sql, (error, results) => {
      if (error) console.log(error);
      else {
        res.send(results);
      }
    });
  } catch {
    res.sendStatus(401);
  }
});

app.post("/songs/create", (req, res) => {
  // const token = req.headers.authorization.replace("Bearer ", "");
  // console.log(token)
  let {
    title,
    artist,
    album,
    album_image,
    youtube_id,
    lyrics,
    tab,
    genre
  } = req.body;
  let sql = `INSERT INTO songs (title, artist, album, album_image, youtube_id, lyrics, tab, genre) values ('${title}', '${artist}', '${album}', '${album_image}', '${youtube_id}', "${lyrics}", "${tab}", '${genre}')`
  // if (token) {
    connection.query(
      sql,
      (err, results) => {
        if (err){
          console.log(err)
        } else{
          res.send(results);
        }
      }
    );
  // } else {
  //   res.status(401).send("no puedes");
  // }
});

app.get("/songs/:song_id", (req, res) => {
  const song_id = req.params.song_id
  try {
    let sql = `SELECT * from songs where song_id = ${song_id}`;
    connection.query(sql, (error, results) => {
      if (error) console.log(error);
      else {
        res.send(results[0]);
      }
    });
  } catch {
    res.sendStatus(401);
  }
});

app.listen(config.port)
console.log("servidor en 8081")
