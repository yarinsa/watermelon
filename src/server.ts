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
app.use(cors());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});
apolloServer.applyMiddleware({ app });

const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log("Server is running on port: " + port);
});
