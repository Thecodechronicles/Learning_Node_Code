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
    queueMicrotask(processTaskQueue);
}

function processTaskQueue() {
    const task = taskQueue.shift();
    if (task) {
        task();
        // queueMicrotask(processTaskQueue); // redundant.. not needed.. output doesn't change after commenting this line
        // // coz by the time the callback of this microtask comes to run all three previous microtask would
        // // have completed their run and emptied the taskQueue array

        // queueMicrotask(() => { console.log('hello !') });
    }
}

function logTask(text) {
    return () => console.log(text);
}

addToTaskQueue(logTask('Task 1'));
addToTaskQueue(logTask('Task 2'));
addToTaskQueue(logTask('Task 3'));