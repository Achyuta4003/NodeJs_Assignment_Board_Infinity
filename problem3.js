const http = require('http');
const url = require('url')


//creating server
http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname;
    
    if (pathName === "/metrics") {

        res.writeHead(200, { 'Content-Type': "text/json" })
        const queryObject = url.parse(req.url, true).query;
        const object = queryObject.object;
        const metric = queryObject.metric;
        const radius = queryObject.radius;

        if (object === "circle" && metric === "area") {
            const area = 3.14 * radius ** 2;
            res.end(JSON.stringify(`Area of circle is ${area}`))
        }
        else if (object === "sphere" && metric === "volume") {
            const volume = 4.188 * radius ** 3;
            res.end(JSON.stringify(`volume of sphere is ${volume}`))
        }
        else {
            res.writeHead(404, { 'Content-Type': "text/json" })
            res.end(JSON.stringify("invalid input"))

        }
    }
    else {
        // handle bad request
        res.writeHead(404, { "Content-Type": "text/json" })
        res.end(JSON.stringify({
            message: "Page not found"
        }))
    }
    //listening server
}).listen(8080, () => console.log('server running at 8080 port'))