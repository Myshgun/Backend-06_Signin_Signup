const express = require("express");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { addReception, getReceptions } = require("./receptions.controller");
const { addUser, loginUser } = require("./users.controller");
const auth = require("./middlewares/auth");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Express App",
    error: undefined,
  });
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);

    res.cookie("token", token, { httpOnly: true });

    res.redirect("/receptions");
  } catch (e) {
    res.render("login", {
      title: "Express App",
      error: e.message,
    });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true });

  res.redirect("/login");
});

app.get("/", async (req, res) => {
  if (req.cookies.token) {
    res.redirect("/receptions");
  }
  res.render("index", {
    title: "Express App",
    created: false,
    error: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addReception(req.body.name, req.body.phone, req.body.problem);
    res.render("index", {
      title: "Express App",
      created: false,
      error: false,
    });
  } catch (e) {
    res.render("index", {
      title: "Express App",
      created: false,
      error: false,
    });
  }
});

app.use(auth);

app.get("/receptions", async (req, res) => {
  res.render("receptions", {
    title: "Express App",
    receptions: await getReceptions(),
    created: false,
    error: false,
  });
});

mongoose
  .connect(
    "mongodb+srv://perventmic:Yb8G8HlMvXQpy3dn@cluster0.58ush2f.mongodb.net/receptions?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port ${port}...`));
    });
  });
