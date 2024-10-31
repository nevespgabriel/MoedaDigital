import "dotenv/config";
import "./config/db.js";
import e from "express";
import user_route from "./routes/user_route.js";
import transation_route from "./routes/transation_route.js";

const app = e();

app.get("/", (req, res) => {
    res.send("servidor rodando")
             })

app.use(e.json());

app.use("/user", user_route);
app.use("/transation", transation_route);

app.listen(process.env.API_PORT, () => console.log("Server running"));