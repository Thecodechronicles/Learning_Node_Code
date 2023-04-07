var React = require('./ReactCreate').React;

var h2 = {
    props: {},
    render: function () {
        return {
            a: 'Hey !',
            b: 'Hi !',
            ...this.props.propObj
        }
    }
}

var h2Type = {
    props: {},
    render: function () {
        return React.createElement(arrDiv, null, this.props.children, React.createElement(h2, this.props.propObj));
    }
}

var h1 = {
    props: {},
    render: function () {
        return {
            a: 'nameH1',
            b: 'addressH1',
            c: 'phoneNumberH1',
            ...this.props.propObj
        }
    }
}

var h1Type = {
    props: {},
    render: function () {
        return React.createElement(arrDiv, null, React.createElement(h1, this.props.propObj), this.props.children);
    }
}

var div = {
    props: {},
    render: function () {
        return {
            a: 'nameDiv',
            b: 'addressDiv',
            c: 'phoneNumberDiv',
            ...this.props.propObj
        }
    }
}

var divType = {
    props: {},
    render: function () {
        return React.createElement(arrDiv, null, this.props.children, React.createElement(div, this.props.propObj));
    }
}

var input = {
    props: {},
    render: function () {
        return {
            a: 'nameInput',
            b: 'addressInput',
            c: 'PhoneNumberInput',
            ...this.props.propObj
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
            ...this.props.propObj
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
            ...this.props.propObj
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
            ...this.props.propObj
        }
    }
}

var arrDiv = {
    props: {},
    render: function () {
        var auxillaryArray = [];
        function recursion(children) {
            for (let i = 0; i < children.length; i++) {
                if (Array.isArray(children[i])) {
                    recursion(children[i]);
                }
                else {
                    auxillaryArray.push(children[i]);
                }
            }
        }
        if (this.props.children) {
            recursion(this.props.children);
            return auxillaryArray;
        }
    }
}

function recursiveElements(renderedObject, domObject, i) {
    renderedObject[i] = {};
    for (var j = 0; j < domObject.length; j++) {
        if (domObject[j].element) { //  React element object
            domObject[j].element.props.propObj = domObject[j].props;
            if (domObject[j].children) {
                domObject[j].element.props.children = domObject[j].children;
            }
            var innerDomObject = domObject[j].element.render();
            if (innerDomObject.element) {
                innerDomObject.element.props.propObj = innerDomObject.props;
                if (innerDomObject.children) {
                    innerDomObject.element.props.children = innerDomObject.children;
                }
                innerDomObject = innerDomObject.element.render();
            }
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
            component.element.props.propObj = component.props;
            if (component.children) {
                component.element.props.children = component.children;
            }
            var renderedArray = component.element.render();

            if (renderedArray.element) {
                renderedArray.element.props.propObj = renderedArray.props;
                if (renderedArray.children) {
                    renderedArray.element.props.children = renderedArray.children;
                }
                renderedArray = renderedArray.element.render();
            }
            for (var i = 0; i < renderedArray.length; i++) {
                if (renderedArray[i].element) {
                    renderedArray[i].element.props.propObj = renderedArray[i].props;

                    if (renderedArray[i].children) {
                        renderedArray[i].element.props.children = renderedArray[i].children;
                    }
                    var domObject = renderedArray[i].element.render();

                    if (domObject.element) {
                        domObject.element.props.propObj = domObject.props;

                        if (domObject.children) {
                            domObject.element.props.children = domObject.children;
                        }
                        domObject = domObject.element.render();
                    }
                    if (domObject.length) {
                        recursiveElements(renderedObject, domObject, i);
                    }
                    else {
                        renderedObject[i] = domObject;
                    }
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

        setInterval(() => {
            function recursiveChecks(auxillarySet, renderedSet) {
                var keys = Object.keys(auxillarySet);

                for (var m = 0; m < keys.length; m++) {
                    if (typeof auxillarySet[keys[m]] != 'string') {
                        recursiveChecks(auxillarySet[keys[m]], renderedSet[keys[m]]);
                    }
                    else {
                        if (auxillarySet[keys[m]] !== renderedSet[keys[m]]) {
                            console.log('oops !! not equal ');
                            console.log('auxillary: ', auxillarySet);
                            console.log('rendered: ', renderedSet)
                        }
                    }
                }
            }
            recursiveChecks(auxillaryObject, renderedObject);
        }, 1000);
        return renderedObject;
    }
}

module.exports = {
    h1,
    h1Type,
    h2,
    h2Type,
    div,
    divType,
    input,
    textarea,
    img,
    p,
    arrDiv,
    ReactDOM
}