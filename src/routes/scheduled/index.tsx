

import { useSearchParams,useNavigate  } from "react-router-dom";
import Body from "../../components/body";
import RightDesign from "../../components/Rightdesign";
import {useEffect, useState } from "react";
import Paginate from "../../components/paginate";
import Dataloop from "../../components/Dataloop";

var cookie = JSON.parse(document.cookie?.slice(10))

export default function Scheduled() {

  const [searchParams] = useSearchParams();
  const [arrdata, setarrdata] = useState([]);
  const [arrtotal, setarrtotal] = useState(1);
  const [dataReady, setdataReady] = useState(false);
  const navigate = useNavigate();
 
 
  useEffect(()=>{
   
    fetch(
      `http://localhost:4000/scheduledrow`,{
        method: 'POST',
        body: JSON.stringify({
          search: searchParams.get('search')==undefined?'':searchParams.get('search'),
          user:cookie.id
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
        `http://localhost:4000/listscheduled`,{
          method: 'POST',
          body: JSON.stringify({
            page: searchParams.get('page'),
            search: searchParams.get('search')!=undefined?searchParams.get('search') : '',
            user:cookie.id
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then(async (data)=>{
          setarrdata(await data.json())
          setdataReady(true)
        })
    },[searchParams.get('page'),searchParams.get('search')==undefined?'':searchParams.get('search')]);
  function paginate(){
    return <>
      
        <Paginate row={arrtotal} />
    </>

  }
  function dataloop(){
    if (!dataReady) {
      return <p>Loading...</p>;
    }
    return <>
      <Dataloop data={arrdata} pageroute={'scheduled'}></Dataloop>
    </>
  }

  function search(){

    return <>
     <input type="text" className="form-control"  placeholder="Search" value={searchParams.get('search')==undefined?'':searchParams.get('search')}  onChange={(e) => {navigate("?page=1&search="+e.target.value); }} />
    </>
  }
  return (
   <>
      <Body>
        
          <RightDesign data={dataloop()}  pageroute={"scheduled"} paginate={paginate()} searchfilter={search()}></RightDesign>
  
       </Body>
   </>
  );
}
