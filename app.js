//We're using the express framework and the mailgun-js wrapper
var request = require('request');
//Your api key, from Mailgun’s Control Panel
var api_key = 'key-3ac9d8ce2b531334c715e3bc22d60713';
//Your domain, from the Mailgun Control Panel
var domain = 'jamiegoodwin.uk';
//Your sending email address
var from_who = 'me@jamiegoodwin.uk';
// API URL
var base_url = 'https://api.mailgun.net/v3/jamiegoodwin.uk/messages';

// Mailgun data
var mgd = {
    from: from_who,
    to: 'me@jamiegoodwin.uk',
    subject: 'A new guest has confirmed their attendance!',
    text: 'A new guest has confirmed their attendance!'
}

request.get({
    url: base_url,
    form: mgd,
    auth: {
        api: api_key
    }
}, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
});