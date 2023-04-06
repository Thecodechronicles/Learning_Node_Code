// Example code explaining sort of internal working of next() function in Express
// reference: https://stackoverflow.com/questions/55794780/question-about-the-next-function-in-expressjs

const app = {
    middleware: [],
    use(callback) {
        this.middleware.push(callback);
    }
};

app.use((req, res, next) => {
    console.log("First handler synchronous part");
    setTimeout(() => {
        console.log("First handler async part finished");
        next();
    }, 800);
});

app.use((req, res, next) => {
    console.log("Second handler is entirely synchronous");
    next();
});

app.use((req, res, next) => {
    console.log("Third handler synchronous part");
    setTimeout(() => {
        console.log("Third handler async part finished");
        next();
    }, 800);
});

// Code handling an incoming request
function handleRequest(req, app) {
    // Copy the handlers
    const middleware = app.middleware.slice();
    // Create a "response"
    const res = {};
    // Call the handlers
    let index = 0;
    next();
    function next() {
        if (index < middleware.length) {
            // Call the handler, have it call `next` when it's done
            middleware[index++](req, res, next);
        } else {
            console.log("Request completed");
        }
    }
}

handleRequest({}, app);