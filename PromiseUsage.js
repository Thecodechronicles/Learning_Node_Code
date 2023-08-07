// const someProm = new Promise(
//     (resolve, reject) => {
//         // setTimeout(() => {
//         //     resolve('IamResolved !');
//         // }, 1000);

//         // return 'abc';
//         resolve('abc');
//     }
// );

// console.log('someProm: ', someProm, someProm.value);

// someProm.then((result) => {
//     console.log(result);
//     return result + ' Yay, Yippiee !!';
//     // return new Promise((resolve, reject) => {
//     //     setTimeout(() => {
//     //         resolve('Yay, IamResolved too !!');
//     //     }, 1000)
//     // });
// })
// // .then((result) => {
// //     console.log(result);
// // })


const promiseTest = (a, b) => {
    // return new Promise((resolve, reject) => {  // returning a promise

    //     // console.log('promiseTestTwo !');

    //     setTimeout(() => {
    //         if (a < 5) {
    //             reject('error: given value less than 5');
    //         }
    //         else {
    //             resolve(a + b);
    //         }
    //     }, 5000);

    //     console.log('promiseTestOne !');
    //     // return 'abc';
    // });

    return {  // returning a thenable
        then: function (theCallback) { // theCallback received as a callback sent by 'async'
            new Promise((resolve, reject) => {

                // console.log('promiseTestTwo !');

                setTimeout(() => {
                    if (a < 5) {
                        reject('error: given value less than 5');
                    }
                    else {
                        resolve(a + b);
                    }
                }, 5000);

                console.log('promiseTestOne !');
                // return 'abc';
            }).then((result) => {
                theCallback(result); // this 'theCallback' has to be called here otherwise, 'await' will never be resolved.....
                // .....because 'theCallback' was sent by 'async' in this 'thenable'

                // In a promise this kind of callback will be called by promise automatically after when.....
                // .....promise's 'resolve()' method is invoked
            }).catch((error) => {

            });
        }
    }

}

// Note: await works on thenables.. Be it a promise object (which already has a then function).....
// .....or a plain object which has a then function in it. Threfore a function returning.....
// .....either a promise or an object which has a then function can be used as await but, await.....
// .....won't fully resolve until callback passed to the 'then' of a thenable is called or invoked 

// async function sends a callback to the then method (returned by function used as await) as a.....
// .....parameter that contains the functionality for resuming itself

// Also if you send any value to the callback as its parameter, you will get it by the await keyword

// A promise is a thenable because it is an object which has then function in it
// async await works with any function that returns an object with a 'then' method

// async/await may work with every thenable but 'async' always returns a promise  

// exec() method returned by mongoose query methods(like 'fineOne()') are full fledged promises whereas, mongoose.....
// .....query methods itself are just thenables

// It is worth noting here that, As far as functionality is concerned, these two are equivalent.....
// .....weather working with 'promises' or 'thenables'. One difference is you can't chain '.then()' calls with thenables.....
// .....as ou can with promises. if required, use User.findOne().exec().then().then() etc..

const asyncTest = async () => {
    // const sum = await promiseTest(5, 5);
    const sumOne = await promiseTest(11, 11); // returning a thenable (a thenable object which has a then method) and.....
    // .....therefore internally invoking a then method on promiseTest. Visualise..... 
    // .....as this: promiseTest(11, 11).then((a_callback_function_is_sent_as_a_parameter_by_async_here)=>{ [native code] })
    console.log('sumOne: ', sumOne);
    return sumOne;
}

asyncTest()
    .then((result) => {
        console.log('result: ', result);
    })
    .catch((error) => {
        console.log('e:', error)
    });

// promiseTest(5, 5)
//     .then((result) => {
//         // console.log(result);
//         // return result;
//         return promiseTest(result, 11)
//     })
//     .then((result) => {
//         console.log('result 2: ', result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });


// equivalence of asyncTest (async and await)
// const nonAsyncTest = () => {
//     return new Promise((resolve, reject) => {
//         promiseTest(5, 5)
//             .then((result) => {
//                 // console.log(result);
//                 // return result;
//                 return promiseTest(result, 11)
//             })
//             .then((result) => {
//                 console.log('sumOne: ', result);
//                 resolve(result);
//             })
//             .catch((error) => {
//                 console.log(error);
//                 reject(error);
//             });
//     });
// }

// nonAsyncTest()
//     .then((result) => {
//         console.log('result: ', result);
//     }).catch((error) => {
//         console.log('e: ', error)
//     })

console.log('promiseTest One !!');




// var abc = () => {
//     return {
//         bcd: 'Hello Ji !!'
//     }
// }

// new abc();

// new promiseTest(1, 1);