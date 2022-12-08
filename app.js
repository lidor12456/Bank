import express, { json } from "express";
const app = express();
import router from "./routes/routes.js";

const PORT = 6000;

app.use(json());

app.use("/api/users", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
