const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

//parse content type to json
app.use(express.json());

//parse content type to x-from-url-encoded
app.use(express.urlencoded({ extended: true }));

//database
const db = require("./models");
const Role = db.role;

// untuk sync migration
// db.sequelize.sync();

// untuk reset migration 
// HATI - HATI! isi dari table akan ter-hapus semua! 
//force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Database with { force: true }');
//     initial();
// });

app.get("/", (req, res) => {
    res.json({
        message: "Homepage"
    });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/blog.routes")(app);
require("./routes/amalan.routes")(app);
require("./routes/comment.routes")(app);



//set port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}