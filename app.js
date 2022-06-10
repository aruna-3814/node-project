
/*const express=require('express');//routing request with express js

const app=express();

app.use('/',(req,res,next)=>{
    console.log("helooooooooooooooooooooooooo");
    next();
});
app.use('/add-ser', (req,res,next)=>{
    console.log("middleware.............1");
    res.send('<h1>hello sever</h1>');
    
    
});

app.use('/',(req,res,next)=>{
    console.log("middleware.............2");
    res.send('<h1>hello sevxdjjnabkjdb</h1>');
});

//const server=http.createServer(app);
app.listen(3000);*/

/*const express=require('express');//assessment..

const app=express();

app.use('/user',(req,res,next)=>{
    console.log("helooooooooooooooooooooooooo");
    next();
});
app.use('/', (req,res,next)=>{
    console.log("middleware.............1");
    res.send('<h1>dummy response</h1>');
    
});
app.listen(3000);    */


/*const express=require('express');//parsing request
const bodyparser=require('body-parser');

const app=express();

app.use(bodyparser.urlencoded({extended: false}));


app.use('/add-product',(req,res,next)=>{
    //console.log("helooooooooooooooooooooooooo");
    res.send('<form action="/product" method="POST"><input type="text" name="title" ></input><button type="submit">add-product</button></form>');
});
app.use('/product',(req,res,next)=>{ //here post is get method also
    const obj = JSON.parse(JSON.stringify(req.body)); // req.body = [Object: null prototype] { title: 'product' }

    console.log(obj); // { title: 'product' }
        res.redirect('/');
});
app.use('/',(req,res,next)=>{
    res.send('<h1>hello client</h1>');
});

app.listen(3000);*/


//routing with other folder
/*const path=require('path');//for better use we import path
const express=require('express');//parsing request
const bodyparser=require('body-parser');

const app=express();
 
const adminRoutes=require('./routee/admin');
const shopRoutes=require('./routee/shop');

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'routee')));//ststic surving

app.use(shopRoutes);    
app.use('/admin',adminRoutes);


app.use((req,res,next)=>{
    //res.status(404).send('<h1>page not found</h1>');
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));//returing 404 page
});


app.listen(3000);*/
///***************************************************************************** */
const path = require('path');//for better use we import path
const express = require('express');//parsing request
const cdb = require('./helpers/database'); //for mysql db

const session = require('express-session');
const mongodbstore = require('connect-mongodb-session')(session);
const URI = `mongodb+srv://max:aruna@123@cluster0.e2rto.mongodb.net/shop`;
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require("multer")

const bodyParser = require('body-parser');

const app = express();
const store = new mongodbstore({
    uri: URI,
    collection: 'session'
})


const port = process.env.Port || 5005;
//const expresshbs=require('express-handlebars');

const mongodb=require('mongodb');

const MongoClient=mongodb.MongoClient({useUnifiedTopology: true });

const errctrl = require('./controllers/error');
// const cdb = require('./helpers/database');
// const mongoConnect=require('./helpers/database').mongoConnect;
const User = require('./models/user');
//const db=require('./helpers/database'); for mysql db
// const sequelize=require('./helpers/database');
// const Product = require('./models/pro');
// const User=require('./models/user'); 
// const Cart=require('./models/cart');
// const CartItem=require('./models/cart-item');
// const order=require('./models/order');
// const orderItem=require('./models/order-item');



//app.engine('handlebars',expresshbs({layoutDir:'/views/layouts',defaultLayout:'main-lay',extname:'handlebars'}));
//app.set('view engine','handlebars');//for handlebars

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

app.set('view engine', 'ejs');
//app.set('view engine','pug');//for pug 
app.set('views', 'views');// pug folder


const adminroutes = require('./routee/admin');
const shopRoutes = require('./routee/shop');
const authRoutes = require('./routee/auth');

//const Cart = require('./models/cart');


app.use(bodyParser.urlencoded({ extended: false }));

app.use(multer({ storage: fileStorage, fileFiter: fileFilter }).single('image'))

app.use(express.static(path.join(__dirname, 'routee')));//ststic surving
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    }));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    // throw new Error('sync error');
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err))
            //console.log(err)
        });
})



app.use('/admin', adminroutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errctrl.err500);


app.use(errctrl.err);

app.use((error, req, res, next) => {
    // res.redirect("/500");
    res.status(500).render('500', {
        pagetitle: 'error!',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    });
})


cdb()
    .then(result => {
        app.listen(port, () => {
            console.log("server started");
        })
    })
    .catch(err => {
        console.log(err);
    })


// let mClient = new MongoClient({
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     connectTimeoutMS: 10000,
//     poolSize: 10,
//     writeConcern: {
//         j: true
//     }
// });

// const un='max';
// const pwd=encodeURIComponent('aruna%40123');
// mongoose.connect((` "mongodb+srv://${un}:${pwd}@cluster0.e2rto.mongodb.net/shop?retryWrites=true&w=majority" `, {useNewUrlParser: true},{useUnifiedTopology: true}),err=>{
// // mongoose.connect(`mongoose://${un}:$pwd") 
// if(err){
//      console.log(err);
//  }
// const uri = `'mongodb+srv://${un}:${pwd}@cluster0.e2rto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'`;
// cbapp.listen(port,()=>{
//     console.log("server started");
// })
// // Prints "MongoError: bad auth Authentication failed."
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000
// })

// mongoose.connect(uri,{useNewUrlParser: true},{useUnifiedTopology: true})
// .then(result =>{
//     //console.log(result);
//     ;
// })
// .catch(err=>{
//     console.log(err);
// });

// mongodbConnect(()=>{
//     app.listen(3000);

// })
//(req,res,next)=>{
    //res.status(404).send('<h1>page not found</h1>');
    //res.status(404).sendFile(path.join(__dirname,'views','404.html'));//returing 404 page
  //  res.status(404).render('404',{pagetitle:'page not found'});//pug file exe path
//});
// Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, {through: CartItem});
// Product.belongsToMany(Cart, {through: CartItem});
// order.belongsTo(User);
// User.hasMany(order);
// order.belongsToMany(Product,{through: orderItem});

// sequelize.sync({force:true})
/*sequelize
// // // // .sync({force:true})
.sync()
   .then(result=>{
    //console.log(result);
    return User.findByPk(1);
})
.then(user=>{
    if(!user){
        return User.create({name:'aruna',email:'aruna@email.com'});
    }
    return user;
})
.then(user=>{
    //console.log(user);
    return user.createCart();

})
.then(cart=>{
    app.listen(4000);
})
.catch(err=>{
    console.log(err);

  });

  //app.listen(3000);*/

//   const path=require('path');//for better use we import path
//   const express=require('express');//parsing request
//  // const cdb=require('./helpers/database'); //for mysql db

//   const bodyParser=require('body-parser');
//   const expresshbs=require('express-handlebars');

//   const app=express();

//   app.engine('handlebars',expresshbs());
// app.set('view engine','handlebars');//for handlebars

// //app.set('view engine','ejs');
// //app.set('view engine','pug');//for pug 
// app.set('views','views');// pug folder


// const adminroutes=require('./routee/admin');
// const shopRoutes=require('./routee/shop');

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname, 'routee')));//ststic surving

// app.use('/admin',adminroutes);
// app.use(shopRoutes); 

// app.use((req,res,next)=>{
//     res.status(404).render('404',{pagetitle:'page not found'});
// })

// const port=3000
// app.listen((port)=>{
//     console.log("sever listening")
// });