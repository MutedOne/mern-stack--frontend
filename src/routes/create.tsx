import { For, Show, createEffect, createResource, createSignal } from "solid-js";

import Choices from "choices.js";
import Body from "../components/body";
import Alert from "../components/alert";



  export async function projectlist() {
    const response = await fetch(
      `http://localhost:4000/allproj`,{
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
   
    return await response.json();
  }
  export async function accountlist() {
    const response = await fetch(
      `http://localhost:4000/allemp`,{
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
   
    return await response.json();
  }
export default function Create() {
 
  const [project] = createResource(projectlist);
  const [account] = createResource(accountlist);
    const [name, setName] = createSignal("");
    const [desc, setDesc] = createSignal("");
    const [filename, setfilename] = createSignal<any>();
    const [participant, setparticipant] = createSignal(0);
    const [priority, setPriority] = createSignal(1);
    const [proID, setProId] = createSignal('');
  
    const [alertOn, setalert] = createSignal(false);
    const Createorder = (e:Event) =>{      
        e.preventDefault()

         let acc = account().find((e:{id:number})=>e.id == participant())

        console.log(acc)
          fetch(
            `http://localhost:4000/add`,{
              method: 'POST',
              body: JSON.stringify({
                name:name(),
                prio:priority(),
                proid:proID(),
                desc:desc(),
                userid:participant(),
                email:acc.email
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            }
          ).then(async res => {
            setalert(true);
            console.log("testing")
           
            const result =await res.json()
         
             const formdata = new FormData()
            //  formdata.append('lastid',result[0].last_id)
            if(filename().length>0){
            
              Object.values(filename()).forEach((item:any)=> {
                formdata.append('name',item.name)
                formdata.append('file',item)
               });
               

            
              fetch(
              `http://localhost:4000/upload?lastid=`+result[0].last_id+'&&filelength='+filename().length,{
                method: 'POST',
                body: formdata
              }
            )
            }
        
          }).finally(()=>{
         
            setTimeout(()=>{
              location.reload()
            }, 2000);
          });
    
        
    }
    createEffect(()=>{
      if(account()){
        new Choices('#mySelect', {
   
          searchEnabled: true, // Disable search functionality
          placeholder: true, // Show a placeholder text
          placeholderValue: 'Select an option', // Placeholder text
          allowHTML: true,
        });
      }
      if(project()){
        new Choices('#myproject', {
   
          searchEnabled: true, // Disable search functionality
          placeholder: true, // Show a placeholder text
          placeholderValue: 'Select an option', // Placeholder text
          allowHTML: true,
        });
      }

    })


    
    return (
  <>
          <Body>
          <main class="mt-5 pt-3">
            <div class="container-fluid  text-start">
         
            <form class="border p-5" >
         
            <div class="form-group">
                <label for="exampleInputPassword1">Task name</label>
                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Name" onChange={(e)=>{setName(e.target.value),setalert(false)}}/>
            </div>
            <div class="form-group">
              <label for="exampleFormControlTextarea1">Description</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e)=>{setDesc(e.target.value),setalert(false)}}></textarea>
            </div>
         
            <div class="form-group ">
                    <label for="inputState">Project</label>
                
                    <select id="myproject" class="form-control" onChange={(e)=>{setProId(e.target.value),setalert(false)}} required>
                        <option selected value={0}>Choose...</option>
                        <For each={project()}>
                            {(proj) => 
                             <option value={proj.id} >{proj.projectname}</option>
                            }
                        </For>
                    </select>
              </div>
              <div class="form-group ">
              
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css"
              />
              <label for="inputState">Task for</label>
              <select id="mySelect" onChange={(e)=>{setparticipant(parseInt(e.target.value)),setalert(false)}}>
                  <option selected value={0}>Select Account</option>
              
                  <For each={account()}>
                    {(acc) => 
                          
                      <option value={acc.id}>{acc.email}</option>
                    }
                  </For>
            
                </select>
                </div>

            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1"  onChange={()=>{setPriority(3)}}/>
                <label class="form-check-label" for="exampleCheck1">Priority</label>
            </div>
            <div class="mb-3 row">
            
              <div class="col-sm-10">
                <input type="file" class="form-control" name="file" id="inputPassword" multiple  onChange={(e)=>setfilename(e.target.files)} accept=".PNG,.JPG"/>
              </div>
            </div>
            
                <Show when={name()&&priority()&&proID()&&desc()&&participant()!=0}>
                <button type="submit" class="btn btn-primary mt-3" onclick={Createorder} >Submit</button>
                </Show>
 
            <Show when={alertOn()}>
                  <Alert/>
               </Show>
            </form>
           
            
          
                     
          </div>
          </main>
          </Body>
  </>
      

    )
}