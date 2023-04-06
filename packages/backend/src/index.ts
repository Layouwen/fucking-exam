import express from "express";
import config from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import { admin, api, oauth, auth } from "./router";

const app = express();

app.use(cors());
app.use(bodyParser());

app.use("/api", api);
app.use("/admin", admin);
app.use("/oauth", oauth);
app.use("/auth", auth);

app.listen(config.port, () => {
  console.log(`server is running http://localhost:${config.port}`);
});
