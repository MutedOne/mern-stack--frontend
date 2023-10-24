import "../components/css/login.css"
import md5 from 'md5'

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const [username,setUsername] = useState('')
    const [name,setName] = useState('')
    const navigate = useNavigate();

    const Checkdetails = (event) =>{   
        event.preventDefault();
         fetch(
            `http://localhost:4000/login`,{
              method: 'POST',
              body: JSON.stringify({
                password: md5(name),
                username: username
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            
            }
          ).then(async (para) => { 
            let res = await para.json()
           
            if(res.status == 'No Account' || res.status=='Account is not active'){
                return navigate("/login")
            }else{
                sessionStorage.setItem("sessionId", (Math.random()).toString());
                document.cookie = "sessionId="+JSON.stringify(res);
                return navigate("/dashboard")
            }    
        }) 
        
    }  

    return (
        <>
        <div className=" m-0 d-none d-md-block "  style={{width:"100vw"}} >
            <div className="row p-0 m-0">
            <div className="col-6 bg-info overflow-hidden p-0 vh-100" style={{
                backgroundImage:`url("/task-management.jpg")`,
                backgroundPosition:`center`,
                backgroundRepeat:`no-repeat`,
                backgroundSize:`cover`,
                backgroundColor:`rgba(0,0,0,5)`
            }} >
              
            
              </div>
              <div className="col-6 p-0">
            
            <div className="d-flex justify-content-center align-items-center vh-100 flex-column bg-light" >
            <div className="text-center mb-4">
                <img src="/Bootstrap_logo.png" className="rounded" alt="..." style={{width:"120px"}}/>
            </div>
                <form className="forml">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setUsername(e.target.value)}}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>{setName(e.target.value)}}/>
                        <div id="emailHelp" className="form-text text-center">Account will be given by Admin only</div>
                    </div>
                    <button type="submit" className="btn btn-primary px-5" onClick={Checkdetails}>Login</button>
                </form>
            </div>
            </div>
            </div>
          
        </div>
        <div className=" m-0 d-none d-sm-block d-md-none " >
            <div className=" bg-info overflow-hidden p-0" style={{
                  backgroundImage:`url("/task-management.jpg")`,
                  backgroundPosition:`center`,
                  backgroundRepeat:`no-repeat`,
                  backgroundSize:`cover`,
                  backgroundColor:`rgba(0,0,0,5)`
            }} >
              
               <div style={{width:"100%",height:"100%",backgroundColor:`rgba(0, 0, 0, 0.5)`}} >
                <div className="d-flex justify-content-center align-items-center vh-100 flex-column " >
                  
                        <form className="forml bg-light p-4 rounded">
                            <div className="text-center mb-4">
                                <img src="/Bootstrap_logo.png" className="rounded imglogo" alt="..." />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setUsername(e.target.value)}}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                                <input type="text" className="form-control" id="exampleInputPassword1" onChange={(e)=>{setName(e.target.value)}}/>
                                <div id="emailHelp" className="form-text text-center">Account will be given by Admin only</div>
                            </div>
                        
                            <button type="submit" className="btn btn-primary text-center " onClick={()=>Checkdetails}>Login</button>
                        
                        </form>

                    </div>
               </div>
            </div>
        </div>
        </>
    )
}