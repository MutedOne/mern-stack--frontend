import { Show, createEffect, createResource, createSignal } from "solid-js";

import Body from "../components/body";
import "../components/css/email.css"
import Choices from "choices.js";
import Alert from "../components/alert";

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

export default function AddProject() {

  const [account] = createResource(accountlist);
    const [project, setProject] = createSignal('');
    const [plength, setplength] = createSignal(0);
  
    const [finalapp, setfinalapp] = createSignal<any>();
   
    const [summ, setsumm] = createSignal('');
    const [alertOn, setalert] = createSignal(false);
    
  
    createEffect(() => {
      const arr = account()
      let appstore:any = []
  
      let emailstore:any = []
      let tesxt =document.getElementById("text")
      if(tesxt){
        tesxt.onclick = function () {
          var count:number= document.getElementsByClassName('golden').length+1
   
          let form1 =document.getElementById("form")
         setplength(count)
         if(count<=6){
          var formadd=''
          formadd+=' <div class="form-group golden">'
                 
          formadd+='<label for="inputState">Approver '+(count)+'</label>'
          formadd+='<select class="mySelect app" multiple>'
          arr.forEach((val:{id:number,email:string})=>{
            formadd+=   ' <option value='+val.id+'>'+val.email+'</option>'
           })
          formadd+= '  </select></div>' 
      
           if(form1){
            form1.insertAdjacentHTML("beforeend",formadd );
           }
         
         }
         const selectElements:any = document.querySelectorAll('.mySelect');
         selectElements.forEach(function (selectElement:any,i:number) {
          console.log(selectElement)
           new Choices(selectElement, {
             // Options for Choices.js (if needed)
             // For example:
             searchEnabled: true, // Disable search functionality
             placeholder: true, // Show a placeholder text
             placeholderValue: 'Select an option', // Placeholder text
             removeItemButton: true,
           });
           selectElement.addEventListener('change', function () {
            const selectedValues = Array.from(selectElement.selectedOptions).map((option:any) => option.value);
          
            selectedValues.forEach((e:any)=>{
              appstore.push({id:(i+1),userid:e})
              setfinalapp(appstore)
           
            })
          });
     
           
         })
        }
      }
     
      
  
      document.getElementById('email')?.addEventListener("change", (event:any) => {
        event.target.value.split(",").forEach((e:string)=>{
          emailstore.push({email:e})
        
        })
      });
    });
    
    const btnaddpro =() =>{
   
      const uniqueSet = new Set();
      const storeapp = finalapp().filter((obj:{id:number,userid:number}) => {
        const key = `${obj.id}-${obj.userid}`;
        if (!uniqueSet.has(key)) {
          uniqueSet.add(key);
          return true;
        }
        return false;
      });
            fetch(
              `http://localhost:4000/addproject`,{
                method: 'POST',
                body: JSON.stringify({
                  project: project(),
                  summ: summ(),
                  length: plength(),
                  approver: storeapp,
                  clientemail: emails(),
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
    const [emails, setEmails] = createSignal<any>([]);
  const [currentEmail, setCurrentEmail] = createSignal("");
  const [error, setError] = createSignal("");

  const handleEmailInputChange = (e: { target: { value: any; }; }) => {
    setCurrentEmail(e.target.value);
    setError("");
  };

  const handleEmailInputKeyUp = (e:KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addEmail();
    }
  };

  const isValidEmail = (email:any) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addEmail = () => {
    const trimmedEmail:String = currentEmail().trim();

    if (trimmedEmail === "") {
      setError("Please enter a valid email.");
    } else if (!isValidEmail(trimmedEmail)) {
      setError("Invalid email format.");
    } else {
      setEmails((prevEmails) => [...prevEmails, trimmedEmail]);
       setCurrentEmail("");
    }
  };

  const removeEmail = (index:number) => {
    setEmails((prevEmails) => {
      const updatedEmails = [...prevEmails];
      updatedEmails.splice(index, 1);
      return updatedEmails;
    });
  };
  const handleProjectChange = (e:Event) => {
    setProject((e.target as HTMLInputElement)?.value || '');
    setalert(false);
  };
  const handleSumChange = (e:Event) => {
    setsumm((e.target as HTMLInputElement)?.value || '');
    setalert(false);
  };
    return (
      <Body>
     <main class="mt-5 pt-3">
         
            <div class="container-fluid  text-start">
            <form class="p-5 border" id="form">
                <div class="form-group">
                <label for="exampleInputEmail1">Project Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Project Name" value={project()}  onkeyup={handleProjectChange} />
            
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1" class="form-label">Summary</label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onkeyup={handleSumChange}></textarea>
                </div>
                <div class="form-group">
                <label for="exampleInputEmail1">Contact Info</label>
                <div class="email-input-container form-control">
                  {emails().map((email:string, index:number) => (
                    <div  class="email-tag form-control">
                      {email}
                      <span class="remove" onClick={() => removeEmail(index)} style={{color:'red'}}>
                        &nbsp;x
                      </span>
                    </div>
                  ))}
                  <input
                    type="text"
                    class={`email-input ${error() ? "error" : ""}`}
                    placeholder="Add more emails..."
                    value={currentEmail()}
                    onInput={handleEmailInputChange}
                    onKeyUp={handleEmailInputKeyUp}
                  />
                  {error() && <div class="error-message">{error()}</div>}
               </div>
            </div>
            <div class="form-group">
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/choices.js/public/assets/styles/choices.min.css"
              />
  
            <button type="button" class="btn btn-primary"id="text" >+ Approver</button>
         
            </div>
           
               <Show when={project()&&summ()&&plength()&&finalapp()&&emails().length!=0}>
               <button type="button" class="btn btn-primary" onClick={btnaddpro} >Add Project</button>
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