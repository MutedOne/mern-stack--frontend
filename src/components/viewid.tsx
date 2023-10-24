

import Body from "./body";
import download from "downloadjs"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

var detail = JSON.parse(document.cookie.slice(10));
export default function ViewId() {
    const params = useParams<{id:string}>();
    const [created, setcreated] = useState('');
    const [detaillog, setdetaillog] = useState<any>('');
    const [taskap, settaskap] = useState([]);
    const [statusbtn, setstatusbtn] = useState([]);
    const [applevel, setapplevel] = useState();
      const Download = async () =>{   
  
       const res = await fetch(
          `http://localhost:4000/download?id=`+params.id,{
            method: 'GET'
          }
        )
    
          const blob = await res.blob()
          download(blob,"attached"+params.id+".zip")
        
      
      } 
      async function viewId() {
        const res = await fetch(`http://localhost:4000/viewId?id=`+params.id,{
          method: 'GET',
        });
        const json = await res.json();
        let i=0;
        let arr=[]
        while (i <parseInt(json.lapprove)) {
          arr.push(i)
          i++;
        }
        setstatusbtn(arr)
       
        setdetaillog(json)
        setcreated(json.date.slice(0,10))
      } 
      async function taskapp() {
        const res = await fetch(`http://localhost:4000/taskapprover?id=`+params.id,{
          method: 'GET',
        });
        const json = await res.json();
        settaskap(json)
      } 
    
      useEffect(()=>{
       fetch(`http://localhost:4000/approvelevel?id=`+detaillog?.projid+`&&appnum=`+(taskap.length)+"&&useremail="+detail.id+"&&taskid="+params.id,{
          method: 'GET',
         }).then(async (data)=>{
          setapplevel(await data.json())
         })
      },[detaillog,taskap,params.id])
 
       
      
      useEffect( ()=>{
          viewId().then(()=>{
            taskapp()
          })
      },[params.id])

      const approve =(i) =>{
        fetch(
                      `http://localhost:4000/approve`,{
                        method: 'PATCH',
                        body: JSON.stringify({
                          id:params.id,
                          applevel: i,
                          userid:detail.id,
                          user:detail.name,
                          lastapp: i == detaillog.lapprove?"yes":"no"
                        }),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                      }
                    ).then(()=>{
                      location.reload();
                    })
      }    
   
    return (
        <Body>
             <main className="mt-5 pt-3">
            <div className="container-fluid  text-start">
          
          
            <form className="border p-5">
                 
      
            <div className="form-group">
                <label >Name</label>
                <input type="text" className="form-control"  placeholder="Name"  value={detaillog.name}/>
            </div>
            <div className="form-group">
              <label >Description</label>
              <textarea className="form-control" rows="3" value={detaillog.description}></textarea>
            </div>
            <div className="form-group">
              <label >Created</label>
             <input className="form-control" type="date" value={created}/>
            </div>
            <div className="form-group" >
              <label >Project</label>
             <input className="form-control" type="text" value={detaillog.projectname}/>
            </div>
            <div className="form-group" id="taskfor">
              <label >Task for</label>
             <input className="form-control" type="text" value={detaillog.email}/>
            </div>
            {statusbtn?.map((val, i) =>
                  <button type="button" className={`btn btn-primary ${taskap.length==i && applevel?.length!=0?"d-block":"d-none"}` } onClick={()=>approve(i)}> {i==0?'Done':i == detaillog.lapprove?"Final Approver":"Approver"+i}</button>
                  // (result1.length==i && result2.length!=0  ?"d-block":"d-none")
            )}
            <div className="d-flex">
               {taskap?.map((app, i) =>
                  <div className="card" style={{width: "15rem;"}}>
                                  
                  <div className="card-body">
                    <h5 className="card-title">{app.name}</h5>
                    <p className="card-subtitle">{app.departmentname}</p>
                    <p className="card-subtitle">{app.rolename}</p>
                    <p className="card-subtitle">{ i ==0?"Assigned Task": i ==detaillog.lapprove?"Final Approver":"Approver"+i}</p>
                    <p className="card-subtitle">{app.date}</p>
                  </div>
                </div>
                )}
                
           
            </div>
                
                <button type="button" className="btn btn-primary mt-3" onClick={Download}>Download Attached</button>
              
            </form>
 
           
         </div>
        </main>
        </Body>
    )
}