let { Schema,model} = require("mongoose")
let m = require("mongoose")

m.connect('mongodb://127.0.0.1:27017/myapp')

let db = m.connection

db.on("error",()=>console.log("error while connection"))

db.once("open",()=>console.log("connected to db"))



let schema = new Schema({
    name:String,
    value:Number,
    type:String
},{
    collection:"name"
})

let name = model("name",schema)


async function createOne (){
    await name.create({
        name:"rahul",value:2,type:"user"
    })
    await name.create({
        name:"krishan",value:5,type:"engi"
    })
    await name.create({
        name:"bhuv",value:6,type:"user"
    })
    await name.create({
        name:"machine",value:7,type:"engi"
    })
    await name.create({
        name:"gillu",value:9,type:"engi"
    })
    await name.create({
        name:"aa",value:2,type:"user"
    })
    await name.create({
        name:"bb",value:5,type:"engi"
    })
    await name.create({
        name:"cc",value:6,type:"user"
    })
    await name.create({
        name:"dd",value:7,type:"engi"
    })
    await name.create({
        name:"ff",value:9,type:"engi"
    })

    console.log("name created")
}


// createOne()


// 


async function findOne(){
    let names = await name.count({type:"engi"})
    console.log(names)
    let random = Math.floor(Math.random()*names)
    console.log(random)
    let name1 = await name.findOne({type:"engi"}).skip(random)

    console.log(name1)
}

findOne()