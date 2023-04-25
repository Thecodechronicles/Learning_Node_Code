module.exports.React = {  // My implementation
    createElement: function (element, props, ...children) {
        return {
            element,
            props,
            children
        }
    }
}


// //=========================================================
// //==============================================
// // For Old JSX transformation
// module.exports.React = {  // react implementation (probably)
//     createElement: function (element, props, ...children) {
//         if (children) {
//             props = { ...props, children: [...children] };
//         }
//         return {
//             element,
//             props
//         }
//     }
// }

// // JSX transformation (createElement has to dynamically check for 'children' passed in as var args inside createElement)
// // and then return an obect by injectiog children as a seperate property inside thr props object
// // Hence the work of injecting children as a property is done dynamically at the time of running of react app coz React.createElement
// // would run inside of render() methods of components 
// React.createElement(
//     'div',  // element
//     { onSubmit: 'this.formHandler' }, //props
//     React.createElement(   // children as var args
//         'form',
//         null
//     ),
//     React.createElement('br', null) // children as var args
// );
// // Or
// React.createElement(
//     'div',
//     { onSubmit: 'this.formHandler' },
// );
// //##############################################

// //==============================================
// // For new JSX transformation
// function jsx(element, props) {
//     return {
//         element,
//         props
//     }
// }

// // Here, New JSX transformation saves from dynamically checking for 'children' at each call of jsx() function
// // at the time of running of react app instead the babel transformation of JSX determines when transpiling the code 
// // wheather the props object must be injected with 'children' property or not Hence no dynamic checking 
// // and less processing cost to react
// jsx('div', { onSubmit: 'abc', children: ["Hi ! Let's just get started ", state, "!"] });
// // Or
// jsx('div', { onSubmit: 'abc' });
// //###############################################
// //##########################################################