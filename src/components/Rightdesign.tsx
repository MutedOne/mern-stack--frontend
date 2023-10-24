
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
export default function RightDesign(props:any) {
  console.log('rightdesign')
    //i cannot get updated value of loop
    const [signal, setSignal] = useState(false);
  
    const [searchParams] = useSearchParams();

    const download = async () =>{
      setSignal(true)
      await fetch(
        `http://localhost:4000/downloadExcel?status=`+props.pageroute,{
          method: 'GET',
         
        }
      )
      .then((response) => {
        
        return response.json()
      })
      .then((blob) => {
        console.log(blob)
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear(); // Get the current year (4 digits)
        const currentMonth = currentDate.getMonth() + 1; // Get the current month (0-11, so add 1)
        const currentDay = currentDate.getDate(); // Get the current day of the month (1-31)
        const formattedDate = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`;
        let newarr = []
        newarr.push(props.pageroute.toUpperCase(),'\n','Report of ',formattedDate,'\n')
        newarr.push('Task',',','Description',',','Date',props.pageroute=='done'? 'Donedate': '','\n')
        blob.forEach((e:any)=> {
          newarr.push(e.name,',',e.description,',',e.date,',',e.donedate==null?'':e.donedate,'\n')
          // Code to be executed for each element
        });
        const url = window.URL.createObjectURL(
          new Blob(newarr),
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `Export`+props.pageroute+`.csv`,
        );
    
        // Append to html link element page
        document.body.appendChild(link);
    
        // Start download
        link.click();
        link.remove();
        
        }).finally(()=>{
          setSignal(false)
        })
    }

  
    return (
      
      <main className="mt-5 pt-3">
      
          <div className="container-fluid">
        <div className="bg-white rounded-3 p-4">
          <div className="d-flex justify-content-between">
            
          <h3 className="text-start">{props.pageroute.toUpperCase()}</h3>
            <div>
             
                {signal?<>
                  <div className="spinner-grow float-end" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </>:<></>

                }
          
                <div className=" d-flex">
                  
                <button type="button" className="btn btn-light" onClick={download}>
                  Export
                  
                  </button>
                 {props.searchfilter}

                </div>
            </div>
      
            </div>
            
           
        
          <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Task</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
              {props.data}
            </tbody>
          </table>
          <div>
       { props.paginate}
        </div>
        </div>
      </div>
      </main>
 


    )

}