
function CustomError(message, fileName, lineNumber) {
    var instance = new Error(message, fileName, lineNumber);
    // Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
}
// CustomError.prototype = Object.create(Error.prototype);



class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MyError';
    }
}

function ijk() {
    console.log('ijk_this:', this);
    return {
        ijkProp: 'hello !'
    }
    // this.ijkProp = 'hello !';
}

// class MyClass extends ijk {
//     constructor() {
//         super();
//         /*  // The implementation is like this in ES5.....
//             // .....when parent class returning an object like the one above: 'return {ijkProp: 'hello !'}'

//             var instance = ijk.call(this);
//             this = instance; // SyntaxError: Invalid left-hand side in assignment ( Should be: _this = instance )
//             instance.__proto__ = MyClass.prototype;

//             // Apart from this implementation which is same in all other implementations also.....
//             //.....when parent class doesn't return an object

//             MyClass.prototype.__proto__ = ijk.prototype;
//             MyClass.__proto__ = ijk;
//             return instance
//         */

//         //  Back to ES6:
//         console.log('MyClass_this:', this);
//         this.ijkProp = 'Hi !';
//         console.log('MyClass_thisAgain:', this);
//     }
// }

function MyClass() {
    var instance = ijk.call(this);
    var _this = instance;

    instance.__proto__ = MyClass.prototype;
    MyClass.prototype.__proto__ = ijk.prototype;
    MyClass.__proto__ = ijk;

    console.log('MyClass_this:', _this);
    _this.ijkProp = 'Hi !';
    console.log('MyClass_thisAgain:', _this);

    return instance;
}

// console.log((new MyClass()).ijkProp);




function ownError(message) {
    var instance = Error.call(this, message);
    var _this = instance;

    instance.__proto__ = ownError.prototype;
    ownError.prototype.__proto__ = Error.prototype;
    ownError.__proto__ = Error;

    // Both are same after 'ownError.__proto__ = Error;'.....
    // .....However, It isn't necessary to invoke this function coz, Error.call is already invoking it
    Error.captureStackTrace(_this, ownError); // omits ownError from stacktrace, controls depth of stacktrace
    // ownError.captureStackTrace(_this, ownError);

    // this.name = 'customError';
    _this.name = 'ownError';
    // instance.name = 'customError';
    return instance;
}

function someError(message) {
    this.message = message;
}

function ErrorTest() {
    try {
        // throw new CustomError("oops! There's an error");
        // throw new MyError("oops! There's an error");
        // throw new ownError("oops! There's an error");
        throw new someError("oops! There's some error");
    }
    catch (e) {
        // console.log(e.stack);
        console.log(e.message);
    }
}

ErrorTest();