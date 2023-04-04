import express from "express";
import config from "./config";
import { admin, api } from "./router";

const app = express();

app.use("/api", api);
app.use("/admin", admin);

app.listen(config.PORT, () => {
  console.log(`server is running http://localhost:${config.PORT}`);
});
