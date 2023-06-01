const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const _ = require("lodash")
app = express()
app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb+srv://ameersultan777:Thani777@cluster0.bwerrdw.mongodb.net/BlogWebsite", { useNewUrlParser: true })

const postSchema = new mongoose.Schema({
    title : String, 
    content : String,
})

const BlogPost = mongoose.model("BlogPost", postSchema)

const HomeContent = "Strarakg ganriufhr oinroeia gofianoeigf aoiegnoir fojoifa foiawoirfr aofniaoinrf oiaewoiafm reioifiore goirjoings orsnognsr goinriongr gornvmoiroigniorng rogniorngonro groingornosnognr oginroisngoinroig."
const AboutContent = "afuisbeif aoiehfia foiaehfia foiaeiubfba foieabf eaiofab uiaebfb afbuafbu afibuabuf iuaeruih3 ro3urona aofh4r oioisaig roingjrg oangbuib oigaibgui riofrif oiabfuisrg goirsiubg riosbsg oirisgbs gibrsbgir oirgionr goinrsbg roisigbsuiubg gsoings goisgui iosiibg iinsigbr isgubsg iosibgs egosbus osnois oinisgs oininsjrejg oisngrs oisngu gseibgs grgosiguu soigse oisgus sngres."
const ContactUs = "kfjaeabfi aesfm iuaeruih3 ro3urona aofh4r oioisaig roingjrg oangbuib oigaibgui riofrif oiabfuisrg goirsiubg riosbsg oirisgbs gibrsbgir iuaeruih3 ro3urona aofh4r oioisaig roingjrg oangbuib oigaibgui riofrif oiabfuisrg goirsiubg riosbsg oirisgbs gibrsbgir"


app.listen("3000", function(){
    console.log("You server has been started at port 3000")
})

app.get("/", (req, res)=>{
    BlogPost.find({}).then(docs=>{
        res.render("pages/Home", {
            contenth: HomeContent,
            Posts: docs
        })
    }
    )
})

app.get("/about", (req, res)=>{
    res.render("pages/About", {
        contenta:AboutContent
    })
})
app.get("/contact", (req, res)=>{
    res.render("pages/Contact", {
        contentc: ContactUs
    })
})
app.get("/compose", (req, res)=>{
    res.render("pages/Compose")

})

app.post("/compose" , function(req, res){
    const title = req.body.title
    const des = req.body.des
    const blog = new BlogPost({
        title : title, 
        content : des
    })
    blog.save()

    // const post = {
    //     title : title,
    //     content : des
    // }
    
    res.redirect("/")
})
app.get("/posts/:name", function(req,res){
    const requested_title = req.params.name
    console.log(requested_title)
    BlogPost.find({title:requested_title}).then(docs=>{
        res.render("pages/Post", {
            title : docs[0]["title"],
            content : docs[0]["content"]
        })
    })
} )




