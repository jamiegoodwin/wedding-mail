// Modules
const request = require('request');
const app = require('express')();
const bodyParser = require('body-parser');
require('dotenv').config();

// Settings
const port = process.env.PORT;

// Mailgun
const api_key = process.env.MAILGUN_API;
const domain = 'jamiegoodwin.uk';
const base_url = 'https://api.mailgun.net/v3/jamiegoodwin.uk/messages';

// Process JSON
app.use(bodyParser.json()); 

function rsvp($name, $email) {
    // Mailgun data
    const mgd = {
        from: $email,
        to: process.env.SEND_TO,
        subject: $name + ' confirmed their attendance!',
        text: ':-)'
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
    });

    // Email RSVPer

    // Add to Mailgun list?
}

app.post('/', function (req, res) {
    const name = req.body.name;
    const email = req.body.email;

    // Send RSVP
    rsvp(name, email);

    res.send('1');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))