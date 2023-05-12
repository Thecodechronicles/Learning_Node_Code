// console.log('abc');

// queueMicrotask(() => {
//     console.log('Hello !');
// });

// queueMicrotask(() => {
//     console.log('Hi !');
// })

// console.log('mno');



const taskQueue = [];

function addToTaskQueue(task) {
    taskQueue.push(task);

    setTimeout(() => {
        console.log('hello from 1st setTimeout: before processTaskQueue', task);
        queueMicrotask(processTaskQueue);
        console.log('hello from 1st setTimeout: after processTaskOqeue', task);
    }, 2000);

    setTimeout(() => {
        console.log('hello from 2nd setTimeout !', task);
    }, 2000);
    // queueMicrotask(processTaskQueue);
}

function processTaskQueue() {
    const task = taskQueue.shift();
    console.log('processTaskQueue', task);
    // if (task) {
    //     task();
    //     // queueMicrotask(processTaskQueue); // redundant.. not needed.. output doesn't change after commenting this line
    //     // // coz by the time the callback of this microtask comes to run all three previous microtask would
    //     // // have completed their run and emptied the taskQueue array

    //     // queueMicrotask(() => { console.log('hello !') });
    // }
}

function logTask(text) {
    return () => console.log(text);
}

// addToTaskQueue(logTask('Task 1'));
// addToTaskQueue(logTask('Task 2'));
// addToTaskQueue(logTask('Task 3'));

addToTaskQueue('Task 1');
addToTaskQueue('Task 2');