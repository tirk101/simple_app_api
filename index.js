const express = require("express");
const app = express();

const isPrimeHandler = (req, res) => {
    const x = parseInt(req.params.x);
    const isPrime = checkPrime(x);
    res.json({ isPrime });
};

function checkPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/getcode", (req, res) => res.send("Jino is the most handsome person!"))
app.get("/is_prime/:x", isPrimeHandler);

const server = app.listen(3001, () => console.log("Example app listening on port 3001!"));

module.exports = {
    isPrimeHandler,
    server,
};
