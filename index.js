const express = require("express")

const mongoose = require("mongoose")

const app = express()

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/myfirstcode2")
.then(()=>{console.log("mongod connect")
})
.catch(err => {console.log("errore");
})

const clothschema = new mongoose.Schema({
    title:{type : String , required:true , unique:false},
    image : {type : String },
    price : {type : Number , required: true}
})

const Cloth = mongoose.model("Cloth" , clothschema)




const clothmidilvear = (req , res , next)=>{
    if(!req.body.no){
return res.send("plase add the  no:1 to 100 ")
    }
    next()
}


app.get("/" , (req , res)=>{
    res.send("creat te clothApi ")
})

app.get("/cloth" , async (req , res)=>{
    const Cloths =  await Cloth.find() 
    res.send(Cloths)
})


app.post("/cloth" , clothmidilvear , async (req , res)=>{
    const cloths = await Cloth.create(req.body)
    res.send(cloths)
})


app.put("/cloth/:id" , async (req , res)=>{
    const cloths = await Cloth.findByIdAndUpdate(req.params.id , req.body , {new:true})
    res.send(cloths)
})

app.delete("/cloth/:id" , async (req , res)=>{
    const cloths = await Cloth.findByIdAndDelete(req.params.id )
    res.send("delet ")
})





app.listen(3000)