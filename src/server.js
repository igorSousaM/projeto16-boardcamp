import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();

const app = express();
app.use(router)

const port = process.env.PORT;


app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
