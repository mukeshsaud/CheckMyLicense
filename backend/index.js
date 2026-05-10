import pgPromise from "pg-promise"
import express from "express"
import cors from "cors"

// only while use locally
// import dotenv from "dotenv"
// dotenv.config()


const pgp=pgPromise();
const db=pgp(process.env.SUPABASEDATABASE_URL)
const router=express.Router();
const app=express();


// middleware
const allowedOrigins = process.env.CLIENT_URLS?.split(",");


app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:false}))




router.post("/db",async(req,res)=>{
    const value= req.body.value;
    try
    {// checklicensemnr table for online and mnr table for offline
            const data=await db.any("select * from mnr where licenseno=$1 or firstname||' '||lastname=$1",[`${value.toUpperCase()}`])
            return res.json({
            success:true,
            data:data,
                             })
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
app.get("/health",(req,res)=>{res.json({status:'Ok'})})
//routes
app.use("/api",router)

const PORT= process.env.PORT
app.listen(PORT,()=>{
    console.log("server running at port",PORT)
})


