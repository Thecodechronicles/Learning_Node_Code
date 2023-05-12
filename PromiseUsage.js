const someProm = new Promise(
    (resolve, reject) => {
        // setTimeout(() => {
        //     resolve('IamResolved !');
        // }, 1000);

        // return 'abc';
        resolve('abc');
    }
);

console.log('someProm: ', someProm, someProm.value);

someProm.then((result) => {
    console.log(result);
    return result + ' Yay, Yippiee !!';
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve('Yay, IamResolved too !!');
    //     }, 1000)
    // });
})
// .then((result) => {
//     console.log(result);
// })