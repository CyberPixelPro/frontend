const express = require("express") ;
const path = require("path") ;
const app = express() ;
const db = require("./db/conn");

const Register = require("./models/registers")
const hbs = require("hbs") ;
const port = process.env.PORT || 3000 ;

const static_path = path.join(__dirname,"../public");
// const templates_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");


app.use(express.static(static_path));
app.set("view engine","hbs");
// app.set("views",templates_path);
hbs.registerPartials(partials_path);

app.use(express.json()) ;
app.use(express.urlencoded({extended:false})) ;

app.get("/",(req,res) => {
    res.render("login")

}) ;

app.get("/register",(req,res) => {
    res.render("register")

}) ;
app.get("/login",(req,res) => {
    res.render("login")

}) ;

app.post("/register", async (req,res) => {
    try{
        const registerStudent = new Register({
            registration: req.body.registration ,
            password: req.body.password
        })
        const registered = await registerStudent.save();
        res.status(201).render("login");

    } catch(error){
        res.status(400).send(error) ;
    }

}) ;
app.post('/login', async (req, res) => {

    try {
        const check = await Register.findOne({registration:req.body.registration})

        

        if (check.password === req.body.password) {
            res.status(201).render("index")
        }

        else {
            res.status(201).render("login")
        }


    } 
    
    catch {

        res.send("wrong details")
        

    }


})
app.post('/index',(req,res)=>{
    res.status(201).render("index")
})
app.post('/clubdetails',(req,res)=>{
    res.status(201).render("clubdetails")
})
app.post('/newregistered',(req,res)=>{
    res.status(201).render("newregistered")
})
app.post('/odupdation',(req,res)=>{
    res.status(201).render("odupdation")
})
app.post('/reviews',(req,res)=>{
    res.status(201).render("reviews")
})
app.post('/logout',(req,res)=>{
    res.status(201).render("login")
})


app.listen(port , ()=> {
    console.log(`server is running at port ${port}`)
})
