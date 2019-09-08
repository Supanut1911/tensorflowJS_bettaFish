let express = require("express")
let app = express()

app.use(function(req, req, next) {
    console.log(`${new Date()} - ${req.method} request for ${req.url}`);
    next();
})


app.listen(5555, function(){
    console.log("serving static on 5555")
})