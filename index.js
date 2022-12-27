// declare library
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");

// buat route
const userRouter = require("./src/router/user.router");
const porttofolioRouter = require("./src/router/portofolio.router");
const experienceRouter = require("./src/router/experience.router");
const perekrutRouter = require("./src/router/perekrut.router");
const hireRouter = require("./src/router/hire.router");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(userRouter);
app.use(porttofolioRouter);
app.use(experienceRouter);
app.use(perekrutRouter);
app.use(hireRouter);

// jalankan express
app.listen(process.env.DB_PORT, () => {
  console.log("SERVECE RUNNING ON PORT 3001");
});
