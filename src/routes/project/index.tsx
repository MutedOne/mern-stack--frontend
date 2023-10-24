
import Body from "../../components/body";
import Paginate from "../../components/paginate";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Employee() {

  const [searchParams] = useSearchParams();
  const [arrdata, setarrdata] = useState([]);
  const [arrtotal, setarrtotal] = useState(1);
  const [dataReady, setdataReady] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
   
    fetch(
      `http://localhost:4000/prorow`,{
        method: 'POST',
        body: JSON.stringify({
          search: searchParams.get('search')==undefined?'':searchParams.get('search'),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    ).then(async (data)=>{
      setarrtotal(await data.json())
 
    })
  },[searchParams.get('search')==undefined?'':searchParams.get('search')])
  
    useEffect(() => {
      setdataReady(false)
      fetch(
        `http://localhost:4000/listpro`,{
          method: 'POST',
          body: JSON.stringify({
            page: searchParams.get('page'),
            search: searchParams.get('search')!=undefined?searchParams.get('search') : '',
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then(async (data)=>{
        
         setarrdata(await data.json())
          setdataReady(true)
        })
    },[searchParams.get('page'),searchParams.get('search')==undefined?'':searchParams.get('search')]);
   
 
    function search(){

      return <>
       <input type="text" className="form-control"  placeholder="Search" value={searchParams.get('search')==undefined?'':searchParams.get('search')}  onChange={(e) => {navigate("?page=1&search="+e.target.value); }} />
      </>
    }
  function dataloop(){
    if(!dataReady){
      return <p>Loading</p>
    }
    return  <>
        {
             arrdata.map((pro,index) =>
             <tr key={index}>
             <th scope="row">{pro.rn}</th>
             <td>{pro.projectname}</td>
              <td>{pro.summary}</td>
             <td><a href={`${pro.id}`} className="btn btn-primary" >View</a></td>
           </tr> )
        }
    </>
 
  }
  return (
   <>
  
    <Body>
        <main className="mt-5 pt-3">
        <div className="container-fluid  text-start">
          <div className="bg-white rounded-3 p-4">
            <div className="d-flex justify-content-between">
            <h3 className="text-start">Project</h3>
              <div className="p-2">{search()}</div>
             
            </div>
          
            <table className="table">
              <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Project Summary</th>
                  <th scope="col">Action</th>
                  </tr>
              </thead>
              <tbody>
                  {dataloop()}           
              </tbody>
            </table>
          </div>
     
          <div>
          <Paginate row={arrtotal} />
          </div>
    
      </div>
  </main>
    </Body>
   </>
      

  );
}
