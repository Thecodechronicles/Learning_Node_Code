
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
//             this = instance; // SyntaxError: Invalid left-hand side in assignment ( Should be: var _this = instance )
//             var _this = instance;
//             instance.__proto__ = MyClass.prototype;

//             // Apart from this implementation which is same in all other implementations also.....
//             //.....when parent class doesn't return an object

//             MyClass.prototype.__proto__ = ijk.prototype;
//             MyClass.__proto__ = ijk;
//             return instance
//         */

//         //  Back to ES6:
//         // console.log('MyClass_this:', this);
//         // this.ijkProp = 'Hi !'; // here, 'this' will be equal to whatever 'super()' call returns
//         // console.log('MyClass_thisAgain:', this);
//     }
// }

// // function MyClass() {
// //     var instance = ijk.call(this);
// //     var _this = instance;

// //     instance.__proto__ = MyClass.prototype;
// //     MyClass.prototype.__proto__ = ijk.prototype;
// //     MyClass.__proto__ = ijk;

// //     console.log('MyClass_this:', _this);
// //     _this.ijkProp = 'Hi !';
// //     console.log('MyClass_thisAgain:', _this);

// //     return instance;
// // }

// // console.log((new MyClass()).ijkProp);




function ownError(message) {
    var instance = Error.call(this, message); // 'this' may never be used inside Error constructor.....
    // //..... it's almost like calling 'Error(message)'
    var _this = instance;

    console.log('this: ', this, '  _this: ', _this)

    instance.__proto__ = ownError.prototype;
    ownError.prototype.__proto__ = Error.prototype;
    ownError.__proto__ = Error;

    // Both are same after 'ownError.__proto__ = Error;'.....
    // .....However, It isn't necessary to invoke this function coz, Error.call is already invoking it
    Error.captureStackTrace(_this, ownError); // omits ownError from stacktrace, controls depth of stacktrace
    // ownError.captureStackTrace(_this, ownError);
    // Error.captureStackTrace(this, ownError); // if not extending Error class, captureStackTrace must be..... 
    // .....given 'this' instead of '_this'

    // Note: Error.captureStackTrace is intended to be used when constructing Error object without extending the Error class.....
    // .....Here, captureStackTrace is being used to control the depth of error stack

    // this.name = 'customError';
    _this.name = 'ownError';
    // instance.name = 'customError';
    return instance;
}

function someError(message) {
    this.message = message;
}


class RandomClass {
    constructor() {

    }
}

class SomeError extends Error {
    constructor() {
        super();
        this.name = 'SomeError';
        console.log('this: ', this); // In a class 'this' would be the instance returned by..... 
        // .....super class constructor when invoking super()
    }
}

function ErrorTest() {
    try {
        // throw new CustomError("oops! There's an error");
        // throw new MyError("oops! There's an error");
        throw new ownError("oops! There's an error");
        // throw new someError("oops! There's some error");
        // throw new SomeError("oops! There's an error");
    }
    catch (e) {
        // console.log(e[Symbol.toStringTag]);
        // console.log(e.toString());
        // console.dir(e, { depth: null });
        console.log(e);
        // console.log(e.stack);
        // console.log(e.message);
    }
}

ErrorTest();





// function customErr(a) {
//     this.err = a;
// }

// function demo() {
//     try {
//         throw new customErr(`There's an error`);
//     }
//     catch (error) {
//         console.log('demo error: ', error.err);

//     }
// }

// demo();