const http = require("http");
const url = require("url");

const PORT = 8080;


//creating server
http.createServer((req, res) => {

    const pathName = url.parse(req.url, true).pathname;
    //set route for /age
    if (pathName === "/age") {

        const queryObject = url.parse(req.url, true).query;
        const birthYear = Number(queryObject.year)
        const birthMonth = Number(queryObject.month)
        const birthDay = Number(queryObject.date)
        const name = queryObject.name

        // set the date in  mm/dd/yyyy format
        const dobString = `${birthMonth}/${birthDay}/${birthYear}`

        const dob = new Date(dobString);
        //calculate month difference from current date in time
        const month_diff = Date.now() - dob.getTime();

        //convert the calculated difference in date format
        const age_dt = new Date(month_diff);

        //extract year from date    
        const year = age_dt.getUTCFullYear();

        //now calculate the age of the user
        const age = Math.abs(year - 1970);

        res.writeHead(200, { "Content-Type": "text/html" })
        res.end(`<p>Hello ${name}</p> <p>You are currently ${age} yours old</p>`)

    }
    else {
        //handle bad request
        res.writeHead(404, { "Content-Type": "text/json" })
        res.end(JSON.stringify({
            message: "Page not found"
        }))

    }

    //listening server
}).listen(PORT, () => console.log(`Server listening on Port ${PORT}...`))











// const date = new Date;
// const currentYear = date.getFullYear();
// const age = currentYear - birthYear;
