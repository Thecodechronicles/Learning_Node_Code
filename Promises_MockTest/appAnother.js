
var promiseObj = {
    // promiseInst
}

var k = 1;
var rv;
var nrv;
var returnedPromise;
var idArr = [{ 'idResolve': [], 'idReject': [] }];

//non event based mock promise
function promiseM(mainCalback) {

    var resolveData;
    var rejectData;
    var idResolve;
    var idReject;
    var hasPromised = false;
    var rejectThread;
    this.rejectM;
    var currentPromise = this;

    k = k + 1;

    mainCalback(function (data) { //resolve callback
        if (hasPromised === false) {
            resolveData = data;
            hasPromised = true;
        }
        // resolveData = data;
    }, function (data) { // reject callback
        if (hasPromised === false) {
            rejectData = data;
            hasPromised = true;
        }
        // resolveData = data;
    });

    this.thenM = function (resultCallback, param) {
        var returnValue;
        // var idResolveOne;
        var resolveThread;
        // var rejectThread;
        var resultM;
        var idRejectM;
        idResolve = setInterval(() => {
            console.log('thenM K: ', k, 'param: ', param);
            if (resolveData !== undefined) {
                returnValue = resultCallback(resolveData);
                console.log('returnValue: ', returnValue);
                // resolveData = undefined;
                if (returnValue !== undefined) {
                    if (!(returnValue instanceof promiseM)) {
                        resolveThread(returnValue);
                    }
                    else if (returnValue instanceof promiseM) {
                        rv = 1;
                        returnValue
                            .thenM((result) => {
                                resultM = result;
                                resolveThread(resultM);
                                returnedPromise = 1;
                                console.log('returned promise thenM: ', promiseObj.promiseInst.j, 'K: ', k);
                            }, 'hey!')
                            .catchM((error) => {
                                rejectThread(error);
                                console.log('returned promise catchM: ', promiseObj.promiseInst.j);
                                promiseObj.promiseInst.rejectM(error);
                            }, [k, 21]);
                    }
                }
                clearInterval(idResolve);
                clearInterval(idReject);
            }
        }, 1000);

        idArr[0].idResolve.push(idResolve);

        if (rv == undefined) {
            promiseObj.promiseInst = new promiseM((resolve, reject) => {
                resolveThread = resolve;
                rejectThread = reject;
                this.catchM((error) => {
                    console.log('thenM error: ', error);
                    console.log('value of K: ', promiseObj.promiseInst.j);
                    promiseObj.promiseInst.rejectM(error);
                }, k);
            });
            // currentPromise = promiseObj.promiseInst;
            promiseObj.promiseInst.rejectM = rejectThread;
            promiseObj.promiseInst.j = k;
            return promiseObj.promiseInst;
        }
        else {
            return this;
        }
    }

    this.catchM = function (errorCallback, param) {
        idReject = setInterval(() => {
            console.log('param: ', param);
            console.log('promiseObj.promiseInst.j: ', promiseObj.promiseInst.j);
            if ((rejectData !== undefined)
            ) {
                errorCallback(rejectData);

                for (var i = 0; i < idArr.length; i++) {
                    for (var y = 0; y < idArr[i].idReject.length; y++) {
                        console.log('y: ', y);
                        clearInterval(idArr[i].idReject[y]);
                    }
                    for (var z = 0; z < idArr[i].idResolve.length; z++) {
                        console.log('z: ', z);
                        clearInterval(idArr[i].idResolve[z]);
                    }
                }
                if (currentPromise == promiseObj.promiseInst) {
                    console.log('its a match !', param);
                    clearInterval(idReject);
                }
                clearInterval(idResolve);

            }
        }, 1000);
        if (currentPromise !== promiseObj.promiseInst) {
            console.log('pushed !', param);
            idArr[0].idReject.push(idReject);
        }
        return this;
    }
}




// mongo lib test
var mongooseM = {}

mongooseM.modelM = function (collectionName, collectionObject) {

    var collection = collectionName;
    var collectionData = collectionObject;

    function modelObject(randomObject) {

        var resolveThread;
        var rejectThread;

        this.save = function () {

            setTimeout(() => {
                resolveThread(collectionName + ' saved');
            }, 5000);

            if (randomObject.email == collectionData.email) {
                return new promiseM((resolve, reject) => {
                    resolveThread = resolve;
                    rejectThread = reject;
                });
            }
        }
    }

    modelObject.find = function (data) {

        var resolveThread;
        var rejectThread;

        setTimeout(() => {
            resolveThread(collectionName + ' with data as ' + data + ' found');
            // rejectThread('collectionName not found');
        }, 5000);

        // return new promiseM((resolve, reject) => {  // returning a promise
        //     resolveThread = resolve;
        //     rejectThread = reject;
        // });

        return { // returning thenable and not a promise
            then: function (callback) {
                new promiseM((resolve, reject) => {
                    resolveThread = resolve;
                    rejectThread = reject;
                }).then((result) => {
                    callback(result);
                });
            }
        }

    }
    return modelObject;
}


var Speakers = mongooseM.modelM('Speakers', {
    email: 'abcd@kyg.com'
});

// var speaker = new Speakers({
//     email: "abcd@vji.com"
// });

// speaker.save().thenM((result) => {
//     console.log(result);
// }).catchM((error) => {
//     console.log(error);
// });

Speakers.find('super')
    .thenM((result) => {
        console.log('result1: ', result);
        return 'heros';
        // return new promiseM((resolve, reject) => {
        //     setTimeout(() => {
        //         // resolve('Marvel1');
        //         reject('RajComics');
        //     }, 5000);
        // });
    }).thenM((result2) => {
        console.log('result2: ', result2);
        return new promiseM((resolve, reject) => {
            setTimeout(() => {
                // resolve('Marvel');
                reject('RajComics');
            }, 2000);
        });
    }).thenM((result4) => {
        console.log('result4: ', result4);
        return 'Batman';
    }).thenM((result5) => {
        console.log('RRRRResult5: ', result5);
    }, 'hello!').catchM((error) => {
        console.log('error: ', error);
    }, 11);