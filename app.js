const express = require("express");
const cors = require("cors");
const studentsRouter = require("./app/router/student.route");
const classRouter = require("./app/router/class.router");
const ApiError = require("./app/api-error");
const User = require("./app/models/user");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/api/students", studentsRouter);
app.use("/api/class", classRouter);


app.post("/", (req, res) => {
    res.json({ message: "Welcome to THPT application." });
});


app.post("/auth/login", async (req, res, next) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                "secret",
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;
            console.log(token);
            // user
            res.status(200).json(user);
        }else{
            res.status(400).send("Invalid Credentials");
        }
    } catch (err) {
        return next(  
            new ApiError(500, `Error cannot login`)
        );
    }
});

app.post("/auth/register", async (req, res, next) => {

    // Our register logic starts here
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        // Create token

        const token = jwt.sign(
            { user_id: user._id, email },
            "secret",
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        return next(  
            new ApiError(500, `Error register user`)
        );
    }
    // Our register logic ends here
});

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    })
})




module.exports = app;