const express = require('express');
const app = express();

function handlePageNotFoundMiddleware(req, res, next) {
    if (req.url !== '/' && req.url !== '/about' && req.url !== '/contact') {
        res.sendFile(__dirname + '/404.html');
    } else {
        next();
    }
};

app.use(handlePageNotFoundMiddleware);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/about', function(req, res) {
    res.sendFile(__dirname + '/about.html');
});

app.get('/contact', function(req, res) {
    res.sendFile(__dirname + '/contact.html');
});

app.listen(8080);