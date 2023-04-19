import express from "express";
import config from "./config";
// import cors from "cors";
import { json } from "body-parser";
import { api } from "./router";
import session from "express-session";

const app = express();

// app.use(cors({}));
app.use(json());
app.use(
  session({
    secret: config.session.secret,
  })
);

app.use("/api", api);

app.listen(config.port, () => {
  console.log(`server is running http://localhost:${config.port}`);
});
