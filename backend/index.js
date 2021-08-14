const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({"limit": "10mb", "extended": true}));
app.use(express.json({"limit": "10mb"}));

const { UserRoutes } = require("./routes/user.js");
const { HomeworkRoutes } = require("./routes/homework.js");
const { User } = require('./models/user.models.js');
const { Homework } = require("./models/homework.model.js");

app.use("/user", UserRoutes);
app.use("/homework", HomeworkRoutes);


app.get("/", (_, res) => {
  User.find({}, (err, result) => {
    res.json(result)
  })
})

require("dotenv/config")
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("Database Connected"));
app.listen(port, () => console.log("Server open at port " + port))