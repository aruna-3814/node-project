const fs=require('fs');
   
const requestHandler=(req,res) =>{
   const url=req.url;
    const method=req.method;
    if(url==='/'){
        res.write('<html>');//request.................
    res.write('<head><title>my first page</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message" ><button value="submit" ></button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url==='/message' && method==='POST'){//routing request......................
        const body=[];
        req.on('data',(chunk)=>{
        console.log(chunk);
        body.push(chunk);
        });
        req.on('end',()=>{
        const pursebody=Buffer.concat(body).toString();
        const message=pursebody.split('=')[1];
        fs.writeFileSync('message.txt',message,err=>{
            res.statusCode=302;
            res.setHeader('Location','/');
            return res.end();
    
        });


        });
        
    }
    console.log(req.url,req.method,req.header);
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>my first page</title></head>');
    res.write('<body><h1>hello sever</body>');
    res.write('</html>');
    res.end();
        

};


//module.exports=requestHandler;

module.exports={
    handler:requestHandler,
};