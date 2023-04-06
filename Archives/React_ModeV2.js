var React = require('./ReactCreate').React;
var ReactDOM = require('./React_ModeSupport').ReactDOM;
var arrDiv = require('./React_ModeSupport').arrDiv;
var h1 = require('./React_ModeSupport').h1;
var h2 = require('./React_ModeSupport').h2
var div = require('./React_ModeSupport').div;
var input = require('./React_ModeSupport').input;
var textarea = require('./React_ModeSupport').textarea;
var img = require('./React_ModeSupport').img;
var p = require('./React_ModeSupport').p;


var userElement = {
    props: {},
    render: function () {
        if (this.props.children) {
            return [
                {
                    a: 'nameUserElement',
                    b: 'addressUserElement',
                    ...this.props.propObj
                },
                ...this.props.children
            ]
        }
    }
}

var userComponent = React.createElement(
    userElement,
    { i: 'idUser', j: 'emailUser' },
    React.createElement(input, { i: 'idInput', j: 'emailInput' }),
    React.createElement(
        div,
        { i: 'idDiv', j: 'emailDiv' },
        React.createElement(
            h1,
            { m: 'idH1', n: 'emailH1' },
            React.createElement(
                h2,
                { c: 'nameH2', d: 'addressH2' },
                React.createElement(
                    textarea,
                    { b: 'addressTextAreaH2', c: 'phoneNumberTextareaH2' })))),
    React.createElement(textarea, { i: 'idTextarea', j: 'emailTextarea' }),
    React.createElement(img, { i: 'idImg', j: 'emailImg' }),
    React.createElement(p, { i: 'idP', j: 'emailP' }));

var pageDOM = ReactDOM.render(userComponent);
console.log(JSON.stringify(pageDOM, null, 2));



const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Object Input :', input => {
    pageDOM['2']['0']['0']['m'] = input;
    readline.close();
});