import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [value, setValue] = useState('')
  const[error,setError]=useState(false)
   const[successMsg,setSuccessMsg]=useState('')
   const [btnDisable,setBtnDisable]=useState(true)

  const submitfn=(e)=>{
  
    setSuccessMsg('');
    e.preventDefault();
    const trimmed=value.trim();

      setValue(trimmed)
      apiCall(trimmed);       
  }
  
    const apiCall=async(trimmed)=>{
      try{
         
          //  const res= await fetch(`/api/db`,   //for local host coz proxy handles the paths
            const res= await fetch(`${import.meta.env.VITE_RENDERBACKEND_URL}/api/db`, //for online
               {
                   method:"post",
                   body:JSON.stringify({value:trimmed}),
                   credentials:"include",
                   headers:{"Content-Type":"application/json"}
                })
    
               const data=await res.json();

                if(data.data.length===0)
                {
                  setError(true);
                  setSuccessMsg('No record found(try entering full name).')
                }

                else if(data.data.length===1){
                  setError(false);
                  setSuccessMsg(` your license is found in the record:
                                  ${data.data.map((d)=>`Name:${d.firstname+' '+d.lastname} \n Licenseno:${d.licenseno} \n Applicantid:${Number(d.applicantid)}`)}
                                   (Please collect it from mahendranagar yatayat office)`
                                )}
                else {
                        setError(false);
                        setSuccessMsg(` your name is found in the record. verify your license no/applicant id:
                         ${data.data.map((d,i)=>
                         `${i+1}. Name:${d.firstname+' '+d.lastname} Licenseno:${d.licenseno} Applicantid:${Number(d.applicantid)} `)
                        .join("\n")  
                        }`)
                      }
          }
    catch(err){
               console.log(err);
               setError(true); // fix: show error to user
                setSuccessMsg('Something went wrong. Please try again.');
               }
    }
    
    useEffect(()=>{
      setSuccessMsg('');
      setBtnDisable(true);
         if(/^\s*[a-zA-Z]+( [a-zA-Z]+)+\s*$/.test(value)){
          setBtnDisable(false);
         }
         else if(/^\s*\d{2}-\d{2}-\d{8}\s*$/.test(value)){
           setBtnDisable(false);
         }
    },[value])

      
  return (
    <div className='min-h-screen max-h-fit w-screen bg-[#222944] text-white flex flex-col items-center justify-center gap-10 pt-10'>
    
      <div className='bg-[#333a56] min-h-[40vh] h-fit w-[90vw] sm:h-fit  md:w-[80vw] lg:w-[50vw]  rounded-2xl flex flex-col gap-10 sm:gap-25 pt-10'>
         <h1 className='text-center'>
          <span>Printed License Pickup Status</span> <br/>
        (Mahendranagar Yatayat,Kanchanpur)
        </h1>

      <form onSubmit={submitfn} className=' h-fit w-full  flex flex-col gap-10 items-center  ' >
          <input type="text" placeholder='Enter fullname or license no.' value={value} onInput={(e)=>{setValue(e.target.value)}}  
          className='w-[80vw] placeholder:margin-2 h-12 md:w-[50vw] lg:w-[30vw] pl-10 bg-white text-black rounded '/>
          <button type='submit' className={`w-[80vw] md:w-[50vw] lg:w-[30vw] rounded-xl h-13  ${btnDisable?'bg-[#5e6ea7] text-white/65  ':'bg-[rgb(95,124,228)]'}`}
          disabled={btnDisable}
          >View Result</button>
          <div className={`whitespace-pre-line md:text-base lg:text-lg 
             ${error?'text-red-500 text-lg animate-pulse':'text-green-500  text-sm'} text-center pb-10`}>
      {successMsg}
     </div>
      </form>
      </div>
     <div className='opacity-50'>Note: this is not official government website</div>
    </div>

  )
}

export default App
