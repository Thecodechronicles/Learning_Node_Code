var express = require('./appCode');

var app = express();

app.use(express.RouterM());
app.use(express.bodyParserM());

app.get('/abc', function (req, res, next) {
    console.log('inside abc one');
    next();
    console.log('Hello Ji !!')
});

app.get('/abc', function (req, res, next) {
    console.log('inside abc two');
    // next();
});

app.get('/abc', function (req, res, next) {
    console.log('inside abc three');
});

app.listen('4000', '/abc', function () {
    console.log('listening on port 4000');
});
