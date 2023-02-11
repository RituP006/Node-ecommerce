const http = require("http");

const app = http.createServer(requestHandler);

function requestHandler(req,res){
    console.log(req);
}
app.listen(3000);