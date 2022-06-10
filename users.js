const fs=require('fs');
   
const requestHandler=(req,res) =>{
   const url=req.url;
    const method=req.method;
    if(url==='/'){
        res.write('<html>');//request.................
        res.write('<head><title>my first page</title></head>');
        res.write('<body><h1>Hello sever</body>');
        res.write('<body><form action="/users" method="POST"><lable>User name:</lable><input type="text" name="message" ></br><button type="submit" >submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    /*if(url==='/users' && method==='POST'){
        res.write('<html>');//request.................
        res.write('<head><title>my users page</title></head>');
        res.write('<body><h1>Users:</h1><ul><li>aruna></li><li>radhika</li></ul></body>');
        res.write('</html>');*/
    
    if(url==='/users' && method==='POST'){//routing request......................
        const body=[];
        req.on('data',(chunk)=>{
        console.log(chunk);
        body.push(chunk);
        
        });
        req.on('end',()=>{
        const pursebody=Buffer.concat(body).toString();
        const message=pursebody.split('=')[1];
        console.log(message);
        res.setHeader('Location','/users');
        res.write('<html>');//request.................
        res.write('<head><title>my users page</title></head>');
        res.write('<body><h1>USers:</h1><ul><li>aruna></li><li>radhika</li></ul></body>');
        res.write('</html>');
        return res.end();
    
        

        });


      //  return res.end();
    }

        
    


};


//module.exports=requestHandler;

module.exports={
    handler:requestHandler,
};  