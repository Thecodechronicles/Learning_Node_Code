const { EventEmitter } = require("events");

const customEmitter = new EventEmitter();

customEmitter.on('first', () => {
    console.log('first executed !');
});

customEmitter.on('second', () => {
    console.log('second executed !');
});

customEmitter.on('third', () => {
    console.log('third executed !');
});

customEmitter.on('fourth', () => {
    console.log('fourth executed !');
});

customEmitter.on('fifth', () => {
    console.log('fifth executed !');
});

function runningOrder() {
    customEmitter.emit('first');
    customEmitter.emit('second');
    console.log('i am part of mains !');
    // setImmediate(() => {
    //     console.log('immediately executed !');
    // });
    setTimeout(() => {
        console.log('executed after 0 seconds !');
    }, 0);
    customEmitter.emit('third');
    customEmitter.emit('fourth');
    customEmitter.emit('fifth');

}

runningOrder();