import { For, Show, createResource, createSignal } from "solid-js";
import Body from "../components/body";
import Alert from "../components/alert";

export async function departmentlist() {
    const response = await fetch(
      `http://localhost:4000/departmentlist`,{
        method: 'GET',
       
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
   
    return await response.json();
  }


export default function Role() {
    const [user] = createResource(departmentlist);
    const [deptId, setDeptId] = createSignal(0);
    const [rolename, setRoleName] = createSignal('');
    const [alertOn, setalert] = createSignal(false);
    const CreateRole = (e:Event) =>{      
      e.preventDefault()
      fetch(
        `http://localhost:4000/addrole`,{
          method: 'POST',
          body: JSON.stringify({
            role: rolename(),
            deptid: deptId()
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      ).then(()=>{
        setalert(true)
        setTimeout(()=>{
          location.reload()
        }, 2000);
      }) 
    }
    return (
      <Body>
           <main class="mt-5 pt-3">
            <div class="container-fluid  text-start">
            <form class="p-5 border ">
                <div class="form-group">
                <label for="exampleInputEmail1">Role</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Role" onChange={(e)=>{setRoleName(e.target.value),setalert(false)}} />
             
                </div>
                <div class="form-group ">
                    <label for="inputState">Department</label>
                
                    <select id="inputState" class="form-control" onChange={(e)=>{setDeptId(parseInt(e.target.value)),setalert(false)}} required>
                        <option value={0}>Choose...</option>
                        <For each={user()}>
                            {(dept) => 
                             <option value={dept.id} >{dept.departmentname}</option>
                            }
                        </For>
                    </select>
                </div>
                <Show when={rolename() && deptId()!=0}>
                <button type="submit" class="btn btn-primary" onClick={CreateRole}>Submit</button>
                </Show>
              
                <Show when={alertOn()}>
                  <Alert/>
               </Show>
            </form>
            </div>
        </main>
        </Body>
    )
}