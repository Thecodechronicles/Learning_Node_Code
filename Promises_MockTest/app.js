
var EventEmitter = require('events').EventEmitter;

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

    // this.thenM = function (resultCallback) {
    //     var runCheckOnce = 1;
    //     callbackArray.push(resultCallback);
    //     idResolve = setInterval(() => {
    //         if (resolveData !== undefined) {
    //             runCheckOnce = null;
    //             function promiseReturnCheck(resolveDataSet, cbPosition) {
    //                 var promiseM2 = callbackArray[cbPosition](resolveDataSet);
    //                 if (promiseM2.resolveData) {
    //                     resolveData = promiseM2.resolveData;
    //                     cbPosition = cbPosition + 1;
    //                     // resultCallback(promiseM2.resolveData);
    //                     promiseReturnCheck(promiseM2.resolveData, cbPosition);
    //                 }
    //                 else {
    //                     clearInterval(idResolve);
    //                     clearInterval(idReject);
    //                 }
    //             }
    //             if (runCheckOnce == 1) {
    //                 promiseReturnCheck(resolveData, 0);
    //             }
    //             // clearInterval(idResolve);
    //             // clearInterval(idReject);
    //         }
    //     }, 1000);
    //     return this;
    // }

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


var mongooseM = {}

mongooseM.modelM = function (collectionName, collectionObject) {

    var collection = collectionName;
    var collectionData = collectionObject;

    function modelObject(randomObject) {

        var resolveThread;
        var rejectThread;

        // this.save = // seems to be working like below..(Object.prototype.save) and not 'this.save'
        Object.prototype.save = function () {

            setTimeout(() => {
                try {
                    // get some result back or else throe new Error() which will be caught (catch block) below
                    resolveThread(randomObject.email + ' in ' + collectionName + ' saved');
                }
                catch (error) {
                    rejectThread(`There's an error, Have a look: ${error.stack}`)
                }
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



