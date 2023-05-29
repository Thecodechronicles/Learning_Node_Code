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
    return new Promise((resolve, reject) => {

        // console.log('promiseTestTwo !');

        setTimeout(() => {
            if (a < 5) {
                reject('error: given value less than 5');
            }
            else {
                resolve(a + b);
            }
        }, 11000);

        console.log('promiseTestOne !');
    });
}

const asyncTest = async () => {
    const sum = await promiseTest(11, 11);
    const sumOne = await promiseTest(11, 7);
    console.log('sumOne: ', sumOne);
    // return 5;
}

asyncTest()
    .then((result) => {
        console.log('result: ', result);
    })
    .catch((error) => {
        console.log('e:', error)
    })

// promiseTest(11, 4)
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

console.log('promiseTest One !!');