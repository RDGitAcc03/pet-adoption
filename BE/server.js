const express = require("express");
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 8080;
const cors = require("cors");
const usersRoute = require("./Routes/usersRoute");
const petsRoute = require("./Routes/petsRoute");
const appOperationsRoute = require("./Routes/appOperationsRoute");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();

app.use("/images", express.static('images'));   
app.use(express.json());

const getServerUrl = () => {
  if (process.env.NODE_ENV === 'production') return 'https://example-petadoption.onrender.com'
  return "http://localhost:3000";
}
app.use(cors({origin: getServerUrl(), credentials: true}));
app.use(cookieParser());


app.use("/users", usersRoute);
app.use("/pets", petsRoute);
app.use("/appOperations", appOperationsRoute);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("Listening on port " + port);
    });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

