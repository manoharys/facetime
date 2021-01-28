const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidV4 } = require("uuid");

//Loading static data
app.use(express.static("public"));

//setting up views
app.set("view engine", "ejs");

//Generating random ID's
app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

//Getting random generated Id's
app.get("/:roomId", (req, res) => {
  res.render("room", { roomId: req.params.roomId });
});

server.listen(process.env.PORT || 3000);
