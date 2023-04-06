
var React = require('./ReactCreate').React;

//div
//input
//textarea
//img
//p

//h1

var h2 = {
    props: {},
    render: function () {
        return [
            React.createElement(textarea, { b: 'addressTextAreaH2', c: 'phoneNumberTextareaH2' }),
            {
                a: 'Hey !',
                b: 'Hi !',
                ...this.props
            }
        ]
    }
}


var h1 = {
    props: {},
    render: function () {
        return [
            // React.createElement(h2, { c: 'nameH2', d: 'addressH2' }),
            {
                a: 'nameH1',
                b: 'addressH1',
                c: 'phoneNumberH1',
                ...this.props
            },
            React.createElement(h2, { c: 'nameH2', d: 'addressH2' })
        ]
    }
}

var div = {
    props: {},
    render: function () {
        return [
            React.createElement(h1, { m: 'idH1', n: 'emailH1' }),
            {
                a: 'nameDiv',
                b: 'addressDiv',
                c: 'phoneNumberDiv',
                ...this.props
            }
        ];
    }
}

var input = {
    props: {},
    render: function () {
        return {
            a: 'nameInput',
            b: 'addressInput',
            c: 'PhoneNumberInput',
            ...this.props
        }
    }
}

var textarea = {
    props: {},
    render: function () {
        return {
            a: 'nameTextarea',
            b: 'addressTextarea',
            c: 'PhoneNumberTextarea',
            ...this.props
        }
    }
}

var img = {
    props: {},
    render: function () {
        return {
            a: 'nameImg',
            b: 'addressImg',
            c: 'PhoneNumberImg',
            ...this.props
        }
    }
}

var p = {
    props: {},
    render: function () {
        return {
            a: 'nameP',
            b: 'addressP',
            c: 'PhoneNumberP',
            ...this.props
        }
    }
}

var k;
function recursiveElements(renderedObject, domObject, i) {
    renderedObject[i] = {};
    console.log('Yes its an array !');
    // var renderedInnerObject;
    for (var j = 0; j < domObject.length; j++) {
        if (domObject[j].element) { //  React element object
            domObject[j].element.props = domObject[j].props;
            var innerDomObject = domObject[j].element.render();
            if (innerDomObject.length) {
                recursiveElements(renderedObject[i], innerDomObject, j)
            }
            else {
                renderedObject[i][j] = innerDomObject;
            }
        }
        else {
            renderedObject[i][j] = domObject[j]; // pure object
        }
    }
}



var ReactDOM = {
    render: function (component) {
        var renderedObject = {};
        var auxillaryObject;
        if (component.element) {
            console.log('element component');
            component.element.props.propObj = component.props;
            if (component.children) {
                component.element.props.children = component.children;
            }
            var renderedArray = component.element.render();
            // console.log('renderdArray: ', renderedArray);
            for (var i = 0; i < renderedArray.length; i++) {
                if (renderedArray[i].element) {
                    renderedArray[i].element.props = renderedArray[i].props;
                    var domObject = renderedArray[i].element.render();
                    // renderedObject[i] = domObject;
                    if (domObject.length) {
                        recursiveElements(renderedObject, domObject, i);
                    }
                    else {
                        renderedObject[i] = domObject;
                    }
                    // renderedObject[i] = domObject;
                }
                else {
                    renderedObject[i] = renderedArray[i];
                }
            }
        }
        // auxillaryObject = {  // shallow copy or shallow merge
        //     ...renderedObject
        // };

        auxillaryObject = JSON.parse(JSON.stringify(renderedObject)) // Deep Copy

        // if (auxillaryObject == renderedObject) {
        //     console.log('Equal !!');
        // }
        // else {
        //     console.log('Not Equal !');
        // }
        setInterval(() => {
            function recursiveChecks(auxillarySet, renderedSet) {
                // if (auxillarySet === renderedSet) {
                //     console.log('O ! Yes');
                // }
                // else {
                //     console.log('hehe.. nope !!');
                // }
                var keys = Object.keys(auxillarySet);
                // console.log(keys);
                for (var m = 0; m < keys.length; m++) {
                    // console.log(Object.keys[auxillarySet[keys[m]]]);
                    if (typeof auxillarySet[keys[m]] != 'string') {
                        // console.log('Recursion !');
                        // console.log('auxillary: ', auxillarySet[keys[m]]);
                        // console.log('rendered: ', renderedSet[keys[m]]);
                        // console.log('auxillarySet: ', auxillarySet[keys[m]]);
                        recursiveChecks(auxillarySet[keys[m]], renderedSet[keys[m]]);
                    }
                    else {
                        // console.log('\n');
                        // auxillarySet[keys[m]]
                        // previous = auxillarySet[Object.keys(auxillarySet[keys[m]])[m]];
                        // var location = keys[m];
                        // auxillarySet[keys[m]] == 'abc' && console.log(renderedSet);
                        // console.log(auxillarySet[keys[m]] == 'abc' && auxillarySet[keys[m]]);
                        if (auxillarySet[keys[m]] !== renderedSet[keys[m]]) {
                            console.log('oops !! not equal ');
                            console.log('auxillary: ', auxillarySet);
                            console.log('rendered: ', renderedSet)
                        }
                        // if (auxillarySet[Object.keys(auxillarySet[keys[m]])[m]] !== renderedObject[Object.keys(auxillarySet[keys[m]])[m]]) {
                        //     console.log(Object.keys(auxillarySet[keys[m]])[m], auxillarySet[Object.keys(auxillarySet[keys[m]])[m]]);
                        // console.log('\n');
                        // }
                    }
                }
            }
            // console.log('aux == rendered ? :', auxillaryObject == renderedObject);
            recursiveChecks(auxillaryObject, renderedObject);
        }, 1000);
        // console.log(auxillaryObject);
        // console.log(renderedObject);
        return renderedObject;
    }
}


var arrDiv = {
    props: {},
    render: function () {
        console.log('children !! : ', this.props.children)
        if (this.props.children) {
            return [
                ...this.props.children
            ]
        }
    }
}



module.exports = {
    h1,
    div,
    input,
    textarea,
    img,
    p,
    arrDiv,
    ReactDOM
}