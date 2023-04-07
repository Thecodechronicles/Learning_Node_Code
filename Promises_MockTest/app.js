// const validator = require('validator');
const chalk = require('chalk');
const { getSystemErrorMap } = require('util');
const { array } = require('yargs');
const yargs = require('yargs');
var EventEmitter = require('events').EventEmitter;
// const util = require('util');
// var hjk = {
//     [Symbol.toStringTag]: 'hjk'
// };
// const a = chalk.green.bold.inverse('Hi!');
// console.log(chalk.green.__proto__);
// // console.log(hjk);

// function abc() {
//     // abc.ghi = 'pqr';
// }

// abc.__proto__ = Object.create(abc.prototype);

var yui = "Hello ji !!";

// // var abc = Object.create(hjk.prototype);
// var bcd = function () { }
// // abc[Symbol.toStringTag] = 'jki';
// // abc[Symbol.toStringTag] = 'abc';
// abc.ghi = function abc() { };
// abc.tgh = abc;
// console.log(abc);
// console.log(function (iou) { });
// // console.log(hjk.prototype);
// // console.log(bcd);
// // console.log(hjk);

// var ValidOrNot = validator.isEmail('abc@gmail.com');
// if (ValidOrNot) {
//     console.log('The given Email is valid');
// }
// else {
//     console.log("The Email isn't valid");
// }

// console.log(chalk.yellow("Success"));

// function abc() {
//     console.log('Hi!'); 
// }

// const abc = {
//     myString: 'Hello!'
// }

// abc();


// function chalk() {
//     console.log('chalk');
// }

// // chalk.__proto__ = function () { };

// // color.prototype.green = function () { };
// // color.prototype.blue = function () { };

// chalk.__proto__.green = function () { console.log('green') }
// chalk.__proto__.blue = function () { console.log('blue') }

// chalk.__proto__.bgRed = function () { console.log('bgRed inside green') }
// // chalk.blue.__proto__.bgRed = function () { console.log('bgRed inside blue') }


// chalk();
// chalk.green();
// chalk.green.bgRed();

// chalk.blue();
// chalk.blue.bgRed();
// chalk.bgRed.green();
// chalk.blue.green();
// chalk.green.blue();



// const chalk = {
//     green: function () {
//         console.log('green');
//         return this;
//     },
//     blue: function () {
//         console.log('blue');
//         return this;
//     },
//     bgRed: function () {
//         console.log('bgRed');
//         return this;
//     },
//     underline: function () {
//         console.log('underline');
//         return this;
//     },
//     bold: function () {
//         console.log('bold');
//         return this;
//     }

// }



// yargs.command({
//     command: 'add',
//     describe: 'Add a new note',
//     builder: {
//         title: {
//             describe: 'Note title',
//             demandOption: false
//         }
//     },
//     handler: function (argv) {
//         console.log('Adding a new note!')
//     }
// })

// console.log('Here is yargs: ', yargs.parse());



// function multiply(num1, num2) {
//     num1();
//     console.log('Hi !');
//     // return num1 * num2;
// }

// function result(num1, num2) {
//     console.log(this);
//     var y = 11;
//     console.log(multiply(function () {
//         console.log(this);
//     }));
// }

// new result(4, 5);



// var h2 = {
//     someMethod: function (event, callback) {
//         callback();
//     }
// }

// function abc() {
//     // h2.style.backgroundColor = 'yellow';
//     // this.id = "H5";
//     console.log(this);
// }

// h2.someMethod('click', abc);




// mock Promises in the form of promiseM
// const eventEmitter = new EventEmitter()

// function promiseM(mainCalback) {
//     mainCalback(function resolve(data) {
//         setTimeout(() => {
//             eventEmitter.emit('resolve', data);
//         }, 2000)
//     }, function reject(data) {
//         setTimeout(() => {
//             eventEmitter.emit('reject', data)
//         }, 2000)
//     })
//     this.thenM = function (resultCallback) {
//         eventEmitter.on('resolve', function (resolveData) {
//             resultCallback(resolveData);
//         })
//         return this;
//     }
//     this.catchM = function (errorCallback) {
//         eventEmitter.on('reject', function (rejectData) {
//             errorCallback(rejectData);
//         })
//         return this;
//     }
// }





//mock promises without th use of event emitters like above mock promise
function promiseM(mainCallback) {

    var resolveData;
    var rejectData;
    var idResolve;
    var idReject;
    var hasPromised = false;

    mainCallback(function (data) { //resolve callback
        if (hasPromised === false) {
            resolveData = data;
            hasPromised = true;
        }
    }, function (data) { // reject callback
        if (hasPromised === false) {
            rejectData = data;
            hasPromised = true;
        }
    });

    this.thenM = function (resultCallback) {
        idResolve = setInterval(() => {
            if (resolveData !== undefined) {
                resultCallback(resolveData);
                clearInterval(idResolve);
                clearInterval(idReject);
            }
        }, 1000);

        return this;
    }

    this.catchM = function (errorCallback) {
        idReject = setInterval(() => {
            if (rejectData !== undefined) {
                errorCallback(rejectData);
                clearInterval(idReject);
                clearInterval(idResolve);
            }
        }, 1000);
        return this;
    }
}



// promiseM working as promise would work
const doWorkPromise = new promiseM((resolve, reject) => {
    setTimeout(() => {
        resolve([7, 4, 11]);
        // reject('Things went wrong');
        // resolve([7, 4, 11]);
    }, 5000)
    // resolve([7, 4, 11]);
    // reject('Things went wrong');
    // resolve([7, 4, 11]);
});

doWorkPromise.thenM((result) => {
    console.log('Success!', result);
}).catchM((error) => {
    console.log('Error', error);
});




// function promiseContainer() {

//     var resolveContainer;
//     var rejectContainer;

//     setTimeout(() => {
//         // resolveContainer(['Hey Ya !']);
//         rejectContainer('(:-)');
//         resolveContainer(['Hey Ya !']);
//     }, 5000);

//     return new promiseM((resolve, reject) => {
//         resolveContainer = resolve;
//         rejectContainer = reject;
//         console.log('process done !');
//     });
// }

// promiseContainer().thenM((result) => {
//     console.log('Here is the success result ', result);
// }).catchM((error) => {
//     console.log('Oops ! There is an error ', error);
// })





// var i = 1;
// var id = setInterval(() => {
//     console.log(i++);
//     if (i === 11) {
//         clearInterval(id);
//     }
// }, 1000);

// setTimeout(() => {
//     clearInterval(id);
// }, 5000);




// var geocode = require('./MyNodePackages/utils/geocode');
// var forecast = require('./MyNodePackages/utils/forecast');

// var address = 'noida'

// //app.js
// geocode(address, (error, data) => {
//     if (error) {
//         console.log('There is an error: ', error);
//     } else {
//         forecast(data.latitude, data.longitude, (error, { celcius, humidity, precipitation, summary, hourlySummary, pressure, windSpeed }) => {
//             if (error) {
//                 console.log('There is another error: ', error);
//             } else {
//                 console.log('Your weather forecast for the day' + '\n' + 'current conditions: ' + summary + '.' + hourlySummary + '\n' + 'temperature: ' + celcius + ' °C' + '\n' + 'humidity: ' + humidity + ' % ' + '\n' + 'pressure: ' + pressure + ' hPa' + '\n' + 'windspeed: ' + windSpeed + ' kph' + '\n' + 'precipitation: ' + precipitation + ' %')
//             }

//         });
//     }
// })




// var request = require('request');
// function callRequest() {
//     request('http://dataservice.accuweather.com/locations/v1/cities/search?apikey=B88e0eZDQJGHBJAIQpaGWR0L75jtZvsp&q=ghaziabad&language=en-us&details=false', (error, response) => {
//         var responseData = JSON.parse(response.body);
//         if (error) {
//             // callback(error);
//             console.log('Hi ! this is your console error!', error);
//         } else if (JSON.stringify(responseData) === '[]') {
//             // callback('No place found with the name ' + "'" + address + "'" + ' ' + response.body);
//             console.log('Hi ! this is your console !');
//         } else if (responseData.Code) {
//             var errobj = {
//                 code: responseData.Code,
//                 message: responseData.Message
//             }
//             console.log('Hi ! this is your console error obj!', errobj);
//             // callback(errobj);
//         } else {
//             // callback(undefined, {
//             //     latitude: responseData[0].GeoPosition.Latitude,
//             //     longitude: responseData[0].GeoPosition.Longitude,
//             //     location: responseData[0].LocalizedName + ',' + responseData[0].AdministrativeArea.LocalizedName + ',' + responseData[0].AdministrativeArea.CountryID
//             // })
//             console.log('Hi ! this is your console message !', JSON.stringify(responseData[0]));
//         }
//         // return;
//     })
//     console.log('waiting for reply...');
//     // return;
// }


// function ghj() {
//     console.log('Hello !!');
// }

// callRequest();
// ghj();


// function ijop() {
//     ijop.y = 5;
//     var z = 11;
//     var uvw = function () {
//         console.log(z);
//         console.log(this.y);
//     }

//     uvw();
// }

// ijop();

// console.log(this);



function avn(value) {
    var i = value;
    return function () {
        var j = 1;
        i = i + 11;
        j = j + 1
        console.log('i: ', i);
        console.log('j: ', j);
    }
}

var nmo = avn(11);
var lmn = avn(5);

// delete nmo;

console.log('nmo: ');
for (var n = 0; n < 8; n++) {
    nmo();
}

console.log('lmn: ');
for (var n = 0; n < 8; n++) {
    lmn();
}




var y = 0;
function actionL() {
    y = y + 1;
    console.log('clicked !', y);
}

console.log('actionL: ');
for (var n = 0; n < 8; n++) {
    actionL();
}




var mongooseM = {

}

mongooseM.modelM = function (collectionName, collectionObject) {

    var collection = collectionName;
    var collectionData = collectionObject;

    function modelObject(randomObject) {

        var resolveThread;
        var rejectThread;

        // this.save = // seems to be working like below..(Object.prototype.save) and not 'this.save'
        Object.prototype.save = function () {

            setTimeout(() => {
                resolveThread(randomObject.email + ' in ' + collectionName + ' saved');
            }, 2000);

            if (randomObject.email == collectionData.email) {
                return new promiseM((resolve, reject) => {
                    resolveThread = resolve;
                    rejectThread = reject;
                });
            }
        }
        return randomObject;
    }

    modelObject.find = function (data) {

        var resolveThread;
        var rejectThread;

        setTimeout(() => {
            console.log('bla bla');
            if (collectionData[data]) {
                resolveThread(collectionName + ' with data as ' + collectionData[data] + ' found');
            }
            else {
                rejectThread('Data not found !');
            }
            // resolveThread(collectionName + ' with data as ' + collectionData + ' found');
            // rejectThread('collectionName not found');
        }, 5000);

        return new promiseM((resolve, reject) => {
            resolveThread = resolve;
            rejectThread = reject;
        });
    }
    return modelObject;
}


var Speakers = mongooseM.modelM('Speakers', {
    email: 'abcd@kyg.com'
});

new Speakers({
    email: 'abcd@kyg.com'
}).save().thenM((result) => {
    console.log(result);
});
// .save();


function abc() {

}

var nmj = new abc();

if (nmj instanceof abc) {
    console.log(Object.prototype.toString.call(nmj));
}
else {
    console.log('no');
}

// var speaker = new Speakers({
//     email: "abcd@vji.com"
// });

// speaker.save().thenM((result) => {
//     console.log(result);
// }).catchM((error) => {
//     console.log(error);
// });

Speakers.find('super').thenM((result) => {
    console.log('result1: ', result);
    return 'heros';
})
    // .thenM((result2) => {
    //     console.log('result2: ', result2);
    //     return new promiseM((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve('Marvel');
    //         }, 2000);
    //     });
    // }).thenM((result4) => {
    //     console.log('result4: ', result4);
    // })

    // .catchM((error) => {
    //     console.log(error);
    // })
    .catchM((error) => {
        console.log(error);
    });



