// external imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {
  mainErrorHandler,
  notFoundHandler,
} = require("./middlewares/common/errorsHandler");

// internal imports
const homeRouter = require("./router/homeRouter");
const signupRouter = require("./router/signupRoute");
const loginRouter = require("./router/loginRoute");

const app = express();
dotenv.config();

//database connection
const uri = process.env.CONNECTION_STRING;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

// request parser
app.use(express.json());

//config cors
app.use(cors());

//cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use("/", homeRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);

//404 not found handler
app.use(notFoundHandler);

// error handling
app.use(mainErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("app runnings");
});
