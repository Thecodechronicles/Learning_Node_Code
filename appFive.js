// import './NodeStyle.css';
// require('./NodeStyle.css');
// arrOne = [1, 2];

// arrTwo = arrOne;

// // arrOne.push(11);

// // var result = arrOne.splice(1);

// console.log(arrOne);
// console.log(arrTwo);

// // console.log(result);
// console.log(arrOne === arrTwo);


let person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    ssn: '123-456-2356',
    contact: {
        phone: '408-989-8745',
        email: 'john.doe@example.com'
    },
    arrRandom: [1, 2, 3, 4, 5]
};


let job = {
    jobTitle: 'JavaScript Developer',
    location: 'USA'
};

let employee = { ...person, ...job };

console.log(employee.contact === person.contact);
console.log(employee.arrRandom === person.arrRandom);

arrString = ['abc'];
stringMessage = ' is a string';
stringMessageTwo = '011.'

console.log(arrString + stringMessage);
console.log(arrString);
// console.log(stringMessageTwo.split(" ", 1));
// console.log(Object.is(Number(stringMessageTwo.split(" ", 1)[0]), NaN));
console.log(Number(stringMessageTwo));
console.log(stringMessageTwo.length);
console.log(stringMessageTwo.indexOf('.'))
// console.log(Number(stringMessageTwo).toString());
// console.log(1);