import pgPromise from "pg-promise"
import express from "express"
import cors from "cors"

const pgp=pgPromise();
const db=pgp(process.env.SUPABASEDATABASE_URL)
const router=express.Router();
const app=express();
const value= "01-14-89069516";

// middleware
const allowedOrigins = process.env.CLIENT_URLS?.split(",");
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:false}))



router.get("/db",async(req,res)=>{
        try{const data= await db.any('SELECT * FROM mnr where firstname=$1 and lastname=$2',['MUKESH SINGH','SAUD'])
                        
        return res.json({
            sucess:true,
            data:data,
            ss:'ss'
        })
    }
    catch(err){
        res.status(500).json({error:err.json})
    }
})
router.post("/db",async(req,res)=>{
    const value= req.body.value;
    try
    {
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

//routes
app.use("",router)

const PORT= process.env.PORT
app.listen(PORT,()=>{
    console.log("server running at port",PORT)
})


