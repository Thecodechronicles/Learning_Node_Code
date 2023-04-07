
function expressM() {

    var useArr = [];
    var routeArr = [];
    var counter = 5;
    var incrementer = 11;

    expressM.RouterM = function () {
        return { counter: counter + 1 }
    }

    expressM.bodyParserM = function () {
        return { incrementer: incrementer + 1 }
    }

    return {
        use: function (params) {
            useArr.push(params);
        },

        get: function (route, callback) {
            routeArr.push({ routeNode: route, cb: callback });
            var y = 0;
            do { // This loop will run useArr.length number of times for every get call
                // console.log(y);
                console.log('counter', useArr[y].counter);
                console.log('incrementer', useArr[y].incrementer);
                y = y + 1;
            } while (y < useArr.length);
        },

        listen: function (port, route, listenBack) {

            listenBack();

            var req = { request: 'req' };
            var res = { response: 'res' };

            var routeTemp = routeArr.filter((obj) => {
                return obj.routeNode === route;
            });

            // console.log(routeTemp);
            if (routeTemp[0].routeNode === route) {

                var i = 1;

                routeTemp[0].cb(req, res, function next() {
                    do {
                        routeTemp[i++].cb(req, res, next);
                    } while (i <= routeTemp.lemgth);
                });
            }
        }
    }
}

module.exports = expressM;