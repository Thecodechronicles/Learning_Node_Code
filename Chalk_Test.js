// const key = { "a": "b" };
// let obj = { "a": "b" };
// obj[key] = "obj";
// for (let c of obj) {
//     console.log(c);
// }

var app = require('express')()

app.use('/users', async function (req, res) {
    await waitFifteenSec();
    res.send('Hi');
})

var server = app.listen(8080);
server.setTimeout(10 * 1000); //10 sec

server.on('timeout', function () {
    console.log('timed out')
})

function waitFifteenSec() {
    return new Promise(function (resolve) {
        setTimeout(function () { resolve(); }, 1000);
    });
}