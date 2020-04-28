import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { apolloServer } from "./apollo";
import cors from "cors";
import path from "path";
const app = express();
const http = require("http").createServer(app);

app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, "build")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/ping", function (req, res) {
  return res.send("pong");
});

app.post("/ping2", function (req, res) {
  return res.send("pong2");
});

apolloServer.applyMiddleware({ app });

const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log("Server is running on port: " + port);
});
