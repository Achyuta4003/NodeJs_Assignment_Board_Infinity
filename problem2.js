const http = require('http');
const url = require('url')
const fs = require('fs')


//read and store json data in variable
const vegetableData = fs.readFileSync('vegetables.json', 'utf8', (err, item) => {
    if(err){
        throw err;
    }
})

//creating server
http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname;
    if (pathName === "/vegetables") {

        res.writeHead(200, { "Content-Type": "text/json" })
        res.end(vegetableData)

    } else {
        // handle bad request
        res.writeHead(404, { "Content-Type": "text/json" })
        res.end(JSON.stringify({
            message: "Page not found"
        }))
    }



    //listening server
}).listen(8080, () => console.log('server listen on port 8080 '))
console.log(vegetableData)