
import { useEffect, useState } from "react";
import Body from "../components/body";

type account ={
  username:string,
  password:string,
  name:string,
  rolename:number,
  department:number,
  email:string
}

const account={
  username:'',
  password:'',
  name:'',
  rolename:0,
  department:0,
  email:''
}

export default function Account() {
  const [userdata,setuserdata] = useState<account>(account); 
  const [departlist,setdepartlist] = useState([]); 
  const [rolelist,setrolelist] = useState([]); 
  const [alertOn, setalert] = useState(false);
    useEffect(()=>{
      fetch(
        `http://localhost:4000/departmentlist`,{
          method:'GET'
        }
      ).then(async(data)=>{
        setdepartlist(await data.json())
      })

    },[])
    useEffect(()=>{
      fetch(
        `http://localhost:4000/rolelist`,{
          method: 'POST',
          body: JSON.stringify({
            deptId: userdata.department
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        
        }).then(async(data)=>{
        setrolelist(await data.json())
      })
    },[userdata.department])
   
    const CreateAccount = () =>{      
        fetch(
          `http://localhost:4000/addaccount`,{
            method: 'POST',
            body: JSON.stringify({
              deptid: userdata.department,
              roleid:userdata.rolename,
              username:userdata.username,
              name:userdata.name,
              password:userdata.password,
              email:userdata.email
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
           
          }
        )
      }

    return (
      <Body>
        <main className="mt-5 pt-3">
            <div className="container-fluid  text-start">
            <form className="p-5 border">
                <div className="form-group">
                <label >Username</label>
                <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Username"  onChange={(e)=>{setuserdata((prevData)=>({...prevData,username:e.target.value})),setalert(false)}}/>
                </div>
                <div className="form-group">
                <label >Password</label>
                <input type="password" className="form-control"  aria-describedby="emailHelp" placeholder="Password"  onChange={(e)=>{setuserdata((prevData)=>({...prevData,password:e.target.value})),setalert(false)}}/>
                </div>
                <div className="form-group">
                <label >Name</label>
                <input type="text" className="form-control"  placeholder="Name"  onChange={(e)=>{setuserdata((prevData)=>({...prevData,name:e.target.value})),setalert(false)}}/>
                </div>
                <div className="form-group">
                <label >Email</label>
                <input type="text" className="form-control"  aria-describedby="emailHelp" placeholder="Email"  onChange={(e)=>{setuserdata((prevData)=>({...prevData,email:e.target.value})),setalert(false)}}/>
                </div>
                <div className="form-group ">
                    <label >Department</label>

                    <select  className="form-control" onChange={(e)=>{
                     setuserdata((prevData) => ({
                      ...prevData,      // Spread the previous userdata to keep other properties unchanged
                      department: parseInt(e.target.value),
                    })), setalert(false)}} required>
                        <option value={0}>Choose...</option>
                    
                        {departlist.map((dept,i)=>
                            <option key={i} value={dept.id} >{dept.departmentname}</option>
                          ) }
               
                    </select>
                </div>
                <div className="form-group ">
                    <label >Role</label>
                
                    <select  className="form-control" onChange={(e)=>{setuserdata((prevdata)=>({
                      ...prevdata,
                      rolename:parseInt(e.target.value)
                    })),setalert(false)}} required>
                        <option value={0}>Choose...</option>
                        {rolelist.map((dept,i)=>
                            <option key={i} value={dept.id} >{dept.rolename}</option>
                          ) }
                        
                    </select>
                </div>
   
               
                <button type="submit" className="btn btn-primary" onClick={()=>CreateAccount()}>Submit</button>
               
          
            </form>
        </div>
        </main>
      </Body>
       

    )
}

function createSignal<T>(account: { username: string; password: string; name: string; rolename: number; department: number; }): [any, any] {
  throw new Error("Function not implemented.");
}
