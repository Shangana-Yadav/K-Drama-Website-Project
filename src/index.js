const express = require('express');
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home'); // Renders the home.ejs file
});

module.exports = router;

const app = express();
//convert data into json format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//use EJS as the view engine
app.set('view engine', 'ejs');
// static file
app.use(express.static('public'));

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});


app.get("/movies", (req, res) => {
    res.render("movies");
});

app.get("/web-series", (req, res) => {
    res.render("web-series");
});

app.get('/kids', (req, res) => {
    res.render('kids'); // Renders the kids.ejs template
});

app.get('/tv', (req, res) => {
    res.render('tv');
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/premium', (req, res) => {
    res.render('premium');
});

app.get("/contactus", (req, res) => {
    res.render("contactus");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/firstpage", (req, res) => {
    res.render("firstpage");
});

app.get("/horror", (req, res) => {
    res.render("horror");
});

app.get("/crime", (req, res) => {
    res.render("crime");
});

app.get("/comedy", (req, res) => {
    res.render("comedy");
});

app.get("/romance", (req, res) => {
    res.render("romance");
});

app.get("/popular", (req, res) => {
    res.render("popular");
});
app.get("/action", (req, res) => {
    res.render("action");
});

app.get("/suspense", (req, res) => {
    res.render("suspense");
});

app.get("/drama", (req, res) => {
    res.render("drama");
});

app.get("/fantasy", (req, res) => {
    res.render("fantasy");
});

app.get("/faq", (req, res) => {
    res.render("faq");
});

//Register user
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        password: req.body.password
    }

    //check if the user already exists in the database
    const existingUser = await collection.findOne({ name: data.name });
    if (existingUser) {
        res.send("User already exists. Please choose a different username.");
    } else {
        try {
            // Hash the password using bcrypt
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);

            // Replace the original password with the hashed password
            data.password = hashedPassword;
        } catch (error) {
            // Handle any errors that occur during hashing or assignment
            console.error('Error hashing or assigning password:', error);
        }

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

});

//login user
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            res.send("Username cannot be found");
        }

        //compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            res.render("home");
        } else {
            req.send("Wrong Password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.send("Wrong Details");
    }
});


const port = 5000;
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
})