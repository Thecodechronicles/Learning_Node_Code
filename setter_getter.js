
const getter = 'salary';

const setGet = function () {
    this[getter + 'one'] = 'Ninja Turtles !';
}

Object.defineProperty(setGet.prototype, getter, {
    get: function () {
        return this[getter + 'one'];
    }
});

console.log('your salary is: ', new setGet().salary);

// OR

const setGetTwo = function () {
    this[getter + 'one'] = 'Ninja Turtles !';
}

setGetTwo.prototype = {
    get [getter]() {
        return this[getter + 'one'];
    }
}

// OR

class SetGet {
    constructor() {
        this[getter + 'one'] = 'Ninja Turtles !';
    }

    get [getter]() {
        return this[getter + 'one'];
    }
}

// OR 

var setGetOne = {
    [getter + 'one']: 'Ninja Turtles !',

    get [getter]() {
        return this[getter + 'one'];
    },

    // abc() {
    //     return 'something abc !!'
    // }
}