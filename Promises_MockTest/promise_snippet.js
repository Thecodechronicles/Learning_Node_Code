
// from StackOverflow to exlplain how promises work behind the scenes
function Promise(executor) {
    if (!executor) throw "Promise executor undefined"
    let status = "pending", value, thenQ = []

    const then = onFulfilled => {
        let resolver
        // This ensures control does not move to later promises 
        // until prior promises have been resolved.
        const nextPromise = new Promise(resolve => (resolver = resolve))
        // More than one "then" can be registered with each promise.
        thenQ.push((...args) => resolver(onFulfilled(...args)))
        return nextPromise
    }

    // We check if the result is a "thenable"; if so, we treat
    // it as an inner promise, otherwise we simply fulfil with 
    // the result.
    const resolve = result => result?.then ? result.then(fulfil) : fulfil(result)

    // When a promise has been fulfilled, its "thens" can be run.
    const fulfil = result => (status = "fulfilled", value = result, executeThens(value))

    // "Thens" are run asynchronously, on a microtask.
    const executeThens = value => queueMicrotask(() => thenQ.forEach(el => el(value)))

    // The executor is run synchronously.
    executor(resolve)

    return {
        then,
        get status() { return status },
        get value() { return value }
    }
}

// Chaining
new Promise(resolve => {
    console.log('Waiting for step 1...')
    setTimeout(() => resolve("One, two..."), 1500)
})
    .then(result => new Promise(resolve => {
        console.log('Waiting for step 2...')
        setTimeout(() => resolve(`${result}three, four`), 1500)
    }))
    .then(result => console.log(`Chaining result: ${result}.`))

// Branching
const p = new Promise(resolve => {
    console.log('Waiting for step a...')
    setTimeout(() => resolve("Alpha, Bravo..."), 1500)
})

p.then(result => new Promise(resolve => {
    console.log('Waiting for step b1...')
    setTimeout(() => resolve(`${result}Charlie, Delta`), 1500)
})).then(console.log)

p.then(result => {
    console.log('Waiting for step b2...')
    return `${result}Echo, Foxtrot`
}).then(console.log)