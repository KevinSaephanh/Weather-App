const express = require("express");
const app = express();
const port = process.env.port || 4000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile("index.html", (err) => {
        if (err)
            console.error(err);
    });
});

app.listen(port, () => {
    console.log("server running on port " + port);
});