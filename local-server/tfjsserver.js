let express = require("express")
let app = express()

app.use(function(req, req, next) {
    console.log(`${new Date()} - ${req.method} request for ${req.url}`);
    next();
})

app.use(express.static("../static"))


app.listen(9999, function(){
    console.log("serving static on 9999")
})