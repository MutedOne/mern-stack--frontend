
import Header from "./Header";
import Sidenav from "./Sidenav";
import "../components/css/dashboard.css"


import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type BodyProps = {
  children: any
};
    
type UserDetail = {
  userdetail:{
    id:number,
    name:string,
    rolename:string,
    departmentname:string,
  }
};
const initialUserDetail: UserDetail = {
  userdetail:{
    id: 0,
    name: "",
    rolename: "",
    departmentname: "",
  }

};
export default function Body(props:BodyProps) {
  console.log("body")
  const [sessionid, setsesssionid] = useState("");
  const [userdetail, setuserdetail] = useState<UserDetail>(initialUserDetail);
 
  useEffect(() => {
     setsesssionid(sessionStorage?.getItem("sessionId")||'')
     var cookie  = document.cookie!=''?JSON.parse(document.cookie?.slice(10)):''

     setuserdetail(cookie)
  },[]);

  
    return (
      <>
       {sessionid!=''?  
       <>
            (<Header userdetail={userdetail} /><Sidenav userdetail={userdetail} />
              {props.children} )
       </>:<></>
       }
      </>
 
    )
}