var someObj = {
    a: 'abc',
    b: "",
    set c(param) {
        this.b = param;
    },
    get c() {
        return this.b;
    }
}

console.log(Object.getOwnPropertyDescriptor(someObj, 'c'));