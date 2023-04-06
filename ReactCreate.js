module.exports.React = {
    createElement: function (element, props, ...children) {
        return {
            element,
            props,
            children
        }
    }
}