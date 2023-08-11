
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
// for (var i = 0; i < 5; i++) {
//     // for (let i = 0; i < 5; i++) {
//     // const value = i; // const is block-scoped
//     // var value = i; // var is function-scoped
//     setTimeout(() => {
//         // console.log(value);
//         console.log(i);
//     }, 1000);
// }

// // Code Example 2: Problem
// for (var i = 0; i < 5; i++) {
//     setTimeout(() => {
//         console.log(i);
//     }, 1000);
// }

// // Code Example 2: Solution, Type 1
// for (var i = 0; i < 5; i++) {
//     const value = i; // const is block-scoped
//     setTimeout(() => {
//         console.log(value);
//     }, 1000);
// }

// // Code Example 2: Solution, Type 2
// for (let i = 0; i < 5; i++) { // let is also block-scoped
//     setTimeout(() => {
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






// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// // console.log(ExtractTextWebpackPlugin);

// const pluginObject = new ExtractTextWebpackPlugin('style.css');
// const standAloneFunction = ExtractTextWebpackPlugin.extract;

// console.log('standAloneFunction_extract() : ', standAloneFunction({ use: ['css-loader', 'sass-loader'] }));
// console.log('ExtractTextWebpackPlugin_extract() : ', ExtractTextWebpackPlugin.extract({ use: ['css-loader', 'sass-loader'] }));
// console.log('ExtractTextWebpackPlugin_new ExtractTextWebpackPlugin() : ', new ExtractTextWebpackPlugin('style.css'));

// console.log('pluginObject_extract() : ', pluginObject.extract({ use: ['css-loader', 'sass-loader'] }));
// console.log('pluginObject : ', pluginObject);
// // console.log(JSON.stringify(pluginObject));
// console.log('prototype: ', ExtractTextWebpackPlugin.prototype)
// console.log('function : ', ExtractTextWebpackPlugin);







let componentHooks = [];
let currentHookIndex = 0;

// How useState works inside React (simplified).
function useState(initialState) {
    // let pair = componentHooks[currentHookIndex];
    let pair = componentHooks[`${initialState}Key`];
    // console.log('array pair: ', pair);
    // console.log('currentHookIndex: ', currentHookIndex);
    if (pair) {
        console.log('inside pair check');
        // This is not the first render,
        // so the state pair already exists.
        // Return it and prepare for next Hook call.
        // currentHookIndex++;
        return pair;
    }

    // This is the first time we're rendering,
    // so create a state pair and store it.
    pair = [initialState, setState];

    function setState(nextState) {
        console.log('inside setState()');
        // When the user requests a state change,
        // put the new value into the pair.
        pair[0] = nextState;
        // updateDOM();
        // return useState(0);
    }

    console.log('Hello Ji !!');
    // Store the pair for future renders
    // and prepare for the next Hook call.
    // componentHooks[currentHookIndex] = pair;
    componentHooks[`${initialState}Key`] = pair;
    // currentHookIndex++;
    return pair;
}

// var [state, setState] = 
var array = useState(1);
var arrayAbc = useState('abc');
var [state, setState] = array;
var [stateAbc, setStateAbc] = arrayAbc;
console.log(state);
console.log(stateAbc);
// console.log(array);

// useState(1);
// setState(11);
setStateAbc('ijk');
var arrayTwo = useState(1);
var arrayAbcd = useState('abc');
var [stateTwo, setStateTwo] = arrayTwo;
var [stateAbcd, setStateAbcd] = arrayAbcd;
console.log(stateTwo);
console.log(stateAbcd);
// console.log(arrayTwo);

// setStateAbcd('mno');
setStateTwo(5);
var arrayFour = useState(1);
var arrayAbzg = useState('abc');
var [stateFour, setStateFour] = arrayFour;
var [stateAbzg, setStateAbzg] = arrayAbzg;
console.log(stateFour);
console.log(stateAbzg);


// setState1(21);
// var array4 = useState(0);
// var [state2, setState2] = array4;
// // console.log(array4);
// console.log(state2);


// console.log(setState(21));




const abc = {
    a: class lmn {
        constructor() {
            console.log('class as a property of an object ! ', this);
            console.log(abc.b);
        }
    },

    b: 'abc'
}

new abc.a();

// export const ijk = class ijk {

// }

function ghi() {
    {

    }
}


var jkl = 'prop'

var uvw =
{
    prop: 'value of prop',
    [jkl]: 'value of jkl',
    'ijk': 'nyu',
    'abc.i': 'pqr',
    propTwo: {
        mno: 'value of propTwo'
    }
}

var propString = 'propTwo';
var mnoString = 'mno'

console.log(uvw[jkl]);
console.log(uvw.prop);
console.log(uvw.ijk);
console.log(uvw['abc.i']);
console.log(uvw[propString][mnoString])

var arrObj = Object.keys(uvw);
console.log(arrObj);