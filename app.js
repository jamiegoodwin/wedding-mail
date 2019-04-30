// Modules
const request = require('request');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Settings
const port = process.env.PORT;

// Mailgun
const api_key = process.env.MAILGUN_API;
const base_url = 'https://api.mailgun.net/v3/jamiegoodwin.uk/messages';

// Set up app
app.use(bodyParser.json());
app.use(cors({
    origin: 'https://evawin.uk/'
}));

function rsvp($name, $email, $yurt, $res) {
    // Mailgun data
    const mgd = {
        from: 'Jamie & Kristina <me@jamiegoodwin.uk>',
        to: $email + ", " + process.env.SEND_TO,
        subject: $name + ' , you\'re coming to the wedding!',
        text: 'Thanks for letting us know. We\'ve got a copy of this email to confirm.\n\nIf you need anything, reply to this email or text/call us:\n\nJamie: 07792 946 868\nKristina: 07714 083 465\n\nYurt? ' + $yurt
    }

    // Email J&K
    request.post({
        url: base_url,
        form: mgd,
        auth: {
            user: 'api',
            password: api_key
        }
    }, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body);

        respond($res, response.statusCode);
    });
}

function respond($res, $status) {
    $res.sendStatus($status);
}

app.post('/', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const yurt = (req.body.yurt == "on") ? "Yes please!" : "Nope.";

    // Send RSVP
    rsvp(name, email, yurt, res);
});

app.listen(port, () => console.log(`Listening on port ${port}!`))