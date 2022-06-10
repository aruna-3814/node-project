// const { fs } = require('fs');
// const ht=require('http');

/*const server=http.createServer((req,res)=>{
    console.log(req);
});

function rqListener(req,res){
    console.log(req);

}
const server=ht.createServer(rqListener);
/*const server=http.createServer(function rqListener(req,res){
console.log(req);
}
);
server.listen(3000);*/


const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');//request.................
        res.write('<head><title>my first page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" ><button value="submit" ></button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {//routing request......................
        fs.writeFileSync('message.txt', 'jdwejndjen');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();

    }
    console.log(req.url, req.method, req.header);
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>my first page</title></head>');
    res.write('<body><h1>hello sever</body>');
    res.write('</html>');
    res.end();

});
server.listen(3000);
// const http=require('http');

// const routes=require('./route');
// const server=http.createServer(routes.handler);
// server.listen(3000);