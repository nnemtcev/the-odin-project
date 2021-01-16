const http = require('http');
const fs = require('fs');

http.createServer(function(req, res) {
    if (req.url === '/') {
        fs.readFile('index.html', function(err, data) {
            return res.end(data);
        });
    } else if (req.url === '/about') {
        fs.readFile('about.html', function(err, data) {
            return res.end(data);
        });
    } else if (req.url === '/contact') {
        fs.readFile('contact.html', function(err, data) {
            return res.end(data);
        });
    } else {
        fs.readFile('404.html', function(err, data) {
            return res.end(data);
        });
    }
}).listen(8080);