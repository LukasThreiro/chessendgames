import express from "express";
import mongoose from "mongoose"

import routes from "./routes/routes.js"
import Config from "./config/config.js"

const app = express();

// Connecting MongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(Config.db).then(() => {
    console.log("Database successfully connected!");
}, error => {
    console.log("Could not connect to database : " + error);
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", routes);

app.listen(Config.port, () => {
    console.log("Server Started at " + String(Config.port));
})