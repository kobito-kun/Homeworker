const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

const SECRET_TOKEN = "134994964b9caf7d2ff9a74889827041c20a5fb0fc78b68488c294b853f973a5a89cdbd5f275cb42e80baf0373640dc39891d6c6f25b5265269c297f0566f81e";

app.use(cors());
app.use(express.urlencoded({"limit": "10mb"}));
app.use(express.json({"limit": "10mb"}));

// app.use("/user")

app.listen(port, () => console.log("Server open at port " + port)})