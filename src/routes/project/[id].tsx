import { For, createEffect, createResource, createSignal, onMount } from "solid-js";
import "../../components/css/email.css"
import { useParams } from "@solidjs/router";
import Body from "../../components/body";

 
export async function searchproj(projid:Number) {
   
  const response = await fetch(
    `http://localhost:4000/viewproj`,{
      method: 'POST',
      body: JSON.stringify({
        projid: projid
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );
    
  return await response.json();
}

export default function ViewIdProject() {
    const params = useParams<{id:string}>();
    const [detaillog, setdetaillog] = createSignal<any>();
    const [viewproj ] = createResource(parseInt(params.id),searchproj);
    const [approvers, setapprovers] = createSignal([]);
    const [custo, setcusto] = createSignal([]);
    onMount(async () => {
      const res = await fetch(`http://localhost:4000/viewprojId?id=`+params.id,{
        method: 'GET',
      
      });
      const res2 = await fetch(`http://localhost:4000/viewprojcustomer?id=`+params.id,{
        method: 'GET',
      
      });
      const res3 = await fetch(`http://localhost:4000/viewprojapprover?id=`+params.id,{
        method: 'GET',
      
      });
    
    
      setdetaillog( (await res.json())[0])
      setcusto( (await res2.json()))
      setapprovers( (await res3.json()))
    });
      createEffect(() => {
   
        const tagContainer = document.getElementById('tag-container')
        let tags:any=[]

        function addTags(){
          reset()
          tags.slice().reverse().forEach(function(tag:any){
            const input = createTag(tag)
            tagContainer?.prepend(input)
          })
        }
        function reset(){
          document.querySelectorAll('.tag').forEach(function(tag){
            tag.parentElement?.removeChild(tag)
          })
        }
    
        function createTag(label:string){
          const div = document.createElement('div')
          div.setAttribute('class','tag');
          const span = document.createElement('i')
          span.innerHTML = label
          const closebtn = document.createElement('i')
          closebtn.setAttribute('class',"material-icons")
          closebtn.setAttribute('data-item',label)
          closebtn.innerHTML ='x'
    
          div.appendChild(span)
          div.appendChild(closebtn)
          return div
        }
    
        document.addEventListener('click',function(e:any){
          if(e.target.tagName === 'I'){
            const value= e.target?.getAttribute('data-item')
            const index =tags.indexOf(value)
            tags =[...tags.slice(0,index),...tags.slice(index +1)]
            addTags()
          }
        })
      });
    return (
        <Body>
             <main class="mt-5 pt-3">
            <div class="container-fluid  text-start">
          
          
            <form class="border p-5">
                 
            <div class="form-group">
                <label for="exampleInputEmail1">Project Name</label>

                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={detaillog().projectname}/>
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Summary</label>
              
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3">{detaillog().summary}</textarea>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Contact detail</label>
              
                <For each={custo()}>{(app:{email:string}) =>
                 <div>{app.email}</div>
                }</For>
            </div>
       
            <div>
               <label for="exampleInputPassword1">Approver</label>
               <For each={approvers()}>{(app:{name:string}) =>
                 <div>{app.name}</div>
                }</For>
            </div>

            <div class="form-group mt-2">
              <label for="exampleInputEmail1">Task Details</label>
                <For each={viewproj()}>{(e) =>
                  
                  <ul >
                    <li>Today schedule is over {e.totalsched} task</li>
                    <li>Total Priority is over {e.totalprio} task</li>
                    <li>Total delayed is over {e.totaldelay} task</li>
                    <li>Done is over {e.totaldone} task</li>
                  </ul>
                }</For>
            </div>
            
              
            </form>
          
           
         </div>
        </main>
        </Body>
    )
}