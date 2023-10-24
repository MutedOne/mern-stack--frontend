import {  Show, createSignal } from "solid-js";
import Body from "../components/body";
import Alert from "../components/alert";


export default function Department() {

   
    const [department, setDepartment] = createSignal('');
    const [alertOn, setalert] = createSignal(false);
    const CreateRole = () =>{     
      fetch(
        `http://localhost:4000/adddept`,{
          method: 'POST',
          body: JSON.stringify({
            deptname: department()
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

      const handleEmailChange = (e:Event) => {
        setDepartment((e.target as HTMLInputElement)?.value || '');
        setalert(false);
      };
    return (
      <Body>
      <main class="mt-5 pt-3">
            <div class="container-fluid  text-start">
            <form class="p-5 border">
                <div class="form-group">
                <label for="exampleInputEmail1">Department</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Department" onkeyup={handleEmailChange} />
            
                </div>
                <Show when={department()}>
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