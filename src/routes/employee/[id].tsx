
import {  createSignal, onMount } from "solid-js";
import {  useParams } from "@solidjs/router";
import Body from "../../components/body";

export async function updateacc(name:String,email:String,id:String) {

  const response = await fetch(
    `http://localhost:4000/update`,{
      method: 'PATCH',
      body: JSON.stringify({
        name: name,
        email: email,
        id: id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  )
     
      return response.json()
  }
  export async function doneacc(id:String) {

    const response = await fetch(
      `http://localhost:4000/done`,{
        method: 'PATCH',
        body: JSON.stringify({
        
          id: id,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    )
      return response.json()
  }

type Detail={
  name:string,
  email:string
}


export default function ViewIdEmp() {
    const params = useParams();

    const [nameUpdate, setNameUpdate] = createSignal('');
    const [emailUpdate, setEmailUpdate] = createSignal('');
    const [imgset, setimgset] = createSignal('');
    const [profile, setprofile] = createSignal<any>();
    const [detaillog, setdetaillog] = createSignal<Detail|any>();
    onMount(async () => {
      console.log(window.location.pathname)
      const res = await fetch(`http://localhost:4000/viewempId?id=`+params.id,{
        method: 'GET',
      
      });
      setimgset('http://localhost:4000/public/account/'+params.id+'.png')
      setdetaillog( await res.json())

    });
    const Updateorder = () =>{   

        setNameUpdate(detaillog()?.name)
        setEmailUpdate(detaillog()?.email)
        updateacc(nameUpdate(),emailUpdate(),params.id)
       
      }
 
      const imgupdate = (e:Event) =>{      
        e.preventDefault()
        
           const formdata1 = new FormData()
          //  formdata1.append('id',params.id)
           formdata1.append('file',profile()[0])
          //in react it is usestate that hold value of image; im  using solidjs
          fetch(
          `http://localhost:4000/uploadpro?id=`+params.id,{
            method: 'POST',
            body: formdata1
          }).then(()=>{
            setimgset('http://localhost:4000/public/account/'+params.id+'.png')
             location.reload();
          })
    }

    return (
      <Body>
        <main class="mt-5 pt-3">
            <div class="container-fluid  text-start">

          
            <form class="border p-5">
                <img src={imgset()}alt="..." class="img-thumbnail float-right" onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src="/profile.png";
                    }} style={{"min-height":"190px","max-height":"190px"}}></img>
                
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>

                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  value={detaillog()?.email}  onChange={(e)=>setEmailUpdate(e.target.value)}/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Name</label>
                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Name" value={detaillog()?.name} onChange={(e)=>setNameUpdate(e.target.value)}/>
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Update Profile</label>
                <input type="file" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" accept='image/png' onChange={(e)=>setprofile(e.target.files)}/>
            </div>
                <button type="button" class="btn btn-primary mt-3" onClick={Updateorder}>Update</button>
                <button type="button" class="btn btn-primary mt-3" onClick={imgupdate}>Update Profile</button>
            </form>

         </div>
        </main>
        </Body>
    )
}