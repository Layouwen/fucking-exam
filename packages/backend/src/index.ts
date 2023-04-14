import express from "express";
import config from "./config";
// import cors from "cors";
import { json } from "body-parser";
import { api } from "./router";

const app = express();

// app.use(cors({}));
app.use(json());

app.use("/api", api);

app.listen(config.port, () => {
  console.log(`server is running http://localhost:${config.port}`);
});
