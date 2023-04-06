
// function avn(value) {
//     var i = value;
//     return function () {
//         var j = 1;
//         i = i + 11;
//         j = j + 1
//         console.log('i: ', i);
//         console.log('j: ', j);
//     }
// }

// var nmo = avn(11);
// var lmn = avn(5);

// console.log('nmo: ');
// for (var n = 0; n < 8; n++) {
//     nmo();
// }

// console.log('lmn: ');
// for (var n = 0; n < 8; n++) {
//     lmn();
// }





var rv;
var nrv;
var idArr = [{ 'idResolve': [], 'idReject': [] }];
var promiseObj = {};

//non event based mock promise
function promiseM(mainCalback) {

    var resolveData;
    var rejectData;
    var idResolve;
    var idReject;
    var hasPromised = false;
    var rejectThread;
    this.rejectM;
    currentPromise = this;

    mainCalback(function (data) { //resolve callback
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
        var returnValue;
        var resolveThread;
        var resultM;
        var idRejectM;
        idResolve = setInterval(() => {
            if (resolveData !== undefined) {
                returnValue = resultCallback(resolveData);
                if (returnValue !== undefined) {
                    if (!(returnValue instanceof promiseM)) {
                        resolveThread(returnValue);
                    } else if (returnValue instanceof promiseM) {
                        rv = 1;
                        returnValue
                            .thenM((result) => {
                                resultM = result;
                                resolveThread(resultM);
                            })
                            .catchM((error) => {
                                rejectThread(error);
                                promiseObj.promiseInst.rejectM(error);
                            });
                    }
                } else if (returnValue == undefined) {
                    nrv = 1;
                    promiseObj.promiseInst.rejectM('returnValue');
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
                    promiseObj.promiseInst.rejectM(error);
                });
            });
            promiseObj.promiseInst.rejectM = rejectThread;
            return promiseObj.promiseInst;
        }
        else {
            return this;
        }
    }

    this.catchM = function (errorCallback) {
        idReject = setInterval(() => {
            if ((rejectData !== undefined) && (nrv !== 1)) {
                errorCallback(rejectData);

                if ((currentPromise == promiseObj.promiseInst) || (rv == 1)) {
                    clearInterval(idReject);
                }

                for (var i = 0; i < idArr.length; i++) {
                    for (var y = 0; y < idArr[i].idReject.length; y++) {
                        clearInterval(idArr[i].idReject[y]);
                    }
                    for (var z = 0; z < idArr[i].idResolve.length; z++) {
                        clearInterval(idArr[i].idResolve[z]);
                    }
                }
            } else if (nrv == 1) {
                clearInterval(idReject);
            }
        }, 1000);

        if (currentPromise !== promiseObj.promiseInst) {
            idArr[0].idReject.push(idReject);
        }
        return this;
    }
}





var mongooseM = {

}

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
        }, 2000);

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




Speakers.find('super').thenM((result) => {
    console.log('result1: ', result);
    // return 'heros';
    return new promiseM((resolve, reject) => {
        setTimeout(() => {
            resolve('Marvel1');
            // reject('RajComics');
        }, 2000);
    });
}).thenM((result2) => {
    console.log('result2: ', result2);
    return new promiseM((resolve, reject) => {
        setTimeout(() => {
            // resolve('Marvel2');
            reject('RajComics');
        }, 5000);
    });
}).thenM((result4) => {
    console.log('result4: ', result4);
    return 'Batman';
}).thenM((result5) => {
    console.log('result5: ', result5);
}).catchM((error) => {
    console.log('error: ', error);
});