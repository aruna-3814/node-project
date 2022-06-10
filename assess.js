/*const http=require('http');//assement 1 in express js
 
const routes=require('./users');
const server=http.createServer(routes.handler);
server.listen(3000);*/


////assessment 2 in express js
const path=require('path');//for better use we import path
const express=require('express');//parsing request

const bodyparser=require('body-parser');


const app=express();
 
const homeRoutes=require('./routee/operator');
const userRoutes=require('./routee/user');

app.use(bodyparser.urlencoded({extended: false}));


app.use(express.static(path.join(__dirname, 'routee')));//ststic surving

app.use(homeRoutes);
app.use('/admin',userRoutes);


app.use((req,res,next)=>{
    //res.status(404).send('<h1>page not found</h1>');
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));//returing 404 page
});


app.listen(3000);