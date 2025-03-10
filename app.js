const express = require("express");
const indexRouter = require("./routes/indexRouter");
const signupRouter = require("./routes/signupRouter");
const updateMembershipRouter = require("./routes/updateMembershipRouter");
const loginRouter = require("./routes/loginRouter");
const newMessageRouter = require("./routes/newMessageRouter");
const session = require("express-session");
const passport = require("passport");
const { addUserIntoLocals } = require("./middleware/user");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
require("./middleware/passport");
app.use(passport.session());
app.use(addUserIntoLocals);

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/update-membership", updateMembershipRouter);
app.use("/login", loginRouter);
app.use("/new-message", newMessageRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
