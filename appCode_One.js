
// var m = 21;

// function avn(value) {
//     m = m + 1;
//     // var i = value;
//     return function () {
//         var j = 1;
//         // i = i + 11;
//         value = value + 11;
//         j = j + 1
//         // console.log('m: ', m);
//         console.log('value: ', value);
//         // console.log('i: ', i);
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




// // Code Example 2   
// // https://youtu.be/vmMTN676mn8?t=112
// // for (var i = 0; i < 5; i++) {
// for (let i = 0; i < 5; i++) {
//     // const value = i; // const is block-scoped
//     // var value = i; // var is function-scoped
//     setTimeout(() => {
//         // console.log(value);
//         console.log(i);
//     }, 1000);
// }

// console.log(Math.round(8.96 * 100));

// console.log({ 1: [{ a: 'hey !' }] });

// const abc = {
//     a: 'hi !',
//     b: 'Hello !!',
//     c: {

//     }
// }

// const ijk = {
//     ...abc
// }

// console.log(ijk);


const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// console.log(ExtractTextWebpackPlugin);

const pluginObject = new ExtractTextWebpackPlugin('style.css');

// console.log('ExtractTextWebpackPlugin_extract() : ', ExtractTextWebpackPlugin.extract({ use: ['css-loader', 'sass-loader'] }));
// console.log('ExtractTextWebpackPlugin_new ExtractTextWebpackPlugin() : ', new ExtractTextWebpackPlugin('style.css'));

// console.log('ExtractTextWebpackPlugin_extract() : ', pluginObject.extract({ use: ['css-loader', 'sass-loader'] }));
// console.log('pluginObject : ', pluginObject);
// // console.log(JSON.stringify(pluginObject));
// console.log('prototype: ', ExtractTextWebpackPlugin.prototype)
// console.log('function : ', ExtractTextWebpackPlugin);