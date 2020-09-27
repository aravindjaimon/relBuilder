require("dotenv").config();
const Pool = require("pg").Pool;
const fs = require("fs");

const pool = new Pool({
  sslmode: "require",
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false,
    cert: fs.readFileSync("./ca-certificate.crt").toString(),
  },
});

const pool = new Pool({});

module.exports = pool;
